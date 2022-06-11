import './index.scss';

const URL = "https://dog.ceo/api"
const breedsContainer = document.querySelector('.items');
const imgBackground = document.querySelector(' .featured-dog__background')
const imgSrc = document.querySelector('img')
const spinner = document.querySelector('.spinner')

    const showLoading = () => {
        spinner.classList.add('spinner--visible')
    }
    const closeLoading = () => {
        spinner.classList.remove('spinner--visible')
    }

    const getRandomImage = () => {
        showLoading()
        fetch(`${URL}/breeds/image/random`)
        .then(resp => resp.json())
        .then(data => {

            imgSrc.setAttribute('src', data.message)
            imgBackground.style.background = `url("${data.message}")`
            closeLoading()
        })
    }


    const getImagebyBreed = (type) => {
        showLoading()
        fetch(`${URL}/breed/${type}/images/random`)
        .then(resp => resp.json())
        .then(data => {

            imgSrc.setAttribute('src', data.message)
            imgBackground.style.background = `url("${data.message}")`
            closeLoading()
        })
    }


    const breedsList = () => {
        showLoading()
        fetch(`${URL}/breeds/list/all`)
        .then(resp => resp.json())
        .then(data => {

        const allBreeds = data.message;

        showBreeds(allBreeds);
        closeLoading();
        })
    }



    const addBreed = (breed, subBreed) => {

       let name;
       let type;

        if (typeof subBreed === "undefined") {
            name = breed;
            type = breed;
        } else {
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
                window.scrollTo(0, 0);
                getImagebyBreed(type);
            })
    }


    const showBreeds = (allBreeds) => {

        for (const breed in allBreeds) {
            if (allBreeds[breed].length === 0) {
                addBreed(breed)
            } else {
                for (const subBreed of allBreeds[breed]) {
                    addBreed(breed, subBreed)
                }
            }
        }
    
    }

breedsList()
document.addEventListener("DOMContentLoaded", getRandomImage())