function isInUnicodeRange(code, start, end) {
    return start <= code && code <= end;
}
function isPunctuation(str, atIndex) {
    var c = str.charCodeAt(atIndex);
    return isInUnicodeRange(c, 0x3000, 0x303f);
}
function isHiragana(str, atIndex) {
    var c = str.charCodeAt(atIndex);
    return isInUnicodeRange(c, 0x3040, 0x309f);
}
function isKatakana(str, atIndex) {
    var c = str.charCodeAt(atIndex);
    return isInUnicodeRange(c, 0x30a0, 0x30ff);
}
function isFWRomanOrHWKatakana(str, atIndex) {
    var c = str.charCodeAt(atIndex);
    return isInUnicodeRange(c, 0xff00, 0xffef);
}
function isKanji(str, atIndex) {
    var c = str.charCodeAt(atIndex);
    return isInUnicodeRange(c, 0x4e00, 0x9faf);
}

function getStartIndexOfKanjiAt(str, atIndex) {
    if  (!isKanji(str, atIndex)) {
        return -1;
    }
    while (atIndex > 0) {
        if (!isKanji(str, atIndex)) {
            return atIndex + 1;
        }
        atIndex--;
    }
    return 0;
}
function getEndIndexOfKanjiAt(str, atIndex) {
    if  (!isKanji(str, atIndex)) {
        return -1;
    }
    while (atIndex < str.length) {
        if (!isKanji(str, atIndex)) {
            return atIndex - 1;
        }
        atIndex++;
    }
    return str.length - 1;
}

function getIndexOfNextOpeningBrace(str, atIndex, braceType) {
    return str.indexOf(braceType[0], atIndex);
}
function getIndexOfNextClosingBrace(str, atIndex, braceType) {
    return str.indexOf(braceType[1], atIndex);
}

// function getIndexOfNextWord(str, atIndex, wordDelimiter) {
//     str.indexOf(wordDelimiter, atIndex);
// }

function parseTextWithFuri(container, wordDelimiter, braceType) {
    var str = container.text();
    console.log(str);
    container.html("");
    var elements = container;
    var searchText = "";
    var index = 0;
    var endIndex = str.length;
    while (index < endIndex) {
        var bracesStart = getIndexOfNextOpeningBrace(str, index, braceType);
        console.log("index:", index, "bracesStart:", bracesStart);
        if (bracesStart == -1) {
            var remainder = str.substring(index);
            elements.append(remainder);
            searchText += remainder;
            break;
        }

        // else { // this may overlap with kanjiStart
        //     var remainder = str.substring(index, bracesStart - 1);
        //     elements.append(remainder);
        //     searchText += remainder;
        // }

        var bracesEnd = getIndexOfNextClosingBrace(str, bracesStart, braceType);
        var kanjiStart = getStartIndexOfKanjiAt(str, bracesStart - 1);
        var kanjiEnd = bracesStart;
        console.log("bracesEnd:", bracesEnd, "kanjiStart:", kanjiStart, "kanjiEnd:", kanjiEnd);
        index = bracesEnd + 1;
        var kanjiElement = $("<rb>" + str.substring(kanjiStart, kanjiEnd) + "</rb>");
        searchText += kanjiElement.text();
        var furiElement = $("<rt>" + str.substring(bracesStart + 1, bracesEnd) + "</rt>");
        var element = $("<ruby></ruby>");
        element.append(kanjiElement);
        element.append("<rp>(</rp>");
        element.append(furiElement);
        element.append("<rp>)</rp>");
        elements.append(element);
    }
    return searchText;
}

$(".parse-furi").each(
    function() {
        var e = $(this);
        console.log(e.text());
        var searchText = parseTextWithFuri(e, "", "[]");
        e.attr("search", searchText);
    });

$(".rtk-link").each(
    function() {
        var e = $(this);
        var searchText = e.attr("search");
        searchText = (searchText != undefined) ? searchText : e.text();
        var rtkLink = "http://kanji.koohii.com/study/kanji/" + searchText;
        e.wrap("<a href='" + rtkLink + "'></a>");
    });

$(".jisho-link").each(
		function() {
		    var e = $(this);
	      var searchText = e.attr("search");
        searchText = (searchText != undefined) ? searchText : e.text();
	      var jishoLink = "http://jisho.org/search/" + searchText;
		    e.wrap("<a href='" + jishoLink + "'></a>");
		});

function cycleFont(e, fontlist)
{
		var curfont = (Number(e.attr("font_index")) + 1) % fontlist.length;
		e.attr("font_index", curfont);
		e.css("font-family",fontlist[curfont]);
}

$(".cycle-font").each(
		function()
		{
				var e = $(this);
				var fontlist = e.attr("fonts");
        fontlist = (fontlist != undefined ? e.css("font-family") + "," : "") + fontlist;
        console.log("fontlist", fontlist);
				if (fontlist != undefined) {
						fontlist = fontlist.split(","); 
				} else {
						return;
				}
        console.log("fontlist", fontlist);
        // Set to -1 to ensure the call to cycler() below puts it at index 0.
				e.attr("font_index", -1);
        var cycler = function() {
            cycleFont(e, fontlist);
        }
        cycler();
				e.click(cycler);
		} );
