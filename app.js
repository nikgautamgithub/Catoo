//API_KEY live_nFsybKc64YSKEG947lWFLZabJuFJQUiyxxDN2AXoa5GqSojbB6cDCeZwUy06P2Nw
const api_key =
    "live_nFsybKc64YSKEG947lWFLZabJuFJQUiyxxDN2AXoa5GqSojbB6cDCeZwUy06P2Nw";

//Grabbing the element for catoo image
const catImage = document.querySelector(".cat>img");
const body = document.querySelector(".body"); //Element for background

//Background
const generateGradient = () => {
    //To output a volue between 0 and 360 in degrees to be given to the linear-gradient.
    let deg = Math.round(Math.random() * 360);

    // This output is a whole number between 0 & 255 and can be assigned as values for the rgba() property.
    let r1 = Math.round(Math.random() * 255);
    let g1 = Math.round(Math.random() * 255);
    let b1 = Math.round(Math.random() * 255);

    // for alpha values we need between 0 & 1
    let a1 = Math.round(Math.random() * 10) / 10; // to add random transparency to the image;

    let r2 = Math.round(Math.random() * 255);
    let g2 = Math.round(Math.random() * 255);
    let b2 = Math.round(Math.random() * 255);

    let a2 = Math.round(Math.random() * 10) / 10; // to add random transparency to the image;

    //Set the background to the gradient
    body.style.background = `linear-gradient(${deg}deg, rgba(${r1},${g1},${b1},${a1}), rgba(${r2},${g2},${b2},${a2}))`;
};

// localStorage.clear();
//grab element for the liked photos to show
const likedPhotos = document.querySelector(".liked-photos");

//add photo URL to the local storage
const addPhoto = url => {
    localStorage.setItem(url, 1);

    let imgList = document.createElement('li');
    imgList.className = 'img cards';
    imgList.style.backgroundImage = `url(${url})`;
    imgList.style.backgroundSize = 'cover';
    
    let button = document.createElement('button');
    button.innerText = 'X';
    button.className = 'del-button';
    imgList.appendChild(button);

    let download = document.createElement('a');
    download.href = url;
    download.target = '_blank';
    download.download = '';
    download.innerText = '✔';
    imgList.appendChild(download);

    likedPhotos.appendChild(imgList);
};

//delete photo URL from the local storage
const deleteButton = (e) =>{
    if(e.target.classList.contains('del-button')){
        if(confirm('Are you sure you want to remove this catoo?')){
            let li = e.target.parentElement;
            let deleteURL = e.target.parentElement.style.backgroundImage; //getting the url('imageURL');
            deleteURL = deleteURL.replace('url("',''); //removing url(" from imageURL
            deleteURL = deleteURL.replace('")',''); // removing ") from imageURL
            localStorage.removeItem(deleteURL); //delete photo URL from localStorgae
            document.querySelector('.liked-photos').removeChild(li);
        }
    }
};


//fetchImage from api
const fetchImage = () => {
    fetch(`https://api.thecatapi.com/v1/images/search?api_key=${api_key}`)
        .then((response) => response.json())
        .then((json) => {
            // add gif for loading screen
            catImage.src = 'https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif';
            
            //LAZY LOADING
            //until the image is fully loaded the catImage src will be the loading gif
            const loading = document.createElement('img');
            loading.addEventListener('load',() => {
                catImage.src = loading.src; //when the image is fullt loaded the catImage src will be changed to cat image
            });
            let imageURL = loading.src = json[0].url; 

            // when OMAGAH! is clicked 
            document.querySelector(".liked").onclick = () => {
                if (localStorage.getItem(imageURL) != 1) addPhoto(imageURL);
            };
        });
};

//Fetch another cat image and dislay a new cat image
document.querySelector(".new-cat").onclick = () => {
    fetchImage();
    generateGradient();
};

//Listens to the event if any saved image is clicked
document
    .querySelector('.liked-photos')
    .addEventListener('click',deleteButton);

//First Image of session is fetched 
  fetchImage();

//Fetch previously liked photos from local storage
let key = Object.keys(localStorage);
key.forEach((likedURL) => {
    addPhoto(likedURL);
});
