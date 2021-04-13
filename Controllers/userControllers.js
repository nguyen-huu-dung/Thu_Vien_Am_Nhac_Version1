//process homepage

//set display homepage to block

let homePageID = document.getElementById("logo");
homePageID.addEventListener('click', () => {
    setPageNone();
    document.getElementById("homepage").style.display = "block";
})

async function getHomePage(){
    let response = await fetch(musicsUrl);
    let listMusics = await response.json();
    let listMusicsSortCountSeen = listMusics.sort((a, b) => {return b.countSeen - a.countSeen});
    let listMusicsID = document.getElementById("musicHayNhat");
    let indexPrint = 0;
    for(let i=indexPrint; i<indexPrint+8; ++i){
        listMusicsID.insertAdjacentHTML('beforeend', `<li></li>`);
    }
    let listLi = document.querySelectorAll(`#musicHayNhat li`);
    for(let i=indexPrint; i<indexPrint+8; ++i){
        listLi[i].insertAdjacentHTML('beforeend', `<p class="name" onclick="getPageMusic(${listMusicsSortCountSeen[i].id})">${listMusicsSortCountSeen[i].name}</p>`);
        listLi[i].insertAdjacentHTML('beforeend', `<p class="singer">- ${listMusicsSortCountSeen[i].singer}</p>`);
        listLi[i].insertAdjacentHTML('beforeend', `<p class="countSeen"><i class="fas fa-headphones-alt"></i>${listMusicsSortCountSeen[i].countSeen}</p>`);
        listLi[i].insertAdjacentHTML('beforeend', '<hr>');
    }
    indexPrint += 8;
    let xemThemID = document.getElementById("xemThemHayNhat");
    xemThemID.addEventListener('click', () => {
        for(let i=indexPrint; i<indexPrint+8; ++i){
            listMusicsID.insertAdjacentHTML('beforeend', `<li></li>`);
            if(i == 99 || i == listMusicsSortCountSeen.length-1){
                xemThemID.remove();
                break;
            }
        }
        let listLi = document.querySelectorAll(`#musicHayNhat li`);
        for(let i=indexPrint; i<indexPrint+8; ++i){
            listLi[i].insertAdjacentHTML('beforeend', `<p class="name" onclick="getPageMusic(${listMusicsSortCountSeen[i].id})">${listMusicsSortCountSeen[i].name}</p>`);
            listLi[i].insertAdjacentHTML('beforeend', `<p class="singer">- ${listMusicsSortCountSeen[i].singer}</p>`);
            listLi[i].insertAdjacentHTML('beforeend', `<p class="countSeen"><i class="fas fa-headphones-alt"></i>${listMusicsSortCountSeen[i].countSeen}</p>`);
            listLi[i].insertAdjacentHTML('beforeend', '<hr>');
            if(i == 99 || i == listMusicsSortCountSeen.length-1){
                break;
            }
        }
        indexPrint += 8;
    })
}


getHomePage();


//process page music

async function getPageMusic(musicID){
    let response = await fetch(musicsUrl);
    let listMusics = await response.json();
    let listMusicID = {};
    for(let x of listMusics){
        listMusicID[x.id] = {};
        listMusicID[x.id] = x;
    }
    let musicUpdate = listMusicID[musicID];
    musicUpdate.countSeen += 1;
    updateData(musicsUrl, musicID, musicUpdate);

    // set page music display to block
    let pageMusicID = document.getElementById("pageMusic");
    setPageNone();
    pageMusicID.style.display = "block";
    
    let iframeID = document.querySelector("#pageMusic iframe");
    iframeID.src = listMusicID[musicID].iframeUrl;
}

//process upload music

let uploadID = document.getElementById("uploadID");
uploadID.addEventListener('click', () => {
    setPageNone();
    document.getElementById("dangbaihat").style.display = "block";
})
let addUploadID = document.getElementById("addUpload");
addUploadID.addEventListener('click', () => {
    let nameUpload = document.getElementById("nameUpload");
    let authorUpload = document.getElementById("authorUpload");
    let singerUpload = document.getElementById("singerUpload");
    let genreUpload = document.getElementById("genreUpload");
    let lyricsUpload = document.getElementById("lyricsUpload");
    let iframeUrlUpload = document.getElementById("linkUpload");
    let resultID = document.getElementById("resultUpload");
    if(nameUpload.value == "" || iframeUrlUpload.value == ""){
        resultID.style.color = "red";
        resultID.textContent = "Bắt buộc phải điền trường có dấu (*)";
    }
    else{
        resultID.style.color = "green";
        resultID.textContent = "Thành công! Đang chờ admin xét duyệt!"
        let musicUpLoad = {
            name: nameUpload.value,
            author: authorUpload.value,
            singer: singerUpload.value,
            genre: genreUpload.value,
            lyrics: lyricsUpload.value,
            iframeUrl: iframeUrlUpload.value,
        }
        postData(uploadUrl, musicUpLoad);
        document.querySelector("#upload form").reset();
    }
})


//process request music

let requestID = document.getElementById("requestID");
requestID.addEventListener('click', () => {
    setPageNone();
    document.getElementById("yeucaubaihat").style.display = "block";
})
let addRequestID = document.getElementById("addRequest");
addRequestID.addEventListener('click', () => {
    let nameRequest = document.getElementById("nameRequest");
    let singerAuthorRequest = document.getElementById("singerAuthorRequest");
    let resultID = document.getElementById("resultRequest");
    if(nameRequest.value == "" || singerAuthorRequest.value == ""){
        resultID.style.color = "red";
        resultID.textContent = "Bắt buộc phải điền trường có dấu (*)";
    }
    else{
        resultID.style.color = "green";
        resultID.textContent = "Thành công! Đang chờ admin xử lý!"
        postData(requestUrl, {name: nameRequest.value, singerAuthor: singerAuthorRequest.value});
        document.querySelector("#request form").reset();
    }
})

//process lien he gop y

let suggestionID = document.getElementById("suggestionID");
suggestionID.addEventListener('click', () => {
    setPageNone();
    document.getElementById("lienhegopy").style.display = "block";
})
let addSuggestionID = document.getElementById("addSuggestion");
addSuggestionID.addEventListener('click', () => {
    let emailSuggestion = document.getElementById("emailSuggestion");
    let subjectSuggestion = document.getElementById("subjectSuggestion");
    let contentSuggestion = document.getElementById("contentSuggestion");
    let resultID = document.getElementById("resultSuggestion");
    if(emailSuggestion.value == "" || contentSuggestion.value == ""){
        resultID.style.color = "red";
        resultID.textContent = "Bắt buộc phải điền trường có dấu (*)";
    }
    else{
        resultID.style.color = "green";
        resultID.textContent = "Hệ thống đã ghi nhận! Cảm ơn bạn đã góp ý!"
        postData(suggestionsUrl, {email: emailSuggestion.value, subject: subjectSuggestion.value, content: contentSuggestion.value});
        document.querySelector("#suggestion form").reset();
    }
})

//process login 

let loginID = document.getElementById("loginID");
loginID.addEventListener('click', () => {
    setPageNone();
    document.getElementById("dangnhap").style.display = "block";
})