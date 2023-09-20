document.getElementById("language").addEventListener("change", function () {
    var selectedLanguage = this.value;
    CheckInputExistingInPage();

    function CheckInputExistingInPage() {
        var inputs = document.querySelectorAll('input');

        for (let index = 0; index < inputs.length; index++) {
            if (inputs[index].type == "text" || inputs[index].type == "password") {

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
                    } else if (elementName == "branch") {
                        document.getElementById("branch").placeholder = "Şube";
                    } else if (elementName == "idNumber") {
                        document.getElementById("id-number").placeholder = "ID";
                    } else if (elementName == "password") {
                        document.getElementById("password").placeholder = "Şifre";
                    }

                    if (document.getElementsByClassName("showPasswordLabel").length > 0) {
                        document.getElementById("showPasswordLabel").innerText = "Şifreyi göster";
                    }

                    document.getElementsByClassName("item-button")[0].getElementsByTagName('a')[0].innerText = "Giriş Yap"

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
                    } else if (elementName == "branch") {
                        document.getElementById("branch").placeholder = "Branch";
                    } else if (elementName == "idNumber") {
                        document.getElementById("id-number").placeholder = "ID";
                    } else if (elementName == "password") {
                        document.getElementById("password").placeholder = "Password";
                    }

                    if (document.getElementsByClassName("showPasswordLabel").length > 0) {
                        document.getElementById("showPasswordLabel").innerText = "Show Password";
                    }

                    document.getElementsByClassName("item-button")[0].getElementsByTagName('a')[0].innerText = "Log in"
                }

            }
        }
    }
});