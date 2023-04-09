package com.sys.gets.sign

import android.util.Patterns
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class SignupViewModel: ViewModel() {
    private val _isPhoneCheckFieldVisible: MutableLiveData<Boolean> = MutableLiveData(false)
    val isPhoneCheckFieldVisible: LiveData<Boolean> = _isPhoneCheckFieldVisible

    private val _isPhoneCheckButtonVisible: MutableLiveData<Boolean> = MutableLiveData(false)
    val isPhoneCheckButtonVisible: LiveData<Boolean> = _isPhoneCheckFieldVisible

    private val _phoneFieldError: MutableLiveData<String?> = MutableLiveData(null)
    val phoneFieldError: LiveData<String?> = _phoneFieldError

    fun showPhoneCheckField() {
        _isPhoneCheckFieldVisible.value = true
    }

    fun hidePhoneCheckField() {
        _isPhoneCheckFieldVisible.value = false
    }

    fun showPhoneCheckButton() {
        _isPhoneCheckButtonVisible.value = true
    }

    fun hidePhoneCheckButton() {
        _isPhoneCheckButtonVisible.value = false
    }

    fun setPhoneFieldError(message: String?) {
        _phoneFieldError.value = message
    }

    fun validatePhoneNumber(phoneNumber: String, errorMessage: String, callback: () -> Unit) {
        if (phoneNumber.length in 10..16 && Patterns.PHONE.matcher(phoneNumber).matches()) {
            showPhoneCheckField()
            showPhoneCheckButton()
            callback()
        } else {
            setPhoneFieldError(errorMessage)
        }
    }
}