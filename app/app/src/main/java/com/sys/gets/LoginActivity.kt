package com.sys.gets

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.google.android.material.snackbar.Snackbar
import com.sys.gets.databinding.ActivityLoginBinding
import com.sys.gets.network.Network
import org.json.JSONObject

private const val SIGNIN = "SIGNIN"
private const val ID = "ID"
private const val PW = "PW"

class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // 아이디/비밀번호 자동 완성
        val pref = this.getSharedPreferences(SIGNIN, MODE_PRIVATE)
        val email = pref.getString(ID, "")
        val password = pref.getString(PW, "")

        if (email?.isNotBlank() == true && password?.isNotBlank() == true) {
            binding.idField.editText?.setText(email)
            binding.pwField.editText?.setText(password)
        }


        binding.signinButton.setOnClickListener {
            val email = binding.idField.editText?.text.toString()
            val pw = binding.pwField.editText?.text.toString()
            if (email.isNotBlank() && pw.isNotBlank())
                login(email, pw)
        }

        binding.signupButton.setOnClickListener {
            startActivity(Intent(this, SignupActivity::class.java))
        }
    }

    private fun login(email: String, password: String) {
        val jsonObjectRequest = JsonObjectRequest(
            Request.Method.POST, "${Network.BASE_URL}/signin",
            JSONObject().apply {
                put("email", email)
                put("pw", password)
            },
            { response ->
                if (response.getBoolean("result")) {
                    val pref = this.getSharedPreferences(SIGNIN, MODE_PRIVATE)
                    val editor = pref.edit()
                    editor.putString(ID, email)
                    editor.putString(PW, password)
                    editor.apply()
                    val intent = Intent(this, MainActivity::class.java)
                    startActivity(intent)
                    finish()
                } else {
                    Snackbar.make(
                        binding.signinButton,
                        R.string.msg_signin_error,
                        Snackbar.LENGTH_SHORT
                    ).show()
                }
            },
            { error ->
                Log.e("LOGE", "onCreateView: $error")
                Snackbar.make(
                    binding.signinButton,
                    R.string.msg_server_error,
                    Snackbar.LENGTH_SHORT
                ).show()
            }
        )
        Network.getInstance(this).addToRequestQueue(jsonObjectRequest)
    }
}