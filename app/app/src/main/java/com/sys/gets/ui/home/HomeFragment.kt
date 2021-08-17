package com.sys.gets.ui.home

import android.content.Intent
import android.graphics.Bitmap
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.lifecycle.ViewModelProvider
import androidx.viewpager2.adapter.FragmentStateAdapter
import androidx.viewpager2.widget.ViewPager2
import com.android.volley.Request
import com.android.volley.toolbox.ImageRequest
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.google.android.material.tabs.TabLayout
import com.sys.gets.R
import com.sys.gets.data.Format
import com.sys.gets.data.Style
import com.sys.gets.databinding.FragmentHomeBinding
import com.sys.gets.network.Network
import com.sys.gets.ui.MainViewModel
import com.sys.gets.ui.article.ArticleActivity
import com.sys.gets.ui.coordination.CoordinationActivity
import com.sys.gets.ui.product.ProductActivity

private const val NUM_PAGES = 5
private const val CUSTOM_TAG = "CUSTOM"
private const val STYLE_TAG = "STYLE"
private const val TREND_TAG = "TREND"

class HomeFragment : Fragment() {
    private lateinit var mainViewModel: MainViewModel
    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewPager: ViewPager2

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // 초기화 - 바인딩, 뷰모델
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        val root: View = binding.root
        mainViewModel = ViewModelProvider(requireActivity()).get(MainViewModel::class.java)

        // 스크롤
        binding.root.setOnScrollChangeListener { v, scrollX, scrollY, oldScrollX, oldScrollY ->
            mainViewModel.navigationVisibility.value = scrollY <= oldScrollY
        }
        binding.offlineCard.root.visibility = View.GONE

        // 메인 배너
        viewPager = binding.mainSlider
        val pagerAdapter = ScreenSlidePagerAdapter(requireActivity())
        viewPager.adapter = pagerAdapter
        viewPager.setPageTransformer(ZoomOutPageTransformer())
        // 맞춤 추천
        initCustomRecommendation()

        // 스타일 가이드
        initStyleGuide()

        // 인기 항목
        initTopTrends()
        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onStop() {
        super.onStop()
        Network.getInstance(this.requireContext()).requestQueue.apply {
            cancelAll(CUSTOM_TAG)
            cancelAll(STYLE_TAG)
            cancelAll(TREND_TAG)
        }
    }

    private fun initCustomRecommendation() {
        binding.customList.apply {
            listTitle.setText(R.string.home_custom_recommendation)
            val styleRequest = JsonArrayRequest(
                Request.Method.GET, "${Network.HOME_CUSTOM_URL}/6",
                null,
                { response ->
                    if (response.getJSONObject(0).getBoolean("result")) {
                        // 사진 6개에 대한 요청
                        for (i in 0..5) {
                            val target = when (i + 1) {
                                1 -> listItem1
                                2 -> listItem2
                                3 -> listItem3
                                4 -> listItem4
                                5 -> listItem5
                                else -> listItem6
                            }
                            if (response.length() > i) {
                                target.root.visibility = View.VISIBLE
                                val item = response.getJSONObject(i)
                                val id = item.getInt("id")
                                val imageID = item.getInt("imageID")

                                target.root.setOnClickListener {
                                    Intent(
                                        requireContext(),
                                        CoordinationActivity::class.java
                                    ).apply {
                                        putExtra(CoordinationActivity.EXTRA_ID, id)
                                        startActivity(this)
                                    }
                                }

                                target.image.setImageResource(R.drawable.tm_default)
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
                                imageRequest.tag = CUSTOM_TAG
                                Network.getInstance(this@HomeFragment.requireContext())
                                    .addToRequestQueue(imageRequest)

                                target.favoriteButton.apply {
                                    setOnClickListener {
                                        if (!isChecked) { // 체크 안되어있는 경우
                                            Network.addSimpleRequest(
                                                requireContext(),
                                                CUSTOM_TAG,
                                                Network.COORDINATION_FAVORITE_URL,
                                                id
                                            ) {
                                                isChecked = true
                                            }
                                        } else { // 체크 되어있는 경우
                                            Network.addSimpleRequest(
                                                requireContext(),
                                                CUSTOM_TAG,
                                                Network.COORDINATION_UNFAVORITE_URL,
                                                id
                                            ) {
                                                isChecked = false
                                            }
                                        }
                                    }
                                    Network.addSimpleRequest(
                                        requireContext(),
                                        CUSTOM_TAG,
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
                    binding.offlineCard.root.visibility = View.VISIBLE
                }
            )
            styleRequest.tag = CUSTOM_TAG
            Network.getInstance(this@HomeFragment.requireContext())
                .addToRequestQueue(styleRequest)
        }
    }

    private fun initStyleGuide() {
        binding.styleGuide.apply {
            styleTitle.setText(R.string.home_style_guide)
            styleLookText.setText(R.string.home_style_view)
            styleTab.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {

                override fun onTabSelected(tab: TabLayout.Tab?) {
                    // 기존 네트워크 요청 취소
                    Network.getInstance(this@HomeFragment.requireContext()).requestQueue.cancelAll(
                        STYLE_TAG
                    )

                    // 선택한 탭 파악
                    val style = Style.values()[tab?.position ?: 0]

                    // 스타일 이미지 및 텍스트 지정
                    styleText.text = "${getString(style.resID)} ${getString(R.string.hint_outfit)}"
                    styleQuestionText.text =
                        "${getString(R.string.hint_style_question_prefix)}${getString(style.resID)}${
                            getString(R.string.hint_style_question_postfix)
                        }"
                    styleImage.setImageResource(
                        when (style) {
                            Style.AMEKAJI -> R.drawable.bg_amekaji
                            Style.CAMPUS -> R.drawable.bg_campus
                            Style.CASUAL -> R.drawable.bg_casual
                            Style.CITY_BOY -> R.drawable.bg_cityboy
                            Style.ROCK_CHIC -> R.drawable.bg_rockchic
                            Style.STREET -> R.drawable.bg_street
                            else -> R.drawable.bg_casual
                        } // TODO: 스타일 사진 추가 필요
                    )
                    styleMoreButton.setOnClickListener {
                        Intent(
                            requireContext(),
                            ArticleActivity::class.java
                        ).apply {
                            putExtra(ArticleActivity.EXTRA_ID, style.name)
                            startActivity(this)
                        }
                    }

                    // 스크롤 처음으로
                    styleLookScroll.smoothScrollTo(0, 0)

                    // 스타일 사진 서버에 요청
                    val styleRequest = JsonArrayRequest(
                        Request.Method.GET, "${Network.HOME_STYLE_URL}/${style.code}/6",
                        null,
                        { response ->
                            if (response.getJSONObject(0).getBoolean("result")) {
                                // 사진 6개 각각에 대한 요청
                                for (i in 0..5) {
                                    val target = when (i + 1) {
                                        1 -> stylePreview1
                                        2 -> stylePreview2
                                        3 -> stylePreview3
                                        4 -> stylePreview4
                                        5 -> stylePreview5
                                        else -> stylePreview6
                                    }
                                    if (response.length() > i) {
                                        target.visibility = View.VISIBLE
                                        val item = response.getJSONObject(i)
                                        val id = item.getInt("id")
                                        val imageID = item.getInt("imageID")

                                        target.setOnClickListener {
                                            Intent(
                                                requireContext(),
                                                CoordinationActivity::class.java
                                            ).apply {
                                                putExtra(CoordinationActivity.EXTRA_ID, id)
                                                startActivity(this)
                                            }
                                        }

                                        val imageRequest = ImageRequest(
                                            "${Network.COORDINATION_IMAGE_URL}/${imageID}",
                                            { bitmap ->
                                                target.setImageBitmap(bitmap)
                                            },
                                            0,
                                            0,
                                            ImageView.ScaleType.CENTER_CROP,
                                            Bitmap.Config.RGB_565,
                                            null
                                        )
                                        imageRequest.tag = STYLE_TAG
                                        Network.getInstance(this@HomeFragment.requireContext())
                                            .addToRequestQueue(imageRequest)
                                    } else {
                                        target.visibility = View.GONE
                                    }
                                }
                            }
                        },
                        {

                        }
                    )
                    styleRequest.tag = STYLE_TAG
                    Network.getInstance(this@HomeFragment.requireContext())
                        .addToRequestQueue(styleRequest)
                }

                override fun onTabReselected(tab: TabLayout.Tab?) {

                }

                override fun onTabUnselected(tab: TabLayout.Tab?) {

                }
            })
            Style.values().map {
                styleTab.addTab(styleTab.newTab().setText(it.resID))
            }
        }
    }

    private fun initTopTrends() {
        binding.topTrendsList.apply {
            listTitle.setText(R.string.home_top_trends)
            // 인기 상품 리스트 요청
            val trendRequest = JsonArrayRequest(
                Request.Method.GET, "${Network.HOME_TOP_TRENDS_URL}/6",
                null,
                { response ->
                    if (response.getJSONObject(0).getBoolean("result")) {
                        // 사진 6개 각각에 대한 요청
                        for (i in 0..5) {
                            val target = when (i + 1) {
                                1 -> binding.topTrendsList.listItem1
                                2 -> binding.topTrendsList.listItem2
                                3 -> binding.topTrendsList.listItem3
                                4 -> binding.topTrendsList.listItem4
                                5 -> binding.topTrendsList.listItem5
                                else -> binding.topTrendsList.listItem6
                            }
                            if (response.length() > i) {
                                target.root.visibility = View.VISIBLE
                                val item = response.getJSONObject(i)
                                val id = item.getInt("id")
                                val imageID = item.getString("image1ID")

                                target.cardTitle.text = item.getString("name")
                                target.cardPrice.text = Format.currency(item.getInt("price"))
                                target.cardBrand.text = item.getString("brand")

                                target.root.setOnClickListener {
                                    Intent(
                                        requireContext(),
                                        ProductActivity::class.java
                                    ).apply {
                                        putExtra(ProductActivity.EXTRA_ID, id)
                                        startActivity(this)
                                    }
                                }

                                val favoriteRequest = JsonObjectRequest(
                                    Request.Method.GET, "${Network.PRODUCT_COUNT_FAVORITE_URL}/$id",
                                    null,
                                    { response ->
                                        if (response.getBoolean("result")) {
                                            target.cardFavorite.text =
                                                response.getString("favorite")
                                        }
                                    },
                                    {

                                    }
                                )
                                favoriteRequest.tag = TREND_TAG
                                Network.getInstance(requireContext())
                                    .addToRequestQueue(favoriteRequest)

                                val imageRequest = ImageRequest(
                                    "${Network.PRODUCT_IMAGE_URL}/${imageID}",
                                    { bitmap ->
                                        target.cardImage.image.setImageBitmap(bitmap)
                                    },
                                    0,
                                    0,
                                    ImageView.ScaleType.FIT_CENTER,
                                    Bitmap.Config.RGB_565,
                                    null
                                )
                                imageRequest.tag = TREND_TAG
                                Network.getInstance(this@HomeFragment.requireContext())
                                    .addToRequestQueue(imageRequest)

                                target.cardImage.favoriteButton.apply {
                                    setOnClickListener {
                                        if (!isChecked) { // 체크 안되어있는 경우
                                            Network.addSimpleRequest(
                                                requireContext(),
                                                TREND_TAG,
                                                Network.PRODUCT_FAVORITE_URL,
                                                id
                                            ) {
                                                isChecked = true
                                                target.cardFavorite.text =
                                                    ((target.cardFavorite.text.toString()
                                                        .toIntOrNull() ?: 0) + 1).toString()
                                            }
                                        } else { // 체크 되어있는 경우
                                            Network.addSimpleRequest(
                                                requireContext(),
                                                TREND_TAG,
                                                Network.PRODUCT_UNFAVORITE_URL,
                                                id
                                            ) {
                                                isChecked = false
                                                target.cardFavorite.text =
                                                    ((target.cardFavorite.text.toString()
                                                        .toIntOrNull() ?: 1) - 1).toString()
                                            }
                                        }
                                    }
                                    Network.addSimpleRequest(
                                        requireContext(),
                                        TREND_TAG,
                                        Network.PRODUCT_CHECK_FAVORITE_URL,
                                        id
                                    ) {
                                        isChecked = true
                                    }
                                }
                            } else {
                                target.root.visibility = View.INVISIBLE
                            }
                        }
                    }
                },
                {

                }
            )
            trendRequest.tag = TREND_TAG
            Network.getInstance(this@HomeFragment.requireContext())
                .addToRequestQueue(trendRequest)
        }
    }

    private inner class ScreenSlidePagerAdapter(fa: FragmentActivity) : FragmentStateAdapter(fa) {
        override fun getItemCount(): Int = NUM_PAGES

        override fun createFragment(position: Int): Fragment =
            SliderFragment.newInstance(position, R.drawable.sl_welcome)
    }
}

private const val MIN_SCALE = 0.95f
private const val MIN_ALPHA = 0.7f

class ZoomOutPageTransformer : ViewPager2.PageTransformer {

    override fun transformPage(view: View, position: Float) {
        view.apply {
            val pageWidth = width
            val pageHeight = height
            when {
                position < -1 -> { // [-Infinity,-1)
                    // This page is way off-screen to the left.
                    alpha = 0f
                }
                position <= 1 -> { // [-1,1]
                    // Modify the default slide transition to shrink the page as well
                    val scaleFactor = Math.max(MIN_SCALE, 1 - Math.abs(position))
                    val vertMargin = pageHeight * (1 - scaleFactor) / 2
                    val horzMargin = pageWidth * (1 - scaleFactor) / 2
                    translationX = if (position < 0) {
                        horzMargin - vertMargin / 2
                    } else {
                        horzMargin + vertMargin / 2
                    }

                    // Scale the page down (between MIN_SCALE and 1)
                    scaleX = scaleFactor
                    scaleY = scaleFactor

                    // Fade the page relative to its size.
                    alpha = (MIN_ALPHA +
                            (((scaleFactor - MIN_SCALE) / (1 - MIN_SCALE)) * (1 - MIN_ALPHA)))
                }
                else -> { // (1,+Infinity]
                    // This page is way off-screen to the right.
                    alpha = 0f
                }
            }
        }
    }
}