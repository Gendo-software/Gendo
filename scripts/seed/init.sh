#!/bin/bash

echo "Get authorization token..."
TOKEN=$(curl --silent --request POST \
  --url https://dev-gendo.eu.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"0DIZ7f22apKtatxRy8McrzsbIxSKDmOs","client_secret":"PibymnIfbxRMDiGL9sptjHc_c18RAHnyR1P2GQJ39TTmWpg0g8jm2hOolaa21qW_","audience":"basicApi","grant_type":"client_credentials"}' \
  | jq -r '.access_token')

echo "Checking available templates..."
templates=$(curl --silent --header "Authorization: Bearer ${TOKEN}" http://localhost:5010/api/templates | jq -r length)

if [ $templates != 0 ]; then
	echo "[ERROR] Data has been found and further processing can not be continued."
else
	echo "Creating templates..."
	curl --silent --header "Content-Type: application/json" --header "Authorization: Bearer ${TOKEN}" --request POST --data @insertTemplateA.json http://localhost:5010/api/templates
	curl --silent --header "Content-Type: application/json" --header "Authorization: Bearer ${TOKEN}" --request POST --data @insertTemplateB.json http://localhost:5010/api/templates
	curl --silent --header "Content-Type: application/json" --header "Authorization: Bearer ${TOKEN}" --request POST --data @insertTemplateC.json http://localhost:5010/api/templates

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