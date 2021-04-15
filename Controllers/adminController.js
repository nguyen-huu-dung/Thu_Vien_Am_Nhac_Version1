function getChoose(choosePage) {
    let choose = document.getElementById(`${choosePage}ID`);
    choose.addEventListener('click', () => {
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
async function getMucsicsAdmin(countPage){
    let response = await fetch(musicsUrl);
    let listMusics = await response.json();
    let tableID = document.querySelector("#musicsContent table");
    let i = countPage * 10;
    let lastInPage = countPage * 10 + 10;
    if(countPage == 0){
        document.getElementById("prePageMusic").style.visibility = "hidden";
    }
    else{
        document.getElementById("prePageMusic").style.visibility = "visible";
    }
    while(i < lastInPage){
        tableID.insertAdjacentHTML('beforeend', 
        `<tr>
            <td>
                <p>${listMusics[i].name} - ${listMusics[i].singer}</p>
            </td>
            <td>
                <button id="upMusic${listMusics[i].id}">Update</button>
                <button id="delMusic${listMusics[i].id}">Delete</button>
            </td>
        </tr>`)
        if(i == listMusics.length-1){
            document.getElementById("nextPageMusic").style.visibility = "hidden";
            break;
        }
        i++;
    }
    if(i < listMusics.length-1){
        document.getElementById("nextPageMusic").style.visibility = "visible"
    }
}

getMucsicsAdmin(0);

document.getElementById("prePageMusic").addEventListener('click', () => {
    let countPageID = document.getElementById("countPageMusic");
    let listTr = document.querySelectorAll("#musicsContent tr");
    for(let i=1; nodeTr = listTr[i]; ++i){
        nodeTr.remove();
    }
    countPage = Number(countPageID.textContent) - 1; 
    countPageID.textContent = countPage;
    getMucsicsAdmin(countPage);
})

document.getElementById("nextPageMusic").addEventListener('click', () => {
    let countPageID = document.getElementById("countPageMusic");
    let listTr = document.querySelectorAll("#musicsContent tr");
    for(let i=1; nodeTr = listTr[i]; ++i){
        nodeTr.remove();
    }
    countPage = Number(countPageID.textContent) + 1; 
    countPageID.textContent = countPage;
    getMucsicsAdmin(countPage);
})


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
    document.getElementById("homepage").style.display = "block";
    document.getElementById("header").style.display = "block";
    document.getElementById("footer").style.display = "block";
})
