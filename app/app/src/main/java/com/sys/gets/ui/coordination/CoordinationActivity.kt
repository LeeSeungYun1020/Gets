package com.sys.gets.ui.coordination

import android.graphics.Bitmap
import android.os.Bundle
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

                        val priceList = listOf(
                            Triple(
                                binding.priceList.item1,
                                binding.priceList.price1,
                                binding.productList.listItem1
                            ),
                            Triple(
                                binding.priceList.item2,
                                binding.priceList.price2,
                                binding.productList.listItem2
                            ),
                            Triple(
                                binding.priceList.item3,
                                binding.priceList.price3,
                                binding.productList.listItem3
                            ),
                            Triple(
                                binding.priceList.item4,
                                binding.priceList.price4,
                                binding.productList.listItem4
                            ),
                            Triple(
                                binding.priceList.item5,
                                binding.priceList.price5,
                                binding.productList.listItem5
                            ),
                            Triple(
                                binding.priceList.item6,
                                binding.priceList.price6,
                                binding.productList.listItem6
                            ),
                        )
                        var index = 0
                        val productList = listOf(
                            response.getInt("outerID"), response.getInt("topID"),
                            response.getInt("bottomID"), response.getInt("skirtID"),
                            response.getInt("setID"), response.getInt("shoesID"),
                            response.getInt("bagID"), response.getInt("hatID")
                        ).filter { it != 0 }

                        var isFirst = true
                        for (i in (productList.size)..5) {
                            if (i % 2 == 1 && isFirst) {
                                priceList[i].third.root.visibility = View.INVISIBLE
                                isFirst = false
                            } else
                                priceList[i].third.root.visibility = View.GONE
                            binding.productList.listItem1.root.visibility = View.GONE
                        }

                        for (product in productList) {
                            if (product != 0 && index < 6) {
                                val request = JsonObjectRequest(
                                    Request.Method.GET, "${Network.PRODUCT_URL}/${product}",
                                    null,
                                    { response ->
                                        if (response.getBoolean("result")) {
                                            val i = index
                                            priceList[i].first.visibility = View.VISIBLE
                                            priceList[i].first.text = response.getString("name")
                                            priceList[i].second.visibility = View.VISIBLE
                                            priceList[i].second.text = Format.currency(
                                                response.getString("price").toIntOrNull() ?: 0
                                            )
                                            priceList[i].third.root.visibility = View.VISIBLE
                                            priceList[i].third.favoriteButton.apply {
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
                                                        priceList[i].third.image.setImageBitmap(
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

                                            index++
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

                        binding.priceList.title.text = response.getString("title")
                        binding.productList.listTitle.visibility = View.GONE
                    }

                },
                null
            )
            coordinationRequest.tag = COORDINATION_TAG
            Network.getInstance(this).addToRequestQueue(coordinationRequest)
        }
    }

    override fun onStop() {
        super.onStop()
        Network.getInstance(this).requestQueue.apply {
            cancelAll(COORDINATION_TAG)
        }
    }
}