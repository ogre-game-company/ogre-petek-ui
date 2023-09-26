if (document.getElementById("open-game") !== null) {
    document.getElementById("open-game").addEventListener("click", function () {
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
