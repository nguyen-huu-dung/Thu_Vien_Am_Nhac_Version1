function setPageNone(){
    let listIdPage = ["homepage", "pageMusic","dangbaihat", "yeucaubaihat", "lienhegopy", "dangnhap", "adminHomePage"];
    for(let x of listIdPage){
        document.getElementById(x).style.display = "none";
    }
    let iframeID = document.querySelector("#pageMusic iframe");
    if(iframeID != null){
        iframeID.src = "";
    }
}
