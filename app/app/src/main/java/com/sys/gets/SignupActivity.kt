package com.sys.gets

import android.os.Bundle
import android.util.Patterns
import android.view.inputmethod.InputMethodManager
import androidx.appcompat.app.AppCompatActivity
import androidx.core.widget.doAfterTextChanged
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.google.android.material.snackbar.Snackbar
import com.sys.gets.databinding.ActivitySignupBinding
import com.sys.gets.network.Network
import org.json.JSONObject
import java.util.*

class SignupActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySignupBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySignupBinding.inflate(layoutInflater)
        setContentView(binding.root)

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

            signupButton.setOnClickListener {
                var hasError = false

                if (!Patterns.EMAIL_ADDRESS.matcher(idField.editText?.text.toString()).matches()) {
                    idField.error = getString(R.string.msg_email_format_error)
                    hasError = true
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



                listOf(
                    nameField,
                    phoneField,
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

                (getSystemService(INPUT_METHOD_SERVICE) as? InputMethodManager)?.hideSoftInputFromWindow(
                    binding.root.windowToken,
                    0
                )
                if (!hasError) {
                    signup()
                }
            }
        }
    }

    private fun signup() {
        val jsonObjectRequest = JsonObjectRequest(
            Request.Method.POST, "${Network.BASE_URL}/signup/basic",
            JSONObject().apply {
                //email, pw, name, phone, year, month, day, address, addressDetail
                put("email", binding.idField.editText?.text)
                put("pw", binding.pwField.editText?.text)
                put("name", binding.nameField.editText?.text)
                put("phone", binding.phoneField.editText?.text)
                put("year", binding.birthYearField.editText?.text)
                put("month", binding.birthMonthField.editText?.text)
                put("day", binding.birthDayField.editText?.text)
                put("address", binding.addressField.editText?.text)
                put("addressDetail", binding.addressDetailField.editText?.text)
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