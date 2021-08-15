package com.sys.gets.ui.account

import android.content.SharedPreferences
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.google.android.material.snackbar.Snackbar
import com.sys.gets.R
import com.sys.gets.databinding.ActivityPasswordBinding
import com.sys.gets.network.Network
import com.sys.gets.sign.LoginActivity
import com.sys.gets.ui.setWhiteCenterTitle
import org.json.JSONObject

class PasswordActivity : AppCompatActivity() {
    private lateinit var binding: ActivityPasswordBinding
    private lateinit var pref: SharedPreferences
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_password)
        binding = ActivityPasswordBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.setWhiteCenterTitle(R.string.msg_change_password)
        pref = getSharedPreferences(LoginActivity.SIGNIN, MODE_PRIVATE)

        binding.changePasswordButton.setOnClickListener {
            val pw = binding.pwOldField.editText?.text.toString()
            if (pw.isNotBlank() && pw == pref.getString(LoginActivity.PW, "")) {
                if (binding.pwNewField.editText?.text.toString() == binding.pwCheckField.editText?.text.toString()) {
                    if (binding.pwNewField.editText?.text?.length ?: 0 < 8) {
                        binding.pwNewField.error = getString(R.string.msg_password_length_error)
                    } else {
                        binding.pwNewField.error = null
                        changePassword()
                    }
                    binding.pwCheckField.error = null
                } else {
                    binding.pwCheckField.error = getString(R.string.msg_password_error)
                }
                binding.pwOldField.error = null
            } else {
                Snackbar.make(
                    binding.changePasswordButton,
                    R.string.msg_password_error,
                    Snackbar.LENGTH_SHORT
                ).show()
                binding.pwOldField.error = getString(R.string.msg_password_error)
            }
        }
    }

    private fun changePassword() {
        val jsonObjectRequest = JsonObjectRequest(
            Request.Method.POST, Network.SIGN_UP_PASSWORD_URL,
            JSONObject().apply {
                put("password", binding.pwNewField.editText?.text)
            },
            { response ->
                if (response.getBoolean("result")) {
                    val editor = pref.edit()
                    editor.putString(LoginActivity.PW, binding.pwNewField.editText?.text.toString())
                    editor.apply()
                    finish()
                } else {
                    Snackbar.make(
                        binding.changePasswordButton,
                        R.string.msg_signup_error,
                        Snackbar.LENGTH_SHORT
                    ).show()
                }
            },
            {
                Snackbar.make(
                    binding.changePasswordButton,
                    R.string.msg_server_error,
                    Snackbar.LENGTH_SHORT
                ).show()
            }
        )
        Network.getInstance(this).addToRequestQueue(jsonObjectRequest)
    }
}