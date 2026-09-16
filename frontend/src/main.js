
const inpUsername = document.getElementById("username");
const inpPassword = document.getElementById("password");
const inpSubmit = document.getElementById("submit");
const btnWhoami = document.getElementById("whoami");

btnWhoami.addEventListener("click", whoami);
inpSubmit.addEventListener("click", submit);

function whoami() {
    const username = localStorage.getItem("username");

    if (username == null) {
        console.log("not logged in.");
        return;
    }
}

async function submit() {
    console.log("submitted.");
    const username = inpUsername.value;
    const password = inpPassword.value;

    if (!username || !password) {
        console.log("missing field.");
        return;
    }


    console.log(username, password);
}