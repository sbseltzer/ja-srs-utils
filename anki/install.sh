#!/bin/bash
# Installation script for Anki
# Try to find Documents dir on Linux
if [ -f "~/.config/user-dirs.dirs" ]; then
    echo "Attempting to get Documents directory using ~/.config/user-dirs.dirs"
    UserDocs=`cat ~/.config/user-dirs.dirs | grep DOCUMENTS`
    eval $UserDocs
    UserDocs=$XDG_DOCUMENTS_DIR
    # Fallback for Linux
    if [ ! -d $UserDocs ]; then
        $UserDocs="~/Documents/Anki"
    fi
fi
# Try to find Documents dir on Windows
if [ ! -d "$UserDocs" ]; then
    echo "Attempting to get Documents directory using powershell"
    UserDocs=`powershell -Command '[Environment]::GetFolderPath("MyDocuments")'`
    UserDocs=${UserDocs/\\/\/}
fi

AnkiDir="$UserDocs/Anki";
if [ ! -d "$AnkiDir" ]; then
    exit
fi
echo "Found Anki directory: $AnkiDir"

# Find Anki user directory
AnkiUser=${1:="User 1"};
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
