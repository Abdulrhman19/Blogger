const wrapper = document.querySelector(".cards-wrapper");
const card = document.querySelector(".card");
const cardTitle = document.querySelector("#cardTitle");
const cardContent = document.querySelector("#cardText");
const addPostBtn = document.querySelector("#addPostBtn");
// const cardTitle = document.querySelector("#cardTitle");

const file = "./sample_posts.json";

let postsTracker = 1;

fetch(file)
  .then((response) => response.json())
  .then((posts) => {
    posts = getAllowdPosts(posts);
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
  })
  .catch((error) => console.log(`Error: ${error}`));

addPostBtn.addEventListener("click", () => {
  const newTitle = document.querySelector("#newTitle").value;
  const newContent = document.querySelector("#newContent").value;

  const currentDate = new Date();
  const d = currentDate.getDay();
  const m = currentDate.getMonth();
  const y = currentDate.getFullYear();

  console.log(date);
  console.log(m, d, y);

  const formattedDate = `${m}/${d}/${y}`;

  const newPost = {
    title: newTitle,
    content: newContent,
    pub_date: formattedDate,
  };

  addPost(newPost);
  postsTracker++;
});

const addPost = (newPost) => {
  window.localStorage.setItem(`post${postsTracker}`, JSON.stringify(newPost));

  const newTitle = (document.querySelector("#newTitle").value = "");
  const newContent = (document.querySelector("#newContent").value = "");
  window.open("./blogs.html");
};

const getAllowdPosts = (posts) => {
  const allowdPosts = 3;
  if (window.localStorage.length === 0) {
    return posts.slice(0, allowdPosts);
  } else if (window.localStorage.length > 0 && window.localStorage.length < 3) {
    const diff = allowdPosts - window.localStorage.length;
    if (diff === 1) {
      return [
        JSON.parse(window.localStorage.getItem("post1")),
        JSON.parse(window.localStorage.getItem("post2")),
        posts[0],
      ];
    } else if (diff === 2) {
      return [
        JSON.parse(window.localStorage.getItem("post1")),
        posts[0],
        posts[1],
      ];
    }
  } else if (window.localStorage.length >= 3) {
    return [
      JSON.parse(window.localStorage.getItem("post1")),
      JSON.parse(window.localStorage.getItem("post2")),
      JSON.parse(window.localStorage.getItem("post3")),
    ];
  }
};

// window.localStorage.length = 2
// diff = 3 - 2 === 1
// window.localStorage.length + diff ===  3 => True, then
// posts.slice(0, )

