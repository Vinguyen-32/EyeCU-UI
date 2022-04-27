const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');
const logoText = document.getElementById('logoText');
const logo = document.getElementById('logo');

menuBar.addEventListener('click', function () {
    if (logoText.style.display != "none"){
        sidebar.classList.toggle('hide');
        logoText.style.display = "none";
        logo.style.width = "100%";
    }
    else {
        sidebar.classList.toggle('hide');
        logoText.style.display = "block";
        logo.style.width = "20%";
    }
})



const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})




// NAVBAR BUTTONS ONCLICK

let dashboard = document.getElementById("dashboard");
let myCamera = document.getElementById("myCamera");
let logout = document.getElementById("logout");
let settings = document.getElementById("settings");
let miniProfile = document.getElementById("miniProfile");

dashboard.onclick = function() {
    location.href = "dashboard.html";
}
myCamera.onclick = function() {
    location.href = "dashboard.html";
}
logout.onclick = function() {
    location.href = "index.html";
}
settings.onclick = function() {
    location.href = "userProfile.html";
}
miniProfile.onclick = function() {
    location.href = "userProfile.html";
}

//LOGO AUTOPLAY

const SHUTTER_WING_COUNT = 8;

let r = 80,
    arc = (x, y, s) => `A${r},${r},0,0,${s},${x},${y}`,
    path = (i, d) => `<path transform='rotate(${i / +SHUTTER_WING_COUNT * 360})' ${d}></path>`;

function upd(val) {
    // Animate shutter
    let step = Math.PI * (0.5 + 2 / +SHUTTER_WING_COUNT);
    let p1x = Math.cos(step) * r;
    let p1y = Math.sin(step) * r;
    let cos = Math.cos(-val);
    let sin = Math.sin(-val);
    let c1x = p1x - cos * p1x - sin * p1y;
    let c1y = p1y - cos * p1y + sin * p1x;
    let dx = - sin * r - c1x;
    let dy = r - cos * r - c1y;
    let dc = Math.sqrt(dx * dx + dy * dy);
    let a = Math.atan2(dy, dx) - Math.acos(dc / 2 / r);
    let x = c1x + Math.cos(a) * r;
    let y = c1y + Math.sin(a) * r;

    let edge = `M${p1x},${p1y}${arc(0, r, 0)}${arc(x, y, 1)}`;
    edges.innerHTML = bodies.innerHTML = '';
    for (let i = 0; i < +SHUTTER_WING_COUNT; i++) {
        edges.innerHTML += path(i, `fill=none stroke=white d='${edge}'`);
        bodies.innerHTML += path(i, `fill=var(--dark-grey) d='${edge}${arc(p1x, p1y, 0)}'`);
    }

    // Animate user
    user.style.opacity = (1 - val * 2);

    // Animate check
    checkmark.style.opacity = (1 - val * 8);
};

upd(0.5);

let direction = 1;
let renderRatio = 0;
let step = 0.01;
let rest = 0;

setInterval(function(){
    if (rest > 0){
        rest -= step;
    }
    else {
        upd(renderRatio * 1.04);
        renderRatio += (step * direction);
        if (renderRatio < 0.001){
            rest = step * 100;
        }

        if (renderRatio > 1.04 || renderRatio < 0){
            direction *= -1;
            renderRatio += (2 * step * direction);
        }
    }
}, 10);



function toggleLock() {
    let lockIcon = document.getElementById("lock-icon");
    let unlockIcon = document.getElementById("unlock-icon");
    let lockBtn = document.getElementById("lock-btn");

    if (lockIcon.style.display == "none") {
        lockIcon.style.display = "flex";
        unlockIcon.style.display = "none";
        lockBtn.classList.remove("lock-btn");
        lockBtn.classList.add("unlock-btn");
        lockBtn.innerHTML = "Unlock";
    }
    else {
        lockIcon.style.display = "none";
        unlockIcon.style.display = "flex";
        lockBtn.classList.remove("unlock-btn");
        lockBtn.classList.add("lock-btn");
        lockBtn.innerHTML = "Lock";
    }
}

function playVideo(file) {
    let displayImg = document.getElementById("displayImg");
    let playButton = document.getElementById("playButton");
    let videoFeature = document.getElementById("videoFeature");

    videoFeature.innerHTML =
        `
        <video width="100%" height="auto" class="feature-img" autoplay controls>
            <source src="img/video.mp4" type="video/mp4">
        </video>
    `

    displayImg.classList.remove();
    displayImg.style.display = "block";
    playButton.style.display = "none";
}

function getUploadedPictures(cb){
    let uploadedPics = localStorage["uploadedPics"] ? JSON.parse(localStorage["uploadedPics"]) : null;

    return cb(null, uploadedPics || 
    [
        // make API call to server to get the current pictures
        "img/user-upload.png"
    ]);
}

getUploadedPictures(function(error, pictures) {
    console.log(pictures);
    miniProfile.setAttribute("src", pictures[0] || "img/woman.png");
    chosenImage.setAttribute("src", pictures[0] || "img/woman.png");
})