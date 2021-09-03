package com.sys.gets.ui.coordination

import android.graphics.Bitmap
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.toolbox.ImageRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.sys.gets.data.Format
import com.sys.gets.databinding.ActivityCoordinationBinding
import com.sys.gets.network.Network

const val COORDINATION_TAG = "coordination"

class CoordinationActivity : AppCompatActivity() {
    companion object {
        val EXTRA_ID = "ID"
    }

    private lateinit var binding: ActivityCoordinationBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCoordinationBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val id = intent.getIntExtra(EXTRA_ID, 0)

        if (id != 0) {
            val coordinationRequest = JsonObjectRequest(
                Request.Method.GET,
                "${Network.COORDINATION_URL}/$id",
                null,
                { response ->
                    if (response.getBoolean("result")) {
                        binding.coordinationHead.apply {
                            cardTitle.text = response.getString("title")
                            cardBrand.text = ""
                            cardPrice.text = Format.currency(response.getInt("price"))

                            val imageRequest = ImageRequest(
                                "${Network.COORDINATION_IMAGE_URL}/${response.getString("imageID")}",
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

                            imageRequest.tag = COORDINATION_TAG
                            Network.getInstance(this@CoordinationActivity)
                                .addToRequestQueue(imageRequest)

                            val favoriteRequest = JsonObjectRequest(
                                Request.Method.GET,
                                "${Network.COORDINATION_COUNT_FAVORITE_URL}/${id}",
                                null,
                                { response ->
                                    if (response.getBoolean("result")) {
                                        cardFavorite.text = response.getInt("favorite").toString()
                                    }
                                },
                                {

                                }
                            )
                            favoriteRequest.tag = COORDINATION_TAG
                            Network.getInstance(this@CoordinationActivity)
                                .addToRequestQueue(favoriteRequest)

                            cardImage.favoriteButton.apply {
                                isChecked = false
                                setOnClickListener {
                                    if (!isChecked) { // 체크 안되어있는 경우
                                        Network.addSimpleRequest(
                                            context,
                                            COORDINATION_TAG,
                                            Network.COORDINATION_FAVORITE_URL,
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
                                            COORDINATION_TAG,
                                            Network.COORDINATION_UNFAVORITE_URL,
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
                                    COORDINATION_TAG,
                                    Network.COORDINATION_CHECK_FAVORITE_URL,
                                    id
                                ) {
                                    isChecked = true
                                }
                            }
                        }

                        val productList = listOf(
                            response.getInt("outerID"), response.getInt("topID"),
                            response.getInt("bottomID"), response.getInt("skirtID"),
                            response.getInt("setID"), response.getInt("shoesID"),
                            response.getInt("bagID"), response.getInt("hatID")
                        ).filter { it != 0 }
                        val priceList = listOf(
                            binding.priceList.product1, binding.priceList.product2,
                            binding.priceList.product3, binding.priceList.product4,
                            binding.priceList.product5, binding.priceList.product6,
                            binding.priceList.product7, binding.priceList.product8,
                        )


                        for ((i, product) in productList.withIndex()) {
                            val request = JsonObjectRequest(
                                Request.Method.GET, "${Network.PRODUCT_URL}/${product}",
                                null,
                                { response ->
                                    if (response.getBoolean("result")) {
                                        priceList[i].root.visibility = View.VISIBLE
                                        priceList[i].productName.text = response.getString("name")
                                        priceList[i].productPrice.text = Format.currency(
                                            response.getString("price").toIntOrNull() ?: 0
                                        )
                                        priceList[i].productFavoriteButton.apply {
                                            setOnClickListener {
                                                if (!isChecked) { // 체크 안되어있는 경우
                                                    Network.addSimpleRequest(
                                                        context,
                                                        COORDINATION_TAG,
                                                        Network.PRODUCT_FAVORITE_URL,
                                                        product
                                                    ) {
                                                        isChecked = true
                                                    }
                                                } else { // 체크 되어있는 경우
                                                    Network.addSimpleRequest(
                                                        context,
                                                        COORDINATION_TAG,
                                                        Network.PRODUCT_UNFAVORITE_URL,
                                                        product
                                                    ) {
                                                        isChecked = false
                                                    }
                                                }
                                            }
                                            Network.addSimpleRequest(
                                                context,
                                                COORDINATION_TAG,
                                                Network.PRODUCT_CHECK_FAVORITE_URL,
                                                product
                                            ) {
                                                isChecked = true
                                            }
                                        }


                                        val imageRequest = ImageRequest(
                                            "${Network.PRODUCT_IMAGE_URL}/${response.getString("image1ID")}",
                                            { bitmap ->
                                                bitmap?.run {
                                                    priceList[i].productImage.setImageBitmap(
                                                        bitmap
                                                    )
                                                }
                                            },
                                            0,
                                            0,
                                            ImageView.ScaleType.FIT_CENTER,
                                            Bitmap.Config.RGB_565,
                                            null
                                        )

                                        imageRequest.tag = COORDINATION_TAG
                                        Network.getInstance(this)
                                            .addToRequestQueue(imageRequest)
                                    }
                                },
                                {

                                }
                            )
                            request.tag = COORDINATION_TAG
                            Network.getInstance(this@CoordinationActivity)
                                .addToRequestQueue(request)
                        }
                    }

                },
                null
            )
            coordinationRequest.tag = COORDINATION_TAG
            Network.getInstance(this).addToRequestQueue(coordinationRequest)
        }

        binding.virtualFittingButton.setOnClickListener {
            val intent = packageManager.getLaunchIntentForPackage("com.sys.virtualFitting")
            if (intent != null)
                startActivity(intent)
            Log.e("TAG", "$intent")
        }
    }

    override fun onStop() {
        super.onStop()
        Network.getInstance(this).requestQueue.apply {
            cancelAll(COORDINATION_TAG)
        }
    }
}