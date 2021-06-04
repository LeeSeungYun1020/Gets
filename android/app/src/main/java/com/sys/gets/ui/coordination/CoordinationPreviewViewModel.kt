package com.sys.gets.ui.coordination

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class CoordinationPreviewViewModel: ViewModel() {
    private val _text = MutableLiveData<String>().apply {
        value = "This is coordination preview Fragment"
    }
    val text: LiveData<String> = _text
}
