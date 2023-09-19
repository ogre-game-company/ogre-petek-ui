document.getElementById("language").addEventListener("change", function () {
    var selectedLanguage = this.value;
    CheckInputExistingInPage();

    function CheckInputExistingInPage() {
        var inputs = document.querySelectorAll('input');

        for (let index = 0; index < inputs.length; index++) {
            if (inputs[index].type == "text") {

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
                    }
                    document.getElementsByClassName("item-button")[0].getElementsByTagName('a')[0].innerText = "Log in"
                }


            }
        }
    }
});