const taxonomyForm = document.getElementById("taxonomyForm");
const topic = document.getElementById("topic");
const subtopic = document.getElementById("subtopic");
const concept = document.getElementById("concept");
const subconcept = document.getElementById("subconcept");
const submitButton = document.getElementById("submitButton");
const buttonSpinner = document.getElementById("buttonSpinner");
const buttonText = document.getElementById("buttonText");
const successAlert = document.getElementById("success");
const unknownError = document.getElementById("unknownError");

function afterSubmit(e){
    e.preventDefault();

    if (taxonomyForm.checkValidity() === false){
        event.stopPropagation();
        for(field of taxonomyForm.elements){
            if(!field.checkValidity()){
                field.classList.add("is-invalid");
            }
        }
        return;
    }

    for(field of taxonomyForm.elements){
        field.classList.remove("is-invalid");
    }

    let saveInfo = {
        topic: topic.value,
        subTopic: subtopic.value,
        concept: concept.value,
        subConcept: subconcept.value
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
    })
    .catch(err => {
        console.log(err);
        if(err){
            unknownError.classList.remove("d-none");
            setTimeout(function(){
                unknownError.classList.add("d-none");
                buttonText.textContent = "Send";
                buttonSpinner.classList.add("d-none");
                submitButton.disabled = false;
            },3000);
        }
        
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