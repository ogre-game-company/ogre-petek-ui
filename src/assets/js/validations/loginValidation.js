export { };

import CONFIGS from '../fetch/base/config.js';
import login from '../fetch/loginFetch.js';
import ENV from '../fetch/base/env.js';

if (document.getElementById("open-game") !== null) {
    document.getElementById("open-game").addEventListener("click", async function () {
        const inputTextList = document.getElementsByTagName("input")
        var isCheck = false;

        for (let index = 0; index < inputTextList.length; index++) {
            const element = inputTextList[index];
            if (element.type == "text") {
                if (element.value !== "") {
                    isCheck = true;
                }

                if (document.getElementById("branch-dropdown") !== null && document.getElementById("branch-dropdown").value == "none") {
                    isCheck = false;
                }
            }
        }

        // for (let index = 0; index < inputTextList.length; index++) {
        //     const element = inputTextList[index];
        //     if (element.type == "text") {
        //         isCheck = true;
        //         if (element.value == "") {
        //             isCheck = false;
        //         }

        //         if (document.getElementById("branch-dropdown") !== null && document.getElementById("branch-dropdown").value == "none") {
        //             isCheck = false;
        //         }
        //     }
        // }

        // for (let index = 0; index < inputTextList.length; index++) {
        //     const element = inputTextList[index];
        //     if (element.type == "text") {
        //         if (element.value == "") {
        //             isCheck = false;
        //         }

        //         if (document.getElementById("branch-dropdown") !== null && document.getElementById("branch-dropdown").value == "none") {
        //             isCheck = false;
        //         }
        //     }
        // }

        if (isCheck === false) {
            alert("Lütfen gerekli alanları doldurunuz!");
        } else {
            const responseValue = await login();
            console.log(`response alındı:`, responseValue);
            if (responseValue !== "Error") {
                console.log("User Id:", responseValue);
                setEncryptedUserIdToCookie(responseValue)
                redirectToGamePage(responseValue);
            }
        }
    });
}


document.addEventListener("DOMContentLoaded", function () {
    addParameterToUrl();
    if (document.getElementById("branch-dropdown") !== null) {
        fetchDepartment();
    }
    verifySession();
})


function addParameterToUrl() {
    var urlParams = new URLSearchParams(window.location.search);

    // Eğer companyId parametresi zaten varsa, işlemi yapma
    if (!urlParams.has('companyId')) {

        const encryptedValue = encryptedCompanyId();
        const encodedParameter = encodeURIComponent(encryptedValue);
        urlParams.set('companyId', encodedParameter);

        var newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();

        window.history.replaceState({}, document.title, newUrl);
    }
}

function encryptedCompanyId() {
    const secretKey = CONFIGS.Secret_Key;
    const companyId = CONFIGS.Ogre_Petek_Demo_Game;
    const encryptedCompanyId = encryptCompanyId(companyId, secretKey);
    return encryptedCompanyId;
}

function encryptCompanyId(companyId, secretKey) {
    const encrypted = CryptoJS.AES.encrypt(companyId, secretKey);
    return encrypted.toString();
}

async function fetchDepartment() {
    const apiUrl = `${ENV.API_URL}`;
    const endpoint = `Department/get-all?CompanyId=`;
    const companyId = CONFIGS.Ogre_Petek_Demo_Game;
    const fullUrl = `${apiUrl}${endpoint}${companyId}`;

    const response = await fetch(fullUrl);

    var data = await response.json();

    if (response.status !== 200) {
        alert(data.message);
        document.getElementById("branch-dropdown").remove();
        return;
    }

    var departmentList = data.dataList;
    var dropdown = document.getElementById("branch-dropdown");

    for (const key in departmentList) {
        if (Object.hasOwnProperty.call(departmentList, key)) {
            const element = departmentList[key];
            const departmentId = element.id;
            const departmentName = element.name;

            var option = document.createElement("option");
            option.value = departmentId;
            option.text = departmentName;
            dropdown.appendChild(option);
        }
    }
}


function redirectToGamePage(userId) {
    const param = "?userId=" + userId;
    const urlOrigin = window.location.origin;
    if (urlOrigin === "https://berkdeveloper.github.io") {
        window.location.href = urlOrigin + "ogre-petek-ui-test/src/" + "games/index.html" + param;
    } else if (urlOrigin === "http://127.0.0.1:5500") {
        window.location.href = "http://127.0.0.1:5500/src/games/index.html" + param;
    } else if (urlOrigin === "https://127.0.0.1:5501") {
        window.location.href = "https://127.0.0.1:5501/src/games/index.html" + param;
    } else if (urlOrigin === "https://127.0.0.1:5502") {
        window.location.href = "https://127.0.0.1:5502/src/games/index.html" + param;
    } else if (urlOrigin === "http://127.0.0.1:5502") {
        window.location.href = "http://127.0.0.1:5502/src/games/index.html" + param;
    } else if (urlOrigin === "http://petekegitim.xyz") {
        window.location.href = "http://petekegitim.xyz/src/games/index.html" + param;
    } else if (urlOrigin === "https://petekegitim.xyz") {
        window.location.href = "https://petekegitim.xyz/src/games/index.html" + param;
    } else if (urlOrigin === "https://ogre-game-company.github.io") {
        window.location.href = urlOrigin + "/ogre-petek-ui/src/" + "games/index.html" + param;
    } else if (urlOrigin === "http://petekegitim.com.tr") {
        window.location.href = "http://petekegitim.com.tr/src/games/index.html" + param;
    }
}


function setEncryptedUserIdToCookie(userId) {
    const secretKey = CONFIGS.Secret_Key; // Güçlü bir anahtar seçin
    const encryptedUserId = encryptUserId(userId, secretKey);
    setCookie('sessionId', encryptedUserId, 30); // 30 saniye süresince geçerli çerez oluşturma
}

function encryptUserId(userId, secretKey) {
    const encrypted = CryptoJS.AES.encrypt(userId, secretKey);
    return encrypted.toString();
}

function setCookie(name, value, time) {
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + time);
    const encodedValue = encodeURIComponent(value);
    const cookieValue = `${name}=${encodedValue}${time ? `; expires=${expires.toUTCString()}` : ''}`;
    document.cookie = cookieValue;
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

function verifySession() {
    const encryptedUserId = getCookie('sessionId');
    if (encryptedUserId) {
        const secretKey = CONFIGS.Secret_Key; // Aynı anahtarı kullanarak şifrelemeyi çöz
        const decryptedUserId = decryptUserId(encryptedUserId, secretKey);
        if (decryptedUserId) {
            // Kullanıcı kimliği doğrulandı
            // console.log(`Kullanıcı kimliği: ${decryptedUserId}`);
            redirectToGamePage(decryptedUserId);
        } else {
            // Geçersiz kimlik bilgisi
            console.log('Geçersiz kimlik bilgisi');
        }
    } else {
        // Oturum çerezi yok
        const urlOrigin2 = window.location.origin;
        console.log('logOrigin: ', urlOrigin2);
        console.log('Oturum çerezi yok');
    }
}

// Şifrelenmiş kimliği çözümle
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
