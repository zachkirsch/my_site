#!/bin/bash
HOST=23.229.236.65  #This is the FTP servers host or IP address.
USER=zachkirsch     #This is the FTP user that has access to the server.

HTML_FILES=*.html
CSS_FILES=*.css
JS_FILES=*.js

# Read Password
echo -n "Password: "
read -s PASS

# Send to site at godaddy server

## ENTERING FTP SHELL ##
ftp -in << EOF
open $HOST
user $USER $PASS
cd public_html

mput $HTML_FILES $CSS_FILES $JS_FILES

close
bye
