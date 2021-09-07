function updateBadge(value) {
    document.getElementById("cooldown-time-badge").innerHTML = value + "s";
}

function updateRunning() {
    eel.get_running_status()().then((isRunning) => {
        let button = document.getElementById("run");
        let runningBadge = document.getElementById("running-badge");
        runningBadge.classList.remove("text-dark");
        runningBadge.classList.remove("bg-warning");

        if (isRunning) {
            runningBadge.innerText = "Running";
            runningBadge.classList.remove("bg-danger");
            runningBadge.classList.add("bg-success");
        } else {
            runningBadge.innerText = "Stopped";
            runningBadge.classList.remove("bg-success");
            runningBadge.classList.add("bg-danger");
        }

        if (isRunning) {
            button.innerHTML = "Stop Service";
        } else {
            button.innerHTML = "Start Service";
        }

        button.appendChild(runningBadge);
    });
}

function setInitialValues() {
    eel.get_settings()().then((settings) => {
        document.getElementById("username").value = settings["username"];
        document.getElementById("cooldown").value = settings["cooldown"];
        updateBadge(settings["cooldown"]);
        document.getElementById("tray-icon").checked = settings["tray_icon"];
        document.getElementById("auto-update").checked =
            settings["auto_update"];
    });
}

window.addEventListener("load", setInitialValues, false);
setInterval(updateRunning, 500);
