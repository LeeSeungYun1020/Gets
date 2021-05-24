package com.sys.gets.ui.login

import android.os.Bundle
import android.util.Patterns
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.textfield.TextInputLayout
import com.sys.gets.R
import com.sys.gets.databinding.ActivityLoginBinding

class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val email = binding.username
        val password = binding.password
        val login = binding.login
        val register = binding.register

        email.setErrorListener(getString(R.string.invalid_email)) {
            !Patterns.EMAIL_ADDRESS.matcher(
                email.editText?.text ?: ""
            ).matches()
        }

        password.setErrorListener(getString(R.string.invalid_password)) {
            password.editText?.text?.length ?: 0 <= 5
        }

        login.setOnClickListener {
            // TODO 서버 로그인 수행
        }

        register.setOnClickListener {
            // TODO 레지스터 엑티비티 추가 및 연결
            // startActivity(Intent(this, RegisterActivity::class.java))
        }
    }

    private fun TextInputLayout.setErrorListener(msg: String, condition: () -> Boolean) {
        this.editText?.setOnFocusChangeListener { view, hasFocus ->
            if (!hasFocus) {
                if (condition()) {
                    this.error = msg
                } else {
                    this.error = null
                }
            }
        }
    }
}