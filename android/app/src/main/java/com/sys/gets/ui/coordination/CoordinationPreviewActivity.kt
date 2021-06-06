package com.sys.gets.ui.coordination

import android.graphics.Bitmap
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import android.widget.ImageView
import com.android.volley.toolbox.ImageRequest
import com.sys.gets.R
import com.sys.gets.databinding.ActivityCoordinationPreviewBinding
import com.sys.gets.databinding.ActivityMainBinding
import com.sys.gets.network.Network

class CoordinationPreviewActivity : AppCompatActivity() {
    private lateinit var binding :ActivityCoordinationPreviewBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCoordinationPreviewBinding.inflate(layoutInflater)
        setContentView(binding.root)
/*
        val hatRequest = ImageRequest("${Network.BASE_URL}/product/image/232_2", {bitmap ->
            binding.mannequinHat.setImageBitmap(bitmap)
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, {

        })
        Network.getInstance(this).addToRequestQueue(hatRequest)


        val topRequest = ImageRequest("${Network.BASE_URL}/product/image/20_1", {bitmap ->
            binding.mannequinTop.setImageBitmap(bitmap)
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, {

        })
        Network.getInstance(this).addToRequestQueue(topRequest)

        val bottomRequest = ImageRequest("${Network.BASE_URL}/product/image/59_1", {bitmap ->
            binding.mannequinBottom.setImageBitmap(bitmap)
            binding.mannequinBottom.layoutParams.width=600
            binding.mannequinBottom.layoutParams.height=900
            binding.mannequinBottom.requestLayout()
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, {

        })
        Network.getInstance(this).addToRequestQueue(bottomRequest)

        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        */
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when(item.itemId) {
            android.R.id.home -> {
                onBackPressed()
            }
        }
        return super.onOptionsItemSelected(item)
    }

}