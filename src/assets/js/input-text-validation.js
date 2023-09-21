if (document.getElementById("download-button") !== null) {
    document.getElementById("download-button").addEventListener("click", function () {
        const inputTextList = document.getElementsByTagName("input")
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
        }
    });
}

if (document.getElementById("submit-button") !== null) {
    document.getElementById("submit-button").addEventListener("click", function () {
        console.log("çalıştı");
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

        if (isCheck === false) {
            alert("Lütfen tüm alanları doldurunuz!")
        } else {
            alert("Tüm Alanlar dolduruldu")
        }
    });
}

if (document.getElementById("open-game") !== null) {
    document.getElementById("open-game").addEventListener("click", function () {
        console.log("çalıştı");
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

        if (isCheck === false) {
            alert("Lütfen tüm alanları doldurunuz!")
        } else {
            alert("Tüm Alanlar dolduruldu")
        }
    });
}
