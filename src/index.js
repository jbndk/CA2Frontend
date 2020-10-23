import 'bootstrap/dist/css/bootstrap.css';
import regeneratorRuntime from "regenerator-runtime";

const tb = document.getElementById('tb');
const url = 'https://denkoldehane.dk/CA2/api/person/phone/';

document.getElementById('phoneInputField').addEventListener("input", getPersonByPhone);

function getPersonByPhone() {

let phoneNumber = document.getElementById('phoneInputField').value;
let finalUrl = url + phoneNumber;

const options = makeOptions("GET");

fetch(finalUrl, options)
.then(res=>fetchWithErrorCheck(res))
.then(data => {
    console.log(data);
    showPerson(data);
});
}

function showPerson(data) {
    var table = document.getElementById("phoneTable");
    table.innerHTML = "";
    var tr = "";
    tr = '<tr>' + '<td>' + data.fName + '</td>' + '<td>' + data.lName + '</td>' + '<td>' + data.street + '</td>' + '<td>' + data.zip + '</td>' + '</tr>';
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