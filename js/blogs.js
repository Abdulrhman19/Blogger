const wrapper = document.querySelector(".cards-wrapper");
const card = document.querySelector(".card");
const cardTitle = document.querySelector("#cardTitle");
const cardContent = document.querySelector("#cardText");
const postsNumber = document.querySelector("#postsNumber");
// const cardTitle = document.querySelector("#cardTitle");

const file = "./sample_posts.json";
fetch(file)
  .then((response) => response.json())
  .then((posts) => {
    posts = preparePosts(posts);
    wrapper.innerHTML = posts
      .map((post) => {
        return `<div class="row py-4 border">
        <div class="col-md-2 detail">
          <img
            src="https://joeschmoe.io/api/v1/male/random"
            class="card-img-top mx-auto rounded-circle"
            id="cardImg"
            alt="user-image"
          />
          <div class="author my-2">Post by: Abdulrhman</div>
          <div class="date" id="date">${post.pub_date}
          </div>
        </div>
        <div class="col-md-9 content">
          <div class="h2">${post.title}
          </div>
          <p class="text-center">
            ${post.content}
          </p>
        </div>
      </div>`;
      })
      .join("");

    getNumberOfPosts(posts);
  })
  .catch((error) => console.log(`Error: ${error}`));

const getNumberOfPosts = (posts) => {
  const numberOfPostsFromLocalStorage = window.localStorage.length;
  numberOfPostsFromLocalStorage === 0
    ? (postsNumber.innerHTML = `${posts.length} Posts Found`)
    : (postsNumber.innerHTML = `${
        posts.length + numberOfPostsFromLocalStorage -1
      } Posts Found`);
};


const preparePosts = (posts) => {
  const lengthOfLocalStorage = window.localStorage.length;
  if(lengthOfLocalStorage === 1) {
    return [JSON.parse(window.localStorage.getItem("post1")), ...posts];
  } else if(lengthOfLocalStorage > 1) {
    return allLocalStorageItems().concat(...posts);
  } else {
    return posts;
  }
}

const allLocalStorageItems = () => {
  let items = [];
  let keys = Object.keys(localStorage);
  let i = keys.length;

  while(i--) {
    items.push(JSON.parse(localStorage.getItem(keys[i])));
  }
  return items
}