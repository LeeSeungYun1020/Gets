package com.sys.gets.ui.coordination

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class CoordinationViewModel : ViewModel() {
    private val _text = MutableLiveData<String>().apply {
        value = "This is coordination Fragment"
    }
    val text: LiveData<String> = _text
}