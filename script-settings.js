

// UPLOAD USER'S PHOTO FUNCTION FOR SETTINGS PAGE

let chosenImage = document.getElementById("chosenImage");
let fileName = document.getElementById("fileName");
let uploadBtn = document.getElementById("uploadBtn");


uploadBtn.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(uploadBtn.files[0]);
    reader.onload= () => {
        chosenImage.setAttribute("src", reader.result);
        miniProfile.setAttribute("src", reader.result);
        // Stores data to local storage
        localStorage["uploadedPics"] = JSON.stringify([reader.result]);
    }
    fileName.textContent = uploadBtn.files[0].name;

    
}