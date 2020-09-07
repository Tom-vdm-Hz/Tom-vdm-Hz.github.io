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
        document.getElementById(toFindElId).scrollIntoView({ behavior: "smooth" });
    }
}

function calculateTotalEc() {
    var totalEc = 0;
    var children = document.getElementById('results').children;
    for (var i = 0; i < children.length; i++) {
        var tableChild = children[i];
        var ec = getEc(tableChild);
        if (typeof ec !== "undefined") {
            totalEc += ec;
        }
    }
    document.getElementById('maxEc').innerText = totalEc;
}

function calculateMyEc() {
    var list = { oop: { grades: [], ec }, fp1: { grades: [], ec }, ps2: { grades: [], ec }, ps3: { grades: [], ec }, }
    var myEc = 0;
    var children = document.getElementById('results').children;
    for (var i = 0; i < children.length; i++) {
        let tableChild = children[i];
        var currentId = tableChild.id;
        if (currentId == 'oop' || currentId == 'fp1' || currentId == 'ps2' || currentId == 'ps3') {
            var ec = getEc(tableChild);
            var grade = getGrade(tableChild);
            list[currentId].grades.push(grade)
            if (typeof ec !== "undefined") {
                list[currentId].ec = ec;
            }
        } else {
            if (getGrade(tableChild) >= 5.5) {
                var ec = getEc(tableChild);
                if (typeof ec !== "undefined") {
                    myEc += ec;
                }
            }
        }
    }
    for (var obj in list) {
        if (list.hasOwnProperty(obj)) {
            let grade = 0
            list[obj].grades.forEach(element => {
                grade += element
            });
            if (grade >= 5.5) {
                myEc += list[obj].ec;
            }
        }
    }
    document.getElementById('myEc').innerText = myEc;
}

function canGoToNextYear() {
    if (parseFloat(document.getElementById('myEc').innerText) >= parseFloat(document.getElementById('NBSA').innerText)) {
        document.getElementById('continueStudy').innerText = 'Yes'
    } else {
        document.getElementById('continueStudy').innerText = 'No'
    }
}

function getGrade(tableChild) {
    let trChildren = tableChild.children;
    for (var i = 0; i < trChildren.length; i++) {
        let tdChild = trChildren[i];
        let grade = parseFloat(tdChild.innerText);
        if (tdChild.id.match('grade')) {
            if (grade >= 5.5) {
                return grade;
            }
        }
    }
}

function getEc(tableChild) {
    var trChildren = tableChild.children;
    for (var i = 0; i < trChildren.length; i++) {
        var tdChild = trChildren[i];
        if (tdChild.id.match('ec')) {
            return parseFloat(tdChild.innerText);
        }
    }
}