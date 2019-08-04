#!/bin/bash

echo "Get authorization token..."
TOKEN=$(curl --request POST \
  --url https://dev-gendo.eu.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"0DIZ7f22apKtatxRy8McrzsbIxSKDmOs","client_secret":"PibymnIfbxRMDiGL9sptjHc_c18RAHnyR1P2GQJ39TTmWpg0g8jm2hOolaa21qW_","audience":"basicApi","grant_type":"client_credentials"}' \
  | jq -r '.access_token')

echo ${TOKEN}
read -p "Press enter to continue..."

