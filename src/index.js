import 'bootstrap/dist/css/bootstrap.css';
import regeneratorRuntime from "regenerator-runtime";

const tb = document.getElementById('tb');
const url = 'http://localhost:3333/api/users';
fetch(url)
.then(res=>fetchWithErrorCheck(res))
.then((data)=>{
    const trs = data.map((user)=>{
        return `<tr><td>${user.id}</td><td>${user.name}</td><td>${user.age}</td><td>${user.gender}</td><td>${user.email}</td></tr>`;
    });
    const trStr = trs.join('');
    tb.innerHTML = trStr;
});

document.getElementById('btnId').onclick = () => {
    const id = document.getElementById('inpId').value;
    fetch(`${url}/${id}`)
    .then(res=>fetchWithErrorCheck(res))
    .then(user=>{
        const userStr = `${user.name} has email: ${user.email}. ${(user.gender==='female')?'She':'He'} is ${user.age} years old`;
        document.getElementById('divId').innerHTML = userStr;
    });
};


const getUser = async () => {
    const id = document.getElementById('inpId').value;
    const userResponse = await fetch(`${url}/${id}`);
    const userData = await fetchWithErrorCheck(userResponse);
    const userStr = `${userData.name} has email: ${userData.email}. ${(userData.gender==='female')?'She':'He'} is ${userData.age} years old`;
    document.getElementById('divId').innerHTML = userStr;
}
document.getElementById('btnId').onclick = getUser;


function fetchWithErrorCheck(res){
    if(!res.ok){
      return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
}