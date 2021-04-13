function setPageNone() {
    let listIdPage = ["homepage", "pageMusic", "dangbaihat", "yeucaubaihat", "lienhegopy", "dangnhap", "adminHomePage"];
    for (let x of listIdPage) {
        document.getElementById(x).style.display = "none";
    }
    let iframeID = document.querySelector("#pageMusic iframe");
    if (iframeID != null) {
        iframeID.src = "";
    }
    setInputNone();
    setChooseAdmin();
}

function setInputNone() {
    let listIdInput = ["upload", "request", "suggestion", "login"];
    for (let x of listIdInput) {
        document.querySelector(`#${x} form`).reset();
        document.getElementById(`${x}Result`).textContent = "";
    }
}


function setChooseAdmin() {
    let listChoose = ["musicsAdmin", "uploadAdmin", "requestAdmin", "suggestionAdmin"];
    for (let x of listChoose) {
        document.getElementById(x).style.display = "none";
    }
}

function setStyleChoose() {
    let listChoose = ["musicsAdminID", "uploadAdminID", "requestAdminID", "suggestionAdminID"];
    for (let x of listChoose) {
        document.getElementById(x).style.background = "#094c72";
        document.getElementById(x).style.color = "white";
    }
}