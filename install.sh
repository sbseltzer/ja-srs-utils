#!/bin/sh
# Installation script for Anki

AnkiDir = "~/Documents/Anki";
if [ ! -d $AnkiDir ]; then
    exit;
fi
