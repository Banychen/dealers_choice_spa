   
   import axios from 'axios';
  
   const homeworkTitle = document.querySelector('#bigT');
   const detailList = document.querySelector('#detC');
   let homeworks;
   let categories;
   const form = document.querySelector('form');
   
   const renderHomework = async function (){
       try{
           homeworks = (await axios.get('/api/homeworks')).data;
          
       }catch(er){console.log(er)}
   };
   
    const renderCategory = async function (){
       try{
           categories = (await axios.get('/api/categories')).data;
       }catch(er){console.log(er)}
   };
   
   const init = async()=>{
       await renderCategory();
       await renderHomework();
       homeworkTitle.innerHTML = categories.map(function(currentValue){
            return  `<a href="categories/${currentValue.id}" class="btn">${currentValue.name} </a>
          <br>`
          }).join('');
          
        detailList.innerHTML = homeworks.map(function(currentValue){
          return `<div class="stuffs">
          <h2>${currentValue.title}</h2>
          <p>${currentValue.requirement1}</p>
          <a href="/homeworks/${currentValue.id}">Learn More<a><br>
        </div>`
        }).join(' ');
   }
   
init();

const title = document.querySelector("#title");
const requirement1 = document.querySelector("#requirement1");
const requirement2 = document.querySelector("#requirement2");
const requirement3 = document.querySelector("#requirement3");
const categoryId = document.querySelector('#categoryId');
    

const upCell=document.querySelector('#upCell');
const downCell=document.querySelector('#downCell');
const header=document.querySelector('header');
function changeHeaderPositionUp(){
    console.log("up");
    if(header.id=='up')return;
    else header.id='up';
}

function changeHeaderPositionDown(){
    console.log("down");
    if(header.id=='down'){console.log(header);return;}
    else {header.id='down';
    console.log(header);
    }
}

form.addEventListener('submit', async (ev)=>{
    ev.preventDefault();
    let tempTitle = title.value;
    let tempRequirement1 = requirement1.value;
    let tempRequirement2 = requirement2.value;
    let tempRequirement3 = requirement3.value;
    let tempCategoryId = categoryId.value;
    try{
    const response = await axios.post('/api/homeworks', {title:tempTitle, requirement1:tempRequirement1, requirement2:tempRequirement2, requirement3:tempRequirement3, categoryId:tempCategoryId}, { headers:{'Content-Type': "application/json"}});
    init();
   
    
    }catch(ex){
        console.log(ex.response.data);
    }
});

upCell.addEventListener('click',changeHeaderPositionUp);
downCell.addEventListener('click',changeHeaderPositionDown);