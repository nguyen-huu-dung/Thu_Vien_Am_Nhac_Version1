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

//process upload admin - Vũ Hoàng Việt Dũng
getChoose("uploadAdmin");

//process request admin - Dương Thành Đạt
getChoose("requestAdmin");

//process suggest admin - Dương Thành Đạt
getChoose("suggestionAdmin")
