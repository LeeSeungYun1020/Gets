package com.sys.gets.ui.product

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class ProductViewModel : ViewModel() {
    val type: MutableLiveData<Int> = MutableLiveData(1)
    val detail: MutableLiveData<Int> = MutableLiveData(-1)
}