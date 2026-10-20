export function hideElement(hide, element) {
    if (hide) element.classList.add("hidden");
    else element.classList.remove("hidden");
}