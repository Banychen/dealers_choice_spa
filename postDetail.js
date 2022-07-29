module.exports=(posts)=>`
  <!DOCTYPE html>
  <html>

<head>
  <title>${posts.title}</title>
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
          <h1> ${posts.title}</h1>
          <a href="/categories/${posts.category.id}" class="btn"> ${posts.category.name} </a>
      </div>
    </main>

    <section class="details">
      <div class="container">
        
        <div class="stuffs">
          <h2>1st Requirement</h2>
          <p>${posts.requirement1}</p>
        </div>
        
         <div class="stuffs">
          <h2>2nd Requirement</h2>
          <p>${posts.requirement2}</p>
        </div>
        
          <div class="stuffs">
          <h2>3rd Requirement</h2>
          <p>${posts.requirement3}</p>
        </div>
        
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

</html>`