#!/bin/sh
cd $(dirname "$0")/../
sudo -u nginx composer install --no-dev --no-progress --no-interaction --optimize-autoloader
