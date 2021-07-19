/*console.log(globalSelectedDate);
$.ajax({
    url:"../selecteddate.php",
    method:"post",
    data: JSON.stringify(globalSelectedDate),
    success: function(res){
        console.log(res);
    }
})*/

/*
globalSelectedDate.join(',');
$.post('../selecteddate.php', {elements: globalSelectedDate})*/

/*
$.ajax({
    url: '../selecteddate.php',
    type: 'post', // post or get method
    data: {}, // if you need to pass post/get parameterds you can encode them here in JSON format
    dataType: 'json', // the data type you want returned... we will use json
    success: function(responseData) {
      var edge_number = responseData.edge_number;
      var vertex_a= responseData.vertex_a;
      var rec_array = responseData;
    }
  });*/


//  JSON.stringify(globalSelectedDate);
/*
function upload(){
    var jsonString = JSON.stringify(globalSelectedDate);
         /*$.ajax({
            type: "POST",
            url: "upload.php",
            data: {'data' : jsonString}, 
            cache: false,

            success: function(){
                alert("OK");

            }
        });*/
 /*   var jsonData = $.ajax({
              url: "../selecteddate.php",
              data: { 'data' : jsonString},
              dataType:"json", 
                  async: false
              }).responseText;
    }

    //upload();

    function upload2(){
        $.ajax({
            async: true,   // this will solve the problem
            type: "POST",
            url: "../selecteddate.php",
            contentType: "application/json",
            data: JSON.stringify({ ParameterName: globalSelectedDate }),
         });
    }

    upload2();


    $.ajax({
        type: "POST",
        url: "../selecteddate.php", 
        data: { vArray: globalSelectedDate },  // here
        success: function(msg){
          $("#result").html(msg);
        }
      });
*/

/*$(document).ready(function () {
    $("#butontest").click(function () {
        $.get("javascript/text.txt", function (data, status) {
            $("#divrandom").html(data);
            alert(status);
        });
    });
});*/
/*

$(document).ready(function () {
    $("#butontest").click(function () {
        var testing = JSON.stringify(globalSelectedDate);
        $.post("selecteddate.php", {
            transferedDate: testing // transferedDate = name used in $_POST['...']
        }, function(data, status){ // optional
            $("#divrandom").html(data);
            echo(data);
            alert(status);
        });
    });
});

*/
/*
function updatePHP(){
    var phpDate = { };
phpDate.day = globalSelectedDate[0];
phpDate.month = globalSelectedDate[1];
phpDate.year = globalSelectedDate[2];

$.ajax({
    url: "selecteddate.php",
    method: "post",
    data: phpDate,
    success: function(res) {
        console.log(res);
    }
})
};
*/


function updatePHP(){
$(".submited-events-container").load("includes/shownotes.inc.php", {
    AJAXShowNotes: globalSelectedDate
});
}
$(document).ready(updatePHP());

function transfernote(){
   $(".submited-events-container").load("includes/submitednote.inc.php", { // moved into includes  - .load("submitednote.php",
        AJAXNoteTransfer: GlobalJSNote,
        AJAXDateTransfer: globalSelectedDate
    });
}

function deletePHPComment(){
    $(".submited-events-container").load("includes/deletenote.inc.php", {
        AJAXCommentIdDelete: trashId,
        AJAXDateTransferDelete: globalSelectedDate
    });
}

/*
$('#input').on("click", function () {
    $.ajax({
        type: "POST",
        url: "submited-notes.inc.php",
        data: { submitedNote: GlobalJSNote }
      });
});
/*
$('.button').click(function() {
    $.ajax({
      type: "POST",
      url: "submited-notes.inc.php",
      data: { submitedNote: GlobalJSNote }
    }).done(function( msg ) {
      alert( "Data Saved: " + msg );
    });
  });*/