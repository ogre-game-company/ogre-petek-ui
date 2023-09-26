export { };
import adminLogin from '../fetch/adminLoginFetch.js';

if (document.getElementById("submit-button") !== null) {
    document.getElementById("submit-button").addEventListener("click", async function () {
        const inputTextList = document.getElementsByTagName("input")
        var isCheck = false;
        for (let index = 0; index < inputTextList.length; index++) {
            const element = inputTextList[index];
            if (element.type == "text" || element.type == "password") {
                isCheck = true;
                if (element.value == "") {
                    isCheck = false;
                }
            }
        }

        for (let index = 0; index < inputTextList.length; index++) {
            const element = inputTextList[index];
            if (element.type == "text" || element.type == "password") {
                if (element.value == "") {
                    isCheck = false;
                }
            }
        }

        if (isCheck === true) {
            var inputText = document.getElementById("id-number");
            var value = inputText.value;

            if (idCheck(value)) {
                let statusCode = await adminLogin();
                console.log(`StatusCode alındı:`, statusCode);
                if (statusCode === "OK") {
                    redirectToPage();
                }
            } else {
                alert("Hata! Girmiş olduğunuz ID formatı hatalıdır.");
            }
        } else {
            alert("Lütfen tüm alanları doldurunuz!")
        }

    });
}

function idCheck(value) {
    var guidRegex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
    return guidRegex.test(value);
}

function redirectToPage() {
    var form = document.createElement("form");
    form.setAttribute("id", "input-form");
    form.setAttribute("action", "/src/pages/score-report.html");
    form.setAttribute("method", "get");

    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("id", "id-number");
    input.setAttribute("name", "senderIdNumber");
    input.value = document.getElementById("id-number").value;
    form.appendChild(input);

    document.body.appendChild(form);

    form.submit();
}