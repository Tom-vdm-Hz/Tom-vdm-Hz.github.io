$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})

function scrollToId(toFindElId) {
    // var msg = new SpeechSynthesisUtterance();
    // msg.text = "'t Waepen van Veere is een hotel/restaurant in Veere en is momenteel mijn huidige werk, ik begon hier in 2017 als afwasser en doe tegenwoordig kun je mij ook vinden achter de bar.";
    // window.speechSynthesis.speak(msg);
    document.getElementById(toFindElId).scrollIntoView({ behavior: "smooth" });
}

function scrollToIdDiffrentPage(page, toFindElId) {
    if (!window.location.href.match(page)) {
        window.location.replace(page + '#' + toFindElId)
    } else {

    }
}