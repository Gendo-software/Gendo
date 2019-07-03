#!/bin/bash
echo "Checking available templates..."
templates=$(curl --silent http://localhost:5010/api/templates | jq -r length)

if [ $templates != 0 ]; then
	echo "[ERROR] Data has been found and further processing can not be continued."
else
	echo "Creating templates..."
	curl --silent --header "Content-Type: application/json" --request POST --data @insertTemplateA.json http://localhost:5010/api/templates
	curl --silent --header "Content-Type: application/json" --request POST --data @insertTemplateB.json http://localhost:5010/api/templates
	curl --silent --header "Content-Type: application/json" --request POST --data @insertTemplateC.json http://localhost:5010/api/templates

	arr=($(curl --silent http://localhost:5010/api/templates | jq -r '.[].id'))
	url=http://localhost:5010/api/templates/${arr[0]}
	url=${url%$'\r'}
	echo "Update template..."
	curl --silent --header "Content-Type: application/json" --request PUT --data @updateTemplate.json $url

	url=http://localhost:5010/api/templates/${arr[1]}
	url=${url%$'\r'}
	echo "Delete template..."
	curl --silent -X DELETE $url

	echo "Reading all available templates..."
	allTemplates=$(curl --silent http://localhost:5010/api/templates | jq -r length)
	if [ $allTemplates == 2 ]; then
	  echo "[OK] Received 2 templates"
	else 
	  echo "[WARN]: something goes wrong while getting templates"
	fi
fi

read -p "Press enter to continue..."