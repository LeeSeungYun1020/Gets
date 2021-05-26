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
        val topSize = findViewById<AutoCompleteTextView>(R.id.menu_top)
        val bottomSize = findViewById<AutoCompleteTextView>(R.id.menu_bottom)
        val size = listOf("XS", "S", "M", "L", "XL", "2XL")
//        val adapter = ArrayAdapter(requireContext(), R.layout.list_size, size)

//        topSize.setAdapter(adapter)
//        bottomSize.setAdapter(adapter)
    }
}