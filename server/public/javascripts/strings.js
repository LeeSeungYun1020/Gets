const strings = {
    en: {
        test1: "A",
        test2: "B"
    },
    ko: {
        test1: "가",
        test2: "나"
    }
}

function getStrings() {
    let locale = navigator.language.substr(0, 2)
    console.log(locale)
    if (!(locale in strings))
        locale = "en"
    const items = document.querySelectorAll("[string]")
    items.forEach(item => {
        console.log(item)
        item.textContent = strings[locale][item.getAttribute("string")]
    })
}