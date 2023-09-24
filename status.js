getWebsiteState();
getMCState();

function getWebsiteState() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://zundamc.net", true);
    xhr.onreadystatechange = () => {
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
            const parsedJson = JSON.parse(xhr.responseText);
            if (status === 0 || (status >= 200 && status < 400)) {
                if (parsedJson.online) {
                    document.getElementsByClassName("status-mc")[0].textContent = "🟢オンライン"
                    document.getElementsByClassName("online-members")[0].textContent = "オンラインの人数:  " + parsedJson.players.online + " / " + parsedJson.players.max;
                } else {
                    document.getElementsByClassName("online-status")[0].style.display = "none";
                    document.getElementsByClassName("status-mc")[0].textContent = "🔴オフライン"
                }
            }
        };
    }
    xhr.send();
}