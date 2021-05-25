package com.sys.gets.data

import com.sys.gets.R

enum class Category(val code: Int, val resID: Int) {
    OUTER(1, R.string.category_outer),
    TOP(2, R.string.category_top),
    PANTS(3, R.string.category_pants),
    SKIRT(4, R.string.category_skirt),
    SET(5, R.string.category_set),
    SHOES(6, R.string.category_shoes),
    BAG(7, R.string.category_bag),
    HAT(8, R.string.category_hat)
}

enum class Outer(val code: Int, val resID: Int) {
    COAT(1, R.string.category_outer_coat),
    PADDED_JACKET(2, R.string.category_outer_padded_jacket),
    CARDIGAN(4, R.string.category_outer_cardigan),
    BLAZER(8, R.string.category_outer_blazer),
    JUMPER(16, R.string.category_outer_jumper),
    JACKET(32, R.string.category_outer_jacket),
    HOODED_ZIP_UP(64, R.string.category_outer_hooded_zipup),
    FLEECE(128, R.string.category_outer_fleece),
}

enum class Top(val code: Int, val resID: Int) {
    T_SHIRT(1, R.string.category_top_t_shirt),
    SHIRT_BLOUSE(2, R.string.category_top_shirt_blouse),
    LONG_SLEEVE(4, R.string.category_top_long_sleeve),
    SWEATSHIRT(8, R.string.category_top_sweatshirt),
    HOODIE(16, R.string.category_top_hoodie),
    KNIT(32, R.string.category_top_knit),
    SLEEVELESS(64, R.string.category_top_sleeveless),
    VEST(128, R.string.category_top_vest)
}

enum class Pants(val code: Int, val resID: Int) {
    JEANS(1, R.string.category_pants_jeans),
    SLACKS(2, R.string.category_pants_slacks),
    COTTON_PANTS(4, R.string.category_pants_cotton_pants),
    TRAINING_PANTS(8, R.string.category_pants_training_pants),
    JOGGER_PANTS(16, R.string.category_pants_jogger_pants),
    SHORTS(32, R.string.category_pants_shorts),
    LEGGINGS(64, R.string.category_pants_leggings)
}

enum class Skirt(val code: Int, val resID: Int) {
    MINI_SKIRT(1, R.string.category_skirt_mini_skirt),
    MIDDLE_SKIRT(2, R.string.category_skirt_middle_skirt),
    LONG_SKIRT(4, R.string.category_skirt_long_skirt)

}

enum class Set(val code: Int, val resID: Int) {
    ONE_PIECE(1, R.string.category_set_one_piece),
    TWO_PIECE(2, R.string.category_set_two_piece),
    SUIT(4, R.string.category_set_suit),
    JUMP_SUIT(8, R.string.category_set_jump_suit)

}

enum class Shoes(val code: Int, val resID: Int) {
    SNEAKERS(1, R.string.category_shoes_sneakers),
    LOAFERS(2, R.string.category_shoes_loafers),
    BOOTS(4, R.string.category_shoes_boots),
    DERBY(8, R.string.category_shoes_derby),
    HEELS_PUMPS(16, R.string.category_shoes_heels_pumps),
    SANDALS(32, R.string.category_shoes_sandals),
    SLIPPER(64, R.string.category_shoes_slipper)

}

enum class Bag(val code: Int, val resID: Int) {
    BACKPACK(1, R.string.category_bag_backpack),
    MESSENGER_CROSS_BAG(2, R.string.category_bag_messenger_cross),
    TOTE_BAG(4, R.string.category_bag_tote),
    ECO_BAG(8, R.string.category_bag_eco),
    LEATHER_BAG(16, R.string.category_bag_leather)

}

enum class Hat(val code: Int, val resID: Int) {
    CAP(1, R.string.category_hat_cap),
    BEANIE(2, R.string.category_hat_beanie),
    BUCKET_HAT(4, R.string.category_hat_bucket_hat),
    BERET(8, R.string.category_hat_beret)

}

enum class Fit(val code: Int, val resID: Int) {
    REGULAR(1, R.string.fit_regular),
    OVER(2, R.string.fit_over),
    WIDE(4, R.string.fit_wide),
    SEMI_WIDE(8, R.string.fit_semi_wide),
    STRAIGHT(16, R.string.fit_straight),
    SLIM(32, R.string.fit_slim),
    TAPERED(64, R.string.fit_tapered),
    BOOTCUT(128, R.string.fit_bootcut)

}

enum class Season(val code: Int, val resID: Int) {
    SPRING(1, R.string.season_spring),
    SUMMER(2, R.string.season_summer),
    FALL(4, R.string.season_fall),
    WINTER(8, R.string.season_winter)

}

enum class Material(val code: Int, val resID: Int) {
    DENIM(1, R.string.material_denim),
    COTTON(2, R.string.material_cotton),
    LEATHER(4, R.string.material_leather),
    LINEN(8, R.string.material_linen),
    SILK(16, R.string.material_silk),
    VELVET(32, R.string.material_velvet),
    CODUROY(64, R.string.material_coduroy),
    SUEDE(128, R.string.material_suede),
    POLYESTER(256,R.string.material_polyester),
    NYLON(512, R.string.material_nylon)
}

enum class Age(val code: Int, val resID: Int) {
    A10S(1, R.string.age_10),
    A20S(2, R.string.age_20),
    A30S(4, R.string.age_30),
    A40S(8, R.string.age_40),
    A50S(16, R.string.age_50)
}

enum class Style(val code: Int, val resID: Int) {
    MINIMAL(1, R.string.style_minimal),
    CASUAL(2, R.string.style_casual),
    CAMPUS(4, R.string.style_campus),
    STREET(8, R.string.style_street),
    ROCK_CHIC(16, R.string.style_rock_chic),
    AMEKAJI(32, R.string.style_amekaji),
    CITY_BOY(64, R.string.style_city_boy),
    OFFICE(128, R.string.style_office),
    SEXY_GLAM(256, R.string.style_sexy_glam),
    FEMININE(512, R.string.style_feminine),
    LOVELY(1024, R.string.style_lovely)
}

enum class Color(val code: Int, val resID: Int) {
    BLACK(1, R.string.color_black),
    WHITE(2, R.string.color_white),
    CHARCOAL(4, R.string.color_charcoal),
    GRAY(8, R.string.color_gray),
    IVORY(16, R.string.color_ivory),
    BEIGE(32, R.string.color_beige),
    BROWN(64, R.string.color_brown),
    RED(128, R.string.color_red),
    PINK(256, R.string.color_pink),
    ORANGE(512, R.string.color_orange),
    YELLOW(1024, R.string.color_yellow),
    MUSTARD(2048, R.string.color_mustard),
    MINT(4096, R.string.color_mint),
    GREEN(8192, R.string.color_green),
    KHAKII(16384, R.string.color_khakii),
    BLUE(32768, R.string.color_blue),
    SKY_BLUE(65536, R.string.color_sky_blue),
    NAVY(131072, R.string.color_navy),
    PURPLE(262144, R.string.color_purple),
    BURGUNDY(524288, R.string.color_burgundy)
}