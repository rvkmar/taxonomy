const taxonomyForm = document.getElementById("taxonomyForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const phone = document.getElementById("phone");
const city = document.getElementById("city");
const submitButton = document.getElementById("submitButton");
const buttonSpinner = document.getElementById("buttonSpinner");
const buttonText = document.getElementById("buttonText");
const successAlert = document.getElementById("success");

function afterSubmit(e){
    e.preventDefault();

    let saveInfo = {
        topic: firstName.value,
        subTopic: lastName.value,
        concept: phone.value,
        subConcept: city.value
    };

    const url = "https://script.google.com/macros/s/AKfycbxtrLIML8ctlLMO4fx7sNNDIJXDM9yubFVLI3uv0IXsxpvcZ927MjNK0xCiMOBGUtSB/exec";
    
    buttonText.textContent = "Sending...";
    buttonSpinner.classList.remove("d-none");
    submitButton.disabled = true;

    fetch(url,{
        method: 'POST',
        cache: 'no-cache',
        redirect: 'follow', 
        body: JSON.stringify(saveInfo) 
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        buttonText.textContent = "Send";
        buttonSpinner.classList.add("d-none");

        setTimeout(function(){
            successAlert.classList.add("d-none");
        },3000);
        successAlert.classList.remove("d-none");
        taxonomyForm.reset();
        submitButton.disabled = false;
        submitButton.classList.remove("d-none");
    });
}

taxonomyForm.addEventListener("submit",afterSubmit);


// Old code
// const url = "https://script.google.com/macros/s/AKfycbxtrLIML8ctlLMO4fx7sNNDIJXDM9yubFVLI3uv0IXsxpvcZ927MjNK0xCiMOBGUtSB/exec";

// function testGS(){
//     fetch(url)
//     .then(d => d.json())
//     .then(d => {
//         document.getElementById("app").textContent = d[0].status;
//     })
// }

// function addGS(){
//     fetch(url,{
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'no-cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         // credentials: 'omit', // include, *same-origin, omit
//         headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow', // manual, *follow, error
//         // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify({name:"Ravikumar Rajabhather"}) // body data type must match "Content-Type" header
//     });
// }

// document.getElementById("btn").addEventListener("click",testGS);
// document.getElementById("btn2").addEventListener("click",addGS);