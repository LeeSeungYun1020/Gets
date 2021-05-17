const strings = {
    en: {
        main_title: "Gets: Custom Fashion Platform",
        home: "Home",
        category: "Category",
        closet: "Closet",
        coordination: "Coordination"
    },
    ko: {
        main_title: "Gets: 맟춤형 패션 플랫폼",
        home: "홈",
        category: "카테고리",
        closet: "옷장",
        coordination: "코디"
    }
}

function getStrings() {
    let locale = navigator.language.substr(0, 2)
    if (!(locale in strings))
        locale = "en"
    const items = document.querySelectorAll("[string-from]")
    items.forEach(item => {
        item.textContent = strings[locale][item.getAttribute("string-from")]
    })
}