#!/bin/sh
# Installation script for Anki

AnkiDir = "~/Documents/Anki";
if [ ! -d $AnkiDir ]; then
    exit;
fi
AnkiUser = "User 1";
if [ ! -d "$AnkiDir/$AnkiUser" ]; then
    exit;
fi
AnkiMedia = "$AnkiDir/$AnkiUser/collection.media"

cp include.js "$AnkiMedia/_ja-srs-utils.include.js" 
cp ../common/card.js "$AnkiMedia/_ja-srs-utils.card.js"
cp ../common/card.css "$AnkiMedia/_ja-srs-utils.card.css"
cp ../common/jquery-3.1.1.slim.min.js "$AnkiMedia/_ja-srs-utils.jquery-3.1.1.slim.min.js"
