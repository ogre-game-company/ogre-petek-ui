export { };
import adminLogin from '../fetch/adminLoginFetch.js';
import CONFIGS from '../fetch/base/config.js';

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

                    setEncryptedUserIdToCookie(value)
                    redirectToPage(value);
                }
            } else {
                alert("Hata! Girmiş olduğunuz ID formatı hatalıdır.");
            }
        } else {
            alert("Lütfen tüm alanları doldurunuz!")
        }

    });
}

document.addEventListener("DOMContentLoaded", function () {

    // checkSession();
    verifySession();

})

function idCheck(value) {
    var guidRegex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
    return guidRegex.test(value);
}

function redirectToPage(senderId) {
    var form = document.createElement("form");
    form.setAttribute("id", "input-form");
    form.setAttribute("action", "/src/pages/score-report.html");
    form.setAttribute("method", "get");

    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("id", "id-number");
    input.setAttribute("name", "senderIdNumber");
    input.value = senderId;
    form.appendChild(input);

    document.body.appendChild(form);

    form.submit();
}


function generateSessionId() {
    // Burada oturum kimliği oluşturma mantığını uygulayabilirsiniz
    // Örneğin, rastgele bir dize veya benzersiz bir kimlik oluşturabilirsiniz
    const random_uuid = uuidv4();
    return random_uuid;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

function setCookie(name, value, time) {
    const expires = new Date();
    // expires.setDate(expires.getDate() + days);
    expires.setMinutes(expires.getMinutes() + time);
    const encodedValue = encodeURIComponent(value);
    const cookieValue = `${name}=${encodedValue}${time ? `; expires=${expires.toUTCString()}` : ''}`;
    document.cookie = cookieValue;
}

function checkSession() {
    const sessionId = getCookie("sessionId");
    if (sessionId) {
        // Oturum kimliği geçerli, kullanıcı oturumunu sürdürebilir
        // Sunucu tarafında oturumu doğrulayabilirsiniz
        console.log("Kullanıcı oturumu geçerli.");
    } else {
        // Oturum kimliği yok veya geçersiz, kullanıcıyı tekrar yönlendirebilirsiniz
        console.log("Kullanıcı oturumu yok veya geçersiz.");
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

function setEncryptedUserIdToCookie(userId) {
    const secretKey = CONFIGS.Secret_Key; // Güçlü bir anahtar seçin
    const encryptedUserId = encryptUserId(userId, secretKey);
    setCookie('sessionId', encryptedUserId, 5); // 30 dakika süresince geçerli çerez oluşturma
}

function encryptUserId(userId, secretKey) {
    const encrypted = CryptoJS.AES.encrypt(userId, secretKey);
    return encrypted.toString();
}

function verifySession() {
    const encryptedUserId = getCookie('sessionId');
    if (encryptedUserId) {
        const secretKey = CONFIGS.Secret_Key; // Aynı anahtarı kullanarak şifrelemeyi çöz
        const decryptedUserId = decryptUserId(encryptedUserId, secretKey);
        if (decryptedUserId) {
            // Kullanıcı kimliği doğrulandı
            // console.log(`Kullanıcı kimliği: ${decryptedUserId}`);
            redirectToPage(decryptedUserId);
        } else {
            // Geçersiz kimlik bilgisi
            console.log('Geçersiz kimlik bilgisi');
        }
    } else {
        // Oturum çerezi yok
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