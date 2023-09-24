document.getElementsByClassName("btn-scroll")[0].addEventListener("click", () => {
    window.scroll(0, 700)
})

getWebsiteState();
getMCState();

function getWebsiteState() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://zundamc.net", true);
    xhr.onreadystatechange = () => {
        // ローカルファイルでは、 Mozilla Firefox で成功するとステータスは0になります
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                document.getElementsByClassName("status-website")[0].textContent = "🟢オンライン"
            } else {
                document.getElementsByClassName("status-website")[0].textContent = "🔴オフライン"
            }
        }
    };
    xhr.send();
}

function getMCState() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.mcsrvstat.us/3/play.zundamc.net", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                if (JSON.parse(xhr.responseText).online) {
                    document.getElementsByClassName("status-mc")[0].textContent = "🟢オンライン"
                } else {
                    document.getElementsByClassName("status-mc")[0].textContent = "🔴オフライン"
                }
            }
        };
    }
    xhr.send();
}