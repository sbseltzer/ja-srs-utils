function isInUnicodeRange(code, start, end) {
    return start <= code && code <= end;
}
function isPunctuation(text, atIndex) {
    var c = text.charCodeAt(atIndex);
    return isInUnicodeRange(c, 0x3000, 0x303f);
}
function isHiragana(text, atIndex) {
    var c = text.charCodeAt(atIndex);
    return isInUnicodeRange(c, 0x3040, 0x309f);
}
function isKatakana(text, atIndex) {
    var c = text.charCodeAt(atIndex);
    return isInUnicodeRange(c, 0x30a0, 0x30ff);
}
function isFWRomanOrHWKatakana(text, atIndex) {
    var c = text.charCodeAt(atIndex);
    return isInUnicodeRange(c, 0xff00, 0xffef);
}
function isKanji(text, atIndex) {
    var c = text.charCodeAt(atIndex);
    return isInUnicodeRange(c, 0x4e00, 0x9faf);
}

function getStartIndexOfKanjiAt(text, atIndex) {
    if  (!isKanji(text, atIndex)) {
        return -1;
    }
    while (atIndex > 0) {
        if (!isKanji(text, atIndex)) {
            return atIndex + 1;
        }
        atIndex--;
    }
    return 0;
}
function getEndIndexOfKanjiAt(text, atIndex) {
    if  (!isKanji(text, atIndex)) {
        return -1;
    }
    while (atIndex < text.length) {
        if (!isKanji(text, atIndex)) {
            return atIndex - 1;
        }
        atIndex++;
    }
    return text.length - 1;
}

function getIndexOfNextOpeningBrace(text, atIndex, braceType) {
    return text.indexOf(braceType[0], atIndex);
}
function getIndexOfNextClosingBrace(text, atIndex, braceType) {
    return text.indexOf(braceType[1], atIndex);
}

function makeRuby(partA, partB, braceType) {
    var ruby = $("<ruby></ruby>");
    ruby.append(partA);
    ruby.append("<rp>" + braceType[0] + "</rp>");
    ruby.append(partB);
    ruby.append("<rp>" + braceType[1] + "</rp>");
    return ruby;
}
function parseTextNodeWithFurigana(textNode, braceType) {
    var elements = $("<span></span>");
    var text = textNode.text();
    console.log(braceType);
    // if (text.startsWith(braceType[0])) {
    //     // Separate the first markup out to pair with the previous ruby.
    //     var start = getIndexOfNextOpeningBrace(text, 0, braceType);
    //     var end = getIndexOfNextClosingBrace(text, start + 1, braceType);
    //     var furi = text.substring(start + 1, end);
    //     var ruby = makeRuby(textNode.prev(), furi);
    //     text.text(text.substring(end + 1));
    //     elements.append(ruby);
    //     elements.append(text);
    // }
    // text = text.text();
    var index = 0;
    var endIndex = text.length;
    while (index < endIndex) {
        var bracesStart = getIndexOfNextOpeningBrace(text, index, braceType);
        console.log("index:", index, "bracesStart:", bracesStart);
        if (bracesStart == -1) {
            var remainder = text.substring(index);
            elements.append(remainder);
            break;
        }
        var bracesEnd = getIndexOfNextClosingBrace(text, bracesStart, braceType);
        var kanjiStart = bracesStart - 1;
        var kanjiEnd = bracesStart;
        console.log("bracesEnd:", bracesEnd, "kanjiStart:", kanjiStart, "kanjiEnd:", kanjiEnd);
        index = bracesEnd + 1;
        elements.append(makeRuby(text.substring(kanjiStart, kanjiEnd), text.substring(bracesStart + 1, bracesEnd), braceType));
    }
    textNode.replaceWith(elements);
    return elements;
}

function parseFuriganaMarkup(container) {
    container.find("*").each(function() {
        var e = $(this);
        var braceType = container.attr("brace-type");
        braceType = (braceType != undefined) ? braceType : "()";
        console.log(braceType);
        if (e.nodeType == 3) {
            // Text nodes
        var elements = parseTextNodeWithFurigana(e, braceType);
            e.html(elements);
        }
    });
}

// function parseTextWithFuri(container) {
//     var text = container.text();
//     braceType = container.attr("brace-type");
//     braceType = (braceType != undefined) ? braceType : "()";
//     console.log(text);
//     container.html("");
//     var elements = container;
//     var searchText = "";
//     var index = 0;
//     var endIndex = text.length;
//     while (index < endIndex) {
//         var bracesStart = getIndexOfNextOpeningBrace(text, index, braceType);
//         console.log("index:", index, "bracesStart:", bracesStart);
//         if (bracesStart == -1) {
//             var remainder = text.substring(index);
//             elements.append(remainder);
//             searchText += remainder;
//             break;
//         }

        // var bracesEnd = getIndexOfNextClosingBrace(text, bracesStart, braceType);
        // var kanjiStart = getStartIndexOfKanjiAt(text, bracesStart - 1);
        // var kanjiEnd = bracesStart;
        // console.log("bracesEnd:", bracesEnd, "kanjiStart:", kanjiStart, "kanjiEnd:", kanjiEnd);
        // index = bracesEnd + 1;

//         var kanjiElement = $("<rb>" + text.substring(kanjiStart, kanjiEnd) + "</rb>");
//         searchText += kanjiElement.text();
//         var furiElement = $("<rt>" + text.substring(bracesStart + 1, bracesEnd) + "</rt>");
//         var ruby = $("<ruby></ruby>");
//         ruby.append(kanjiElement);
//         ruby.append("<rp>(</rp>");
//         ruby.append(furiElement);
//         ruby.append("<rp>)</rp>");
//         elements.append(ruby);
//     }
//     return searchText;
// }

$("[use-furigana]").each(
    function() {
        var e = $(this);
        console.log(e.text());
        parseFuriganaMarkup(e);
        // var searchText = parseTextWithFuri(e);
        // e.attr("search", searchText);
        e.attr("search", e.text());
    });

function cycleFont(e, fontlist)
{
		var curfont = (Number(e.attr("font_index")) + 1) % fontlist.length;
		e.attr("font_index", curfont);
		e.css("font-family",fontlist[curfont]);
}

$("[use-fonts]").each(
		function()
		{
				var e = $(this);
				var fontlist = e.attr("use-fonts");
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

$("[rtk-link]").each(
    function() {
        var e = $(this);
        var searchText = e.attr("search");
        searchText = (searchText != undefined) ? searchText : e.text();
        var rtkLink = "http://kanji.koohii.com/study/kanji/" + searchText;
        e.wrap("<a href='" + rtkLink + "' class='rtk-link'></a>");
    });

$("[jisho-link]").each(
		function() {
		    var e = $(this);
	      var searchText = e.attr("search");
        searchText = (searchText != undefined) ? searchText : e.text();
	      var jishoLink = "http://jisho.org/search/" + searchText;
		    e.wrapInner("<a href='" + jishoLink + "' class='jisho-link'></a>");
		});

