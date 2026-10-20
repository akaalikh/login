import { hideElement } from "./utils/hideElement";

const api = import.meta.env.VITE_API;

const inpEmail = document.getElementById("email");
const inpUsername = document.getElementById("username");
const inpPassword = document.getElementById("password");
const inpSubmit = document.getElementById("submit");
const btnWhoami = document.getElementById("whoami");
const btnlogout = document.getElementById("logout");
const txtTitle = document.getElementById("title");
const txtRegister = document.getElementById("register");

btnWhoami.addEventListener("click", whoami);
btnlogout.addEventListener("click", logout)
inpSubmit.addEventListener("click", submit);
txtRegister.addEventListener("click", switchUI);

let register = false;

function switchUI() {
    if (!register) {
        register = true;
        hideElement(false, inpEmail)
        inpSubmit.value = "REGISTER";
        txtRegister.innerText = "Login?"
    }
    else {
        register = false;
        hideElement(true, inpEmail);
        inpSubmit.value = "LOGIN";
        txtRegister.innerText = "Register?"
    }
}

function clearFields() {
    inpEmail.value = "";
    inpUsername.value = "";
    inpPassword.value = "";
}

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
    const email = inpEmail.value;

    if (register) {
        if (!username || !password || !email) {
            console.log("missing field.");
            return;
        }

        try {
            const response = await fetch(`${api}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email, username: username, password: password })
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

    else {
        if (!username || !password) {
            console.log("missing field.");
            return;
        }

        try {
            const response = await fetch(`${api}/users/login`, {
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

    clearFields();
}