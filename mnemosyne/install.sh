#!bash
# Installation script for Mnemosyne
namePrefix="ja-srs-utils."
cp ../common/card.js .
cp ../common/card.css .
cp ../common/StrokeOrder.ttf .
cp ../common/jquery-3.1.1.slim.min.js .
sed -i -e "s/StrokeOrder.ttf/${namePrefix}StrokeOrder.ttf/g" card.css

MnemosyneDir="$APPDATA/Mnemosyne/default.db_media"
if [ ! -d "$MnemosyneDir" ]; then
    echo "Failed to find Mnemosyne media directory!"
    exit
fi
echo "document.write(\`<style>$(cat card.css)</style>\`);" > card.css.js;
cat jquery-3.1.1.slim.min.js card.js card.css.js > include.js
mv {,"$MnemosyneDir/$namePrefix"}"include.js"
mv {,"$MnemosyneDir/$namePrefix"}"StrokeOrder.ttf"
 
