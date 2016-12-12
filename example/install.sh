#!/bin/bash
# Example installation script
namePrefix="test."
cp ../common/card.js .
cp ../common/card.css .
cp ../common/StrokeOrder.ttf .
cp ../common/jquery-3.1.1.slim.min.js .

cp ../common/include.js .
sed -i -e "s/JQUERY/${namePrefix}jquery-3.1.1.slim.min.js/g" include.js
sed -i -e "s/CARD_JS/${namePrefix}card.js/g" include.js
sed -i -e "s/CARD_CSS/${namePrefix}card.css/g" include.js
sed -i -e "s/StrokeOrder.ttf/${namePrefix}StrokeOrder.ttf/g" card.css

mv {,$namePrefix}"include.js"
mv {,$namePrefix}"card.js"
mv {,$namePrefix}"card.css"
mv {,$namePrefix}"StrokeOrder.ttf"
mv {,$namePrefix}"jquery-3.1.1.slim.min.js"
