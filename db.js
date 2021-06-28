
const express = require('express')
const app = express()
const port = 3000
const fs=require('fs');
const { maxHeaderSize } = require('http');
var mysql      = require('mysql');
const { endianness } = require('os');



app.use(express.static('library'))
app.use(express.json());
app.use(express.urlencoded({ extended: true
}));

app.engine('pug', require('pug').__express)
app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.sendFile('index.html', { root:__dirname})
  });
 
  app.get('/finalscore', function (req, res) {
      connection.query("select test.idt,c.name,c.email,max(finalscore) as finalscore from test,c",function(err,rows,fields){
    res.render('highestscore', { title:'highest score',items:rows})
      })
      
 });
 app.get('/averagescore', function (req, res) {
    connection.query("select test.idt,c.name,c.email,((test1+test2+test3)/3) as averagescore from test,c",function(err,rows,fields){
  res.render('averagescore', { title:'averagescore',items:rows})
    })
    
});
 
 

  const connection=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database:'student'
    
  });
 connection.connect(function(err){
     if(err) throw err;
     console.log('connected');
  
 })

 
  app.post('/submit' , function (req, res) {

        var sql="insert into c(name,email) values ('"+req.body.name+"','"+req.body.email+"')"
        connection.query(sql, function(err) {
            if (err) throw err
             console.log('saved')
              res.sendFile('index1.html', { root:__dirname})
        })
        
  
    })
    

    app.post('/submit1' , function (req, res) {

        var sql="insert into test(idt,test1,test2,test3,finalscore) values (idt,'"+req.body.test1+"','"+req.body.test2+"','"+req.body.test3+"','"+req.body.finalscore+"')"
        connection.query(sql, function(err) {
            if (err) throw err
            res.render('index', {title:'datasaved',message:'saved'})
        
             console.log('saved')
        })
        
  
    })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





