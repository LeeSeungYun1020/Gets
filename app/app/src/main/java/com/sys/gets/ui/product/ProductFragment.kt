package com.sys.gets.ui.product

import android.icu.text.NumberFormat
import android.icu.util.Currency
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import com.android.volley.Request
import com.android.volley.toolbox.JsonArrayRequest
import com.sys.gets.R
import com.sys.gets.databinding.FragmentProductBinding
import com.sys.gets.network.Network
import com.sys.gets.ui.MainViewModel
import kotlin.math.roundToInt

const val PRODUCT_TAG = "PRODUCT"

class ProductFragment : Fragment() {
    private var _binding: FragmentProductBinding? = null
    private val binding get() = _binding!!
    private lateinit var productViewModel: ProductViewModel
    private lateinit var mainViewModel: MainViewModel
    private val productList = mutableListOf<CardItem>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentProductBinding.inflate(inflater, container, false)
        val root: View = binding.root
        productViewModel = ViewModelProvider(requireActivity()).get(ProductViewModel::class.java)
        mainViewModel = ViewModelProvider(requireActivity()).get(MainViewModel::class.java)

        binding.categoryButton.setOnClickListener {
            val transaction = parentFragmentManager.beginTransaction().apply {
                replace(R.id.nav_host_fragment_activity_main, CategoryFragment())
                addToBackStack(null)
            }
            transaction.commit()
        }
        binding.productRecycler.layoutManager = GridLayoutManager(context, 2)
        binding.productRecycler.addItemDecoration(
            GridSpacingItemDecoration(
                (16 * resources.displayMetrics.density).roundToInt() // dp to px
            )
        )
        binding.productRecycler.setOnScrollChangeListener { v, scrollX, scrollY, oldScrollX, oldScrollY ->
            mainViewModel.navigationVisibility.value = scrollY <= oldScrollY
        }
        binding.productRecycler.adapter = CardListAdapter(PRODUCT_TAG, productList)
        val productRequest = JsonArrayRequest(
            Request.Method.GET,
            "${Network.PRODUCT_CATEGORY_URL}/${productViewModel.type.value}/${productViewModel.detail.value}",
            null,
            { response ->
                if (response.getJSONObject(0).getBoolean("result")) {
                    for (i in 0 until response.length()) {
                        val item = response.getJSONObject(i)

                        val id = item.getInt("id")
                        val imageID = item.getString("image1ID")

                        val format = NumberFormat.getCurrencyInstance()
                        format.maximumFractionDigits = 0
                        format.currency = Currency.getInstance("KOR")

                        productList.add(CardItem(
                            id,
                            imageID,
                            item.getString("name"),
                            item.getString("brand"),
                            format.format(item.getInt("price"))
                        ))
                        binding.productRecycler.adapter?.notifyItemInserted(i)
                    }
                }
            },
            { error ->

            }
        )
        productRequest.tag = PRODUCT_TAG
        Network.getInstance(requireContext()).addToRequestQueue(productRequest)


        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onStop() {
        super.onStop()
        Network.getInstance(this.requireContext()).requestQueue.apply {
            cancelAll(PRODUCT_TAG)
        }
    }
}