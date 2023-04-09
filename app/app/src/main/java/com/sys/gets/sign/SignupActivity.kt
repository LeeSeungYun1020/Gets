package com.sys.gets.sign

import android.graphics.Color
import android.os.Bundle
import android.text.Spannable
import android.text.SpannableStringBuilder
import android.text.style.ForegroundColorSpan
import android.util.Patterns
import android.view.View
import android.view.inputmethod.InputMethodManager
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.widget.doAfterTextChanged
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.snackbar.Snackbar
import com.sys.gets.R
import com.sys.gets.databinding.ActivitySignupBinding
import com.sys.gets.network.Network
import com.sys.gets.ui.setWhiteCenterTitle
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

        val viewModel: SignupViewModel by viewModels()
        viewModel.isPhoneCheckFieldVisible.observe(this) { isVisiable ->
            binding.phoneCheckField.visibility = if (isVisiable) {
                View.VISIBLE
            } else {
                View.GONE
            }
        }
        viewModel.isPhoneCheckButtonVisible.observe(this) { isVisiable ->
            binding.phoneCheckButton.visibility = if (isVisiable) {
                View.VISIBLE
            } else {
                View.GONE
            }
        }
        viewModel.phoneFieldError.observe(this) { message ->
            binding.phoneField.error = message
        }

        supportActionBar?.setWhiteCenterTitle(R.string.button_signup)

        setSpan()
        binding.apply {

            idField.editText?.setOnFocusChangeListener { _, hasFocus ->
                if (!hasFocus)
                    checkDuplicate()
            }

            setPasswordCheck()

            phoneSendButton.setOnClickListener {
                viewModel.validatePhoneNumber(
                    phoneNumber = phoneField.editText?.text.toString(),
                    errorMessage = getString(R.string.msg_phone_format_error)
                ) {
                    sendMessage()
                }
            }

            phoneCheckButton.setOnClickListener { validateMessage() }

            setBirthDropdown()

            setTermCheckbox()
            setTermDetailButton()

            signupButton.setOnClickListener { validateData() }
        }
    }

    private fun setBirthDropdown() {
        binding.apply {
            val year = Calendar.getInstance().get(Calendar.YEAR).downTo(1900).toList()
            val month = (1..12).toList()
            val date = (1..31).toList()
            val yearAdapter = ArrayAdapter(this@SignupActivity, R.layout.list_item, year)
            val monthAdapter = ArrayAdapter(this@SignupActivity, R.layout.list_item, month)
            val dateAdapter = ArrayAdapter(this@SignupActivity, R.layout.list_item, date)
            (birthYearField.editText as? AutoCompleteTextView)?.setAdapter(yearAdapter)
            (birthMonthField.editText as? AutoCompleteTextView)?.setAdapter(monthAdapter)
            (birthDayField.editText as? AutoCompleteTextView)?.setAdapter(dateAdapter)
            birthYearField.editText?.doAfterTextChanged { text ->
                if (text.toString().isNotEmpty())
                    birthYearField.helperText = null
            }
            birthMonthField.editText?.doAfterTextChanged { text ->
                if (text.toString().isNotEmpty())
                    birthMonthField.helperText = null
            }
            birthDayField.editText?.doAfterTextChanged { text ->
                if (text.toString().isNotEmpty())
                    birthDayField.helperText = null
            }
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
                    0,
                    1,
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

    private fun setTermDetailButton() {
        binding.apply {
            termRequiredDetailButton.setOnClickListener {
                showTermRequiredDialog()
            }
            termInfoDetailButton.setOnClickListener {
                showTermInfoDialog()
            }
            termMarketingDetailButton.setOnClickListener {
                showTermMarketingDialog()
            }
        }
    }

    private fun showTermRequiredDialog() {
        MaterialAlertDialogBuilder(this)
            .setTitle(R.string.tilte_term_required)
            .setMessage("필수 이용 약관")
            .setPositiveButton(R.string.button_accept) { _, _ ->
                binding.termRequiredCheckbox.isChecked = true
            }
            .setNegativeButton(R.string.button_deny) { _, _ ->
                binding.termRequiredCheckbox.isChecked = false
            }
            .show()
    }

    private fun showTermInfoDialog() {
        MaterialAlertDialogBuilder(this)
            .setTitle(R.string.title_term_info)
            .setMessage("개인 정보 수집 및 이용 동의")
            .setPositiveButton(R.string.button_accept) { _, _ ->
                binding.termInfoCheckbox.isChecked = true
            }
            .setNegativeButton(R.string.button_deny) { _, _ ->
                binding.termInfoCheckbox.isChecked = false
            }
            .show()
    }

    private fun showTermMarketingDialog() {
        MaterialAlertDialogBuilder(this)
            .setTitle(R.string.title_term_marketing)
            .setMessage("이벤트 마케팅 수신 동의")
            .setPositiveButton(R.string.button_accept) { _, _ ->
                binding.termMarketingCheckbox.isChecked = true
            }
            .setNegativeButton(R.string.button_deny) { _, _ ->
                binding.termMarketingCheckbox.isChecked = false
            }
            .show()
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
            (getSystemService(INPUT_METHOD_SERVICE) as? InputMethodManager)?.hideSoftInputFromWindow(
                binding.root.windowToken,
                0
            )

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

            if (pwField.editText?.text?.length ?: 0 < 8) {
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
                return
            }


            if (!hasError) {
                signup()
            } else {
                Snackbar.make(
                    binding.signupButton,
                    R.string.msg_signup_error,
                    Snackbar.LENGTH_SHORT
                ).show()
            }
        }
    }

    private fun checkDuplicate() {
        val jsonObjectRequest = JsonObjectRequest(
            Request.Method.POST, Network.SIGN_UP_CHECK_URL,
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
            Request.Method.POST, Network.SIGN_UP_BASIC_URL,
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