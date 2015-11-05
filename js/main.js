$(document).ready(function () {
  page.init();
});
////////////////////////////// Global Variables ////////////////////

// index number for retrieving json objects //
// redefine this for functions //
uindex = 0;
var userNameData;
////////////////////////////// Main Functions //////////////////////
var page = {

  url: "http://tiny-tiny.herokuapp.com/collections/chatorex",
  urlU: "http://tiny-tiny.herokuapp.com/collections/chatorexU",
  urlM: "http://tiny-tiny.herokuapp.com/collections/chatorexM",

  init: function () {
    page.initStyling();
    page.initEvents();
    page.loginSub();
  },

  initStyling: function () {
    page.loadMessages();
  },

  initEvents: function () {
    page.submitMessage();
    page.deleteMessage();
    page.returnLogin();
    page.newUserEvent();
    page.loadSideBar();
  },

    // AJAX - LOAD OLD MESSAGES
    loadMessages: function() {
      $.ajax({
        url: "http://tiny-tiny.herokuapp.com/collections/chatorexM",
        method: 'GET',
        success: function(mData) {
          var MessageTmpl = _.template(templates.message);
          _.each(mData, function (el, idx, arr) {
            var oldMessages = {
              avatar: el.avatar,
              username: el.username,
              content: el.content,
              messageid: el._id
            };
            var html = MessageTmpl(oldMessages);
            $('.col-md-8').append(html);
          })
        },
        failure: function () {
          console.log("FAILURE")
        },
      })
    },

    // DOM - SUBMIT NEW MESSAGE
    submitMessage: function () {
    // var messageData = []
    $('form').on('submit', function(event) {
      event.preventDefault();
      var newMessage = {
        avatar: $("input[name='avatar']").val(),
        username: $("input[name='username']").val(),
        email: $("input[name='email']").val(),
        content: $('textarea').val(),
      };
      $.ajax ({
        url: "http://tiny-tiny.herokuapp.com/collections/chatorexM",
        method: 'POST',
        data: newMessage,
        success: function() {
          console.log("SUCCESS");
          page.loadMessages();
        },
        failure: function () {
          console.log("FAILURE");
        },
      });

    });
  },
    // DELETE ANY MESSAGE
  deleteMessage: function() {
    $('.container').on('click', '.delete', function (event) {
      event.preventDefault();
    //  deleteID = $('li').closest().attr('#id');
    var deleteID = $(this).closest('li')[0].id;
     $.ajax({
       url: page.urlM + '/' + deleteID,
       method: 'DELETE',
       success: function() {
         console.log(deleteID);
         document.getElementById(deleteID).remove();
       },
       failure: function() {
         console.log("error");
       }
     });
     // var messageId = $(this).closest('li').data('messageid');
     // $(this).closest('li').remove();
    //  $(this).parent('li').remove();
    //  page.loadMessages();
     //page.loadMessages();

    });
  },

    ////DOM DELETE ANY MESSAGE
    // deleteEventMessage: function () {
    //   $('.col-md-8').on('click', '.delete', function (event) {
    //     event.preventDefault();
    //     // var messageId = $(this).closest('li').data('messageid');
    //     // $(this).closest('li').remove();
    //     page.loadMessages();
    //     $(this).parent('li').remove();
    //   });
    // },

    //RETURNING USER LOGIN
  returnLogin: function (){
    $(".container").on("click", "#loginReturn", function(event){
        event.preventDefault();
        var userName = $("input[name='username']").val();//USER INPUT COLLECTION STRINGIFIED
        $.ajax({
          url: page.urlU,
          method:'GET',
          success: function (data){
            console.log("SUCCESS" + data);
            userNameData = data;
            for (var i= 0; i < userNameData.length; i++){
              if (userNameData[i].username === userName){
                $(".col-md-8").removeClass("hidden-class"); //REMOVES ALL HIDDEN CLASSES FROM CHATBOX
                $(".col-md-4").removeClass("hidden-class");
                $('.navbar-default').removeClass("hidden-class");
                $('.messageWriter').removeClass("hidden-class");
                $("#loginContainer").addClass("hidden-class");
                var userNameDataIter = userNameData[i];
                userNameDataIter.status = true;
                page.setStatusActive(userNameData[i]._id);
                // else {
                //   alert ("Username does not exist please create a new user");
                // }
              }
            }
          }
        });
    });
  },

  setStatusActive: function (idNumber){
    $.ajax({
      url:page.urlU + "/" + idNumber,
      method:"PUT",
      data:"status=true",
      success: function(data){
      console.log('SUCCESS'+ data);
      },
      failure: function(data){
        console.log("FAIL ON STATUS CHANGE" + data);
      }
    })
  },

  newUserEvent: function(){
    $(".container").on("click", "#signUp", function(event){
      $("#inputEmail").removeClass("hidden-class");
      $("#inputAvatar").removeClass("hidden-class");
      $("#loginSubmit").removeClass("hidden-class");
      $("#signUp").addClass("hidden-class");
      $("#loginReturn").addClass("hidden-class");
    });
  },

  loginSub: function(){
   $(".container").on("click", "#loginSubmit", function(event){
     event.preventDefault;
     var $submitBtn = $(this);//WASNT SURE IF I NEEDED THIS
     $(".col-md-8").removeClass("hidden-class"); //REMOVES ALL HIDDEN CLASSES FROM CHATBOX
     $(".col-md-4").removeClass("hidden-class");
     $("#loginContainer").addClass("hidden-class");
     var userName = $("input[name='username']").val();//USER INPUT COLLECTION STRINGIFIED
     var userEmail = $("input[name='email']").val();
     var userAvatar = $("input[name='avatar']").val();
     userLoginAdd = new User({  //ADDING DATA TO CONSTRUCTOR
       username: userName,
       email: userEmail,
       avatar: userAvatar,
     });
       $.ajax({     //AJAX PUSH TO SERVER
         url: page.urlU,
         method:"POST",
         data: userLoginAdd,
         success: function (data){
           console.log("SUCCESS!", data);
         },
         failure: function (data) {
           console.log("FAILURE!!!");
         }
       });
   });
 },

 retrieveUser: function() {
   ///call this variable after the function runs///
   userObj = {};

   $.ajax({
     url: page.url,
     method: 'GET',
     success: function(data) {
       userObj = data[uindex];
     }
   });
 },

  loadSideBar: function() {
    ///call this variable after the function runs///
    allUsers = [];

    $.ajax({
      url: page.url,
      method: 'GET',
      success: function(data) {
        allUsers = data;
        var sideU = _.template(templates.sideBarUser);

        for (i = 0; i < allUsers.length; i++) {
          sider = sideU(allUsers[i]);
          $('#sideList').append(sider);
        }
      }
    });
  },

  createUser: function() {


  },

  deleteUser: function() {

  },

};
