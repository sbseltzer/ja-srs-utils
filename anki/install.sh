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
AnkiMedia=".";
AnkiNamePrefix="_ja-srs-utils";
AnkiFilePrefix="$AnkiMedia/$AnkiNamePrefix"
cp ../common/card.js "${AnkiFilePrefix}.card.js"
cp ../common/card.css "${AnkiFilePrefix}.card.css"
sed -i -e 's/StrokeOrder.ttf/${AnkiNamePrefix}.StrokeOrder.ttf/g' "${AnkiFilePrefix}.card.css"
cp ../common/StrokeOrder.ttf "${AnkiFilePrefix}.StrokeOrder.ttf"
cp ../common/jquery-3.1.1.slim.min.js "${AnkiFilePrefix}.jquery-3.1.1.slim.min.js"

cp ../common/include.js .
sed -i -e "s/JQUERY/${AnkiNamePrefix}.jquery-3.1.1.slim.min.js/g" include.js
sed -i -e "s/CARD_JS/${AnkiNamePrefix}.card.js/g" include.js
sed -i -e "s/CARD_CSS/${AnkiNamePrefix}.card.css/g" include.js
mv include.js "${AnkiFilePrefix}.include.js"
