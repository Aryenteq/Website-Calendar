let height = $('.calendar-events').height();
let width = $('.calendar-left').width();
$('.calendar-triangle').css('border-width', height + 'px ' + width / 5 + 'px 0 0');
$('.calendar-triangle').css('margin-left', width + 'px');
let leftWidth = $('.calendar-triangle').css("border-right-width");
leftWidth = parseFloat(leftWidth);
let calendarRightWidth = $('.calendar-right').width();
$('.right-up').css("width", (calendarRightWidth - leftWidth) + "px");
let keyboardHeight = $('.keyboard').height();
$('.keyboard').css('width', keyboardHeight + 'px');


//
//
//
// CERCUL PENTRU ZIUA ACTUALA 
//
//

function todaycircle() {
    let todaywidth = $('.today-parent').width() / 10 * 8;
    let todayheight = $('.today-parent').height() / 10 * 8;
    if (todayheight > todaywidth) {
        todayheight = todaywidth;
    }
    $('.today').css('width', todayheight + 'px');
    $('.today').css('height', todayheight + 'px');
}
window.addEventListener('load', function () {
    let noteHeight = $('.for-scroll').height();
    $('.submited-events-container').css('height', noteHeight + 'px');
    todaycircle();
})


$(window).resize(function () {
    let keyboardHeight = $('.keyboard').height();
    $('.keyboard').css('width', keyboardHeight + 'px');
    let height = $('.calendar-events').height();
    let width = $('.calendar-left').width();
    $('.calendar-triangle').css('border-width', height + 'px ' + width / 5 + 'px 0 0');
    $('.calendar-triangle').css('margin-left', width + 'px');
    let leftWidth = $('.calendar-triangle').css("border-right-width");
    leftWidth = parseFloat(leftWidth);
    let calendarRightWidth = $('.calendar-right').width();
    $('.right-up').css("width", (calendarRightWidth - leftWidth) + "px");
    let noteHeight = $('.for-scroll').height();
    $('.submited-events-container').css('height', noteHeight + 'px');
    todaycircle();
});



// onclick outside input, remove style

$(document).on('click', function (event) {
    if (document.querySelector('.input')) {
        document.querySelector('.input').removeAttribute('style');
        if (document.querySelector('.input input').value == '') {
            document.querySelector('.input button').removeAttribute('style');
        }
        document.querySelector('.input span').innerHTML = '+';
    }
}); // <outside input> ignore function from above
$('.input').on('click', function (event) {
    event.stopPropagation();
});


//
//
//
// POP-UP
// 
//
//
if (document.querySelector('.calendar-copyright img')) {
    document.querySelector('.calendar-copyright img').addEventListener('click', function () {
        $('.plus-date-pop-up-parent').css('margin-top', '0px');
        $('.main').css('filter', 'blur(5px)');
    });
}

// close anywhere the pop-up
$('.plus-date-pop-up-parent').on('click', function (event) {
    $('.plus-date-pop-up-parent').css('margin-top', '100vh');
    $('.main').css('filter', 'none');
    $('.pop-up-error').css('display', 'none');
});
// except on pop-up content...
$('.plus-date-pop-up').on('click', function (event) {
    event.stopPropagation();
});
// but on pop-up content X...
$('.pop-up-close').on('click', function (event) {
    $('.plus-date-pop-up-parent').css('margin-top', '100vh');
    $('.main').css('filter', 'none');
    $('.pop-up-error').css('display', 'none');
});


// 
//
// pop-up submit 
//
//
let NumarDeZileDinLuna = 0;
let ZiSelectata = 0;
let LunaSelectata = 0;
let AnSelectat = 0;
function getDaysOfMonth(month, year) {
    NumarDeZileDinLuna = new Date(year, month, 0).getDate();
}
document.querySelector('.pop-up-submit').addEventListener('click', function () {
    ZiSelectata = $("#form-select-day option").filter(":selected").val();
    LunaSelectata = $("#form-select-month option").filter(":selected").val();
    AnSelectat = $("#form-select-year option").filter(":selected").val();
    //errors
    getDaysOfMonth(LunaSelectata, AnSelectat);
    if (ZiSelectata > NumarDeZileDinLuna) {
        $('#error-1').css('display', 'flex');
        $('#error-2').css('display', 'none');
    } else if (document.querySelector('.pop-up-main textarea').value == '') {
        $('#error-1').css('display', 'none');
        $('#error-2').css('display', 'flex');
    } else {
        //if no errors...
        $('.pop-up-error').css('display', 'none');
        //create div note
        let inputValue = document.querySelector('.pop-up-main textarea').value;
        GlobalJSNote = inputValue;

        /*
        let parent = document.querySelector('.submited-events-container');
        let child = document.createElement('div');
        child.setAttribute('class', 'note');
        $(child).text(inputValue);
        parent.insertBefore(child, parent.firstChild);
        // delete div note
        let trash = document.createElement('img');
        trash.setAttribute('src', 'imagini/trash.png');
        trash.setAttribute('class', 'trash');
        child.appendChild(trash);
        //remove function
        document.querySelector('.trash').addEventListener('click', function () {
            this.parentElement.remove();
        });
        */
        //reset input value
        document.querySelector('.pop-up-main textarea').value = '';
        //remove pop-up
        $('.plus-date-pop-up-parent').css('margin-top', '100vh');
        $('.main').css('filter', 'none');
        //schimba data de sus si calendarul in sine
        PopUpSubmitRenderCalendar();

        transfernote(); // transfer input text to php for further saving into mysql
    }
});