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

function getIndexOfNextOpeningBrace(str, atIndex) {
    return str.indexOf("[", atIndex);
}
function getIndexOfNextClosingBrace(str, atIndex) {
    return str.indexOf("]", atIndex);
}

function getIndexOfNextWord(str, atIndex, wordDelimiter) {
    str.indexOf(wordDelimiter, atIndex);
}

function parseFuriUsingSquareBrackets(str, wordDelimiter) {
    var elements = $('<ul class="japanese_sentence japanese japanese_gothic clearfix" lang="ja"></ul>');
    var searchText = "";
    var index = 0;
    var endIndex = str.length;
    while (index < endIndex) {
        var bracesStart = getIndexOfNextOpeningBrace(str, index);
        var bracesEnd = getIndexOfNextClosingBrace(str, bracesStart);
        var kanjiStart = getStartIndexOfKanjiAt(str, bracesStart);
        var kanjiEnd = bracesStart - 1;
        searchText += str.substring(index, kanjiEnd);
        index = bracesEnd + 1;
        var kanjiElement = $("<span class='unlinked'>" + str.substring(kanjiStart, kanjiEnd) + "</span>");
        var furiElement = $("<span class='furigana'>" + str.substring(kanjiStart, kanjiEnd) + "</span>");
        var element = $("<li></li>");
        element.append(kanjiElement).append(furiElement);
        elements.append(element);
   }
    elements.attr("search", searchText);
    return formattedElements;
}

$(".parse-furi").each(
    function(e) {
        e = $(e);
        e.html(parseFuriUsingSquareBrackets(e.text()));
    });

$(".rtk-link").each(
    function(e) {
        e = $(e);
        var rtkLink = "http://kanji.koohi.com/study/kanji/" + e.attr("kanji");
        e.wrap("<a href='" + rtkLink + "'></a>");
    });

$(".jisho-link").each(
		function(e) {
		    e = $(e);
		    var jishoLink = "http://jisho.org/search/" + e.attr("search");
		    e.wrap("<a href='" + jishoLink + "'></a>");
		});

function cycleFont()
{
		var f = $(this);
		var prevfont = Number(f.attr("font_index")) % fontlist.length;
		var curfont = (Number(f.attr("font_index")) + 1) % fontlist.length;
		f.attr("font_index", curfont);
		f.removeClass(fontlist[prevfont]);
		f.addClass(fontlist[curfont]);
}

$(".cycle-font").each(
		function(e)
		{
				e = $(e);
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
