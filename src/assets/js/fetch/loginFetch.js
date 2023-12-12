import ENV from '../fetch/base/env.js';
import CONFIGS from '../fetch/base/config.js';

export default async function login() {

    var bodyData = {};
    bodyData = getBodyData();
    console.log(bodyData);
    if (document.getElementById("branch-dropdown") !== null) {
        const indexNumber = document.getElementById("branch-dropdown").selectedIndex;
        const key = document.getElementById("branch-dropdown").name;
        const value = document.getElementById("branch-dropdown").options[indexNumber].text
        bodyData[key] = value;
    }

    var result = fetchDepartment();
    console.log("departmentID:16", result);
    if (idCheck(result)) {
        const companyId = decryptCompanyId();
        bodyData["companyId"] = companyId;

        const departmentId = result;
        bodyData["departmentId"] = departmentId;
    }

    const apiUrl = `${ENV.API_URL}`;
    const endpoint = `Users/login`;
    const fullUrl = `${apiUrl}${endpoint}`;
    console.log(bodyData);
    const response = await fetch(fullUrl, {
        "headers": {
            "accept": "*/*",
            "accept-language": "tr,en;q=0.9,en-US;q=0.8,tr-TR;q=0.7",
            "content-type": "application/json-patch+json",
            "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        body: JSON.stringify(bodyData),
        method: "POST",
        credentials: "omit"
    });

    var data = await response.json();

    if (response.status == 200) {
        // alert("Kayıt başarılı... Oyuna giriş yapabilirsiniz.");
        return data.data.id;
    } else {
        alert(data.message);
        return "Error";
    }
}


function getBodyData() {
    var bodyData = {};
    const inputTextList = document.getElementsByTagName("input");

    for (let index = 0; index < inputTextList.length; index++) {

        const element = inputTextList[index];

        if (element.type == "text") {
            const key = element.name;
            const value = element.value;

            bodyData[key] = value;
        }
    }
    return bodyData;
}


function fetchDepartment() {
    const departmentId = document.getElementById("branch-dropdown").value;
    console.log("departmentId:", departmentId);
    return departmentId;
}

function getEncryptedParam() {
    const params = new URLSearchParams(window.location.search);
    console.log("params", params);
    const companyId = params.get('companyId');

    if (companyId != null && companyId !== null && companyId !== undefined && companyId !== "") {
        const decodeValue = decodeURIComponent(companyId);
        return decodeValue;
    }
    return "";
}

function decryptCompanyId() {
    try {
        const secretKey = CONFIGS.Secret_Key;
        const encryptedCompanyId = getEncryptedParam();
        const bytes = CryptoJS.AES.decrypt(encryptedCompanyId, secretKey);
        const originalCompanyId = bytes.toString(CryptoJS.enc.Utf8);
        return originalCompanyId;
    } catch (error) {
        // Şifre çözme hatası
        return null;
    }
}

function idCheck(value) {
    var guidRegex = /^(?:\{{0,1}(?:[0-9a-fA-F]){8}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){4}-(?:[0-9a-fA-F]){12}\}{0,1})$/;
    return guidRegex.test(value);
}