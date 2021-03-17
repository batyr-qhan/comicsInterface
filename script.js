function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function fetchingData(number) {
    fetch(`https://thingproxy.freeboard.io/fetch/http://xkcd.com/${number}/info.0.json`, {
        method: 'GET'
    }).then(res => res.json()).then(data => {
        let date = `${data.year}.${data.month}.${data.day}`;
        document.getElementById('picture').setAttribute('src', data['img']);
        document.getElementById('pictureLink').setAttribute('href', data['img']);
        document.getElementById('title').innerText = data['title'];
        document.getElementById('modalTitle').innerText = data['title'];
        document.getElementById('transcription').innerText = data['transcript'];
        document.getElementById('modalDate').innerText = date;
    }).catch((error) => {
        console.error('Error:', error);
        document.getElementById('centerBlock').innerText = "Please check internet connection"
    });
}

const firstComicIndex = 1;
const lastComicIndex = 2437;

let comicNum = getRandomInt(lastComicIndex);

fetchingData(comicNum);

let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');
let toTheFirstBtn = document.getElementById('toTheFirst');
let toTheLast = document.getElementById('toTheLast');
let randomBtn = document.getElementById('randomBtn');

toTheFirstBtn.addEventListener('click', () => {
    fetchingData(firstComicIndex);
});

prevBtn.addEventListener('click', () => {
    if (comicNum > 1) {
        comicNum = comicNum - 1;
        fetchingData(comicNum);
    }
});

nextBtn.addEventListener('click', () => {
    if (comicNum < lastComicIndex) {
        comicNum = comicNum + 1;
        fetchingData(comicNum);
    }
});

toTheLast.addEventListener('click', () => {
    fetchingData(lastComicIndex);
});

randomBtn.addEventListener('click', () => {
    let randomNum = getRandomInt(lastComicIndex);
    fetchingData(randomNum);
});

// Modal
let modal = document.getElementById('myModal');

// Get the button that opens the modal
let modalBtn = document.getElementById('modalBtn');

let span = document.getElementsByClassName("modal__close")[0];

modalBtn.onclick = function () {
    modal.style.display = 'block';
};

span.onclick = function () {
    modal.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Active tab
let btnContainer = document.getElementById("navbar");

let btns = btnContainer.getElementsByClassName("header__tab");

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}