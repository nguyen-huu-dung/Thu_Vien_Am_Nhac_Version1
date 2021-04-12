let musicsUrl = 'https://6073fb61066e7e0017e78b99.mockapi.io/api/thu-vien-am-nhac/musics';
let adminsUrl = 'https://6073fb61066e7e0017e78b99.mockapi.io/api/thu-vien-am-nhac/admins';

//Get data

async function getData(url) {
    const response = await fetch(url);
    const listMusics = await response.json();
}

//Post data
async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

//Update data
async function updateData(url, idData, data) {
    const response = await fetch(`${url}/${idData}`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

//Delete data

async function deleteData(url, idData) {
    const response = await fetch(`${url}/${idData}`, {
        method: 'DELETE',
    });
    return response.json();
}




