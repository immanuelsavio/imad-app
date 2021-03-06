var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');

var app = express();
app.use(morgan('combined'));


var articles = {
    'article-one' : {
        title:"Article one | Immanuel Savio",
        heading: "Article one",
        date:"August 16 2017",
        content: `<p>
                        This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one
                    </p>
                    <p>
                        This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one
                    </p>
                    <p>
                        This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one.This is the content of Article one
                    </p>`
    },
    'article-two' : {
        title:"Article two | Immanuel Savio",
        heading: "Article two",
        date:"August 16 2017",
        content: `<p>
                        This is the content of Article two.
                    </p>`
        
    },
    'article-three' : {
        title:"Article three | Immanuel Savio",
        heading: "Article three",
        date:"August 16 2017",
        content: `<p>
                        This is the content of Article three.
                    </p>`
        
    }
};

function createTemplate(data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
        <head>
            <title>
            
            ${title}
            
            </title>
        <meta name="viewport" content="width-device-width, initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
       
        </head>
        
        <body>
        <div class="container">
            <div>
                <o href="/">Home</o>
                    <hr/>
                    
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                    ${content}
            </div>
        </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}


app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));
});


function hash(input, salt){
    
    var hashed = crypto.pbkdf2Sync(input, salt , 10000, 512, 'sha512');
    return ["pbkdf2", "10000",salt, hashed.toString('hex')].join('$');
}

app.get("/hash/:input" , function(req,res){
   
   var hashedString = hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
    
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter' , function  (req,res){
    counter = counter + 1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name', function(req, res) {
    
   var name = req.query.name;
   names.push(name);
   res.send(JSON.stringify(name));
    
});



app.get('/:articleName', function (req, res) {
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
    
    
    
    
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
