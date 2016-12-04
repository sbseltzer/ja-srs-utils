console.log("Including scripts")
var jqScript = document.createElement("script");
jqScript.type = "text/javascript";
jqScript.src = "jquery-3.1.1.slim.min.js";
function loadCardDependencies() {
    var cardScript = document.createElement("script");
    cardScript.type = "text/javascript";
    cardScript.src = "card.js";
    document.body.appendChild(cardScript);
    var cardStyle = document.createElement("link");
    cardStyle.rel = "stylesheet";
    cardStyle.href = "card.css";
    document.body.appendChild(cardStyle);
}
jqScript.onreadystatechange= function () {
    if (this.readyState == 'complete') loadCardDependencies();
}
jqScript.onload = loadCardDependencies;
document.body.appendChild(jqScript);
