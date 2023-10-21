export { };

import ENV from '../fetch/base/env.js';

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
                fetchExcel(value);
            } else {
                // Hata
                alert("Hata! Girmiş olduğunuz ID formatı hatalıdır.");
            }
        }
    });
}

async function fetchExcel(id) {
    const apiUrl = `${ENV.API_URL}`;
    const endpoint = `SafetyJourney/excel?SenderId=`;
    const senderId = id;
    const fullUrl = `${apiUrl}${endpoint}${senderId}`;

    try {
        const response = await fetch(fullUrl, {
            "headers": {
                "accept": "*/*",
                "accept-language": "tr,en;q=0.9,en-US;q=0.8,tr-TR;q=0.7",
            },
            method: "GET",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
        });

        const contentDisposition = response.headers.get('Content-Disposition');

        let fileName = 'rapor.pdf'; // Varsayılan dosya adı

        if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
            const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = fileNameRegex.exec(contentDisposition);
            if (matches != null && matches[1]) {
                fileName = matches[1].replace(/['"]/g, '');
            }
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName; // Dosya adını belirtin
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Dosya indirme hatası:', error);
    }

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