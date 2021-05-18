const strings = {
    en: {
        title: "Gets",
        main_title: "Gets: Custom Fashion Platform",
        home: "Home",
        category: "Category",
        closet: "Closet",
        coordination: "Coordination",
        redirect_api: "goto API",
        api_title: "Gets: API"
    },
    ko: {
        title: "Gets",
        main_title: "Gets: 맟춤형 패션 플랫폼",
        home: "홈",
        category: "카테고리",
        closet: "옷장",
        coordination: "코디",
        redirect_api: "API 바로가기",
        api_title: "Gets: API"
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