import 'bootstrap/dist/css/bootstrap.css';
import regeneratorRuntime from "regenerator-runtime";

const tb = document.getElementById('tb');
const url = 'https://denkoldehane.dk/CA2/api/person/phone/';

document.getElementById('phoneInputField').addEventListener("input", getPersonByPhone);

phoneSearchNav.onclick = function () {
    document.getElementById('headline').innerHTML = "Welcome to the phone search page!";
    document.getElementById('div1').innerHTML = '<form><div class="form-group"><label for="phoneInput">Please enter a phone number:</label><input type="phone" class="form-control" id="phoneInputField" placeholder="Phone number here"><small id="emailHelp" class="form-text text-muted">Only numbers are allowed - please do not include country code.</small></div>'
}

apiNav.onclick = function () {
    document.getElementById('headline').innerHTML = "<h3>REST API documentation</h3>";

    var table = document.getElementById('div1');
    table.innerHTML = "";
    var tableData = "";
    tableData = '<table class="table"> <tr> <th>Method</th> <th>URL</th> <th>Request Body (JSON)</th> <th>Response (JSON)</th> <th>Error (e)</th> </tr> <tr> <td>GET</td> <td>/api/person/hobby/{hobbyName}</td> <td></td> <td>[person, person, ...] (2)</td> <td>(e1)</td> </tr> <tr> <td>GET</td> <td>api/person/phone/{phoneNumber}</td> <td></td> <td>person (2)</td> <td>(e1)</td> </tr> <tr> <td>POST</td> <td>/api/person</td> <td>(1) without id</td> <td></td> <td>(e2)</td> </tr> <tr> <td>PUT</td> <td>/api/person</td> <td>person (1)</td> <td></td> <td>(e1)</td> </tr> </table>';
    table.innerHTML = tableData;

    document.getElementById('div2').innerHTML = '<h3>Request Body and Response Formats</h3><br>(1) Person format<br>{<br>"id": int,<br>"email": String,<br>"fName": String,<br>"lName":String,<br>"street": String,<br>"additInfo": String,<br>"zip": int<br>"hobbyName": String,<br>"phNumber": String,<br>"descrip": String<br>}<br>(2) Person format<br>{<br>"fName": String,<br>"lName": String,<br>"street": String,<br>"zip": int<br>}';

    document.getElementById('div2').innerHTML = '<h3>Errors</h3><ul><li>(e1):{ status : 404, "msg": "No content found for this request" }</li><li>(e2) :{ status : 400, "msg": "Field ‘xxx’ is required" } (for example, no name provided)</li></ul>';
}

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