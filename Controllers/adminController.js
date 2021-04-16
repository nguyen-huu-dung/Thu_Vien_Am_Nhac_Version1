function getChoose(choosePage) {
    let choose = document.getElementById(`${choosePage}ID`);
    choose.addEventListener('click', () => {
        if (choosePage == "musicsAdmin") {
            resetMusicsAdmin();
        }
        document.getElementById(choosePage).style.display = "block";
        setChooseAdmin();
        document.getElementById(choosePage).style.display = "block";
        setStyleChoose();
        choose.style.background = "#c1d0d0";
        choose.style.color = "#094c72";
    })
}

//process musics admin - Vũ Hoàng Mai
getChoose("musicsAdmin");
async function getMucsicsAdmin(countPage) {
    let response = await fetch(musicsUrl);
    let listMusics = await response.json();
    let listMusicsGenre = {};
    for (let x of listMusics) {
        if (listMusicsGenre[x.genre.toUpperCase()] == undefined) {
            listMusicsGenre[x.genre.toUpperCase()] = [];
            listMusicsGenre[x.genre.toUpperCase()].push(x);
        }
        else {
            listMusicsGenre[x.genre.toUpperCase()].push(x);
        }
    }
    for(let i in listMusicsGenre){
        document.getElementById("filterGenre").insertAdjacentHTML('beforeend', `<option value="${i}">${i}</option>`);
    }
    printListMusic(listMusics, countPage);
}

function printListMusic(listMusics = [], countPage){
    document.getElementById("changePage").insertAdjacentHTML('afterbegin', `<button id="prePageMusic" class="changePage">&#8249;</button>`);
    document.getElementById("changePage").insertAdjacentHTML('beforeend', `<button id="nextPageMusic" class="changePage">&#8250;</button>`);
    let tableID = document.querySelector("#musicsContent table");
    let i = (countPage - 1) * 10;
    let lastInPage = (countPage - 1) * 10 + 10;
    if ((countPage - 1) == 0) {
        document.getElementById("countPageMusic").textContent = countPage;
        document.getElementById("prePageMusic").style.visibility = "hidden";
    }
    else {
        document.getElementById("prePageMusic").style.visibility = "visible";
    }
    while (i < lastInPage) {
        tableID.insertAdjacentHTML('beforeend',
            `<tr>
            <td>
                <p>${listMusics[i].name} - ${listMusics[i].singer}</p>
            </td>
            <td>
                <button onclick ="updateMusicAdmin(${listMusics[i].id})">Update</button>
                <button onclick="deleteMusicAdmin(${listMusics[i].id})">Delete</button>
            </td>
        </tr>`)
        if (i == listMusics.length - 1) {
            document.getElementById("nextPageMusic").style.visibility = "hidden";
            break;
        }
        i++;
    }
    if (i < listMusics.length - 1) {
        document.getElementById("nextPageMusic").style.visibility = "visible"
    }

    document.getElementById("prePageMusic").addEventListener('click', () => {
        removeChanePage();
        let countPageID = document.getElementById("countPageMusic");
        let listTr = document.querySelectorAll("#musicsContent tr");
        for (let i = 1; nodeTr = listTr[i]; ++i) {
            nodeTr.remove();
        }
        countPage = Number(countPageID.textContent) - 1;
        countPageID.textContent = countPage;
        printListMusic(listMusics, countPage);
    })
    
    document.getElementById("nextPageMusic").addEventListener('click', () => {
        removeChanePage();
        let countPageID = document.getElementById("countPageMusic");
        let listTr = document.querySelectorAll("#musicsContent tr");
        for (let i = 1; nodeTr = listTr[i]; ++i) {
            nodeTr.remove();
        }
        countPage = Number(countPageID.textContent) + 1;
        countPageID.textContent = countPage;
        printListMusic(listMusics, countPage);
    })
}

//remove button changepage
function removeChanePage(){
    if(document.getElementById("prePageMusic") != null) document.getElementById("prePageMusic").remove();
    if(document.getElementById("nextPageMusic") != null) document.getElementById("nextPageMusic").remove();
}


//reset page musics admin
function resetMusicsAdmin() {
    removeChanePage();
    document.getElementById("resultMusicAdmin").textContent = "";
    let listTr = document.querySelectorAll("#musicsContent table tr");
    for (let i = 1; nodeTr = listTr[i]; ++i) {
        nodeTr.remove();
    }
    document.getElementById("updateMusicAdmin").style.display = "none";
    document.getElementById("addMusicAdmin").style.display = "flex";
    getMucsicsAdmin(1);
}

//add music
let nameUp = document.getElementById("nameMusicAdmin");
let authorUp = document.getElementById("authorMusicAdmin");
let singerUp = document.getElementById("singerMusicAdmin");
let genreUp = document.getElementById("genreMusicAdmin");
let lyricsUp = document.getElementById("lyricsMusicAdmin");
let iframeUp = document.getElementById("iframeMusicAdmin");
document.getElementById("addMusicAdmin").addEventListener("click", () => {
    document.getElementById("resultMusicAdmin").textContent = "";
    if (nameUp.value == "" || authorUp.value == "" || singerUp.value == "" || genreUp.value == "" || lyricsUp.value == "" || iframeUp.value == "") {
        document.getElementById("resultMusicAdmin").style.color = "red";
        document.getElementById("resultMusicAdmin").textContent = "Cần nhập đủ các trường!";
    }
    else {
        let data = {
            name: nameUp.value,
            author: authorUp.value,
            singer: singerUp.value,
            genre: genreUp.value,
            lyrics: lyricsUp.value,
            iframeUrl: iframeUp.value,
            countSeen: Math.floor(Math.random() * 100)
        }
        postData(musicsUrl, data);
        document.getElementById("resultMusicAdmin").style.color = "green";
        document.getElementById("resultMusicAdmin").textContent = "Thêm thành công!";
        document.querySelector("#musicsAdmin form").reset();
        setTimeout(() => {
            resetMusicsAdmin();
        }, 1500);
    }
})

//update music
async function updateMusicAdmin(musicID) {
    let response = await fetch(musicsUrl);
    let listMusics = await response.json();
    document.getElementById("resultMusicAdmin").textContent = "";
    document.getElementById("addMusicAdmin").style.display = "none";
    document.getElementById("updateMusicAdmin").style.display = "flex";
    for (let x of listMusics) {
        if (x.id == musicID) {
            nameUp.value = x.name;
            authorUp.value = x.author;
            singerUp.value = x.singer;
            genreUp.value = x.genre;
            lyricsUp.value = x.lyrics;
            iframeUp.value = x.iframeUrl;
            document.getElementById("updateMusicAdmin").addEventListener('click', () => {
                if (nameUp.value == x.name && authorUp.value == x.author && singerUp.value == x.singer && genreUp.value == x.genre && lyricsUp.value == x.lyrics && iframeUp.value == x.iframeUrl) {
                    document.getElementById("resultMusicAdmin").style.color = "red";
                    document.getElementById("resultMusicAdmin").textContent = "Bạn chưa thay đổi gì cả!";
                }
                else {
                    let data = {
                        name: nameUp.value,
                        author: authorUp.value,
                        singer: singerUp.value,
                        genre: genreUp.value,
                        lyrics: lyricsUp.value,
                        iframeUrl: iframeUp.value,
                        countSeen: x.countSeen
                    }
                    updateData(musicsUrl, musicID, data);
                    document.getElementById("resultMusicAdmin").style.color = "green";
                    document.getElementById("resultMusicAdmin").textContent = "Cập nhật thành công!";
                    document.querySelector("#musicsAdmin form").reset();
                    setTimeout(() => {
                        resetMusicsAdmin();
                    }, 1500);
                }
            })
        }
    }
}

//delete music admin

async function deleteMusicAdmin(musicID) {
    deleteData(musicsUrl, musicID);
    document.getElementById("resultMusicAdmin").style.color = "green";
    document.getElementById("resultMusicAdmin").textContent = "Xóa thành công!";
    setTimeout(() => {
        resetMusicsAdmin();
    }, 1500);
}

//clear form music admin

document.getElementById("clearMusicAdmin").addEventListener('click', () => {
    document.querySelector("#musicsAdmin form").reset();
    document.getElementById("updateMusicAdmin").style.display = "none";
    document.getElementById("addMusicAdmin").style.display = "flex";
})

//Search music admin

document.getElementById("beginSearch").addEventListener('click', async () => {
    let response = await fetch(musicsUrl);
    let listMusics = await response.json();
    removeChanePage();
    let keyWords = document.getElementById("searchID").value;
    let listTr = document.querySelectorAll("#musicsContent table tr");
    for (let i = 1; nodeTr = listTr[i]; ++i) {
        nodeTr.remove();
    }
    let listMusicKeyword = [];
    for (let x of listMusics) {
        if (xoa_dau(x.name).toLowerCase().search(keyWords.toLowerCase()) != -1 || xoa_dau(x.singer).toLowerCase().search(keyWords.toLowerCase()) != -1) {
            listMusicKeyword.push(x);
        }
    }
    printListMusic(listMusicKeyword, 1);
})

// filter music



//process upload admin - Vũ Hoàng Việt Dũng
getChoose("uploadAdmin");

//process request admin - Dương Thành Đạt
getChoose("requestAdmin");

//process suggest admin - Dương Thành Đạt
getChoose("suggestionAdmin")

//process logout admin 

let logOut = document.getElementById("logOutAdminID");
logOut.addEventListener('click', () => {
    setPageNone();
    setStyleChoose();
    getResetHomePage();
    document.getElementById("homepage").style.display = "block";
    document.getElementById("header").style.display = "block";
    document.getElementById("footer").style.display = "block";
})
