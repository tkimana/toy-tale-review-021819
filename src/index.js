const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const nameInput = document.querySelector('.name-input')
const imageInput = document.querySelector('.image-input')
const container = document.querySelector('#toy-collection')

let addToy = false


// function fetchToys(){ 
// Same as:
const fetchToys = function(){
  fetch('http://localhost:3001/toys')
    .then(function(response){
      return response.json()
    })
    .then(function(toys){
      toys.forEach(function(toy){
        renderToyCard(toy)
      })
    })
}
fetchToys() 

const renderToyCard = function(toy){
  container.append(
    div({ class: 'card' },
      h2(toy.name),
      img({ src: toy.image, class: 'toy-avatar' }), 
      p(`${toy.likes} likes`, { class: `likes-${toy.id}` }),
      button('Like <3', {
          class: 'like-btn',
          click: function(){
            likeToy(toy)
          }
      })
    )
  )
}

// Update

const likeToy = function(toy){
  toy.likes++
  const toyLikes = document.querySelector(`.likes-${toy.id}`)
  toyLikes.innerText = `${toy.likes} likes`
  fetch(`http://localhost:3001/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'      
    },
    body: JSON.stringify(toy)
  })
}

const createToy = function(){
  fetch('http://localhost:3001/toys', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      image: imageInput.value,
      likes: 0
    })
  })
    .then(function(response){
      return response.json()
    })
    .then(function(toy){
      renderToyCard(toy)
    })
}

toyForm.addEventListener('submit', function(e){
  e.preventDefault()
  createToy()
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})