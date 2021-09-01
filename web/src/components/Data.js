const Category = {
    "outer": 1,
    "top": 2,
    "bottom":3,
    "skirt": 4,
    "set": 5,
    "shoes": 6,
    "bag": 7,
    "hat": 8,
}

const NumToStringCategory = {
    1: "outer",
    2: "top",
    3: "bottom",
    4: "skirt",
    5: "set",
    6: "shoes",
    7: "bag",
    8: "hat"
}

const SubCategory = {
    "all": -1,
    "coat" : 1,
    "padding": 2,
    "cardigan" : 4,
    "blazer" : 8,
    "jumper": 16,
    "jacket" : 32,
    "hoodzipup": 64,
    "hood-zipup":64,
    "fleece": 128,
    "tshirt": 1,
    "shirts": 2,
    "shirts-blouse": 2,
    "longsleeve": 4,
    "long-sleeve": 4,
    "sweatshirt": 8,
    "hoodie": 16,
    "knit": 32,
    "sleeveless": 64,
    "vest": 128,
    "jeans": 1,
    "slacks": 2,
    "cotton": 4,
    "cotton-pants" :4,
    "training": 8,
    "training-pants": 8,
    "jogger": 16,
    "jogger-pants": 16,
    "shorts": 32,
    "leggings": 64,
    "mini": 1,
    "mini-skirt": 1,
    "middle": 2,
    "middle-skirt": 2,
    "long": 4,
    "long-skirt": 4,
    "onepiece": 1,
    "one-piece": 1,
    "twopiece": 2,
    "two-piece": 2,
    "suit": 4,
    "jumpsuit": 8,
    "sneakers": 1,
    "roper": 2,
    "boots": 4,
    "derby": 8,
    "heels": 16,
    "heels-pumps": 16,
    "sandals": 32,
    "slippers": 64,
    "backpack": 1,
    "massenger": 2,
    "massenger-crossbag": 2,
    "dot": 4,
    "dotbag": 4,
    "eco": 8,
    "ecobag": 8,
    "leather": 16,
    "leatherbag": 16,
    "cap": 1,
    "beanie": 2,
    "bucket": 4,
    "bucket-hat": 4,
    "beret": 8,
}

const NumToStringOuter = {
    1: "coat",
    2: "padding",
    4: "cardigan",
    8: "blazer",
    16: "jumper",
    32: "jacket",
    64: "hood-zipup",
    128: "fleece"
}

const NumToStringTop = {
    1: "tshirt",
    2: "shirts-blouse",
    4: "long-sleeve",
    8: "sweatshirt",
    16: "hoodie",
    32: "knit",
    64: "sleeveless",
    128: "vest"
}
const NumToStringBottom = {
    1: "jeans",
    2: "slacks",
    4: "cotton-pants",
    8: "training-pants",
    16: "jogger-pants",
    32: "shorts",
    64: "leggings"
}
const NumToStringSkirt = {
    1: "mini-skirt",
    2: "middle-skirt",
    4: "long-skirt"
}
const NumToStringSet = {
    1: "one-piece",
    2: "two-piece",
    4: "suit",
    8: "jumpsuit"
}
const NumToStringShoes = {
    1: "sneakers",
    2: "roper",
    4: "boots",
    8: "derby",
    16: "heels-pumps",
    32: "sandals",
    64: "slippers"
}
const NumToStringBag = {
    1: "backpack",
    2: "massenger-crossbag",
    4: "dotbag",
    8: "ecobag",
    16: "leatherbag"
}
const NumToStringHat = {
    1: "cap",
    2: "beanie",
    4: "bucket-hat",
    8: "beret"
}
const NumToStringStyle = {
    1: "minimal",
    2: "casual",
    4: "campus",
    8: "street",
    16: "rock-chic",
    32: "amekaji",
    64: "city-boy",
    128: "office",
    256: "sexy-glam",
    512: "feminine",
    1024: "lovely"
}

const StringToNumStyle = {
    "minimal": 1,
    "casual": 2,
    "campus": 4,
    "street": 8,
    "rock-chic": 16,
    "amekaji": 32,
    "city-boy": 64,
    "office": 128,
    "sexy-glam": 256,
    "feminine": 512,
    "lovely": 1024
}

const NumToStringKrStyle = {
    1: "kr_minimal",
    2: "kr_casual",
    4: "kr_campus",
    8: "kr_street",
    16: "kr_rock-chic",
    32: "kr_amekaji",
    64: "kr_city-boy",
    128: "kr_office",
    256: "kr_sexy-glam",
    512: "kr_feminine",
    1024: "kr_lovely"
}

const NumToStringColor = {
    1: "black",
    2: "white",
    4: "charcoal",
    8: "gray",
    16: "ivory",
    32: "beige",
    64: "brown",
    128: "red",
    256: "pink",
    512: "orange",
    1024: "yellow",
    2048: "mustard",
    4096: "mint",
    8192: "green",
    16384: "khaki",
    32768: "blue",
    65536: "sky_blue",
    131072: "navy",
    262144: "purple",
    524288: "burgundy"
}

const NumToStringSeason = {
    1: "spring",
    2: "summer",
    4: "fall",
    8: "winter"
}

const NumToStringAge = {
    1: "age_10",
    2: "age_20",
    4: "age_30",
    8: "age_40",
    16: "age_50"
}

const NumToStringFiber = {
    1: "denim",
    2: "cotton",
    4: "leather",
    8: "linen",
    16: "silk",
    32: "velvet",
    64: "corduroy",
    128: "suede",
    256: "polyester"
}

const NumToStringGender = {
    1: "man",
    2: "woman",
    3: "unisex"
}

const StringToNumGender = {
    "man": 1,
    "남자": 1,
    "woman": 2,
    "여자": 2,
    "unisex": 3,
    "공용": 3,
}

const StringToNumAge = {
    "10s": 1,
    "20s": 2,
    "30s": 4,
    "40s": 8,
    "50s ~": 16,
    "10대": 1,
    "20대": 2,
    "30대": 4,
    "40대": 8,
    "50대 이상": 16
}

const StringToNumFit = {
    "regular": 1,
    "레귤러": 1,
    "over": 2,
    "오버핏": 2,
    "wide": 4,
    "와이드": 4,
    "semi wide": 8,
    "세미 와이드": 8,
    "straight": 16,
    "스트레이트": 16,
    "slim": 32,
    "슬림": 32,
    "tapered": 64,
    "테이퍼드": 64,
    "bootcut": 128,
    "부츠컷": 128
}
export { Category, SubCategory, NumToStringStyle, NumToStringColor, NumToStringSeason,
    NumToStringAge, NumToStringFiber,NumToStringCategory, NumToStringKrStyle, NumToStringGender,
    NumToStringOuter, NumToStringTop, NumToStringBottom, NumToStringBag, NumToStringSet, NumToStringHat, NumToStringShoes, NumToStringSkirt,
    StringToNumStyle, StringToNumAge, StringToNumFit, StringToNumGender}