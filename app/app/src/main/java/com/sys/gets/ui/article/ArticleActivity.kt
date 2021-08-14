package com.sys.gets.ui.article

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.sys.gets.databinding.ActivityArticleBinding

class ArticleActivity : AppCompatActivity() {
    companion object {
        const val EXTRA_ID = "ID"
    }

    private lateinit var binding: ActivityArticleBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityArticleBinding.inflate(layoutInflater)

        val style = intent.getStringExtra(EXTRA_ID)
        Log.e("CONSOLE", "$style")

        setContentView(binding.root)
    }
}