package com.sys.gets.ui.category

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.viewpager2.widget.ViewPager2
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayoutMediator
import com.sys.gets.R

class CategoryFragment : Fragment() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_category, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        val pagerAdapter = PagerFragmentStateAdapter(requireActivity())
        val tabLayout = view?.findViewById<TabLayout>(R.id.tab_layout)
        val viewPager = view?.findViewById<ViewPager2>(R.id.viewPager)
        // 3개의 Fragment Add
        pagerAdapter.addFragment(CategoryListFragment())
        pagerAdapter.addFragment(CategoryBrandFragment())
        // Adapter
        viewPager?.adapter = pagerAdapter

        viewPager?.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {
            override fun onPageSelected(position: Int) {
                super.onPageSelected(position)
                Log.e("CategoryFragment", "Page ${position+1}")
            }
        })

        // TabLayout attach
        if (tabLayout != null) {
            if (viewPager != null) {
                TabLayoutMediator(tabLayout, viewPager) { tab, position ->
                    val tabLayoutTextArray = arrayOf(getString(R.string.tab_category),getString(R.string.tab_brand))
                    val tabLayoutIconArray = arrayOf(R.drawable.ic_baseline_list_24,R.drawable.ic_baseline_search_24)
                    tab.text = tabLayoutTextArray[position]
                    tab.setIcon(tabLayoutIconArray[position])
                }.attach()
            }
        }
    }

}
