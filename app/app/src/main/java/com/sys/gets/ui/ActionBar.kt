package com.sys.gets.ui

import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.widget.TextView
import androidx.annotation.StringRes
import androidx.appcompat.app.ActionBar
import com.sys.gets.R

fun ActionBar.setWhiteCenterTitle(@StringRes resid: Int) {
    this.setBackgroundDrawable(ColorDrawable(Color.WHITE))
    this.displayOptions = ActionBar.DISPLAY_SHOW_CUSTOM
    this.setCustomView(R.layout.component_action_bar)
    this.customView.findViewById<TextView>(R.id.title).setText(resid)
    this.setDisplayHomeAsUpEnabled(true)
}
