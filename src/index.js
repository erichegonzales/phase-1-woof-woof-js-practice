const filterDiv = document.getElementById('filter-div')
const goodDogBtn = document.getElementById('good-dog-filter')
const dogBar = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')
const url = 'http://localhost:3000/pups'
let isOn = false;

const fetchDogs = async () => {
    let res = await fetch(url)
    let req = await res.json()
    return req
}

goodDogBtn.addEventListener('click', () => {
    isOn = !isOn
    if (isOn) {
        goodDogBtn.innerText = 'Filter good dogs: ON'
        filterDogs(isOn)
    }
    else {
        goodDogBtn.innerText = 'Filter good dogs: OFF'
        getDogs()
    }
})

const filterDogs = async (isOn) => {
    dogBar.innerHTML = ''  
    let dogs = await fetchDogs()
    dogs.forEach((dog) => {
        if (isOn && dog.isGoodDog) renderDogs(dog)
    })
}

const postDogs = async (dog) => {
    console.log(dog)
    let res = await fetch(`${url}/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            isGoodDog: dog.isGoodDog
        })
    })
    let req = await res.json()
    return req
}

const renderDogs = (dog) => {
    let span = document.createElement('span')
    let img = document.createElement('img')
    let h2 = document.createElement('h2')
    let btn = document.createElement('button')

    span.innerText = dog.name
    img.src = dog.image

    if (dog.isGoodDog) btn.innerText = 'Good Dog!'
    else btn.innerText = 'Bad Dog!'
    dogBar.append(span)

    span.addEventListener('click', () => {
        dogInfo.innerHTML = ''
        dogInfo.append(img, h2, btn)
    })

    btn.addEventListener('click', () => {
        if (isOn) span.remove(dog)
        dog.isGoodDog = !dog.isGoodDog
        if (dog.isGoodDog) btn.innerText = 'Good Dog!'
        else btn.innerText = 'Bad Dog!'
        postDogs(dog)
    })
}

const getDogs = async () => {
    let dogs = await fetchDogs()
    dogs.forEach((dog) => {
        renderDogs(dog)
    })
}
getDogs()