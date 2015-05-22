#!/bin/bash
HOST=23.229.236.65  #This is the FTP servers host or IP address.
USER=zachkirsch     #This is the FTP user that has access to the server.

# Read Password
echo -n "Password: "
read -s PASS

# Send to site at godaddy server

## ENTERING FTP SHELL ##
ftp -in << EOF
open $HOST
user $USER $PASS
cd public_html

mkdir css
mkdir static
mkdir img

mput index.html travel-history.html
cd css
lcd css
mput freelancer.css map-styles.css
cd ../static
lcd ../static
mput *
cd ../img
lcd ../img
mput *.png

close
bye
