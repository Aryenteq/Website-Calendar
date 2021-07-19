function signup(){
    $('.sign-up-pop-up-parent').css('margin-top', '0px');
    $('.main').css('filter', 'blur(5px)');
}

if(document.querySelector('#log-in-button')){
  document.querySelector('#log-in-button').addEventListener('click', function(){
      signup();
})};


// close anywhere the pop-up
$('.sign-up-pop-up-parent').on('click', function (event) {
    $('.sign-up-pop-up-parent').css('margin-top', '100vh');
    $('.main').css('filter', 'none');
});
// except on pop-up content...
$('.sign-up-pop-up').on('click', function (event) {
    event.stopPropagation();
});
// but on pop-up content X...
$('.sign-up-close').on('click', function (event) {
    $('.sign-up-pop-up-parent').css('margin-top', '100vh');
    $('.main').css('filter', 'none');
});



//
//
// change from sign-up form to log-in form
//
//
function changetosign(){
    document.querySelector('.login-case').style.display = 'none';
    document.querySelector('.signup-case').style.display = 'flex';
}
function changetolog(){
    document.querySelector('.login-case').style.display = 'flex';
    document.querySelector('.signup-case').style.display = 'none';
}
document.getElementById('change-to-sign-up').addEventListener('click', function(){
    changetosign();
});

document.getElementById('change-to-log-in').addEventListener('click', function(){
    changetolog();
});


//
//
// if you signed up, delete confirmation div after 5 seconds
//
//
let signClose = document.getElementById('signup-confirmation-x');

if(signClose){
    signClose.addEventListener('click', function(){
        document.getElementById('signup-removable-div').remove();
    });
}

if (window.location.href.indexOf("none") != -1){
    setTimeout(function(){
        document.getElementById('signup-removable-div').remove();
    }, 3000);
}