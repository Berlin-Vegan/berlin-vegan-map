#!/bin/bash

rm -rf bower_components
grunt clean
bower install
grunt --force
rm dist/.htaccess
rsync -avz dist/ deploy@berlin-vegan.de:/var/www/berlin-vegan-wp/map/
