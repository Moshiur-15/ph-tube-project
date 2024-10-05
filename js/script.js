const loadCateGories = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayCateGories(data.categories))
    .catch((err) => console.log(err))
}

const displayCateGories = (categories) =>{

    const cateGoriesContainer = document.getElementById("categorys");
    categories.forEach(items => {
        console.log(items);
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML =`
    <button id="btn-${items.category_id}" onclick="createOnclick(${items.category_id})" class="btn category-btn">${items.category}</button>
    `
    cateGoriesContainer.append(buttonContainer)
    });
}
loadCateGories()

// {
//     "category_id": "1003",
//     "video_id": "aaaf",
//     "thumbnail": "https://i.ibb.co/5LRQkKF/stick-and-stones.jpg",
//     "title": "Sticks & Stones",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/rdTZrCM/dev.jpg",
//             "profile_name": "Dave Chappelle",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "113K",
//         "posted_date": ""
//     },
//     "description": "Dave Chappelle's 'Sticks & Stones' has garnered 113K views and remains a controversial yet highly engaging piece of stand-up comedy. Known for his fearless approach, Dave dives into a wide range of topics, delivering his unique perspective with wit and sharp humor. As a verified artist, Dave's comedy is raw, honest, and unapologetically funny."
// }



const removeBtnStyle =()=>{
    const btnS = document.getElementsByClassName("category-btn");
    for(const btn of btnS){
        btn.style.backgroundColor = "";
        btn.style.color = "black";
    }
    console.log(btnS)
} 

const createOnclick = (id) =>{
    
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then((data) => {

        // remove btn
        removeBtnStyle()

        // add btn
        const activeButton = document.getElementById(`btn-${id}`);
        activeButton.style.backgroundColor = "red";
        activeButton.style.color = "white";
        

        displayVideos(data.category);
    })
    .catch((err) => console.log(err))
};

// Create Dynamic Video Sections
const loadVideos = (SearchText = '') =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${SearchText}`)
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch((err) => console.log(err))
};

// time covarter function
function getTimeString(time){
    const hour = parseInt(time / 3600);
    let persant = time % 3600;
    const minute = parseInt(persant / 60);
    persant = persant % 60;
    return `${hour} hour ${minute} minute ${persant} secund ago`
} 

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = '';

    if(videos.length == 0){
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `
            <div class="min-h-[300px] flex flex-col gap-5 items-center justify-center">
                <img src="./design/Icon.png" alt="">
                <h2 class="text-3xl font-bold text-center">Oops!! sorry , There is no <br> content here</h2>
            </div>
        `
        return;
    }
    else{
        videoContainer.classList.add("grid");
    }


    videos.forEach(video =>{
        console.log(video)
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
        <figure class="h-[250px] relative">
            <img class="w-full h-full object-cover"
            src=${video.thumbnail}
            alt="Shoes" />
            ${
                video.others.posted_date?.length == 0?"":`<span class = 'absolute right-3 bottom-3 bg-black p-1 rounded text-white text-xs'>${getTimeString(video.others.posted_date)}</span>`
            }
    </figure>
    <div class="px-0 py-8 flex gap-3">
        <div>
            <img class = "w-10 h-10 rounded-full" src=${video.authors[0].profile_picture}>
        </div>
        <div>
            <h2 class="font-bold text-xl">${video.title}</h2>
            <div class="flex items-center gap-3">
                <p class="text-sm text-gray-400 ">${video.authors[0].profile_name}</p>
                ${
                    video.authors[0].verified === true ? `<img class="w-5" src= "https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>`:''
                }
            </div>
            <p>${video.others.views}</p>
            <p><button onclick="buttonDetails('${video.video_id}')" class="btn btn-sm btn-error"> Details </button></p>
        </div>
        
    </div>
    `
    videoContainer.append(card)
    })
}

// button Details
const buttonDetails = async(videoId) =>{
    // console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`; 
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video);
} 

const displayDetails = (video) => {
    console.log(video);
    const modalContant = document.getElementById('modal-contant');
    modalContant.innerHTML = `
    <img src="${video.thumbnail}">
    <p>${video.description}</p>
    `;
    
    // way-1
    // document.getElementById("sow-modal").click();
    // way-2
    document.getElementById("my_modal_5").showModal();
}

document.getElementById("Search")
.addEventListener('keyup',(e)=>{
    loadVideos(e.target.value)
});


loadVideos();