package com.sys.gets.ui.product

import android.graphics.Bitmap
import android.os.Bundle
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.toolbox.ImageRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.sys.gets.data.Format
import com.sys.gets.databinding.ActivityProductBinding
import com.sys.gets.network.Network

const val PRODUCT_ACTIVITY_TAG = "p_act"

class ProductActivity : AppCompatActivity() {
    companion object {
        const val EXTRA_ID = "ID"
    }

    private lateinit var binding: ActivityProductBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityProductBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val id = intent.getIntExtra(EXTRA_ID, 0)

        if (id != 0) {
            val productRequest = JsonObjectRequest(
                Request.Method.GET,
                "${Network.PRODUCT_URL}/$id",
                null,
                { response ->
                    if (response.getBoolean("result")) {
                        binding.productHead.apply {
                            cardTitle.text = response.getString("name")
                            cardBrand.text = response.getString("brand")
                            cardPrice.text = Format.currency(response.getInt("price"))

                            val imageRequest = ImageRequest(
                                "${Network.PRODUCT_IMAGE_URL}/${response.getString("image1ID")}",
                                { bitmap ->
                                    bitmap?.run {
                                        cardImage.image.setImageBitmap(bitmap)
                                    }
                                },
                                0,
                                0,
                                ImageView.ScaleType.FIT_CENTER,
                                Bitmap.Config.RGB_565,
                                null
                            )

                            imageRequest.tag = PRODUCT_ACTIVITY_TAG
                            Network.getInstance(this@ProductActivity)
                                .addToRequestQueue(imageRequest)

                            val favoriteRequest = JsonObjectRequest(
                                Request.Method.GET,
                                "${Network.PRODUCT_COUNT_FAVORITE_URL}/${id}",
                                null,
                                { response ->
                                    if (response.getBoolean("result")) {
                                        cardFavorite.text = response.getInt("favorite").toString()
                                    }
                                },
                                {

                                }
                            )
                            favoriteRequest.tag = PRODUCT_ACTIVITY_TAG
                            Network.getInstance(this@ProductActivity)
                                .addToRequestQueue(favoriteRequest)

                            cardImage.favoriteButton.apply {
                                isChecked = false
                                setOnClickListener {
                                    if (!isChecked) { // 체크 안되어있는 경우
                                        Network.addSimpleRequest(
                                            context,
                                            PRODUCT_ACTIVITY_TAG,
                                            Network.PRODUCT_FAVORITE_URL,
                                            id
                                        ) {
                                            isChecked = true
                                            cardFavorite.text =
                                                ((cardFavorite.text.toString().toIntOrNull()
                                                    ?: 0) + 1).toString()
                                        }
                                    } else { // 체크 되어있는 경우
                                        Network.addSimpleRequest(
                                            context,
                                            PRODUCT_ACTIVITY_TAG,
                                            Network.PRODUCT_UNFAVORITE_URL,
                                            id
                                        ) {
                                            isChecked = false
                                            cardFavorite.text =
                                                ((cardFavorite.text.toString().toIntOrNull()
                                                    ?: 1) - 1).toString()
                                        }
                                    }
                                }
                                Network.addSimpleRequest(
                                    context,
                                    PRODUCT_ACTIVITY_TAG,
                                    Network.PRODUCT_CHECK_FAVORITE_URL,
                                    id
                                ) {
                                    isChecked = true
                                }
                            }
                        }
                    }

                },
                null
            )
            productRequest.tag = PRODUCT_ACTIVITY_TAG
            Network.getInstance(this).addToRequestQueue(productRequest)
        }
    }

    override fun onStop() {
        super.onStop()
        Network.getInstance(this).requestQueue.apply {
            cancelAll(PRODUCT_ACTIVITY_TAG)
        }
    }
}