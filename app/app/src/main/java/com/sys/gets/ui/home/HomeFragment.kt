package com.sys.gets.ui.home

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.lifecycle.ViewModelProvider
import androidx.viewpager2.adapter.FragmentStateAdapter
import androidx.viewpager2.widget.ViewPager2
import com.sys.gets.R
import com.sys.gets.databinding.FragmentHomeBinding
import com.sys.gets.ui.MainViewModel

private const val NUM_PAGES = 5

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
            val style = listOf(
                R.string.style_amekaji,
                R.string.style_casual,
                R.string.style_campus,
                R.string.style_city_boy,
                R.string.style_feminine,
                R.string.style_lovely,
                R.string.style_minimal,
                R.string.style_office,
                R.string.style_rock_chic,
                R.string.style_sexy_glam,
                R.string.style_street
            )

            style.forEach {
                styleTab.addTab(styleTab.newTab().setText(it))
            }
            styleLookText.setText(R.string.home_style_view)
        }
    }

    private fun initTopTrends() {
        binding.topTrendsList.apply {
            listTitle.setText(R.string.home_top_trends)
            // TODO: 서버에서 인기 코디 이미지 가져오기
            listItem1.setImageResource(R.drawable.tm_custom)
            listItem2.setImageResource(R.drawable.tm_custom)
            listItem3.setImageResource(R.drawable.tm_custom)
            listItem4.setImageResource(R.drawable.tm_custom)
            listItem5.setImageResource(R.drawable.tm_custom)
            listItem6.setImageResource(R.drawable.tm_custom)
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