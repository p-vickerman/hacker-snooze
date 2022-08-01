
const orderedList = document.querySelector("ol");


let fetchArticleId = function () {
  fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
    .then(function (hres) {
      return hres.json();
    })
    .then(function (data) {

        let fetchArticle = function () {

            for (let i = 0; i < 100; i++) {
                console.log(i);
                fetch("https://hacker-news.firebaseio.com/v0/item/" + data[i] + ".json?print=pretty")
                .then(function (hres) {
                    return hres.json();
                })
                .then(function (article) {
                    console.log(article);
                    // Create list item
                    const newListItem = document.createElement("li");
                    newListItem.id = "newListItem"

                    // Create list item elements
                    const title = document.createElement("div");
                    const url = document.createElement("a");
                    const score = document.createElement("div");
                    const author = document.createElement("div");
                    const time = document.createElement("div");
                    const hide = document.createElement("div");
                    const comments = document.createElement("div");

                    // Add elements to list item.
                    newListItem.appendChild(title);
                    newListItem.appendChild(url);
                    newListItem.appendChild(score);
                    newListItem.appendChild(author);
                    newListItem.appendChild(time)
                    newListItem.appendChild(hide);
                    newListItem.appendChild(comments);

                    title.innerText = article.title;
                    url.innerText = article.url;
                    url.href = article.url;
                    url.target = "_blank";
                    score.innerText = article.score + " points"; // or `${article.score} points`
                    author.innerText = "by " + article.by;
                    let timeInMilliseconds = article.time * 1000;
                    let dateObject = new Date(timeInMilliseconds);
                    let standardDate = dateObject.toLocaleString();
                    time.innerText = standardDate;
                    hide.innertext = article.hide;

                    if (article.kids !== "") {
                    comments.innerText = article.kids.length + " comments";
                    }

                    orderedList.appendChild(newListItem);

                })         

            }

        };
        fetchArticle();
    });

};
fetchArticleId();