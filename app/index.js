import './index.scss';

const URL = "https://dog.ceo/api"
const breedsContainer = document.querySelector('.items');
const imgBackground = document.querySelector(' .featured-dog__background')
const imgSrc = document.querySelector('img')


    const getRandomImage = () => {
        fetch(`${URL}/breeds/image/random`)
        .then(resp => resp.json())
        .then(data => {

            
            imgSrc.setAttribute('src', data.message)
            imgBackground.style.background = `url("${data.message}")`

        })
    }

    const getImagebyBreed = (type) => {
        fetch(`${URL}/breed/${type}/images/random`)
        .then(resp => resp.json())
        .then(data => {

            imgSrc.setAttribute('src', data.message)
            imgBackground.style.background = `url("${data.message}")`
        })
    }



    const breedsList = () => {
        fetch(`${URL}/breeds/list/all`)
        .then(resp => resp.json())
        .then(data => {

        const allBreeds = data.message;

        showBreeds(allBreeds);

        })
    }



    const addBreed = (breed, subBreed) => {

       // console.log(breed, subBreed)
       let name;
       let type;

        if (typeof subBreed === "undefined") {
            // console.log(`1 czlonowa nazwa: ${breed}`)

            name = breed;
            type = breed;

        } else {
            // console.log(`2-czlonowa nazwa: ${breed, subBreed}`)

            name = `${breed} ${subBreed}`;
            type = `${breed}/${subBreed}`;
        }

          const newItem = document.createElement('div')
            newItem.classList.add('items__title')

            newItem.innerHTML = `
                    <div class="items__title-content">
                        ${name}
                    </div>
            `
            breedsContainer.appendChild(newItem)   
            newItem.addEventListener('click', () => {
                getImagebyBreed(type);
            })
    }


    const showBreeds = (allBreeds) => {

        for (const breed in allBreeds) {
            // console.log(breed, allBreeds[breed]);
            if (allBreeds[breed].length === 0) {
                addBreed(breed)
            } else {
                // console.log(allBreeds[breed])
                for (const subBreed of allBreeds[breed]) {
                    addBreed(breed, subBreed)
                    // console.log(breed + '/' + subBreed)
                }
            }
        }
    
    }



breedsList()
document.addEventListener("DOMContentLoaded", getRandomImage())