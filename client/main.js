import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import './main.html';
import './mainindex/first.html'
import './mainindex/home.html'
import './mainindex/taskDesign.html'
import '../collections/task-collection.js'
import './mainindex/instructions.html'
import './mainindex/error.html'
import './mainindex/age.html'
import './mainindex/inst.html'
import './mainindex/gender.html'
import './mainindex/education.html'
import './mainindex/refresh.html'
import './mainindex/accept.html'
import './mainindex/gc_stance.html'
import './mainindex/party_affiliation.html'
import './mainindex/state.html'

var path;
var worker_Id;
var assignment_Id;
var hit_Id;
var prevMode;
var turkSubmitTo;

taskCount = 0 ;
workCount = 0;
totalTasks =  0;

var usr_data = Meteor.subscribe('allowedData');
var scroll_page_var = Meteor.subscribe('scroll_var');

//SETTINGS
var TotalStatements = 13;
var num_of_demographics = 9;
var path_new = "";
///////

Session.set("num_of_demographics", num_of_demographics);
Session.set("TotalStatements", TotalStatements);
Session.set("path_new", path_new);



///HELPER FUNCTIONS
/* Fisher-Yates shuffle */
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

var gup = function(path, name){
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec(path);
    if( results == null )
      return "";
    else
      return results[1];
 }
///////////
 var accCreat = function (registerData)
 {
   Accounts.createUser(registerData, function(error) {

      if (Meteor.user()) {

         console.log(Meteor.userId());
         var registerUser =
         {
              _id : Meteor.userId(),
         }


         var taskOrder = Array(TotalStatements);
         for (var i = 0; i < TotalStatements; i++) {
          taskOrder[i] = i + 1;
         }

        var consent = "false";
        if (Session.get("worker_Id") == "ASSIGNMENT_ID_NOT_AVAILABLE")
        {
            consent = "true";
        }
        taskOrder = shuffle(taskOrder);
        for (var i = 0; i < TotalStatements; i++) {
          if (taskOrder[i] == TotalStatements)
          {
              var temp = taskOrder[TotalStatements - 1];
              taskOrder[TotalStatements - 1] = taskOrder[i];
              taskOrder[i] = temp;
              break;
          }
        }

         UserAdv.insert({_id : Meteor.userId(),amtId: Session.get("worker_Id") , assignment_Id : Session.get("assignment_Id"), hit_id : Session.get("hit_Id"),order: taskOrder, stance : "unknown" ,currentIndex : 0, total : 0 , consent : consent, turkSubmitTo : Session.get("turkSubmitTo"), age : -1, gender : -1, education : -1 });
         BlazeLayout.render('home');
         return true;



      } else {
         console.log("ERROR: " + error.reason);
         return false;
         alert("ERROR: " + error.reason);
      }
   });
 }

FlowRouter.route('/',{
  name: 'home' ,
  action ()
  {
    Tracker.autorun(function() {
      if (usr_data.ready()) {
         var order = UserAdv.findOne({"_id" : Meteor.userId()});
         if (order != undefined)
         {
            if (order.currentIndex - num_of_demographics > Session.get("TotalStatements"))
            {
                window.location.href = path_new + "/error";
            }else
            {
                  BlazeLayout.render('HOME');
            }
         }
       }
     });

     BlazeLayout.render('HOME');


}
});


/*
Router.route('/welcome', function(){
      // console.log(task_json);
      path = window.location.href;
      worker_Id = gup(path, 'workerId');
      assignment_Id = gup(path, 'assignmentId');
      hit_Id = gup(path, 'hitId');

      */
    FlowRouter.route('/error',{

      name :  'error',
      action()
      {
        BlazeLayout.render('error');
      }
    });

      // FlowRouter.route('/gc_stance',{
      //
      //   name :  'gc_stance',
      //   action()
      //   {
      //     BlazeLayout.render('gc_stance');
      //   }
      // });

FlowRouter.route('/register',{
  name: 'register' ,
  action ()
  {
    BlazeLayout.render('REGISTER');
  }
});

FlowRouter.route('/instructions',{

  name :  'instructions',
  action()
  {
    BlazeLayout.render('selector');
  }
});


FlowRouter.route('/task1',{
  name: 'task1' ,
  action ()
  {
    BlazeLayout.render('manager');
  }
});


FlowRouter.route('/home',{
  name: 'home' ,
  action ()
  {
    BlazeLayout.render('home');
  }
});

FlowRouter.route('/profile',{
  name: 'profile' ,
  action ()
  {
    BlazeLayout.render('profile');
  }
});

FlowRouter.route('/settings',{
  name: 'settings' ,
  action ()
  {
    BlazeLayout.render('SETTINGS');
  }
});


Meteor.subscribe('Statements');
Meteor.subscribe('Order');
Meteor.subscribe('WorkerAnswers');

 Template.home.onCreated(function bodyOnCreated() {
   if (Meteor.userId() == null)
   {
     window.location.href = path_new + "/";


   }
   else
   {
      window.history.pushState("", "", path_new + "/home");

   }


});


Template.HOME.onCreated(function bodyOnCreated() {
  if (Meteor.user() != null)
  {
    //alert(path);
    window.location.href = path_new + "/home";


  }

});


Template.HOME.helpers(
     {
       'starter' : function()
       {

         path = window.location.href;
        // path_try = gup_new("crowd.cs.purdue.edu/mag", '/');
        // alert(path_try);
         worker_Id = gup(path, 'workerId');
         assignment_Id = gup(path, 'assignmentId');
         turkSubmitTo = gup(path, 'turkSubmitTo');
         hit_Id = gup(path, 'hitId');
         prevMode = false;

         Session.set("turkSubmitTo", turkSubmitTo);
         Session.set("buttonClicked",false);
         if (assignment_Id == "ASSIGNMENT_ID_NOT_AVAILABLE")
         {
             Session.set("worker_Id","ASSIGNMENT_ID_NOT_AVAILABLE" );
             Session.set("prevMode", true);
         }else
         {
             Session.set("worker_Id", worker_Id);
             Session.set("prevMode", false);
         }
         Session.set("assignment_Id", assignment_Id);
         Session.set("hit_Id", hit_Id);
         Session.set("lock", false);

             var order = UserAdv.findOne({"_id" : Meteor.userId()});

             if ( order == undefined || (Session.get("worker_Id") != "" && order.amtId != Session.get("worker_Id") ))
             {

               Meteor.logout(function(error) {

                  if(error) {
                     console.log("ERROR: " + error.reason);
                  }
               });
             }


         if (Session.get("worker_Id") == "" && !Meteor.userId())
         {
           //window.location.href = "/";
           alert("Please access this webpage through AMT!");
           return;
         }


         if (!Meteor.userId()){

          //console.log("Here");
           Meteor.loginWithPassword(Session.get("worker_Id"), Session.get("worker_Id"), function(error) {

              if (Meteor.user()) {

              BlazeLayout.render('home');
              return true;

              } else {
                 console.log("ERROR: " + error.reason);
                 var registerData =
                 {
                    username: Session.get("worker_Id"),
                    password: Session.get("worker_Id")
                 }
                 return accCreat(registerData);
              }

         });


         }

      return false;

  },
       'example': function()
       {

           var order = UserAdv.findOne({"_id" : Meteor.userId()});

           if (order == undefined)
           {
             return;
           }
           //console.log("Here!");
           if (order.currentIndex != 0)
           {
             window.location.href = path_new + "instructions";
           }
           return true;
       }
     });

   Template.home.helpers({

 'example': function()
 {

     var order = UserAdv.findOne({"_id" : Meteor.userId()});

     if (order == undefined)
     {
       return;
     }

     ////Later uncomment
     if (order.currentIndex != 0)
     {

       //BlazeLayout.render('manager');
       //window.location.href = "/task1";
     }


     return true;
 },
 'getText' : function()
 {
   var order = UserAdv.findOne({"_id" : Meteor.userId()});

   if (order == undefined || order.currentIndex == 0)
   {
     return "START";
   }else
   {
      return "CONTINUE!";
   }
 }
   });


Template.taskDesign.helpers(
  {
    'isUser' : function()
    {
        //console.log(Meteor.userId());
        if (Meteor.userId() == null)
        {
            window.location.href = path_new + "/";
        }
    }
    ,
    'Statements' : function()
    {

      Statements.find();
      return "Hello";
    },
    'getText' :function()
    {
      ///var order = Order.findOne({"_id" : Meteor.userId()});
      var order = UserAdv.findOne({"_id" : Meteor.userId()});
      if (order == undefined)
      {
        return;
      }
      if (order.amtId == "ASSIGNMENT_ID_NOT_AVAILABLE")
      {
        return "\"" + "Statement to judge " + "(" + parseInt((Math.random()* 10)) + ")" + "\"";
      }
      var sentences = Statements.find().fetch();
      if (order != undefined)
      {
        //POTENTIAL MODIFICATION LOCATION subtract the current Index
        var index = order.currentIndex - num_of_demographics;


        index = order.order[index] - 1;


        if ( index > TotalStatements - 1)
        {
            return;
        }
        if (sentences[index] != undefined)
        {
          //console.log(sentences[index].sentence);
          return "\"" + sentences[index].sentence + "\"";
        }

      }
    },
    'progress' : function()
    {
       var order = UserAdv.findOne({"_id" : Meteor.userId()});
       if (order.currentIndex - num_of_demographics <= TotalStatements - 1)
       {
         return "Task " + (order.currentIndex - num_of_demographics + 1) + " out of " + TotalStatements;
       }
       else
       {  return "";
        }
    }
  });

Template.manager.helpers(
  {
    'showEnd' :  function()
    {
      //  var order = Order.findOne({"_id" : Meteor.userId()});
      var order = UserAdv.findOne({"_id" : Meteor.userId()});
        //alert(window.location.href);
        if (order == undefined)
        {
          //DON'T FORGET MAKE THIS RETURN TRUE
          //BlazeLayout.render('refresh');
          return;
        }
        if (order.currentIndex < num_of_demographics)
        {
              window.location.href = path_new + "/instructions";
              BlazeLayout.render('selector');
              return;
        }
        if ( order.currentIndex - num_of_demographics > TotalStatements - 1)
        {
           BlazeLayout.render('end');
            return true;
        }
        if ( order.currentIndex - num_of_demographics <= TotalStatements - 1)
        {
          BlazeLayout.render('taskDesign');
          return false;
        }

    }
  }
);

Template.selector.helpers(
  {
    'whichPage' : function()
    {
      var index = UserAdv.findOne({"_id" : Meteor.userId()});
      if (index != undefined)
      {

            if (index.amtId == "ASSIGNMENT_ID_NOT_AVAILABLE")
            {
                BlazeLayout.render('accept');
                return;
            }

            if (index.amtId == "ASSIGNMENT_ID_NOT_AVAILABLE" && index.currentIndex != num_of_demographics)
            {
              // alert("Please accept the HIT first!");
              //      return;
              UserAdv.update(Meteor.userId(), { $set: { currentIndex : num_of_demographics }});
              location.reload();
            }

            //COLLECT DEMOGRAPHIC INFORMATION HERE
            if (index.currentIndex == 0)
            {
              BlazeLayout.render('consent');
            }
            if (index.currentIndex == 1)
            {
                BlazeLayout.render('inst');
            }
            if (index.currentIndex == 2)
            {
                BlazeLayout.render('instructions');
            }
            if (index.currentIndex == 3)
            {
                BlazeLayout.render('age');
            }

            if (index.currentIndex == 4)
            {
                BlazeLayout.render('gender');
            }
            if (index.currentIndex == 5)
            {
                BlazeLayout.render('education');
            }
            if (index.currentIndex == 6)
            {
              BlazeLayout.render('state');
            }
            if (index.currentIndex == 7)
            {
                BlazeLayout.render('party_affiliation');
            }
            if (index.currentIndex == 8)
            {
                BlazeLayout.render('gc_stance');
            }
            if (index.currentIndex >= 9)
            {

                window.location.href = path_new + "/task1";

            }
            return false;
      }else
      {
        return false;
      }
    }
  });


Template.instructions.helpers(
  {
    'isUser' : function()
    {
        //console.log(Meteor.userId());
        if (Meteor.userId() == null)
        {
            window.location.href = path_new + "/";
        }
    }

  }
);

  Template.taskDesign.events(
    {
      'submit form': function(event, template) {
       event.preventDefault();
       var order = UserAdv.findOne({"_id" : Meteor.userId()});
       if (order.amtId == "ASSIGNMENT_ID_NOT_AVAILABLE")
       {
          window.location.href = path_new + "/task1";
          return;
       }
       var questionAnswer = event.target.question.value;
       //var ratingVal = event.target.rating.value;
       ///var order = Order.findOne({"_id" : Meteor.userId()});
       var order = UserAdv.findOne({"_id" : Meteor.userId()});
		if (questionAnswer == "")
	      {
		         alert("Please select one of the options above!");
	      }
       if (questionAnswer == "" || order.currentIndex - num_of_demographics > TotalStatements - 1 )
       {
            return;
       }

       var answers = UserAdv.findOne({"_id" : Meteor.userId()});
       var d = new Date();
       var n = d.getTime();
       WorkerAnswers.insert({"amtId" : answers.amtId, "taskIndex" : answers.currentIndex - num_of_demographics, "taskId" : answers.order[answers.currentIndex - num_of_demographics], "choice" : questionAnswer, "time" : n});

       var number =   "answers." + (parseInt(answers.total + 1));
       if ((parseInt(answers.total + 1)) > TotalStatements )
       {
          return;
       }
       var totalNum = (parseInt(answers.total) + 1);
       UserAdv.update(Meteor.userId(),{
        $set:{
          total : totalNum
            }

         });

         var nextIndex = answers.currentIndex;
         nextIndex++;
         UserAdv.update(Meteor.userId(), { $set: { currentIndex : nextIndex }});
         window.location.href = path_new + "/task1";     }
    }
  );
