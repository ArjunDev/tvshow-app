
const bodyContainer = document.querySelector(".body-container");
const searchBtn = document.querySelector("#search-btn");

initialLoad();
search();

//when webpage load for the first time
async function initialLoad(){
  try{
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=marvel`);

    if(!response.ok){
      throw new Error("Could not find resource!");
    }
    const queryData = await response.json();
    //to store querydata in localstorage
    localStorage.setItem('urlQueryData', JSON.stringify(queryData));
    const localData = JSON.parse(localStorage.getItem('urlQueryData')); 
    console.log(localData)
    renderData(localData); //passing localdata to render f
    //localStorage.clear();
  
    window.addEventListener('beforeunload', () => 
    localStorage.clear());
    //to clear data stored in localstorage upon closing window/tab.
  }
  catch(err){
    console.error(err);
  }
}

function search(){
//to get search input
searchBtn.addEventListener('click', function() {
  const inputText = document.querySelector("input");
  if(inputText.value){
    let searchQuery = inputText.value;
    fetchQueryData(searchQuery);
    inputText.value = ''
  } else {
    alert("Must enter a name of the Movie/TV show!")
  }
});
}

// to get a result for searchQuery
async function fetchQueryData(searchQuery){
  try{
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery}`);
    console.log(response);
    if(!response.ok){
      throw new Error("Could not find resource!");
    }

    const queryData = await response.json();
    console.log(queryData);
    console.log(searchQuery);

    //Clear the previous content before displaying new results
    bodyContainer.innerHTML = '';
    renderData(queryData);
  }
  catch(err){
    console.error(err);
  }
}
function renderData(data) {
  data.forEach(item => {
    const url = item.show.image.medium;
    const title = item.show.name;
    //const rating = item.show.rating.average;
    // if else using ternary opertor
    const rating = item.show.rating.average ? item.show.rating.average : 'N/A';
    const summary = item.show.summary;
    const movieList = document.createElement('div');
    movieList.classList.add('movies-list');
    movieList.innerHTML = 
      `<div class="summary">
        <h3>Summary:</h3></br>${summary}
      </div>
      <img src=${url}></img>
      </div>
      <div class="movie-info">
        <h5>${title}</h5>
        <span>${rating}</span>
      </div>`
    bodyContainer.appendChild(movieList);
  });
}