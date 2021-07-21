package com.sys.gets.ui

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class MainViewModel : ViewModel() {
    val navigationVisibility: MutableLiveData<Boolean> = MutableLiveData(true)
}