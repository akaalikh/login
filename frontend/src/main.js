const api = import.meta.env.VITE_API;

const inpUsername = document.getElementById("username");
const inpPassword = document.getElementById("password");
const inpSubmit = document.getElementById("submit");
const btnWhoami = document.getElementById("whoami");
const btnlogout = document.getElementById("logout");
const txtTitle = document.getElementById("title");

btnWhoami.addEventListener("click", whoami);
btnlogout.addEventListener("click", logout)
inpSubmit.addEventListener("click", submit);

function whoami() {
    const username = localStorage.getItem("username");

    if (username == null) {
        txtTitle.innerText = "who are you?"
        return;
    }
    else txtTitle.innerText = username;
}

async function logout() {
    try {
        const response = await fetch(`${api}/logout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: localStorage.getItem("username") })
        });
        if (!response.ok) throw new Error(`Resonse status: ${response.status}`);

        const result = await response.json();

        console.log(`${result.username} has been logged out.`);

    }
    catch (error) {
        console.log(error.message);
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

    try {
        const response = await fetch(`${api}/users/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        if (result) {
            localStorage.setItem("username", result.username)
        }
    }
    catch (error) {
        console.error(error.message);
    }

}