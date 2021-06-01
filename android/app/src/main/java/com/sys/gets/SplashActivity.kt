package com.sys.gets

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // 어플리케이션 시작 전 작업 수행
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }
}