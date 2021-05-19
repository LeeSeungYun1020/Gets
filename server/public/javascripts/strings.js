const strings = {
    en: {
        title: "Gets",
        main_title: "Gets: Custom Fashion Platform",
        home: "Home",
        category: "Category",
        closet: "Closet",
        coordination: "Coordination",
        redirect_api: "goto API",
        api_title: "Gets: API",
        api_sign: "Sign in/up",
        api_sign_in: "Sign in",
        api_sign_up: "Sign up",
        api_sign_up_basic: "Sign up - basic",
        api_sign_up_info: "Sign up - info",
        api_sign_up_check: "Sign up - check id",
        api_weather: "Weather",
        api_product: "Product",
        api_product_image: "Product - image",
        api_product_list: "Product - list",
        api_review_add: "Review - add",
        api_review_fit: "Review -fit",
        api_review: "Review - list",
    },
    ko: {
        title: "Gets",
        main_title: "Gets: 맟춤형 패션 플랫폼",
        home: "홈",
        category: "카테고리",
        closet: "옷장",
        coordination: "코디",
        redirect_api: "API 바로가기",
        api_title: "Gets: API",
        api_sign: "로그인/회원가입",
        api_sign_in: "로그인",
        api_sign_up: "회원가입",
        api_sign_up_basic: "회원가입 - 기본",
        api_sign_up_info: "회원가입 - 추가 정보",
        api_sign_up_check: "회원가입 - ID 중복 확인",
        api_weather: "날씨",
        api_product: "상품",
        api_product_image: "상품 - 이미지",
        api_product_list: "상품 - 목록",
        api_review_add: "리뷰 - 추가",
        api_review_fit: "리뷰 - 맞춤",
        api_review: "리뷰 - 리스트",
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