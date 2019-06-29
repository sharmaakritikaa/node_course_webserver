/*
const express=require('express');
var app=express();
//part 1:(hello express)
app.get('/',(req,res)=>{                      //req=>it stores the information about req coming in
                                              //res=>bunch of method available to us so we can respond http req in whatever way we like...
   // res.send('<h1>HELLO EXPRESS:)</h1>');   //==>this is our response to http req..so if someone visit our website they see this string as our response
    res.send({
        Name:'Kritika',
        LastName:'sharma',
        likes:[
            'drawing',
            'music'
        ]
    });
});
app.listen(3331);  //==>this BIND application to the port on our machine
                   //3331==>port
*/
//part-2...root address
/*
const express=require('express');
var app=express();
app.get('/mywebsite',(req,res)=>{
    res.send('MY WEBSITE');
});
app.listen(3331);
*/
//part-1 output
//Request URL: http://localhost:3331/
//Request Method: GET
//Status Code: 304 Not Modified
//Remote Address: [::1]:3331
//Referrer Policy: no-referrer-when-downgrade
//Connection: keep-alive
//Date: Sun, 23 Jun 2019 05:38:33 GMT
//ETag: W/"18-YwRQY2TrK/E6P57JLrHCsu/sxCA"
//X-Powered-By: Express
//Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
//Accept-Encoding: gzip, deflate, br
//Accept-Language: en-US,en;q=0.9,hi;q=0.8
//Cache-Control: max-age=0
//Connection: keep-alive
//Host: localhost:3331
//If-None-Match: W/"18-YwRQY2TrK/E6P57JLrHCsu/sxCA"
//Upgrade-Insecure-Requests: 1
//User-Agent: Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36
//*************************************************************************************************************************************************************************************************************************************************** */

//here we create a folder public.. includes help.html file in which we write our basic html code and we able to serve this page in our express app without mannualy configure it..
//we do it by using middleware>>>>>>>>>>middleware lets you configure how your express application works==>pr third party add on 
/*
const express=require('express');
var app=express();
app.use(express.static(__dirname+'/public'));  //==> express.static==>it takes the absolute path to the folder you wanna serve up  
app.get('/',(req,res)=>{                       // "=>>__dirname ==>it gives you the path of the currently running file...taht is the path of test server
   res.send('<h1>HELLO EXPRESS:)</h1>');
     
 });
 app.listen(3331);
 */
//****************************************************************************************************************************************************************************************************************************************************************** */
/*
//middleWare :app.use ==>static    >>>>>>>>>>>  >>>>>>>>>>>>    >>>>>>>>>>>>>>  >>>>>>>>>>>>>>  >>>>>>>>>>>>>>>>  >>>>>>>>>>>>>   >>>>>>>>>>>>>>>>>

const express=require('express');
const hbs=require('hbs');

var app=express();

hbs.registerPartials(__dirname +'/views');

app.set('view engine','hbs');

app.use(express.static(__dirname +'/public'));   //app.use  is kind of middleware use to add functionality

hbs.registerHelper('getCurrentYear', () => {    //=>helper main work is to pass on the returned value to the getCurrentYear
    return new Date().getFullYear()              //=>used to minimise complexity and make easier to modify our code 
  });
  //Helper also takes arguments..
  hbs.registerHelper('Screamit',(text)=>{      //helper alse takes argument ...screamit assume it as a function and text is its argument
      return text.toUpperCase();
  })

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Modified HOME Title',             
        ADVANCEDTEMPLATE:'MODIFIED SLASH PAGE',
        //currentYear:new Date().getFullYear()
    });
});

app.get('/about', (req,res)=>{
   res.render('about.hbs',{
        pageTitle:'Modified ABOUT Title',
        ADVANCEDTEMPLATE:'modified /about page'
        //currentYear:new Date().getFullYear()
  });
   
});

app.listen(3331,()=>{                                   //app.listen here is use to call function..
    console.log("server up to the port 3331");
});
//PARTIAL:
//=>it is the partial piece of website..it is something you can reuse=>using template
//=>basically when we need to handle large amount of files...its difficult to modified a piece of code ...thats why for that we use advanced templating that make our task easy
//NOTE:E:\PepCoding\Dev101\test_server>nodemon server.js -e js,hbs
//~~here~~ e=>stands for all the extension we want to watch ..after that here we include all the extensions 
*/
//****************************************************************************************************************************************************************************************************************************************************************** */

//middleWare :app.use ==>function==>next    >>>>>>>>>>>  >>>>>>>>>>>>    >>>>>>>>>>>>>>  >>>>>>>>>>>>>>  >>>>>>>>>>>>>>>>  >>>>>>>>>>>>>   >>>>>>>>>>>>>>>>>

const express=require('express');
const hbs=require('hbs');

var app=express();

hbs.registerPartials(__dirname +'/views');

app.set('view engine','hbs');

app.use(express.static(__dirname +'/public'));   

//app.use((req,res,next)=>{                   
//next();
//});
//inside this app.use function we can do anything ,we might logged something to the screen or some http req we can make from here
//next: if we do something async ..it going to move on only when we called the next...i.e next application continue to run
//from the above app.use (line:126)..we you open it with browser without next();..it seems to be loading but nothing going to happen...

app.use((req,res,next)=>{     
    var now=new Date().toString();
    console.log(`now: ${now}...... req: ${req.method}......url: ${req.url}`);              
    next();
    });

app.use((req,res,next)=>{     
    res.render('maintain.hbs');
    });

hbs.registerHelper('getCurrentYear', () => {    
    return new Date().getFullYear()             
  });
  //Helper also takes arguments..
  hbs.registerHelper('Screamit',(text)=>{      
      return text.toUpperCase();
  })

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Modified HOME Title',             
        ADVANCEDTEMPLATE:'MODIFIED SLASH PAGE',
        //currentYear:new Date().getFullYear()
    });
});

app.get('/about', (req,res)=>{
   res.render('about.hbs',{
        pageTitle:'Modified ABOUT Title',
        ADVANCEDTEMPLATE:'modified /about page'
        //currentYear:new Date().getFullYear()
  });
   
});

app.listen(3331,()=>{                                 
    console.log("server up to the port 3331");
});