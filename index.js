console.log("This is my index js file");

let language = "hi";
let apiKey = "d2ee39c32681a91d37db325788bba5c5";
let newsCards = document.getElementById("newsCards");
let newsDescriptionHeader= document.getElementById("newsDescriptionHeader");
let categoryHeader= document.getElementById("categoryHeader");
let inputKeywords= document.getElementById("inputKeywords");
let topHeadlines= document.getElementById("topHeadlines");
let sortBy= document.getElementById("sortBy");
let sortByValue= "";
let inputKeywordsValue;

function showRequestedArticles(request){
  const xhr = new XMLHttpRequest();
  xhr.open("GET", request, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      let articles = json.articles;
      let newsHtml = "";
      articles.forEach(function (element, index) {
        let news = `<div class="row g-0 my-3">
        <div class="col-md-4">
          <img src="${element["image"]}" onerror="this.onerror=null; this.src='No_Image_Available.jpg';" alt="" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${element["title"]}</h5>
            <p class="card-text">${element["content"]}</p>
            <a href="${element["url"]}" target="_blank" class="btn btn-primary">Read More</a>
            <div>
                <span class="card-text"><small class="text-muted">${element.source.name}</small></span>
                <span class="card-text"><small class="text-muted">${element.publishedAt}</small></span>
            </div>
          </div>
        </div>
      </div>`;
        newsHtml += news;
      });
      if(json.totalArticles==0){
        if(language=="en") newsCards.innerHTML= `<div class="container noArticles">
        <h3>
          Sorry! There are no articles available for your Search .
        </h3>
        <p>Try searching with relevant keywords. Some popular searches are:</p>
        <ul>
          <li>Agnipath Scheme</li>
          <li>Agricultue Bills</li>
          <li>COVID-19</li>
          <li>Save Soil Movement</li>
          <li>Ukrain War</li>
        </ul>
      </div>`;
        else newsCards.innerHTML= `<div class="container noArticles">
        <h3>
          Sorry! There are no articles available in this language .
        </h3>
        <p>Try out with other languages. Some recommendations are:</p>
        <ul>
          <li>English</li>
          <li>Hindi</li>
        </ul>
      </div>`;
      }
      else newsCards.innerHTML = newsHtml;
    } else {
      console.log("Some error occured");
    }
  };

  xhr.send();
}

function showTopHeadlines() {

  categoryHeader.style.display= "block";
  sortBy.style.display= "none";
  
  newsDescriptionHeader.innerHTML= `Top Headlines by <span class="badge bg-secondary">Indian shatabdi News</span>`;
  let request = `https://gnews.io/api/v4/top-headlines?lang=${language}&token=${apiKey}`; // At the start of page loading

  showRequestedArticles(request);
  
}

let categories = [
  "business",
  "entertainment",
  "technology",
  "sports",
  "science",
  "health",
  "nation",
];
categories.forEach((category) => {
  let cat = document.getElementById(category);
  cat.addEventListener("click", (e) => {
    // console.log("Button Clicked");
    console.log("Button Clicked " + language);
    newsDescriptionHeader.innerHTML= `Top ${category} articles by <span class="badge bg-secondary">Indian shatabdi News</span>`;

    request = `https://gnews.io/api/v4/top-headlines?topic=${category}&lang=${language}&token=${apiKey}`;
    console.log(request);
    showRequestedArticles(request);
  });
});


let languages = document.getElementsByClassName("lang");
Array.from(languages).forEach((element) => {
  element.addEventListener("click", function (e) {
    let lang = element.id;
    console.log(lang);
    language = lang;
    if(categoryHeader.style.display != "none"){ 
      showTopHeadlines();}
    else{
      showSearchedArticles();}
  });
});


topHeadlines.addEventListener("click", (e)=>{
  showTopHeadlines();
});



function showSearchedArticles(){

  newsDescriptionHeader.innerHTML= `Top Articles relavant to ${inputKeywordsValue}`;
  console.log("In searched articles "+ sortByValue);
  let request = `https://gnews.io/api/v4/search?q=${inputKeywordsValue}&sortBy=${sortByValue}&lang=${language}&token=${apiKey}`; 
  showRequestedArticles(request);
}

let searchKeywords= document.getElementById("searchKeywords");
searchKeywords.addEventListener("click", (e)=>{
  categoryHeader.style.display= "none";
  sortBy.style.display= "block";
  inputKeywordsValue= inputKeywords.value;
  inputKeywords.value= "";
  language= "en";
  sortByValue= "";
  console.log("Search Button Clicked");
  showSearchedArticles();
  e.preventDefault();
})

let sortByItem = document.getElementsByClassName("sortBy-item");
Array.from(sortByItem).forEach((element) => {
  element.addEventListener("click", function (e) {
    sortByValue = element.id;
    console.log(sortByValue);
    showSearchedArticles();
  });
});

window.onload= showTopHeadlines();
