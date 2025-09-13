#!/bin/zsh

rsync -avz --delete --exclude .gitignore --exclude .DS_Store --exclude .git/ --exclude deploy.sh warped* w28@cdn.warpedvisions.org:~/cdn.warpedvisions.org/
rsync -avz --delete --exclude .gitignore --exclude .DS_Store --exclude .git/ --exclude deploy.sh .htaccess w28@cdn.warpedvisions.org:~/cdn.warpedvisions.org/

