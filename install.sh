#!/bin/sh
# Installation script for Anki

AnkiDir = "~/Documents/Anki";
if [ ! -d $AnkiDir ]; then
    exit;
fi
AnkiUser = "User 1";
if [ ! -d "$AnkiDir/$AnkiUser" ]; then
    exit;
fi;
