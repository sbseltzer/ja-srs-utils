console.log("Including scripts")
var jqScript = document.createElement("script");
jqScript.type = "text/javascript";
jqScript.src = "JQUERY";
function loadCardDependencies() {
    var cardScript = document.createElement("script");
    cardScript.type = "text/javascript";
    cardScript.src = "CARD_JS";
    document.body.appendChild(cardScript);
    var cardStyle = document.createElement("link");
    cardStyle.rel = "stylesheet";
    cardStyle.href = "CARD_CSS";
    document.body.appendChild(cardStyle);
}
jqScript.onreadystatechange= function () {
    if (this.readyState == 'complete') loadCardDependencies();
}
jqScript.onload = loadCardDependencies;
document.body.appendChild(jqScript);
