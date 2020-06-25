let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const addToyForm = document.getElementsByClassName('add-toy-form')[0];
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");

  function likeToy(e){
    console.log(e.target.previousElementSibling)
    console.log(e.target.id)
    let likesNum = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
   method: 'PATCH',
   headers: {
     'Content-Type': 'application/json',
    Accept: "application/json"
   },
   body: JSON.stringify({
     "likes": likesNum
   })
 }).then(response => response.json())
    .then(data => {
     e.target.previousElementSibling.innerText = `${likesNum} likes`;
 })
}
  function postToy(toy){
  fetch("http://localhost:3000/toys", {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
    Accept: "application/json"
   },
   body: JSON.stringify({
     "name": toy.name.value,
     "image": toy.image.value,
     "likes": 0
   })
 }).then(response => response.json())
    .then((data) => {
      let newToy = renderToy(data)
      toyCollection.appendChild(newToy)
    }
)}

  function renderToy(toy){

      // <h2>Woody</h2>
        const toyName = document.createElement("h2")
        toyName.innerText = toy.name
        // <img src=toy_image_url class="toy-avatar" />
        const toyImg = document.createElement("img")
        toyImg.src = toy.image
        toyImg.className = "toy-avatar"

        // <p>4 Likes </p>
        const toyLikes = document.createElement("p")
        toyLikes.innerHTML = `${toy.likes} likes`

        // <button class="like-btn">Like <3</button>
        const toyButton = document.createElement("button")
        toyButton.className = ("like-btn")
        toyButton.innerText = "like"
        toyButton.id = toy.id
        toyButton.addEventListener("click", (e) => {
                likeToy(e)
        })
        // <div class="card">
        const div = document.createElement("div")
           div.className = "card"

           div.appendChild(toyName)
            div.appendChild(toyImg)
             div.appendChild(toyLikes)
              div.appendChild(toyButton)
        toyCollection.appendChild(div)

  }

  function getToys(){
    fetch("http://localhost:3000/toys")
     .then(response => response.json())
     .then(data => {

         data.forEach(e =>
           renderToy(e)
         )


     })
  }
getToys()

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      //submit listener

      addToyForm.addEventListener("submit", function(e){
        e.preventDefault()
         postToy(e.target)
        // console.log(e.name.value)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
 })
