package com.sys.gets.ui.login

import android.content.ContentValues.TAG
import android.content.Intent
import android.os.Bundle
import android.text.format.DateFormat
import android.util.Log
import android.util.Patterns
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.widget.doOnTextChanged
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.google.android.material.datepicker.MaterialDatePicker
import com.sys.gets.R
import com.sys.gets.databinding.ActivityRegisterBinding
import com.sys.gets.network.Network
import org.json.JSONObject
import java.util.*

class RegisterActivity : AppCompatActivity() {
    private lateinit var binding: ActivityRegisterBinding
    private var year = 0
    private var month = 0
    private var date = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val inputList = listOf(
            binding.email,
            binding.password,
            binding.name,
            binding.phoneNumber,
            binding.birth
        )

        binding.email.editText?.doOnTextChanged { text, _, _, _ ->
            val address = text ?: ""
            if (Patterns.EMAIL_ADDRESS.matcher(address).matches()) {
                binding.email.error = null
                checkEmail(address) {}
            } else {
                binding.email.error = getString(R.string.invalid_email)
            }
        }

        binding.password.editText?.setOnFocusChangeListener { view, hasFocus ->
            if (!hasFocus) {
                if (binding.password.editText?.text?.length ?: 0 <= 5) {
                    binding.password.error = getString(R.string.invalid_password)
                } else {
                    binding.password.error = null
                }
            }
        }

        binding.birthInput.setOnClickListener {
            val datePicker =
                MaterialDatePicker.Builder.datePicker()
                    .setTitleText(getString(R.string.prompt_birth))
                    .setInputMode(MaterialDatePicker.INPUT_MODE_TEXT)
                    .build()
            datePicker.addOnPositiveButtonClickListener {
                val calendar = Calendar.getInstance()
                calendar.timeInMillis = it
                year = calendar[Calendar.YEAR]
                month = calendar[Calendar.MONTH]
                date = calendar[Calendar.DATE]
                val df = DateFormat.getDateFormat(this)
                binding.birth.editText?.setText(df.format(calendar.time))
            }
            datePicker.show(supportFragmentManager, "birth")
        }


        binding.register.setOnClickListener {
            var check = true
            if (binding.password.editText?.text?.length ?: 0 <= 5) {
                binding.password.error = getString(R.string.invalid_password)
                check = false
            }

            for (input in inputList) {
                if (input.editText?.text.isNullOrBlank()) {
                    input.error = getString(R.string.msg_register_required)
                    check = false
                }
            }

            if (check) {
                checkEmail(binding.email.editText?.text ?: "") {
//                    var id = binding.email.editText?.text.toString()
//                    var pw = binding.password.editText?.text.toString()
//
//                    val sharedPreference = getSharedPreferences("other", 0)
//                    val editor = sharedPreference.edit()
//                    editor.putString("id", id)
//                    editor.putString("pw", pw)
//                    editor.apply()
//                    Log.e(TAG, "쉐어드에 저장된 아이디 = " + sharedPreference.getString("id", ""))
//                    Log.e(TAG, "쉐어드에 저장된 비밀번호 = " + sharedPreference.getString("pw", ""))
                    register()
                }
            }
        }

    }

    private fun checkEmail(text: CharSequence, success: () -> Unit) {
        val jsonObjectRequest = JsonObjectRequest(
            Request.Method.POST, "${Network.BASE_URL}/signup/check",
            JSONObject().apply {
                put("email", text)
            },
            { response ->
                if (response.getBoolean("result")) {
                    binding.email.error = null
                    success()
                } else {
                    binding.email.error = getString(R.string.msg_register_email_duplicate)
                }
            },
            {
                AlertDialog.Builder(this)
                    .setTitle(R.string.msg_server_error)
                    .setMessage(R.string.msg_server_disconnected)
                    .setPositiveButton(R.string.msg_ok, null)
                    .show()
            }
        )
        Network.getInstance(this).addToRequestQueue(jsonObjectRequest)
    }

    private fun register() {
        val jsonObjectRequest = JsonObjectRequest(
            Request.Method.POST, "${Network.BASE_URL}/signup/basic",
            JSONObject().apply {
                //email, pw, name, phone, year, month, day, address, addressDetail
                put("email", binding.email.editText?.text)
                put("pw", binding.password.editText?.text)
                put("name", binding.name.editText?.text)
                put("phone", binding.phoneNumber.editText?.text)
                put("year", year)
                put("month", month)
                put("day", date)
                put("address", binding.address.editText?.text)
                put("addressDetail", binding.addressDetail.editText?.text)
            },
            { response ->
                if (response.getBoolean("result")) {
                    setResult(RESULT_OK, Intent().apply {
                        putExtra("email", binding.email.editText?.text)
                        putExtra("password", binding.password.editText?.text)
                    })
                    finish()
                } else {
                    AlertDialog.Builder(this)
                        .setTitle(R.string.msg_register_error)
                        .setMessage(R.string.msg_register_failed)
                        .setPositiveButton(R.string.msg_ok, null)
                        .show()
                    setResult(RESULT_CANCELED)
                    finish()
                }
            },
            {
                AlertDialog.Builder(this)
                    .setTitle(R.string.msg_server_error)
                    .setMessage(R.string.msg_server_disconnected)
                    .setPositiveButton(R.string.msg_ok, null)
                    .show()
            }
        )
        Network.getInstance(this).addToRequestQueue(jsonObjectRequest)
    }
}