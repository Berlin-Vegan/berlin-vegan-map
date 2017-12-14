#!/bin/bash

npm run build
rm dist/assets/GastroLocations.json # Only needed for development 
rsync -avz dist/ deploy@berlin-vegan.de:/var/www/berlin-vegan-wp/map/
# On Windows, you may use this instead of rsync (rm -rf * in map/ on server before):
# scp -r dist/* deploy@berlin-vegan.de:/var/www/berlin-vegan-wp/map/