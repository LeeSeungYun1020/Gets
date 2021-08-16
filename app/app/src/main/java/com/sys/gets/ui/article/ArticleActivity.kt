package com.sys.gets.ui.article

import android.content.Intent
import android.graphics.Bitmap
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.viewpager2.adapter.FragmentStateAdapter
import com.android.volley.Request
import com.android.volley.toolbox.ImageRequest
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.google.android.material.chip.Chip
import com.sys.gets.R
import com.sys.gets.data.Style
import com.sys.gets.databinding.ActivityArticleBinding
import com.sys.gets.network.Network
import com.sys.gets.ui.coordination.CoordinationActivity
import com.sys.gets.ui.home.SliderFragment

private const val ARTICLE_TAG = "article"

class ArticleActivity : AppCompatActivity() {
    companion object {
        const val EXTRA_ID = "ID"
    }

    private lateinit var binding: ActivityArticleBinding
    private val list: MutableList<Bitmap> = mutableListOf()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityArticleBinding.inflate(layoutInflater)

        val style = Style.valueOf(intent.getStringExtra(EXTRA_ID) ?: Style.CASUAL.name)

        binding.mainTitle.setText(style.resID)
        binding.mainImage.setImageResource(
            when (style) {
                Style.AMEKAJI -> R.drawable.bg_amekaji
                Style.CAMPUS -> R.drawable.bg_campus
                Style.CASUAL -> R.drawable.bg_casual
                Style.CITY_BOY -> R.drawable.bg_cityboy
                Style.ROCK_CHIC -> R.drawable.bg_rockchic
                Style.STREET -> R.drawable.bg_street
                else -> R.drawable.bg_casual
                // TODO: 스타일 사진 추가 필요
            }
        )

        val articleRequest = JsonObjectRequest(
            Request.Method.GET, "${Network.ARTICLE_READ_URL}/${style.code}",
            null,
            { response ->
                if (response.getBoolean("result")) {
                    response.getString(getString(R.string.article_tag)).split(", ").forEach {
                        binding.chipGroup.addView(Chip(this).apply {
                            text = it
                        })

                        binding.mainDescription.text =
                            response.getString(getString(R.string.article_description))
                    }
                }
            }, null
        )
        articleRequest.tag = ARTICLE_TAG
        Network.getInstance(this).addToRequestQueue(articleRequest)


        val viewPager = binding.imageSlider
        val pagerAdapter = ScreenSlidePagerAdapter(this)
        viewPager.adapter = pagerAdapter
        val articleImageListRequest = JsonArrayRequest(
            Request.Method.POST, "${Network.ARTICLE_IMAGE_URL}/${style.code}",
            null,
            { response ->
                if (response.getJSONObject(0).getBoolean("result")) {
                    for (i in 0 until response.length()) {
                        val imageID = response.getJSONObject(i).getString("imageID")
                        val imageRequest = ImageRequest(
                            "${Network.ARTICLE_IMAGE_URL}/${imageID}",
                            { bitmap ->
                                list.add(bitmap)
                                pagerAdapter.notifyItemInserted(list.lastIndex)
                            },
                            0,
                            0,
                            ImageView.ScaleType.CENTER_CROP,
                            Bitmap.Config.RGB_565,
                            null
                        )
                        imageRequest.tag = ARTICLE_TAG
                        Network.getInstance(this).addToRequestQueue(imageRequest)
                    }
                }
            }, null
        )
        articleRequest.tag = ARTICLE_TAG
        Network.getInstance(this).addToRequestQueue(articleImageListRequest)

        binding.styleList.listTitle.text =
            "${getString(style.resID)} ${getString(R.string.hint_outfit)}"
        val styleRequest = JsonArrayRequest(
            Request.Method.GET, "${Network.HOME_STYLE_URL}/${style.code}/6",
            null,
            { response ->
                if (response.getJSONObject(0).getBoolean("result")) {
                    // 사진 6개 각각에 대한 요청
                    for (i in 0..5) {
                        val target = when (i + 1) {
                            1 -> binding.styleList.listItem1
                            2 -> binding.styleList.listItem2
                            3 -> binding.styleList.listItem3
                            4 -> binding.styleList.listItem4
                            5 -> binding.styleList.listItem5
                            else -> binding.styleList.listItem6
                        }
                        if (response.length() > i) {
                            target.root.visibility = View.VISIBLE
                            val item = response.getJSONObject(i)
                            val id = item.getInt("id")
                            val imageID = item.getInt("imageID")

                            target.root.setOnClickListener {
                                Intent(
                                    this,
                                    CoordinationActivity::class.java
                                ).apply {
                                    putExtra(CoordinationActivity.EXTRA_ID, id)
                                    startActivity(this)
                                }
                            }

                            val imageRequest = ImageRequest(
                                "${Network.COORDINATION_IMAGE_URL}/${imageID}",
                                { bitmap ->
                                    target.image.setImageBitmap(bitmap)
                                },
                                0,
                                0,
                                ImageView.ScaleType.CENTER_CROP,
                                Bitmap.Config.RGB_565,
                                null
                            )
                            imageRequest.tag = ARTICLE_TAG
                            Network.getInstance(this)
                                .addToRequestQueue(imageRequest)

                            target.favoriteButton.apply {
                                setOnClickListener {
                                    if (!isChecked) { // 체크 안되어있는 경우
                                        Network.addSimpleRequest(
                                            this@ArticleActivity,
                                            ARTICLE_TAG,
                                            Network.COORDINATION_FAVORITE_URL,
                                            id
                                        ) {
                                            isChecked = true
                                        }
                                    } else { // 체크 되어있는 경우
                                        Network.addSimpleRequest(
                                            this@ArticleActivity,
                                            ARTICLE_TAG,
                                            Network.COORDINATION_UNFAVORITE_URL,
                                            id
                                        ) {
                                            isChecked = false
                                        }
                                    }
                                }
                                Network.addSimpleRequest(
                                    this@ArticleActivity,
                                    ARTICLE_TAG,
                                    Network.COORDINATION_CHECK_FAVORITE_URL,
                                    id
                                ) {
                                    isChecked = true
                                }
                            }
                        } else {
                            target.root.visibility = View.GONE
                        }
                    }
                }
            },
            {

            }
        )
        styleRequest.tag = ARTICLE_TAG
        Network.getInstance(this)
            .addToRequestQueue(styleRequest)

        setContentView(binding.root)
    }

    override fun onStop() {
        super.onStop()
        Network.getInstance(this).requestQueue.apply {
            cancelAll(ARTICLE_TAG)
        }
    }

    private inner class ScreenSlidePagerAdapter(fa: FragmentActivity) : FragmentStateAdapter(fa) {
        override fun getItemCount(): Int = list.size

        override fun createFragment(position: Int): Fragment {
            return SliderFragment.newInstance(position, list[position])
        }

    }
}