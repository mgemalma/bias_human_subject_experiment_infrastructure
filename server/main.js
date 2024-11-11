import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import '../collections/task-collection.js';


Meteor.startup(() => {
  // code to run on server at startup
  if (Statements.find().count() == 0)
  {
    Statements.insert(
      {
        index : 0,
        sentence : "Outlawing guns is the best solution to prevent wars."
        ,label : "Liberal Opinion"
      });

      Statements.insert(
        {
          index : 1,
          sentence : "Most of the problematic shooting events were led by mentally ill people."
          , label : "Conservative Opinion"
        });

        Statements.insert(
          {
            index : 2,
            sentence : "Gun bans alleviate intimate partner homicide."
            , label : "Liberal Fact"
          });

          Statements.insert(
            {
              index : 3,
              sentence : "USA always has more devastating gun violence than any other first world nation."
              , label : "Liberal Opinion"
            });

            Statements.insert(
              {
                index : 4,
                sentence : "Most of the murders in US were led by people who didn’t have the right mental state at the moment."
                , label : "Conservative Opinion"
                });
              Statements.insert(
                {
                  index : 5,
                  sentence : "Chicago still had many shooting victims even though it had gun ban."
                  , label : "Conservative Fact"
                });
                Statements.insert(
                  {
                    index : 6,
                    sentence : "Active shooter events in the U.S. is sometimes associated with mental illness."
                    , label : "Conservative Fact"
                  });
                  Statements.insert(
                    {
                      index : 7,
                      sentence : "In the past years, gun related deaths covered a significant portion of deaths in USA."
                      , label : "Liberal Fact"

                    });
                    Statements.insert(
                      {
                        index : 8,
                        sentence : "Easy usage of the guns increases firearm related deaths."
                        , label : "Liberal Opinion"
                      });
                      Statements.insert(
                        {
                          index : 9,
                          sentence : "Many criminals obtain guns from illegal sources."
                          , label : "Conservative Fact"
                        });
                        Statements.insert(
                          {
                            index : 10,
                            sentence : "The share of Americans supporting gun control increased."
                            , label : "Liberal Fact"
                          });
                          Statements.insert(
                            {
                              index : 11,
                              sentence : "Guns easily freed USA from British Forces."
                              , label : "Conservative Opinion"
                            });

                                    Statements.insert(
                                      {
                                        index : 12,
                                        sentence : "Please choose \"conservative\" option for this statement, this is a attention check statement."
                                        , label : "Attention Check"
                                      });
  }

});



WorkerAnswers.allow(
  {
    'insert' : function(user_id,total, answerArray)
    {
        return true;
    },
    'update' : function(user_id, total, answerArray)
    {
        return true;
    }
  }
);


Statements.allow(
  {
    'insert' : function(index , statement)
    {
        return true;
    }
  }

);
Tasks.allow(
  {
    'insert' : function (isAlive , value)
    {
      return true;
    }
  });

//Allow pushing the user content into the database
UserAdv.allow(
  {
    'insert' : function (user_id, object, a , b, t, s, d, q,z,o, age, gender, education)
    {
      return user_id == object._id;
    },
    'update' : function (user_id, object, a , b, t, s, d, q, z,o, age, gender, education)
    {
      //console.log(user_id);
      //console.log(first_name);
      //console.log(object);
      return user_id == object._id;
    }
  });






  Meteor.publish('allowedData', function() {
    //console.log(this.userId);

    if (this.userId){
      return UserAdv.find({_id: this.userId});
    }

  });







  Meteor.publish('Statements',
  function()
  {
    if (this.userId)
    {
      return Statements.find();
    }
  });



  Meteor.publish('WorkerAnswers',
  function()
  {
    if (this.userId)
    {
      return WorkerAnswers.find({_id: this.userId});
    }
  });
