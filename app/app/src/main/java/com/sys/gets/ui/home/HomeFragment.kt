package com.sys.gets.ui.home

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.lifecycle.ViewModelProvider
import androidx.viewpager2.adapter.FragmentStateAdapter
import androidx.viewpager2.widget.ViewPager2
import com.android.volley.Request
import com.android.volley.toolbox.JsonArrayRequest
import com.google.android.material.tabs.TabLayout
import com.sys.gets.R
import com.sys.gets.data.Style
import com.sys.gets.databinding.FragmentHomeBinding
import com.sys.gets.network.Network
import com.sys.gets.ui.MainViewModel

private const val NUM_PAGES = 5
private const val STYLE_TAG = "STYLE"

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
            Log.d("MYTAG", "SCR: $v $scrollY $oldScrollY")
        }

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
        Network.getInstance(this.requireContext()).requestQueue.cancelAll(STYLE_TAG)
    }

    private fun initCustomRecommendation() {
        binding.customList.apply {
            listTitle.setText(R.string.home_custom_recommendation)
            // TODO: 네트워크 통신하여 서버에서 코디 이미지 가져오기 또는 코디 이미지 아이디 가져오기
            listItem1.setImageResource(R.drawable.tm_custom)
            listItem2.setImageResource(R.drawable.tm_custom)
            listItem3.setImageResource(R.drawable.tm_custom)
            listItem4.setImageResource(R.drawable.tm_custom)
            listItem5.setImageResource(R.drawable.tm_custom)
            listItem6.setImageResource(R.drawable.tm_custom)

        }
    }

    private fun initStyleGuide() {
        binding.styleGuide.apply {
            styleTitle.setText(R.string.home_style_guide)
            Style.values().map {
                styleTab.addTab(styleTab.newTab().setText(it.resID))
            }
            styleTab.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {

                override fun onTabSelected(tab: TabLayout.Tab?) {
                    val style = Style.values()[tab?.position ?: 0]
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
                        }
                    )
                    Network.getInstance(this@HomeFragment.requireContext()).requestQueue.cancelAll(
                        STYLE_TAG
                    )
                    val styleRequest = JsonArrayRequest(
                        Request.Method.POST, "${Network.BASE_URL}/home/style/${style.code}/6",
                        null,
                        { response ->
                            if (response.getJSONObject(0).getBoolean("result")) {

                                for (i in 0 until response.length()) {
                                    val item = response.getJSONObject(i)
                                    val id = item.getInt("id")
                                    val imageID = item.getInt("imageID")
                                    val target = when (i + 1) {
                                        1 -> stylePreview1
                                        2 -> stylePreview2
                                        3 -> stylePreview3
                                        4 -> stylePreview4
                                        5 -> stylePreview5
                                        else -> stylePreview6
                                    }
                                    Log.e("LOGE", "${response.length()}: $id, $imageID")
                                    // TODO: 코디 이미지 가져와서 렌더링 / 구현 후 주소 확인필
//                                    val imageRequest = ImageRequest("${Network.BASE_URL}/coordination/image/${imageID}", { bitmap ->
//                                        target.setImageBitmap(bitmap)
//                                    }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)
//                                    imageRequest.tag = STYLE_TAG
//                                    Network.getInstance(this@HomeFragment.requireContext()).addToRequestQueue(imageRequest)
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
                    Toast.makeText(this@HomeFragment.context, tab.toString(), Toast.LENGTH_SHORT)
                        .show()
                }

                override fun onTabUnselected(tab: TabLayout.Tab?) {
                    // Handle tab unselect
                }
            })
            styleLookText.setText(R.string.home_style_view)

        }
    }

    private fun initTopTrends() {
        binding.topTrendsList.apply {
            listTitle.setText(R.string.home_top_trends)
            // TODO: 서버에서 인기 코디 이미지 가져오기 / 별도 지정 필요
            listOf(listItem1, listItem2, listItem3, listItem4, listItem5, listItem6).forEach {
                it.apply {
                    cardImage.setImageResource(R.drawable.tm_custom)
                    // title, price, like
                }
            }
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