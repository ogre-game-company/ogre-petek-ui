document.getElementById("showPassword").addEventListener("change", (event) => {
    var passwordInput = document.getElementById("password");
    if (event.currentTarget.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
})