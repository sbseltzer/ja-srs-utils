function isInUnicodeRange(ch, start, end) {
    return start <= ch && ch <= end;
}
function isPunctuation(str, atIndex) {
    var c = str[atIndex];
    return (Character.UnicodeBlock.of(c)==Character.UnicodeBlock.CJK_SYMBOLS_AND_PUNCTUATION);
}
function isHiragana(str, atIndex) {
    var c = str[atIndex];
    return (Character.UnicodeBlock.of(c)==Character.UnicodeBlock.HIRAGANA);
}

function isKatakana(str, atIndex) {
    var c = str[atIndex];
    return (Character.UnicodeBlock.of(c)==Character.UnicodeBlock.KATAKANA);
}
function isKanji(str, atIndex) {
    var c = str[atIndex];
    return (Character.UnicodeBlock.of(c)==Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A) ||
           (Character.UnicodeBlock.of(c)==Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B);
}

function getStartIndexOfKanjiAt(str, atIndex) {
    if  (!isKanji(str[atIndex])) {
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
    if  (!isKanji(str[atIndex])) {
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

function getIndexOfNextWord(str, atIndex, wordDelimiter) {
    str.indexOf(wordDelimiter, atIndex);
}
function parseTextWithFuri(str, wordDelimiter, braceType) {
    var elements = $('<p></p>');
    var searchText = "";
    var index = 0;
    var endIndex = str.length;
    while (index < endIndex) {
        var bracesStart = getIndexOfNextOpeningBrace(str, index, braceType);
        var bracesEnd = getIndexOfNextClosingBrace(str, bracesStart, braceType);
        var kanjiStart = getStartIndexOfKanjiAt(str, bracesStart);
        var kanjiEnd = bracesStart - 1;
        searchText += str.substring(index, kanjiEnd);
        index = bracesEnd + 1;
        var kanjiElement = $("<rb>" + str.substring(kanjiStart, kanjiEnd) + "</rb>");
        var furiElement = $("<rt>" + str.substring(bracesStart + 1, bracesEnd - 1) + "</rt>");
        var element = $("<ruby></ruby>");
        element.append(kanjiElement).append("<rp>(</rp>").append(furiElement).append("<rp>)</rp>");
        elements.append(element);
    }
    elements.attr("search", searchText);
    return elements;
}

$(".parse-furi").each(
    function() {
        var e = $(this);
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
