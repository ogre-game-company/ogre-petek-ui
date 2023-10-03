if (document.getElementById("download-button") !== null) {
    document.getElementById("download-button").addEventListener("click", function () {
        const inputTextList = document.getElementsByTagName("input");
        var isCheck = false;
        for (let index = 0; index < inputTextList.length; index++) {
            const element = inputTextList[index];
            if (element.type == "text") {
                isCheck = true;
                if (element.value == "") {
                    isCheck = false;
                }
            }
        }

        for (let index = 0; index < inputTextList.length; index++) {
            const element = inputTextList[index];
            if (element.type == "text") {
                if (element.value == "") {
                    isCheck = false;
                }
            }
        }

        if (isCheck === false) {
            alert("Lütfen tüm alanları doldurunuz!")
        } else {
            var inputText = document.getElementById("id-number");
            var value = inputText.value;

            if (idCheck(value)) {
                // excel dosyası indirilebilir.
                alert(" excel dosyası indirilebilir.");
            } else {
                // Hata
                alert("Hata! Girmiş olduğunuz ID formatı hatalıdır.");
            }
        }
    });
}

function idCheck(value) {
    var guidRegex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
    return guidRegex.test(value);
}

document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const senderId = params.get('senderIdNumber');

    if (senderId != null && senderId !== null && senderId != "null" && senderId !== undefined) {

        const inputField = document.getElementById('id-number');
        if (inputField && senderId !== "") {
            inputField.value = senderId || '';
            inputField.disabled = true;
            console.log("disable edildi");
            console.log("disable edildi:", senderId);
            console.log("disable edildi:", typeof (senderId));
        }

    }
})