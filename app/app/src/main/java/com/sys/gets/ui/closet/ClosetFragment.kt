package com.sys.gets.ui.closet

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import com.android.volley.Request
import com.android.volley.toolbox.JsonArrayRequest
import com.google.android.material.tabs.TabLayout
import com.sys.gets.R
import com.sys.gets.databinding.FragmentClosetBinding
import com.sys.gets.network.Network
import com.sys.gets.ui.MainViewModel
import com.sys.gets.ui.coordination.COORDINATION_TAG
import com.sys.gets.ui.product.CardItem
import com.sys.gets.ui.product.CardListAdapter
import com.sys.gets.ui.product.GridSpacingItemDecoration
import com.sys.gets.ui.product.PRODUCT_TAG
import kotlin.math.roundToInt

const val CLOSET_TAG = "CLOSET"

class ClosetFragment : Fragment() {
    private var _binding: FragmentClosetBinding? = null
    private val binding get() = _binding!!
    private lateinit var mainViewModel: MainViewModel
    private val itemList = mutableListOf<CardItem>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentClosetBinding.inflate(inflater, container, false)
        mainViewModel = ViewModelProvider(requireActivity()).get(MainViewModel::class.java)

        binding.closetRecycler.layoutManager = GridLayoutManager(context, 2)
        binding.closetRecycler.addItemDecoration(
            GridSpacingItemDecoration(
                (16 * resources.displayMetrics.density).roundToInt() // dp to px
            )
        )
        binding.closetRecycler.setOnScrollChangeListener { v, scrollX, scrollY, oldScrollX, oldScrollY ->
            mainViewModel.navigationVisibility.value = scrollY <= oldScrollY
        }
        val productAdapter = CardListAdapter(PRODUCT_TAG, CLOSET_TAG, itemList)
        val coordinationAdapter = CardListAdapter(COORDINATION_TAG, CLOSET_TAG, itemList)

        binding.closetRecycler.adapter = coordinationAdapter

        val coordinationRequest = JsonArrayRequest(
            Request.Method.GET,
            Network.CLOSET_COORDINATION_URL,
            null,
            { response ->
                Log.e("CONSOLE", "$response")
                if (response.getJSONObject(0).getBoolean("result")) {
                    for (i in 0 until response.length()) {
                        val item = response.getJSONObject(i)

                        val id = item.getInt("id")
                        val imageID = item.getString("imageID")

                        itemList.add(
                            CardItem(
                                id,
                                imageID,
                                item.getString("title"),
                                "",
                                item.getInt("price")
                            )
                        )
                        binding.closetRecycler.adapter?.notifyItemInserted(i)


                    }
                }
            },
            { error ->
                Log.e("CONSOLE", "$error")
            }
        )
        coordinationRequest.tag = CLOSET_TAG
        Network.getInstance(requireContext()).addToRequestQueue(coordinationRequest)

        binding.closetTab.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {

            override fun onTabSelected(tab: TabLayout.Tab) {
                itemList.clear()
                when (tab.text.toString()) {
                    getString(R.string.title_coordination) -> {
                        binding.closetRecycler.adapter = coordinationAdapter
                        Network.getInstance(requireContext()).requestQueue.cancelAll(PRODUCT_TAG)
                        val coordinationRequest = JsonArrayRequest(
                            Request.Method.GET,
                            Network.CLOSET_COORDINATION_URL,
                            null,
                            { response ->
                                if (response.getJSONObject(0).getBoolean("result")) {
                                    for (i in 0 until response.length()) {
                                        val item = response.getJSONObject(i)

                                        val id = item.getInt("id")
                                        val imageID = item.getString("imageID")

                                        itemList.add(
                                            CardItem(
                                                id,
                                                imageID,
                                                item.getString("title"),
                                                "",
                                                item.getInt("price")
                                            )
                                        )
                                        binding.closetRecycler.adapter?.notifyItemInserted(i)


                                    }
                                }
                            },
                            null
                        )
                        coordinationRequest.tag = CLOSET_TAG
                        Network.getInstance(requireContext()).addToRequestQueue(coordinationRequest)
                    }
                    getString(R.string.title_product) -> {
                        binding.closetRecycler.adapter = productAdapter
                        Network.getInstance(requireContext()).requestQueue.cancelAll(CLOSET_TAG)
                        val productRequest = JsonArrayRequest(
                            Request.Method.GET,
                            Network.CLOSET_PRODUCT_URL,
                            null,
                            { response ->

                                if (response.getJSONObject(0).getBoolean("result")) {
                                    for (i in 0 until response.length()) {
                                        val item = response.getJSONObject(i)

                                        val id = item.getInt("id")
                                        val imageID = item.getString("image1ID")

                                        itemList.add(
                                            CardItem(
                                                id,
                                                imageID,
                                                item.getString("name"),
                                                item.getString("brand"),
                                                item.getInt("price")
                                            )
                                        )
                                        binding.closetRecycler.adapter?.notifyItemInserted(i)
                                    }
                                }
                            },
                            null
                        )
                        productRequest.tag = PRODUCT_TAG
                        Network.getInstance(requireContext()).addToRequestQueue(productRequest)
                    }
                }
            }

            override fun onTabReselected(tab: TabLayout.Tab?) {

            }

            override fun onTabUnselected(tab: TabLayout.Tab?) {

            }
        })

        return binding.root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onStop() {
        super.onStop()
        Network.getInstance(this.requireContext()).requestQueue.apply {
            cancelAll(CLOSET_TAG)
            cancelAll(PRODUCT_TAG)
        }
    }
}