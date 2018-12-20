var express = require('express');
var router = express.Router();
const Question = require('../models/Question');
const User = require('../models/User');
const TestType = require('../models/TestType')


/* GET home page. */
router.post('/addTestType', function(req, res, next) {
  let newTestType = new TestType({
    id: req.body.id,
    title: req.body.title
  });
  newTestType.save((err, testtype)=>{
    if (err) {
        res.json({ msg: 'failed to add type' });
    }
    else {
        res.json({ msg: 'type added successfully' });
    }
  })
});

router.get('/que/:id',(req, res, next) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function (err, db){
        if (err) throw err;
        var dbo = db.db("MockTest");
        var query = { t_id: { $in: [req.params.id] } };
        dbo.collection("questions").find(query).toArray(function (err, eResult1){
            var out = [];
            eResult1.forEach((q) =>{
                out.push ({ qn:q.qn,answer:q.answer,options:q.options});
            });
                 res.json(out);
             });
             db.close();
    })
});

// router.get('/que/:title',(req, res, next) => {
//     var MongoClient = require('mongodb').MongoClient;
//     var url = "mongodb://localhost:27017/";
//     MongoClient.connect(url, function (err, db){
//         if (err) throw err;
//         var dbo = db.db("MockTest");
//         var query = { title: { $in: [req.params.title] } };
//         dbo.collection("questions").find(query).toArray(function (err, eResult1){
//             var out = [];
//             eResult1.forEach((q) =>{
//                 out.push ({ qn:q.qn,answer:q.answer,options:q.options});
//             });
           
//             res.json(out);
//              });
//              db.close();
//     })
// });

router.post('/add', (req, res, next) => {
    let newQuestion = new Question({
        id: req.body.id,
        title: req.body.title,
        qn: req.body.qn,
        options: req.body.options,
        answer:req.body.answer
    });
    newQuestion.save((err, question) => {
        if (err) {
            res.json({ msg: 'failed to add course' });
        }
        else {
            res.json({ msg: 'course added successfully' });
        }
    });
});
router.post('/ans', (req, res, next) => {
    
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function (err, db){
        if (err) throw err;
        var dbo = db.db("MockTest");
        var query = { qid: req.query.title};
        dbo.collection("Questions").find(query).toArray(function (err, eResult){
            res.json(eResult);
            db.close();
        });
    });   
});


  router.get('/user', (req, res, next) => {
    User.find(function (err, users) {
          res.json(users);
      })
  });
  
  router.post('/addUser', (req, res, next) => {
      let newUser = new User({
          id: req.body.id,
          name: req.body.name,
          email: req.body.email
      });
      newUser.save((err, user) => {
          if (err) {
              res.json({ msg: 'failed to add course' });
          }
          else {
              res.json({ msg: 'course added successfully' });
          }
      });
  });


//Update
  router.put('/addUser', (req, res, next) => {
    User.findByIdAndUpdate({_id: req.params.id},{
        $set:{
            id: req.body.id,
          name: req.body.name,
          email: req.body.email,
          date: req.body.date
        }
    },
    function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }

    });
    
});
module.exports = router;
