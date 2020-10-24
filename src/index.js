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


function makeOptions(method) {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
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