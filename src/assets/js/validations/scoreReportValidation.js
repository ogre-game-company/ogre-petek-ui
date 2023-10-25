export { };

import ENV from '../fetch/base/env.js';
import CONFIGS from '../fetch/base/config.js';

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
                verifySession();
                // excel dosyası indirilebilir.
                // fetchExcel(value);
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
    const inputField = document.getElementById('id-number');

    if (senderId != null && senderId !== null && senderId != "null" && senderId !== undefined) {
        if (inputField && senderId !== "") {
            inputField.value = senderId || '';
            inputField.disabled = true;
            setEncryptedUserIdToCookie(senderId);
            var origin = window.location.href;
            origin = origin.replace("?" + params, "");
            window.location.href = origin;
        }
    } else {
        const encryptedUserId = getCookie('sessionId');
        if (encryptedUserId) {
            const secretKey = CONFIGS.Secret_Key; // Aynı anahtarı kullanarak şifrelemeyi çöz
            const decryptedUserId = decryptUserId(encryptedUserId, secretKey);
            if (decryptedUserId) {
                inputField.value = decryptedUserId || '';
                inputField.disabled = true;
            }
        }
    }
})


function setCookie(name, value, time) {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + time);
    const encodedValue = encodeURIComponent(value);
    const cookieValue = `${name}=${encodedValue}${time ? `; expires=${expires.toUTCString()}` : ''}`;
    document.cookie = cookieValue;
}

function verifySession() {
    const encryptedUserId = getCookie('sessionId');
    if (encryptedUserId) {
        const secretKey = CONFIGS.Secret_Key; // Aynı anahtarı kullanarak şifrelemeyi çöz
        const decryptedUserId = decryptUserId(encryptedUserId, secretKey);
        if (decryptedUserId) {
            // Kullanıcı kimliği doğrulandı
            fetchExcel(decryptedUserId);
        } else {
            // Geçersiz kimlik bilgisi
            redirectToPage();
        }
    } else {
        // Oturum çerezi yok
        console.log('Oturum çerezi yok');
        redirectToPage();
    }
}

function redirectToPage() {
    const urlOrigin = window.location.origin;
    if (urlOrigin === "https://ogre-game-company.github.io") {
        window.location.href = urlOrigin + "/ogre-petek-ui/src/" + "pages/admin-login.html";
    } else if (urlOrigin === "http://petekegitim.xyz") {
        window.location.href = "http://petekegitim.xyz/src/pages/admin-login.html";
    } else if (urlOrigin === "https://petekegitim.xyz") {
        window.location.href = "https://petekegitim.xyz/src/pages/admin-login.html";
    } else if (urlOrigin === "http://127.0.0.1:5500") {
        window.location.href = "http://127.0.0.1:5500/src/pages/admin-login.html";
    } else if (urlOrigin === "https://127.0.0.1:5501") {
        window.location.href = "https://127.0.0.1:5501/src/pages/admin-login.html";
    }
}

function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
        }
    }
    return null;
}

function decryptUserId(encryptedUserId, secretKey) {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedUserId, secretKey);
        const originalUserId = bytes.toString(CryptoJS.enc.Utf8);
        return originalUserId;
    } catch (error) {
        // Şifre çözme hatası
        return null;
    }
}

function setEncryptedUserIdToCookie(userId) {
    const secretKey = CONFIGS.Secret_Key; // Güçlü bir anahtar seçin
    const encryptedUserId = encryptUserId(userId, secretKey);
    setCookie('sessionId', encryptedUserId, 10); // 3 dakika süresince geçerli çerez oluşturma
}

function encryptUserId(userId, secretKey) {
    const encrypted = CryptoJS.AES.encrypt(userId, secretKey);
    return encrypted.toString();
}