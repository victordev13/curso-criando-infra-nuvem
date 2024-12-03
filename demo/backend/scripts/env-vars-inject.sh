#!/bin/bash
set -e

environment=prod
aws_region=sa-east-1
destination_file=.env
destination_user=nginx

cd $(dirname "$0")/../

# Buscando parâmetros do Systems Manager
aws ssm get-parameters-by-path \
    --region $aws_region \
    --path "/${environment}/" \
    --with-decryption \
    --recursive \
    --query "Parameters[*].{Name:Name,Value:Value}" | \
  jq --arg ENV_PREFIX "/$environment/APP_" \
    -r '.[] | select(.Name | startswith($ENV_PREFIX)) | (.Name | split("/")[-1] | gsub("="; "_")) + "=" + .Value' > $destination_file

# Alterando acesso ao arquivo
chown $destination_user:$destination_user $destination_file
chmod 0400 $destination_file

