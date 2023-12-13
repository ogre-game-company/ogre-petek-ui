document.getElementById("language").addEventListener("change", function () {
    var selectedLanguage = this.value;
    CheckInputExistingInPage();

    function CheckInputExistingInPage() {
        var inputs = document.querySelectorAll('input');

        for (let index = 0; index < inputs.length; index++) {
            if (inputs[index].type == "text" || inputs[index].type == "password" || inputs[index].type == "button") {

                var elementName = inputs[index].name

                if (selectedLanguage === "tr") {

                    document.documentElement.lang = "tr";

                    if (elementName == "name") {
                        document.getElementById("name").placeholder = "Adı";
                    } else if (elementName == "surname") {
                        document.getElementById("surname").placeholder = "Soyadı";
                    } else if (elementName == "identityNumber") {
                        document.getElementById("identity-number").placeholder = "Kimlik Numarası";
                    } else if (elementName == "phoneNumber") {
                        document.getElementById("phone-number").placeholder = "Telefon Numarası";
                    } else if (elementName == "registrationNumber") {
                        document.getElementById("registration-number").placeholder = "Kayıt Numarası";
                    } else if (elementName == "idNumber") {
                        document.getElementById("id-number").placeholder = "ID";
                    } else if (elementName == "password") {
                        document.getElementById("password").placeholder = "Şifre";
                    } else if (elementName == "senderIdNumber") {
                        document.getElementById("id-number").placeholder = "ID";
                    } else if (elementName == "submitButton") {
                        document.getElementById("submit-button").value = "Giriş Yap";
                    }

                    if (document.getElementsByClassName("showPasswordLabel").length > 0) {
                        document.getElementById("showPasswordLabel").innerText = "Şifreyi göster";
                    }

                    if (document.getElementById("download-button") !== null) {
                        document.getElementById("download-button").value = "Raporu İndir";
                    }

                    if (document.getElementById("open-game") != null) {
                        document.getElementById("open-game").value = "Giriş Yap";
                    }

                    if (document.getElementById("branch-dropdown") != null) {
                        document.getElementById("branch-dropdown").options[0].text = "Bölüm Seçiniz";
                    }

                    document.getElementById("dropdown-language-label").innerText = "Dil Seçeneği:";

                } else if (selectedLanguage === "en") {

                    document.documentElement.lang = "en";

                    if (elementName == "name") {
                        document.getElementById("name").placeholder = "Name";
                    } else if (elementName == "surname") {
                        document.getElementById("surname").placeholder = "Surname";
                    } else if (elementName == "identityNumber") {
                        document.getElementById("identity-number").placeholder = "Identity Number";
                    } else if (elementName == "phoneNumber") {
                        document.getElementById("phone-number").placeholder = "Phone Number";
                    } else if (elementName == "registrationNumber") {
                        document.getElementById("registration-number").placeholder = "Registration Number";
                    } else if (elementName == "idNumber") {
                        document.getElementById("id-number").placeholder = "ID";
                    } else if (elementName == "password") {
                        document.getElementById("password").placeholder = "Password";
                    } else if (elementName == "senderIdNumber") {
                        document.getElementById("id-number").placeholder = "ID";
                    } else if (elementName == "submitButton") {
                        document.getElementById("submit-button").value = "Log in";
                    }

                    if (document.getElementsByClassName("showPasswordLabel").length > 0) {
                        document.getElementById("showPasswordLabel").innerText = "Show password";
                    }

                    if (document.getElementById("download-button") !== null) {
                        document.getElementById("download-button").value = "Download Report";
                    }

                    if (document.getElementById("open-game") !== null) {
                        document.getElementById("open-game").value = "Log in";
                    }

                    if (document.getElementById("branch-dropdown") != null) {
                        document.getElementById("branch-dropdown").options[0].text = "Select Branch";
                    }

                    document.getElementById("dropdown-language-label").innerText = "Language Option:";
                }

            }
        }
    }
});