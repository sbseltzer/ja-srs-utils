#!bash
# Installation script for Mnemosyne
namePrefix="ja-srs-utils."
cp ../common/card.js .
cp ../common/card.css .
cp ../common/StrokeOrder.ttf .
cp ../common/jquery-3.1.1.slim.min.js .

cp ../common/include.js .
sed -i -e "s/JQUERY/${namePrefix}jquery-3.1.1.slim.min.js/g" include.js
sed -i -e "s/CARD_JS/${namePrefix}card.js/g" include.js
sed -i -e "s/CARD_CSS/${namePrefix}card.css/g" include.js
sed -i -e "s/StrokeOrder.ttf/${namePrefix}StrokeOrder.ttf/g" card.css

MnemosyneDir="$APPDATA/Mnemosyne/default.db_media"
if [ ! -d "$MnemosyneDir" ]; then
    echo "Failed to find Mnemosyne media directory!"
    exit
fi

mv {,"$MnemosyneDir/$namePrefix"}"include.js"
mv {,"$MnemosyneDir/$namePrefix"}"card.js"
mv {,"$MnemosyneDir/$namePrefix"}"card.css"
mv {,"$MnemosyneDir/$namePrefix"}"StrokeOrder.ttf"
mv {,"$MnemosyneDir/$namePrefix"}"jquery-3.1.1.slim.min.js"
