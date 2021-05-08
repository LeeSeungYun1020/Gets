package com.sys.gets

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        //setContentView(R.layout.activity_splash)
        // TODO 어플리케이션 시작 전 작업
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }
}