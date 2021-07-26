package com.sys.gets.sign

import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import android.text.Spannable
import android.text.SpannableStringBuilder
import android.text.style.ForegroundColorSpan
import android.util.Patterns
import android.view.View
import android.view.inputmethod.InputMethodManager
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.widget.doAfterTextChanged
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.google.android.material.snackbar.Snackbar
import com.sys.gets.R
import com.sys.gets.databinding.ActivitySignupBinding
import com.sys.gets.network.Network
import org.json.JSONObject
import java.util.*

class SignupActivity : AppCompatActivity() {
    private val validateNumber = (100000..999999).random().toString()
    private var isPhoneChecked = false
    private var isEmailDuplicated = true
    private lateinit var binding: ActivitySignupBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySignupBinding.inflate(layoutInflater)
        setContentView(binding.root)

        actionBar?.setBackgroundDrawable(ColorDrawable(Color.WHITE))
        supportActionBar?.setBackgroundDrawable(ColorDrawable(Color.WHITE))

        setSpan()
        binding.apply {

            idField.editText?.setOnFocusChangeListener { _, hasFocus ->
                if (!hasFocus)
                    checkDuplicate()

                Snackbar.make(
                    binding.signupButton,
                    "ID: $hasFocus",
                    Snackbar.LENGTH_SHORT
                ).show()
            }

            setPasswordCheck()

            phoneSendButton.setOnClickListener {
                val phone = phoneField.editText?.text.toString()
                if (phone.length in 10..16 && Patterns.PHONE.matcher(phone).matches()) {
                    phoneCheckField.visibility = View.VISIBLE
                    phoneCheckButton.visibility = View.VISIBLE
                    sendMessage()
                } else {
                    phoneField.error = getString(R.string.msg_phone_format_error)
                }
            }

            phoneCheckButton.setOnClickListener { validateMessage() }

            setBirthDropdown()

            setTermCheckbox()

            signupButton.setOnClickListener { validateData() }
        }
    }

    private fun setBirthDropdown() {
        binding.apply {
            val year = 2021.downTo(1900).toList()
            val month = (1..12).toList()
            val date = (1..31).toList()
            val yearAdapter = ArrayAdapter(this@SignupActivity, R.layout.list_item, year)
            val monthAdapter = ArrayAdapter(this@SignupActivity, R.layout.list_item, month)
            val dateAdapter = ArrayAdapter(this@SignupActivity, R.layout.list_item, date)
            (birthYearField.editText as? AutoCompleteTextView)?.setAdapter(yearAdapter)
            (birthMonthField.editText as? AutoCompleteTextView)?.setAdapter(monthAdapter)
            (birthDayField.editText as? AutoCompleteTextView)?.setAdapter(dateAdapter)
        }
    }

    private fun setPasswordCheck() {
        binding.apply {
            pwField.editText?.doAfterTextChanged {
                val text = it.toString()
                if (pwCheckField.editText?.text.toString() != text)
                    pwCheckField.error = getString(R.string.msg_password_error)
                else
                    pwCheckField.error = null
            }

            pwCheckField.editText?.doAfterTextChanged {
                val text = it.toString()
                if (pwField.editText?.text.toString() != text)
                    pwCheckField.error = getString(R.string.msg_password_error)
                else
                    pwCheckField.error = null
            }
        }
    }

    private fun setSpan() {
        binding.apply {
            listOf(nameText, idText, pwText, phoneText, birthText).forEach {
                val text = it.text.toString()
                val spannable = SpannableStringBuilder(text)
                spannable.setSpan(
                    ForegroundColorSpan(Color.RED),
                    text.lastIndex,
                    text.length,
                    Spannable.SPAN_EXCLUSIVE_INCLUSIVE
                )
                it.text = spannable
            }
        }
    }

    private fun setTermCheckbox() {
        binding.apply {
            termAllCheckbox.setOnCheckedChangeListener { _, isChecked ->
                if (isChecked) {
                    termRequiredCheckbox.isChecked = true
                    termInfoCheckbox.isChecked = true
                    termMarketingCheckbox.isChecked = true
                }
            }

            listOf(
                termRequiredCheckbox,
                termInfoCheckbox,
                termMarketingCheckbox
            ).forEach { checkBox ->
                checkBox.setOnCheckedChangeListener { _, isChecked ->
                    if (!isChecked)
                        termAllCheckbox.isChecked = false
                }
            }
        }
    }

    private fun sendMessage() {
        binding.apply {
            phoneField.isEnabled = false
            phoneSendButton.isEnabled = false
            phoneCheckField.editText?.setText(validateNumber)
        }
    }

    private fun validateMessage() {
        if (binding.phoneCheckField.editText?.text.toString() == validateNumber) {
            Snackbar.make(
                binding.phoneSendButton,
                R.string.msg_phone_check_success,
                Snackbar.LENGTH_SHORT
            ).show()
            binding.apply {
                phoneCheckField.visibility = View.GONE
                phoneCheckButton.visibility = View.GONE
                phoneSendButton.text = getString(R.string.button_done)
                isPhoneChecked = true
            }
        } else {
            Snackbar.make(
                binding.phoneSendButton,
                R.string.msg_phone_check_failed,
                Snackbar.LENGTH_SHORT
            ).show()
            binding.apply {
                phoneCheckField.editText?.setText("")
                phoneSendButton.text = getString(R.string.button_resend)
                phoneField.isEnabled = true
                phoneSendButton.isEnabled = true
            }
        }
    }

    private fun validateData() {
        binding.apply {
            var hasError = false

            if (!Patterns.EMAIL_ADDRESS.matcher(idField.editText?.text.toString()).matches()) {
                idField.error = getString(R.string.msg_email_format_error)
                hasError = true
            } else if (isEmailDuplicated) {
                Snackbar.make(
                    binding.signupButton,
                    R.string.msg_email_check_error,
                    Snackbar.LENGTH_SHORT
                ).show()
                idField.error = getString(R.string.msg_email_check_progress)
                checkDuplicate()
            } else
                idField.error = null

            if (pwField.editText?.text?.length ?: 0 < 5) {
                pwField.error = getString(R.string.msg_password_length_error)
                hasError = true
            } else
                pwField.error = null

            if (pwCheckField.editText?.text.toString() != pwField.editText?.text.toString()) {
                pwCheckField.error = getString(R.string.msg_password_error)
                hasError = true
            } else
                pwCheckField.error = null

            if (!isPhoneChecked) {
                phoneField.error = getString(R.string.msg_required_field_error)
                hasError = true
            } else {
                phoneField.error = null
            }

            listOf(
                nameField,
                birthYearField,
                birthMonthField,
                birthDayField
            ).forEach {
                if (it.editText?.text.toString().isNullOrBlank()) {
                    it.error = getString(R.string.msg_required_field_error)
                    hasError = true
                } else
                    it.error = null
            }

            if (!termRequiredCheckbox.isChecked || !termInfoCheckbox.isChecked) {
                Snackbar.make(
                    binding.signupButton,
                    R.string.msg_term_error,
                    Snackbar.LENGTH_SHORT
                ).show()
                hasError = true
            }

            (getSystemService(INPUT_METHOD_SERVICE) as? InputMethodManager)?.hideSoftInputFromWindow(
                binding.root.windowToken,
                0
            )
            if (!hasError) {
                signup()
            }
        }
    }

    private fun checkDuplicate() {
        val jsonObjectRequest = JsonObjectRequest(
            Request.Method.POST, "${Network.API_URL}/signup/check",
            JSONObject().apply {
                put("email", binding.idField.editText?.text)
            },
            { response ->
                if (response.getBoolean("result")) {
                    isEmailDuplicated = false
                    binding.idField.error = null
                } else {
                    isEmailDuplicated = true
                    binding.idField.error = getString(R.string.msg_signin_duplicate)
                }
            },
            {
                Snackbar.make(
                    binding.signupButton,
                    R.string.msg_server_error,
                    Snackbar.LENGTH_SHORT
                ).show()
            }
        )
        Network.getInstance(this).addToRequestQueue(jsonObjectRequest)
    }

    private fun signup() {
        val jsonObjectRequest = JsonObjectRequest(
            Request.Method.POST, "${Network.API_URL}/signup/basic",
            JSONObject().apply {
                //email, pw, name, phone, year, month, day, address, addressDetail
                put("email", binding.idField.editText?.text)
                put("pw", binding.pwField.editText?.text)
                put("name", binding.nameField.editText?.text)
                put("phone", binding.phoneField.editText?.text)
                put("year", binding.birthYearField.editText?.text)
                put("month", binding.birthMonthField.editText?.text)
                put("day", binding.birthDayField.editText?.text)
            },
            { response ->
                if (response.getBoolean("result")) {
                    val pref =
                        this@SignupActivity.getSharedPreferences(LoginActivity.SIGNIN, MODE_PRIVATE)
                    val editor = pref.edit()
                    editor.putString(LoginActivity.ID, binding.idField.editText?.text.toString())
                    editor.putString(LoginActivity.PW, binding.pwField.editText?.text.toString())
                    editor.commit()
                    finish()
                } else {
                    Snackbar.make(
                        binding.signupButton,
                        R.string.msg_signup_error,
                        Snackbar.LENGTH_SHORT
                    ).show()
                }
            },
            {
                Snackbar.make(
                    binding.signupButton,
                    R.string.msg_server_error,
                    Snackbar.LENGTH_SHORT
                ).show()
            }
        )
        Network.getInstance(this).addToRequestQueue(jsonObjectRequest)
    }
}