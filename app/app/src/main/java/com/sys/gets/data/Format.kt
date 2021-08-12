package com.sys.gets.data

import android.icu.text.NumberFormat
import android.icu.util.Currency

class Format {
    companion object {
        fun currency(number: Int): String {
            val format = NumberFormat.getCurrencyInstance()
            format.maximumFractionDigits = 0
            format.currency = Currency.getInstance("KOR")
            return format.format(number).replace("KOR", "₩")
        }
    }
}