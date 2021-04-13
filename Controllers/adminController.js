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


//process musics admin
getChoose("musicsAdmin");

//process upload admin
getChoose("uploadAdmin");

//process request admin
getChoose("requestAdmin");

//process suggest admin
getChoose("suggestionAdmin")
