import ENV from '../fetch/base/env.js';

export default async function adminLogin() {

    var idElement = document.getElementById("id-number").value;
    var passwordElement = document.getElementById("password").value;

    const apiUrl = `${ENV.API_URL}`;
    const endpoint = `Users/admin-login?SenderId=${idElement}&Password=${passwordElement}`;
    const fullUrl = `${apiUrl}${endpoint}`;

    const response = await fetch(fullUrl);
    var data = await response.json();

    if (response.status !== 200) {
        alert(data.message);
    }

    return response.statusText;
}
