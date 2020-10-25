import 'bootstrap/dist/css/bootstrap.css';

const phoneUrl = 'https://denkoldehane.dk/CA2/api/person/phone/';

document.getElementById('phoneInputField').addEventListener("input", getPersonByPhone);

function getPersonByPhone() {

document.getElementById("phoneTable").innerHTML = "";

let phoneNumber = document.getElementById('phoneInputField').value;
let finalPhoneUrl = phoneUrl + phoneNumber;

const options = makeOptions("GET");

fetch(finalPhoneUrl, options)
.then(res=>fetchWithErrorCheck(res))
.then(data => {
    showPersonByPhone(data);
});
}

function showPersonByPhone(data) {
    var table = document.getElementById("phoneTable");
    table.innerHTML = "";
    var tr = "";
    tr = '<tr>' + '<td>' + data.fName + '</td>' + '<td>' + data.lName + '</td>' + '<td>' + data.street + '</td>' + '<td>' + data.zip + '</td>' + '</tr>';
    table.innerHTML = tr;
};

const hobbyUrl = 'https://denkoldehane.dk/CA2/api/person/hobby/';

document.getElementById('hobbyInputField').addEventListener("input", getPersonsByHobby);

function getPersonsByHobby() {

let hobby = document.getElementById('hobbyInputField').value;
let finalHobbyUrl = hobbyUrl + hobby;

const options = makeOptions("GET");

fetch(finalHobbyUrl, options)
.then(res=>fetchWithErrorCheck(res))
.then(data => {
    showPersonsByHobby(data);
});
}

function showPersonsByHobby(data) {
    var table = document.getElementById("hobbyTable");
    table.innerHTML = "";
    var tr = "";
data.forEach(x => {
    tr += '<tr>' + '<td>' + x.fName + '</td>' + '<td>' + x.lName + '</td>' + '<td>' + x.street + '</td>' + '<td>' + x.zip + '</td>' + '</tr>';
});
    table.innerHTML = tr;
    console.log(tr);
};



addusr.onclick = function () {

    let url2 = 'https://denkoldehane.dk/CA2/api/person';

    let email = document.getElementById('emailInput').value;
    let fName = document.getElementById('fNameInput').value;
    let lName = document.getElementById('lNameInput').value;
    let street = document.getElementById('adrInput').value;
    let additInfo = document.getElementById('additAdrInput').value;
    let zip = document.getElementById('zipInput').value;
    let hobbyName = document.getElementById('hobbyInput').value;
    let phNumber = document.getElementById('phoneInput').value;
    let descrip = document.getElementById('phoneTypeInput').value;

        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                fName,
                lName,
                street,
                additInfo,
                zip,
                hobbyName,
                phNumber,
                descrip
            })
        }
        console.log(options);


    fetch(url2, options)
.then(res=>fetchWithErrorCheck(res))
.then(data => {
    showAddedPerson(data);
    document.getElementById('emailInput').value = '';
    document.getElementById('fNameInput').value = '';
    document.getElementById('lNameInput').value = '';
    document.getElementById('adrInput').value = '';
    document.getElementById('additAdrInput').value = '';
    document.getElementById('zipInput').value = '';
    document.getElementById('hobbyInput').value = '';
    document.getElementById('phoneInput').value = '';
    document.getElementById('phoneTypeInput').value = '';
});

}

function showAddedPerson(data) {
    var table = document.getElementById("personTable");
    table.innerHTML = "";
    var tr = "";
    tr = '<tr>' + '<td>' + data.email + '</td>' + '<td>' + data.fName + '</td>' + '<td>' + data.lName + '</td>' + '</tr>';
    table.innerHTML = tr;
};



function makeOptions(method) {
    var opts = {
        method: method,
        headers: {
            "Content-type": "text/plain",
            
        }
    }
    return opts;
};

function fetchWithErrorCheck(res){
    if(!res.ok){
      return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
}