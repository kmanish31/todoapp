var bodyparser = require('body-parser');
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://test:test@ds117128.mlab.com:17128/todo');

//create a schema this is like a blueprint

var todoSchema= new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo',todoSchema);


// var data = [{item: 'get milk'},{item: 'walk dog'},{ item: 'not in mood'}];
var urlencodedparser = bodyparser.urlencoded({extended:false});

module.exports = function(app) {


    app.get('/todo',function(req,res){
        // get data from mongo db and pass it to view
        Todo.find({},function(err,data){
           if(err) throw err;
            res.render('todo',{todos:data});
        });

    });

    app.post('/todo',urlencodedparser,function(req,res){
  // get data from view and add it too mongodb
      var newTodo = Todo(req.body).save(function(err,data){
          if(err) throw err;
          res.json(data);
      });
    });

    app.delete('/todo/:item',function(req,res){
    // delete the requested item from mongo db
        Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
         if (err) throw err;

            res.json(data);
        });
    });
};
