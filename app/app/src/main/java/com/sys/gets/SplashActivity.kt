package com.sys.gets

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.google.android.material.button.MaterialButton
import com.sys.gets.network.Network
import com.sys.gets.sign.LoginActivity
import org.json.JSONObject

class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        val pref = this.getSharedPreferences(LoginActivity.SIGNIN, MODE_PRIVATE)
        val email = pref.getString(LoginActivity.ID, "")
        val password = pref.getString(LoginActivity.PW, "")
        if (email?.isNotBlank() == true && password?.isNotBlank() == true) {
            super.onCreate(savedInstanceState)
            login(email, password)
        } else {
            setTheme(R.style.Theme_Gets)
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_splash)

            findViewById<MaterialButton>(R.id.start_button).setOnClickListener {
                startLoginActivity()
            }
        }
    }

    private fun login(email: String, password: String) {
        val jsonObjectRequest = JsonObjectRequest(
            Request.Method.POST, Network.SIGN_IN_URL,
            JSONObject().apply {
                put("email", email)
                put("pw", password)
            },
            { response ->
                if (response.getBoolean("result")) {
                    startMainActivity()
                } else {
                    startLoginActivity()
                }
            },
            { error ->
                startLoginActivity()
            }
        )
        Network.getInstance(this).addToRequestQueue(jsonObjectRequest)
    }

    private fun startMainActivity() {
        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
        finish()
    }

    private fun startLoginActivity() {
        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
        finish()
    }

}