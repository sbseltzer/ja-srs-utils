#!bash
# Installation script for Anki

AnkiDir="~/Documents/Anki";
if [ ! -d $AnkiDir ]; then
    TempDocumentsPath=`powershell -Command '[Environment]::GetFolderPath("MyDocuments")'`
    TempDocumentsPath=${TempDocumentsPath/\\/\/}
    AnkiDir=$TempDocumentsPath"/Anki"
fi
echo "Found Anki directory: $AnkiDir"
if [ ! -d $AnkiDir ]; then
    exit
fi
AnkiUser="User 1";
if [ ! -d "$AnkiDir/$AnkiUser" ]; then
    exit
fi
echo "Found Anki user directory: $AnkiDir/$AnkiUser"
AnkiMedia="$AnkiDir/$AnkiUser/collection.media"
AnkiFilePrefix="$AnkiMedia/_ja-srs-utils."
cp include.js "${AnkiFilePrefix}.include.js"
cp ../common/card.js "${AnkiFilePrefix}.card.js"
cp ../common/card.css "${AnkiFilePrefix}.card.css"
cp ../common/jquery-3.1.1.slim.min.js "${AnkiFilePrefix}.jquery-3.1.1.slim.min.js"
