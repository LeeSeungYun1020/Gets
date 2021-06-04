package com.sys.gets.ui.login

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import android.widget.TextView
import androidx.core.content.ContentProviderCompat.requireContext
import com.google.android.material.textfield.TextInputLayout
import com.sys.gets.R

class DetailRegister : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail_register)
        val topSize = findViewById<TextInputLayout>(R.id.menu_top)
        val bottomSize = findViewById<TextInputLayout>(R.id.menu_bottom)
        val size = listOf("XS", "S", "M", "L", "XL", "2XL")
        val adapter = ArrayAdapter(this, R.layout.list_item, size)
        (topSize.editText as? AutoCompleteTextView)?.setAdapter(adapter)
        (bottomSize.editText as? AutoCompleteTextView)?.setAdapter(adapter)
    }
}