#!/bin/bash
# Installation script for Anki
UserDocs=`cat ~/.config/user-dirs.dirs | grep DOCUMENTS`
# Try to find Documents dir on Linux
eval $UserDocs
UserDocs=$XDG_DOCUMENTS_DIR
# Fallback for Linux
if [ ! -d $AnkiDir ]; then
    $UserDocs="~/Documents/Anki"
fi
# Fallback for Windows
if [ ! -d $AnkiDir ]; then
    UserDocs=`powershell -Command '[Environment]::GetFolderPath("MyDocuments")'`
    UserDocs=${TempDocumentsPath/\\/\/}
fi
AnkiUser=${1:="User 1"};
AnkiDir="$UserDocs/Anki";
if [ ! -d $AnkiDir ]; then
    exit
fi
echo "Found Anki directory: $AnkiDir"
if [ ! -d "$AnkiDir/$AnkiUser" ]; then
    exit
fi
echo "Found Anki user directory: $AnkiDir/$AnkiUser"
AnkiMedia="$AnkiDir/$AnkiUser/collection.media"
AnkiNamePrefix="_ja-srs-utils";
AnkiFilePrefix="$AnkiMedia/$AnkiNamePrefix"
cp ../common/card.js "${AnkiFilePrefix}.card.js"
cp ../common/card.css "${AnkiFilePrefix}.card.css"
sed -i -e "s/StrokeOrder.ttf/${AnkiNamePrefix}.StrokeOrder.ttf/g" "${AnkiFilePrefix}.card.css"
cp ../common/StrokeOrder.ttf "${AnkiFilePrefix}.StrokeOrder.ttf"
cp ../common/jquery-3.1.1.slim.min.js "${AnkiFilePrefix}.jquery-3.1.1.slim.min.js"

cp ../common/include.js .
sed -i -e "s/JQUERY/${AnkiNamePrefix}.jquery-3.1.1.slim.min.js/g" include.js
sed -i -e "s/CARD_JS/${AnkiNamePrefix}.card.js/g" include.js
sed -i -e "s/CARD_CSS/${AnkiNamePrefix}.card.css/g" include.js
mv include.js "${AnkiFilePrefix}.include.js"
