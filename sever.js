const express = require("express");
const app = express();
const chalk = require('chalk');
const path = require('path');

const db = require("./db/index.js");
const { client, Homework, Category } = db;
const postDetail = require("./postDetail");

app.use(express.static('public'));
app.use(express.json());

app.use('/dist', express.static(path.join(__dirname,'dist')));


app.get('/', async(req, res, next)=>{
  try{
    const categories = await Category.findAll();
    res.send(`
<!DOCTYPE html>    
<html>
<head>
  <title>HomeWork</title>
  <link rel="stylesheet" href="/main.css"></link>
  <script src='/dist/main.js' defer></script>
</head>

<body>

  <header id="down">
    <nav>
      <ul>
      <li><a href="https://github.com/FullstackAcademy/2204-FSA-RM-WEB-PT/tree/main/homework">GitHub</a></li>
      <li><a href="https://app.slack.com/client/T024FPYBQ/C03BUFQB50V/thread/C03BUFQB50V-1652020446.479649">Slack</a></li>
      <li><a href="javascript:void(0)" onclick='add()'>Add Homework</a></li>
      </ul>
    <table>
      <tr>
        <td id="upCell">TOP</td>
      </tr>
      <tr>
        <td id="downCell">BOTTOM</td>
      </tr>
      </table>
      </nav>
  </header>
  
    <main>
      <div class="bigTitle" id='bigT'>
          <h1> Our HomeWork</h1>
      </div>

  </main>
       <div id="contes" style="">
       <div style="width:500px;height:40px;">
        <p>Create New Homework</p>
        <button onclick='add()'>X</button>
        </div>
 <hr>
 <form style=" margin-left: 100px;">
 Title：<input type="text" id="title" name="title" ><br>
 Requirement1：<input type="text" id="requirement1" name="requirement1"><br>
 Requirement2: <input type="text" id="requirement2" name="requirement2"><br>
 Requirement3: <input type="text" id="requirement3" name="requirement3"><br>
 Category:<select name="categoryId" id="categoryId">
 ${
   categories.map(currentValue=>{
     return `
     <option value=${currentValue.id}>${currentValue.name}</option>`
   }).join('')
 }
 </select>
 <button>Send</button>
 </form>
 </div>
</div>
<div id="all_light">
 </div>
    <section class="details">
      <div class="container" id='detC'>
      </div>
    </section>
   
  <footer>
      <div class="container">
          <p>&copy; Chloe Chen 2022</p>
          </div>
  </footer>
</body>
<script>
 function add() {
     if(document.getElementById('all_light').style.display =='block'){
        document.getElementById('all_light').style.display = 'none';
         document.getElementById('contes').style.display = 'none';
     }else{
 document.getElementById('all_light').style.display = 'block';
 document.getElementById('contes').style.display = 'block';}
 }

</script>
</html>`);
    
  } catch(ex){
    next(ex);
  }
});


app.get('/api/homeworks', async(req, res, next)=>{
  try{
    res.send(await Homework.findAll());
  }
  catch(er){
    next(er);
}
    
  });
  
  app.get('/api/categories', async (req, res, next)=>{
    try{
      res.send(await Category.findAll());
    }
    catch(ex){
      next(ex);
    }
  });

app.get('/homeworks/:id', async (req,res,next)=>{
  try{
    const data = await Homework.findByPk(req.params.id, {include:[Category]});
    res.send(postDetail(data));
  }catch(error){
    next(error);
  }
});

app.post('/api/homeworks', async (req, res, next)=>{
  try{
    console.log("HiHI");
    console.log(req.params.body);
    res.status(201).send(await Homework.create(req.params.body));
  }
  catch(ex){console.log(req.params.body);next(ex)}
});

app.delete('/api/homeworks/:id', async(req,res,next)=>{
  try{
    const homeworkDel = await Homework.findByPk(req.params.id);
    await homeworkDel.destory();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});


app.get('/categories/:id', async (req,res,next)=>{
  try{
    const data = await Category.findByPk(req.params.id, {include:[Homework]});
  //  res.send(data);
    res.send(`
  <!DOCTYPE html>
  <html>

<head>
  <title>${data.name}</title>
  <link rel="stylesheet" href="/main.css"></link>
</head>

<body>

  <header id="down">
    <nav>
      <ul>
      <li><a href="https://github.com/FullstackAcademy/2204-FSA-RM-WEB-PT/tree/main/homework">GitHub</a></li>
      <li><a href="https://app.slack.com/client/T024FPYBQ/C03BUFQB50V/thread/C03BUFQB50V-1652020446.479649">Slack</a></li>
      <li><a href="#">Contact</a></li>
      </ul>
    <table>
      <tr>
        <td id="upCell">TOP</td>
      </tr>
      <tr>
        <td id="downCell">BOTTOM</td>
      </tr>
      </table>
      </nav>
  </header>
  
    <main>
      <div class="bigTitle">
         <h1> ${data.name}</h1>
      </div>
    </main>

    <section class="details">
      <div class="container">
        
       ${data.homework.map(currentValue=>{
         
         return `<div class="stuffs">
          <a href="/homeworks/${currentValue.id}"><h2>${currentValue.title}</h2></a>
        </div>`
       }).join('')} 
        
         <div class="stuffs">
          <a href="/">back</a>
        </div>
        
      </div>
    </section>
    
  <footer>
      <div class="container">
          <p>&copy; Chloe Chen 2022</p>
          </div>
  </footer>
</body>
<script type="text/javascript" src="main.js"></script>

</html>`);
  
  }catch(error){
    next(error);
  }
});

app.use((err, req, res, next)=>{
  console.log(chalk.red(err.stack));
  res.status(500).send({error: err.message});
});

const init = async() =>{
  try{
    await client.sync({force: true});
    const vanillaDom = await Category.create({name:'Vanilla DOM'});
    const dataBases = await Category.create({name:'Servers & Databases'});
    
    await Homework.create({title:'1st Homework', requirement1:'Name Your Repo dealers_choice_html_css', requirement2:'use what you have learned about html and css to create a web page about a topic you are interested in!', requirement3:'be creative!', categoryId: vanillaDom.id});
     await Homework.create({title:'2nd Homework', requirement1:'Name Your Repo dealers_choice_html_css_js', requirement2:'use what you have learned about html,css and javascript to create a web page about a topic you are interested in!', requirement3:'be creative!', categoryId: vanillaDom.id});
     
      await Homework.create({title:'3rd Homework', requirement1:'Name Your Repo dealers_choice_express_js', requirement2:'use what you have learned about express to create a web page about a topic you are interested in!', requirement3:'do not copy and paste code', categoryId: dataBases.id});
       await Homework.create({title:'4th Homework', requirement1:'Name Your Repo dealers-choice-express-pg', requirement2:'Create an express application which displays data stored in a postgres database', requirement3:'do not copy and paste code', categoryId: dataBases.id});
      await Homework.create({title:'5th Homework', requirement1:'name your database acme_express_seq', requirement2:'make sure to sync and seed your data, so that we can review the application!', requirement3:'make sure to have a start:dev script and include all your dependences in your package.json', categoryId: dataBases.id});
      
      const port = process.env.PORT || 3000;
      app.listen(port,()=>{
        console.log(`listening on port ${port}`);
      })
  }
  catch(ex){
    console.log(ex);
  }
};

init();

