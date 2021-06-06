package com.sys.gets.ui.login

import android.content.ContentValues.TAG
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.util.Patterns
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.google.android.material.textfield.TextInputLayout
import com.sys.gets.MainActivity
import com.sys.gets.R
import com.sys.gets.databinding.ActivityLoginBinding
import com.sys.gets.network.Network
import org.json.JSONObject

class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding
    private val encryptedSharedPreferences by lazy {
        EncryptedSharedPreferences
            .create(
                this.applicationContext,
                "user",
                MasterKey.Builder(this, MasterKey.DEFAULT_MASTER_KEY_ALIAS)
                    .setKeyScheme(MasterKey.KeyScheme.AES256_GCM).build(),
                EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
            )
    }
    private val getRegisterActivityResult =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) {
            when (it.resultCode) {
                RESULT_OK -> {
                    val email = it.data?.getStringExtra("email")
                    val password = it.data?.getStringExtra("password")
                    if (!email.isNullOrBlank() && !password.isNullOrBlank())
                        login(email, password)
                }
            }
        }

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

//        if(MySharedPreferences.getUserId(this).isNullOrBlank()||MySharedPreferences.getUserPass(this).isNullOrBlank()){
//            Log.e(TAG, "자동로그인 안됨")
//        }
//        else {
//            Toast.makeText(this, "${MySharedPreferences.getUserId(this)}님 자동 로그인 되었습니다.", Toast.LENGTH_LONG).show()
//            Log.e(TAG, "자동로그인 됨")
//            var intent = Intent(this, MainActivity::class.java)
//            startActivity(intent)
//            finish()
//        }

        login.setOnClickListener {
            when {
                email.error != null -> email.requestFocus()
                password.error != null -> password.requestFocus()
                else -> {
                    val emailString = email.editText?.text ?: ""
                    val passwordString = password.editText?.text ?: ""
                    if (emailString.isBlank() || passwordString.isBlank()) {
                        AlertDialog.Builder(this)
                            .setTitle(R.string.msg_login_error)
                            .setMessage(R.string.msg_login_input)
                            .setPositiveButton(R.string.msg_ok, null)
                            .show()
                    } else {
                        login(emailString.toString(), passwordString.toString())
                    }
                }
            }

        }

        register.setOnClickListener {
            getRegisterActivityResult.launch(Intent(this, RegisterActivity::class.java))
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

    private fun login(email: String, password: String) {
        val jsonObjectRequest = JsonObjectRequest(
            Request.Method.POST, "${Network.BASE_URL}/signin",
            JSONObject().apply {
                put("email", email)
                put("pw", password)
            },
            { response ->
                if (response.getBoolean("result")) {
                    with(encryptedSharedPreferences.edit()) {
                        putString("email", email.toString())
                        putString("password", password.toString())
                        apply()
                    }

                    MySharedPreferences.setUserId(this, binding.username.editText?.text.toString())
                    MySharedPreferences.setUserPass(this, binding.password.editText?.text.toString())
                    Toast.makeText(this, "${MySharedPreferences.getUserId(this)}님 로그인 되었습니다.", Toast.LENGTH_SHORT).show()
                    var intent = Intent(this, MainActivity::class.java)
                    startActivity(intent)

                    // TODO: 로그인 유지 방안 확보


                    finish()
                } else {
                    AlertDialog.Builder(this)
                        .setTitle(R.string.msg_login_error)
                        .setMessage(R.string.msg_login_failed)
                        .setPositiveButton(R.string.msg_ok, null)
                        .show()
                }
            },
            { error ->
                Log.e("LOGE", "onCreateView: $error")
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