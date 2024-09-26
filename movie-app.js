/*
fetchData();
async function fetchData(){
  
  try{
    const response = await fetch("https://api.tvmaze.com/search/shows?q=girls");
    if(!response.ok){
      throw new Error("Could not find resource!");
    }
    const data = await response.json();
    console.log(data);
    const imageEl = document.querySelector("img");
    const posterUrl = data.Poster;
    imageEl.src = posterUrl;
    
  }
  catch(err){
    console.error(err);
  }
*/  
const bodyContainer = document.querySelector(".body-container");
const searchBtn = document.querySelector("#search-btn");

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


// to get a result for searchQuery
async function fetchQueryData(searchQuery){
  try{
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery}`);

    if(!response.ok){
      throw new Error("Could not find resource!");
    }

    const queryData = await response.json();
    console.log(queryData);
    console.log(searchQuery);
    queryData.forEach(item => {
      const url = item.show.image.medium;
      const title = item.show.name;
      const rating = item.show.rating.average;
      const movieList = document.createElement('div');
      movieList.classList.add('movies-list');
      movieList.innerHTML = 
        `<img src=${url}></img>
        <div class="movie-info">
        <h3>${title}</h3>
        <span>${rating}</span>
        </div>`;
      bodyContainer.appendChild(movieList);
    });
  }
  catch(err){
    console.error(err);
  }
}

/*
      const posterUrl = movie.show.image.medium;
      const imageEl = document.createElement("img");
      imageEl.src = posterUrl;
      bodyContainer.appendChild(imageEl);
    */