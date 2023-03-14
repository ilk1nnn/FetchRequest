const requestUrl = "https://jsonplaceholder.typicode.com/users";

function sendRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            }
            else {
                resolve(xhr.response);
            }
        }

        xhr.onerror = () => {
            reject(xhr.response);
        }

        xhr.send(body);
    });
}


var inputName = document.getElementById("inputName");
var inputUsername = document.getElementById("inputUsername");
var inputEmail = document.getElementById("inputEmail");


const findUserById = (id) => {
    const key = Object.keys(users.users).find(user => users.users[user].id === '1')
    return users.users[key]
}

function DataFunc(id) {
    // let jsonResult = JSON.parse(response);
    // jsonResult.forEach(e => {
    //     if (id == e.id) {
    //         inputName.value = e.name;
    //         inputUsername.value = e.username;
    //         inputEmail.value = e.email;
    //     }
    // });
    // alert("A");

    const requestUrl2 = "https://jsonplaceholder.typicode.com/users" + `/${id}`;

    sendRequest('GET', requestUrl2)
        .then(data => {
            let jsonResult = JSON.parse(data);
            inputEmail.value = jsonResult.email;
            inputName.value = jsonResult.name;
            inputUsername.value = jsonResult.username;
            console.log(data)
        })
        .catch(err => console.log(err));

}



function Request2(method, url) {
    const headers = {
        'Content-type': 'application/json'
    };
    return fetch(url, {
        method: method,
        headers: headers
    })
        .then(response => {
            return response.json();
        })
}

function MyDelete(id) {

    const requestUrl2 = "https://jsonplaceholder.typicode.com/users" + `/${id}`;


    Request2('DELETE', requestUrl2)
        .then(data => { console.log(data) })
        .catch(err => console.log(err))


    Request2('GET', requestUrl)
        .then(data => { console.log(data) })
        .catch(err => console.log(err))



    alert(`Successfully Deleted. Deleted Element -> ${id}`);

}


function FillDataToHtml(response) {
    let jsonResult = JSON.parse(response);
    let mytable = document.getElementById("mytable");

    let content = "";

    content += `
    <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Username</th>
    <th>Email</th>
    <th>Website</th>
    <th>Phone</th>
    <th></th>
    </tr>
    `;

    jsonResult.forEach(e => {
        content += `
        <tr>
        <td style = "cursor:pointer" onclick = "DataFunc(${e.id})">${e.id}</td>
        <td>${e.name}</td>
        <td>${e.username}</td>
        <td>${e.email}</td>
        <td>${e.website}</td>
        <td>${e.phone}</td>

       <td>
       <button style = "cursor:pointer" onclick='MyDelete(${e.id})'>Delete</button>
       </td>
        </tr>
        `;
    });


    mytable.innerHTML = content;
}






sendRequest('GET', requestUrl)
    .then(data => {
        FillDataToHtml(data);
        console.log(data)
    })
    .catch(err => console.log(err));