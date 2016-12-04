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

function parseTextWithFuri(str, wordDelimiter, braceType) {
    console.log(str);
    var elements = $('<p></p>');
    var searchText = "";
    var index = 0;
    var endIndex = str.length;
    while (index < endIndex) {
        var bracesStart = getIndexOfNextOpeningBrace(str, index, braceType);
        console.log(index, bracesStart);
        if (bracesStart == -1) {
            var remainder = str.substring(index);
            elements.append(remainder);
            searchText += remainder;
            break;
        } else {
            var remainder = str.substring(index, bracesStart - 1);
            elements.append(remainder);
            searchText += remainder;
        }
        var bracesEnd = getIndexOfNextClosingBrace(str, bracesStart, braceType);
        var kanjiStart = getStartIndexOfKanjiAt(str, bracesStart - 1);
        var kanjiEnd = bracesStart - 1;
        index = bracesEnd + 1;
        var kanjiElement = $("<rb>" + str.substring(kanjiStart, kanjiEnd) + "</rb>");
        var furiElement = $("<rt>" + str.substring(bracesStart + 1, bracesEnd - 1) + "</rt>");
        var element = $("<ruby></ruby>");
        element.append(kanjiElement);
        element.append("<rp>(</rp>");
        element.append(furiElement);
        element.append("<rp>)</rp>");
        elements.append(element);
    }
    elements.attr("search", searchText);
    return elements;
}

$(".parse-furi").each(
    function() {
        var e = $(this);
        console.log(e.text());
        e.html(parseTextWithFuri(e.text(), "", "[]"));
    });

$(".rtk-link").each(
    function() {
        var e = $(this);
        var rtkLink = "http://kanji.koohi.com/study/kanji/" + e.attr("kanji");
        e.wrap("<a href='" + rtkLink + "'></a>");
    });

$(".jisho-link").each(
		function() {
		    var e = $(this);
		    var jishoLink = "http://jisho.org/search/" + e.attr("search");
		    e.wrap("<a href='" + jishoLink + "'></a>");
		});

function cycleFont()
{
		var e = $(this);
		var prevfont = Number(e.attr("font_index")) % fontlist.length;
		var curfont = (Number(e.attr("font_index")) + 1) % fontlist.length;
		e.attr("font_index", curfont);
		e.removeClass(fontlist[prevfont]);
		e.addClass(fontlist[curfont]);
}

$(".cycle-font").each(
		function()
		{
				var e = $(this);
				var fontlist = e.attr("font_classes");
				if (fontlist != undefined) {
						fontlist = fontlist.split(","); 
				} else {
						return;
				}
				e.attr("curfont", 0);
        cycleFont(e);
				e.onclick(cycleFont);
		} );
