package com.sys.gets.ui.login

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import androidx.core.content.ContentProviderCompat.requireContext
import com.google.android.material.textfield.TextInputLayout
import com.sys.gets.R

class DetailRegister : AppCompatActivity() {
    val textField_top = findViewById<TextInputLayout>(R.id.menu_top)
    val textField_bottom = findViewById<TextInputLayout>(R.id.menu_top)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail_register)

        val items = listOf("XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL")
        val adapter1 = ArrayAdapter(this, R.layout.list_size, items)
        (textField_top.editText as? AutoCompleteTextView)?.setAdapter(adapter1)
        val adapter2 = ArrayAdapter(this, R.layout.list_size, items)
        (textField_bottom.editText as? AutoCompleteTextView)?.setAdapter(adapter1)
    }

}