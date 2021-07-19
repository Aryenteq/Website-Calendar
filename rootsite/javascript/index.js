document.getElementById('extend-header').addEventListener('click', function () {
    let x = document.getElementById('header');
    let y = document.getElementById('extend-header');
    if (x.style.padding != '0px') {
        x.style.height = '0px';
        x.style.width = '0px';
        x.style.padding = '0';
        x.style.borderBottom = 'none';
        y.style.transform = 'rotate(180deg)';
        document.getElementById('help-for-hover').style.height = '10vh';
    } else {
        x.removeAttribute('style');
        document.getElementById('help-for-hover').removeAttribute('style');
        y.style.transform = 'rotate(0deg)';
    }
});

/* calendar */

let globalSelectedDate = ["", "", ""];
let oldDateInCaseOfError;

const date = new Date();
let contorZile = 0;
const months = [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie",
];
let SelectedMonthForSecondFunction = date.getMonth();
let SelectedYearForSecondFunction = date.getFullYear();
const renderCalendar = () => {
    date.setDate(1);
    contorZile = 0;
    const monthDays = document.querySelector('.days');

    // getmonth(), 1 - prima zi din luna // getmonth(), 0 - ultima zi din luna anterioara, // getmonth()+1, 0 - ultima
    // zi din luna curenta // .getDate() sa iau doar ziua, nu tot string-u
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    let firstDayIndex = date.getDay() - 1;
    if (firstDayIndex == -1) {
        firstDayIndex = 6;
    }
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;


    document.querySelector('.month').innerHTML = months[date.getMonth()];
    document.querySelector('.year').innerHTML = date.getFullYear();
    //console.log('\n');
    // console.log("globalselecteddate = " + "zi " + globalSelectedDate[0] + ", luna " + globalSelectedDate[1] + ", an " + globalSelectedDate[2]);
    let days = "";
    //punem selected-date in zile

    if (date.getFullYear() == globalSelectedDate[2]) {
        // LUNA TRECUTA
        let intermediarSelectedDate = date.getMonth() - 1; // luna trecuta index
        if (intermediarSelectedDate - 1 == -2) intermediarSelectedDate = 11;
        //console.log("calendar afisat: luna " + intermediarSelectedDate + ", an: " + date.getFullYear());
        if (intermediarSelectedDate == globalSelectedDate[1]) {
            for (let x = firstDayIndex; x > 0; x--) {
                if ((prevLastDay - x + 1) == globalSelectedDate[0])
                    days += '<div class="prev-date" id="selected-date">' + (prevLastDay - x + 1) + '</div>';
                else
                    days += '<div class="prev-date">' + (prevLastDay - x + 1) + '</div>';
                contorZile++;
            }
        } else {
            for (let x = firstDayIndex; x > 0; x--) {
                days += '<div class="prev-date">' + (prevLastDay - x + 1) + '</div>';
                contorZile++;
            }
        }
        // LUNA CURENTA
        if (date.getMonth() == globalSelectedDate[1]) {
            for (let i = 1; i <= lastDay; i++) {
                if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear() && i == globalSelectedDate[0])
                    days += `<div class="current-month-days today-parent" id="selected-date">
                <div class="today">` + i + `</div></div>`;
                else if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear())
                    days += `<div class="current-month-days today-parent">
                <div class="today">` + i + `</div></div>`;
                else if (i == globalSelectedDate[0])
                    days += `<div class="current-month-days" id="selected-date">` + i + `</div>`;
                else
                    days += `<div class="current-month-days">` + i + `</div>`;
                contorZile++;
            }
        } else {
            for (let i = 1; i <= lastDay; i++) {
                if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear())
                    days += `<div class="current-month-days today-parent">
                <div class="today">` + i + `</div></div>`;
                else
                    days += `<div class="current-month-days">` + i + `</div>`;
                contorZile++;
            }
        }
        // LUNA URMATOARE
        intermediarSelectedDate = date.getMonth() + 1; // urm luna index
        if (intermediarSelectedDate + 1 == 13) intermediarSelectedDate = 0;
        //console.log("calendar urm luna: luna " + intermediarSelectedDate + ", an: " + date.getFullYear());
        if (intermediarSelectedDate == globalSelectedDate[1] && intermediarSelectedDate != 0) { // elimia && intermediarSelectedDate!=0 daca e bug, dar recreezi alt bug
            for (let j = 1; j <= nextDays + 1; j++) {
                if (j == globalSelectedDate[0])
                    days += '<div class="next-date" id="selected-date">' + j + '</div>';
                else
                    days += '<div class="next-date">' + j + '</div>';
                monthDays.innerHTML = days;
                contorZile++;
            }
        } else {
            for (let j = 1; j <= nextDays + 1; j++) {
                days += `<div class="next-date">${j}</div>`;
                monthDays.innerHTML = days;
                contorZile++;
            }
        }
    }
    /////
    else if (date.getFullYear() - 1 == globalSelectedDate[2]) { // daca selectez zi anterioara din ianuarie (gen o zi din decembrie anul trecut)
        if (globalSelectedDate[1] == 11 && date.getMonth() == 0) { // doar aici e modificat, pt zilele curente + cele viitoare e normal
            for (let x = firstDayIndex; x > 0; x--) {
                if ((prevLastDay - x + 1) == globalSelectedDate[0])
                    days += '<div class="prev-date" id="selected-date">' + (prevLastDay - x + 1) + '</div>';
                else
                    days += '<div class="prev-date">' + (prevLastDay - x + 1) + '</div>';
                contorZile++;
            }
        } else {
            for (let x = firstDayIndex; x > 0; x--) {
                days += '<div class="prev-date">' + (prevLastDay - x + 1) + '</div>';
                contorZile++;
            }
        }
        for (let i = 1; i <= lastDay; i++) {
            if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear())
                days += `<div class="current-month-days today-parent">
            <div class="today">` + i + `</div></div>`;
            else
                days += `<div class="current-month-days">` + i + `</div>`;
            contorZile++;
        }
        for (let j = 1; j <= nextDays + 1; j++) {
            days += `<div class="next-date">${j}</div>`;
            monthDays.innerHTML = days;
            contorZile++;
        }
        //////
    } else if (date.getFullYear() + 1 == globalSelectedDate[2]) { // daca selectez zi viitoare din decembrie (gen o zi din ianuarie anul viitor)
        for (let x = firstDayIndex; x > 0; x--) {
            days += '<div class="prev-date">' + (prevLastDay - x + 1) + '</div>';
            contorZile++;
        }
        for (let i = 1; i <= lastDay; i++) {
            if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear())
                days += `<div class="current-month-days today-parent">
            <div class="today">` + i + `</div></div>`;
            else
                days += `<div class="current-month-days">` + i + `</div>`;
            contorZile++;
        }
        if (globalSelectedDate[1] == 0 && date.getMonth() == 11) {   // doar aici e modificat fata de normal
            for (let j = 1; j <= nextDays + 1; j++) {
                if (j == globalSelectedDate[0])
                    days += `<div class="next-date" id="selected-date">${j}</div>`;
                else days += `<div class="next-date">${j}</div>`;
                monthDays.innerHTML = days;
                contorZile++;
            }
        } else {
            for (let j = 1; j <= nextDays + 1; j++) {
                days += `<div class="next-date">${j}</div>`;
                monthDays.innerHTML = days;
                contorZile++;
            }
        }
    }
    // NORMAL
    else {
        for (let x = firstDayIndex; x > 0; x--) {
            days += '<div class="prev-date">' + (prevLastDay - x + 1) + '</div>';
            contorZile++;
        }
        for (let i = 1; i <= lastDay; i++) {
            if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear())
                days += `<div class="current-month-days today-parent">
            <div class="today">` + i + `</div></div>`;
            else
                days += `<div class="current-month-days">` + i + `</div>`;
            contorZile++;
            //pune inapoi acoladele si contorZile in primu if daca nu merge
        }
        for (let j = 1; j <= nextDays + 1; j++) {
            days += `<div class="next-date">${j}</div>`;
            monthDays.innerHTML = days;
            contorZile++;
        }
    }

    if (contorZile == 35) {
        var nodes = document.querySelector('.days').getElementsByTagName("div");
        for (let z = 0; z < nodes.length; z++) {
            nodes[z].style.height = '20%';
        }
    }
    //limite calendar
    if (date.getMonth() === 0 && date.getFullYear() === 1900) {
        document.querySelector('.left').style.display = 'none';
        var AddElementForProperAlign = document.createElement("div");
        var textnode = document.createTextNode("<");
        AddElementForProperAlign.appendChild(textnode);
        var parent = document.querySelector('.calendar-arrows');
        parent.insertBefore(AddElementForProperAlign, parent.childNodes[0]);
        document.querySelector('.calendar-arrows div').style.opacity = '0';
    }
    if (date.getMonth() === 11 && date.getFullYear() === 2100) {
        document.querySelector('.right').style.display = 'none';
    }

}




document.querySelector('.left').addEventListener('click', () => {
    if (document.querySelector('.right').style.display == 'none') {
        document.querySelector('.right').style.display = 'block';
    }
    date.setMonth(date.getMonth() - 1);
    SelectedMonthForSecondFunction = date.getMonth();
    SelectedYearForSecondFunction = date.getFullYear();
    renderCalendar();
    SelectNewDateOnClick();
    if (SelectedMonthForSecondFunction == new Date().getMonth() && SelectedYearForSecondFunction == new Date().getFullYear()) {
        todaycircle();
    }
});

document.querySelector('.right').addEventListener('click', () => {
    if (document.querySelector('.left').style.display == 'none') {
        document.querySelector('.left').style.display = 'block';
        document.querySelector('.calendar-arrows').removeChild(document.querySelector('.calendar-arrows').childNodes[0]);
    }
    date.setMonth(date.getMonth() + 1);
    SelectedMonthForSecondFunction = date.getMonth();
    SelectedYearForSecondFunction = date.getFullYear();
    renderCalendar();
    SelectNewDateOnClick();
    if (SelectedMonthForSecondFunction == new Date().getMonth() && SelectedYearForSecondFunction == new Date().getFullYear()) {
        todaycircle();
    }
});

renderCalendar();
SelectNewDateOnClick();



/* SELECT DAYS */

const DaysOfTheWeek = [
    "Duminică",
    "Luni",
    "Marți",
    "Miercuri",
    "Joi",
    "Vineri",
    "Sâmbătă",
];

// data din stanga sus (initial)
document.querySelector('.note-selected-date').innerHTML = DaysOfTheWeek[new Date().getDay()] + ', ' + new Date().getDate() + " " + months[new Date().getMonth()] + ' ' + new Date().getFullYear();
//eroare de la input keyboard
oldDateInCaseOfError = DaysOfTheWeek[new Date().getDay()] + ', ' + new Date().getDate() + " " + months[new Date().getMonth()] + ' ' + new Date().getFullYear();
//selected today (first time) auto-select
document.querySelector('.today').parentNode.setAttribute('id', 'selected-date');
//global date (first time)
globalSelectedDate[0] = new Date().getDate();
globalSelectedDate[1] = new Date().getMonth();
globalSelectedDate[2] = new Date().getFullYear();

function SelectNewDateOnClick() {
    PrevDays();
    CurrentDays();
    NextDays();

}

function PrevDays() {
    var items = document.querySelectorAll('.prev-date');

    [].forEach.call(items, function (item) {
        var ziSelectata = item.textContent;
        item.addEventListener('click', function () {
            if (document.getElementById('selected-date') != null) {
                document.getElementById('selected-date').removeAttribute('id');
            }
            $(this)[0].setAttribute('id', 'selected-date');
            let CreareData = new Date();
            CreareData.setFullYear(SelectedYearForSecondFunction);
            CreareData.setMonth(SelectedMonthForSecondFunction - 1); // luna anterioara (nu e vorba de index)
            CreareData.setDate(ziSelectata);
            globalSelectedDate[0] = parseInt(ziSelectata);
            //daca selectezi decembrie de anul trecut gen, pui anul trecut, daca nu n-ai treaba // functia e ptr zilele lunii anterioare gen
            if (CreareData.getMonth() == 11) {
                oldDateInCaseOfError = DaysOfTheWeek[CreareData.getDay()] + ', ' + ziSelectata + " " + months[CreareData.getMonth()] + ' ' + parseInt(SelectedYearForSecondFunction - 1);
                document.querySelector('.note-selected-date').innerHTML = oldDateInCaseOfError;
                globalSelectedDate[1] = 11;
                globalSelectedDate[2] = parseInt(SelectedYearForSecondFunction - 1);

                updatePHP(); // AJAX - new date update
            }

            else {
                oldDateInCaseOfError = DaysOfTheWeek[CreareData.getDay()] + ', ' + ziSelectata + " " + months[CreareData.getMonth()] + ' ' + SelectedYearForSecondFunction;
                document.querySelector('.note-selected-date').innerHTML = oldDateInCaseOfError;
                globalSelectedDate[1] = SelectedMonthForSecondFunction - 1;
                globalSelectedDate[2] = SelectedYearForSecondFunction;

                updatePHP(); // AJAX - new date update
            }

        });
    });
}

function CurrentDays() {
    var items = document.querySelectorAll('.current-month-days');

    [].forEach.call(items, function (item) {
        var ziSelectata = item.textContent;
        item.addEventListener('click', function () {
            if (document.getElementById('selected-date') != null) {
                document.getElementById('selected-date').removeAttribute('id');
            }
            $(this)[0].setAttribute('id', 'selected-date');
            let CreareData = new Date();
            CreareData.setFullYear(SelectedYearForSecondFunction);
            CreareData.setMonth(SelectedMonthForSecondFunction);
            CreareData.setDate(ziSelectata);
            globalSelectedDate[0] = parseInt(ziSelectata);
            globalSelectedDate[1] = SelectedMonthForSecondFunction;
            globalSelectedDate[2] = SelectedYearForSecondFunction;
            oldDateInCaseOfError = DaysOfTheWeek[CreareData.getDay()] + ', ' + ziSelectata + " " + months[CreareData.getMonth()] + ' ' + SelectedYearForSecondFunction;
            document.querySelector('.note-selected-date').innerHTML = oldDateInCaseOfError;

            updatePHP(); // AJAX - new date update
        });
    });
}


function NextDays() {
    var items = document.querySelectorAll('.next-date');

    [].forEach.call(items, function (item) {
        var ziSelectata = item.textContent;
        item.addEventListener('click', function () {
            if (document.getElementById('selected-date') != null) {
                document.getElementById('selected-date').removeAttribute('id');
            }
            $(this)[0].setAttribute('id', 'selected-date');
            let CreareData = new Date();
            CreareData.setFullYear(SelectedYearForSecondFunction);
            CreareData.setMonth(SelectedMonthForSecondFunction + 1); // luna urmatoare, nu e vorba de index
            CreareData.setDate(ziSelectata);
            globalSelectedDate[0] = parseInt(ziSelectata);
            //daca selectezi ianuarie de anul viitor gen, pui anul viitor, daca nu n-ai treaba // functia e ptr zilele lunii viitoare gen
            if (CreareData.getMonth() == 0) {
                oldDateInCaseOfError = DaysOfTheWeek[CreareData.getDay()] + ', ' + ziSelectata + " " + months[CreareData.getMonth()] + ' ' + parseInt(SelectedYearForSecondFunction + 1);
                document.querySelector('.note-selected-date').innerHTML = oldDateInCaseOfError;
                globalSelectedDate[1] = 0;
                globalSelectedDate[2] = parseInt(SelectedYearForSecondFunction + 1);

                updatePHP(); // AJAX - new date update
            }

            else {
                oldDateInCaseOfError = DaysOfTheWeek[CreareData.getDay()] + ', ' + ziSelectata + " " + months[CreareData.getMonth()] + ' ' + SelectedYearForSecondFunction;
                document.querySelector('.note-selected-date').innerHTML = oldDateInCaseOfError;
                globalSelectedDate[1] = SelectedMonthForSecondFunction + 1;
                globalSelectedDate[2] = SelectedYearForSecondFunction;

                updatePHP(); // AJAX - new date update
            }

        });
    });
}














//
//
//
//
//
//
// INPUT (normal, not on pop-up)
//
//
//
//
//

if (document.querySelector('.input')) {
    document.querySelector('.input').addEventListener('click', function () {
        document.querySelector('.input').style.borderBottom = '1px solid #4cbf37';
        document.querySelector('.input').style.boxShadow = '0px 9px 10px -8px #000000';
        document.querySelector('.input span').innerHTML = '○';
    });

    // cand scrii, sa apara butonul de "adauga"
    document.querySelector('.input input').addEventListener('input', function () {
        document.querySelector('.input button').style.display = 'block';
    });
}

// functia in sine de a adauga div

let GlobalJSNote = '';
function submitInput() {
    //create div
    let inputValue = document.querySelector('.input input').value;
    GlobalJSNote = inputValue;


    /*
    let parent = document.querySelector('.submited-events-container');
    let child = document.createElement('div');
    child.setAttribute('class', 'note');
    child.innerHTML = inputValue;
    // $(child).text(inputValue);
    parent.insertBefore(child, parent.firstChild);*/
    document.querySelector('.input input').value = '';/*
    // delete div
    let trash = document.createElement('img');
    trash.setAttribute('src', 'imagini/trash.png');
    trash.setAttribute('class', 'trash');
    child.appendChild(trash);
    //remove function
    document.querySelector('.trash').addEventListener('click', function () {
        this.parentElement.remove();
        //nu stiu id sa pot sterge
    });*/
    //document.querySelector('.input').removeAttribute('style');

    //remove style from input
    document.querySelector('.input button').removeAttribute('style');

    transfernote(); // transfer input text to php for further saving into mysql

}

let trashId = '';

function refreshtrash() {
    if (document.querySelectorAll('trash')) {
        document.querySelectorAll('.trash').forEach(item => {
            item.addEventListener('click', function (e) {
                trashId = $(this).attr("id");
                this.parentElement.remove();
                console.log(trashId);
                deletePHPComment();
            })
        });
    }
}
$(document).ready(refreshtrash());

// apelatoarele functiei 
if (document.getElementById('input-button')) {
    document.getElementById('input-button').addEventListener('click', function () {
        submitInput();
    });
}

if (document.querySelector('.input input')) {
    document.querySelector('.input input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && document.querySelector('.input input').value != '') {
            submitInput();
        }
    });
}


//
//
//
// OBSERVER IN CAZ DE SCHIMBARE TRASH (what the heck is this code?)
//
//
//

const targetNode = document.querySelector(".submited-events-container");
const observerOptions = {
  childList: true,
  attributes: true,
  subtree: true
}

const observer = new MutationObserver(callback);
observer.observe(targetNode, observerOptions);

function callback(mutationList, observer) {
    mutationList.forEach( (mutation) => {
      switch(mutation.type) {
        case 'childList':
            refreshtrash();
          break;
        case 'attributes':
            refreshtrash();
          break;
      }
    });
  }








//
//
//
// CREARE SELECT -> OPTIUNI LA POP-UP (ca sa nu fie facute in html, ci dinamic)
//
//
//
var newOption;
var optionDate = new Date();
var optionYear = date.getFullYear();
let optionsYear = document.getElementById('form-select-year');
for (i = 1900; i <= 2100; i++) {
    newOption = document.createElement('option');
    newOption.value = i;
    newOption.label = i;
    if (i === optionYear) newOption.selected = true;
    optionsYear.appendChild(newOption);
}


// render calendar

function PopUpSubmitRenderCalendar() {
    date.setFullYear(AnSelectat);
    date.setMonth(LunaSelectata - 1);
    date.setDate(ZiSelectata);
    SelectedMonthForSecondFunction = date.getMonth();
    SelectedYearForSecondFunction = date.getFullYear();
    renderCalendar();
    SelectNewDateOnClick();
    // ContorForId = 0; ???? de ce trebuie asta? REZOLVAT NU MAI TREBUIE <3 <3 <3
    if (SelectedMonthForSecondFunction == new Date().getMonth() && SelectedYearForSecondFunction == new Date().getFullYear()) {
        todaycircle();
    }
    if (document.getElementById('selected-date') != null) {
        document.getElementById('selected-date').removeAttribute('id');
    }
    document.getElementsByClassName('current-month-days')[ZiSelectata - 1].setAttribute('id', 'selected-date');
    let CreareData = new Date();
    CreareData.setFullYear(AnSelectat);
    CreareData.setMonth(LunaSelectata - 1);
    CreareData.setDate(ZiSelectata);
    globalSelectedDate[0] = parseInt(ZiSelectata);
    globalSelectedDate[1] = SelectedMonthForSecondFunction;
    globalSelectedDate[2] = parseInt(AnSelectat);
    /*eroare pt input keyboard*/
    oldDateInCaseOfError = DaysOfTheWeek[CreareData.getDay()] + ', ' + ZiSelectata + " " + months[CreareData.getMonth()] + ' ' + AnSelectat;
    document.querySelector('.note-selected-date').innerHTML = oldDateInCaseOfError;

    updatePHP(); // AJAX - new date update
}






//
//
//
//
// /*
//  INTRODUCEREA DATEI CU APASAREA TASTELOR
// */
//
//
//
//



let KeyboardOk = 1;
document.querySelector('.keyboard').addEventListener('click', function () {
    if (KeyboardOk == 1) {
        KeyboardOk = 0;
        document.querySelector('.keyboard').style.backgroundColor = 'red';
    }
    else {
        KeyboardOk = 1;
        document.querySelector('.keyboard').style.backgroundColor = 'limegreen';
    }
});



let contorDiv = 1;





document.addEventListener('keydown', function (e) {
    if (KeyboardOk == 1) {
        var key = e.which || e.keyCode;
        var CheckIfFirstKeyWasPressed = document.getElementById('note-selected-date-1');
        if (CheckIfFirstKeyWasPressed) { // daca s-a efectuat functia deja o data
            if (numeric(key) == true) {

                let tastaapasata = parseInt(String.fromCharCode((96 <= key && key <= 105) ? key - 48 : key));
                let valoareveche = parseInt(document.getElementById('note-selected-date-' + contorDiv).textContent);
                let valoarenoua = valoareveche * 10 + tastaapasata;


                if (contorDiv == 3) { //an
                    if ((valoareveche == 0 && (tastaapasata == 1 || tastaapasata == 2)) || // start
                        (valoareveche == 1 && tastaapasata == 9) || // 1900-1999
                        (valoareveche == 2 && (tastaapasata == 0 || tastaapasata == 1)) || // 2000-2100
                        valoareveche == 19 || valoareveche == 20 || //1900-2099
                        (valoareveche == 21 && tastaapasata == 0) || // 2100
                        (valoareveche >= 190 && valoareveche <= 209) || // 1900-2099
                        (valoareveche == 210 && tastaapasata == 0)) // 2100
                        document.querySelector('#note-selected-date-' + contorDiv).innerHTML = valoarenoua;
                } else if (contorDiv == 2) { // luna
                    if ((valoareveche == 0) || // 1-9
                        (valoareveche == 1 && tastaapasata <= 2)) // 10-12
                        document.querySelector('#note-selected-date-' + contorDiv).innerHTML = valoarenoua;
                } else { // zi
                    if ((valoareveche >= 0 && valoareveche < 3) || // 0-31
                        (valoareveche == 3 && tastaapasata <= 1)) // 30-31
                        document.querySelector('#note-selected-date-' + contorDiv).innerHTML = valoarenoua;
                }

                //daca am luna terminata, next
                if (contorDiv == 2 && valoarenoua > 1)
                    contorDiv = 3;
                //daca am ziua terminata, next
                if (contorDiv == 1 && valoarenoua > 9)
                    contorDiv = 2;
                BackgroundDate(contorDiv);

                /* new */
                /* daca apesi 3 la zi, apoi orice tasta >=2, sa o treaca la luna*/
                if (contorDiv == 2 && document.querySelector('#note-selected-date-1').innerHTML == 3 && tastaapasata > 1) {
                    document.querySelector('#note-selected-date-2').innerHTML = tastaapasata;
                    contorDiv++;
                    BackgroundDate(contorDiv);
                }

                let zi = document.getElementById('note-selected-date-1').textContent;
                let luna = document.getElementById('note-selected-date-2').textContent;
                let an = document.getElementById('note-selected-date-3').textContent;
                if (zi > 0 && luna > 0 && an > 1899 && an <= 2100) {
                    //daca am terminat de introdus data
                    // nu mai fac functie separata ca-s valori locale, ayaye, nici nu stau sa le fac globale
                    getDaysOfMonth(luna, an); // jquery line 105
                    if (zi > NumarDeZileDinLuna) { //data invalida
                        document.querySelector('.note-selected-date').innerHTML = oldDateInCaseOfError;
                        document.getElementById('error-keyboard-input').style.display = 'block';
                        setTimeout(function () {
                            document.getElementById('error-keyboard-input').style.display = 'none';
                        }, 3000);
                        //resetare valori
                        CheckIfFirstKeyWasPressed = 1;
                        contorDiv = 1;
                        ////
                    } else {
                        date.setFullYear(an);
                        date.setMonth(luna - 1);
                        date.setDate(zi);
                        SelectedMonthForSecondFunction = date.getMonth();
                        SelectedYearForSecondFunction = date.getFullYear();
                        renderCalendar();
                        SelectNewDateOnClick();
                        if (SelectedMonthForSecondFunction == new Date().getMonth() && SelectedYearForSecondFunction == new Date().getFullYear()) {
                            todaycircle();
                        }
                        if (document.getElementById('selected-date') != null) {
                            document.getElementById('selected-date').removeAttribute('id');
                        }
                        document.getElementsByClassName('current-month-days')[zi - 1].setAttribute('id', 'selected-date');
                        let CreareData = new Date();
                        CreareData.setFullYear(an);
                        CreareData.setMonth(luna - 1);
                        CreareData.setDate(zi);
                        globalSelectedDate[0] = parseInt(zi);
                        globalSelectedDate[1] = luna - 1; /*for index reasons */
                        globalSelectedDate[2] = parseInt(an);
                        /*error input*/
                        oldDateInCaseOfError = DaysOfTheWeek[CreareData.getDay()] + ', ' + zi + " " + months[CreareData.getMonth()] + ' ' + an;
                        document.querySelector('.note-selected-date').innerHTML = oldDateInCaseOfError;
                        //resetare valori
                        CheckIfFirstKeyWasPressed = 1;
                        contorDiv = 1;
                        ////
                        updatePHP(); // AJAX - new date update
                    }


                }
            }
        } else if (numeric(key) == true) {
            let primaValoare = parseInt(String.fromCharCode((96 <= key && key <= 105) ? key - 48 : key));
            document.querySelector('.note-selected-date').innerHTML = `
        <div class="note-selected-date-child flex">
            <div id="note-selected-date-1">` + primaValoare + `</div> 
            <div class="slash">/</div>
            <div id="note-selected-date-2"> 00 </div>
            <div class="slash">/</div>
            <div id="note-selected-date-3"> 0000 </div>
        </div>`
            if (primaValoare > 3)
                contorDiv = 2;
            BackgroundDate(contorDiv);
        }
        if (key == 37 && document.querySelector('.note-selected-date-child') != null) {
            if (contorDiv == 1)
                contorDiv = 3;
            else
                contorDiv--;
            BackgroundDate(contorDiv);
        }
        if (key == 39 && document.querySelector('.note-selected-date-child') != null) {
            if (contorDiv == 3)
                contorDiv = 1;
            else
                contorDiv++;
            BackgroundDate(contorDiv);
        }
        if (key == 8 && document.querySelector('.note-selected-date-child') != null) {
            let valoareveche = parseInt(document.getElementById('note-selected-date-' + contorDiv).textContent);
            if (valoareveche == 0) {
                if (contorDiv == 1)
                    contorDiv = 3;
                else
                    contorDiv--;
                valoareveche = parseInt(document.getElementById('note-selected-date-' + contorDiv).textContent);
                BackgroundDate(contorDiv);
            }
            let valoarenoua = Math.floor(valoareveche / 10);
            document.querySelector('#note-selected-date-' + contorDiv).innerHTML = valoarenoua;
        }
    }
});
//sa nu se activeze functia on input si textarea
for (let inp = 0; inp < document.querySelectorAll('input').length; inp++) {
    document.querySelectorAll('input')[inp].addEventListener('keydown', function (event) {
        event.stopPropagation();
    });
}
document.querySelector('textarea').addEventListener('keydown', function (event) {
    event.stopPropagation();
});


function numeric(tasta) {
    if ((tasta >= 48 && tasta <= 57) || (tasta >= 96 && tasta <= 105))
        return true;
    return false;
}

function BackgroundDate(id) {
    document.getElementById('note-selected-date-1').style.backgroundColor = '';
    document.getElementById('note-selected-date-2').style.backgroundColor = '';
    document.getElementById('note-selected-date-3').style.backgroundColor = '';
    document.getElementById('note-selected-date-' + id).style.backgroundColor = 'rgba(233, 245, 66, .5)';
}