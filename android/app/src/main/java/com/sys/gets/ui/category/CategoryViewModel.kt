package com.sys.gets.ui.category

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class CategoryViewModel : ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "This is category Fragment"
    }
    val text: LiveData<String> = _text


}

//fragment 내 데이터 관리 & mainActivity 와 각 fragment의 중간연결고리