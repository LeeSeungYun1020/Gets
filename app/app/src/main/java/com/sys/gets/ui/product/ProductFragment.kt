package com.sys.gets.ui.product

import android.graphics.Bitmap
import android.icu.text.NumberFormat
import android.icu.util.Currency
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import com.android.volley.Request
import com.android.volley.toolbox.ImageRequest
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.sys.gets.databinding.FragmentProductBinding
import com.sys.gets.network.Network

private const val PRODUCT_TAG = "PRODUCT"

class ProductFragment : Fragment() {
    private var _binding: FragmentProductBinding? = null

    private val binding get() = _binding!!
    private val productList = mutableListOf<ProductItem>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentProductBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.productRecycler.layoutManager = GridLayoutManager(context, 2)
        binding.productRecycler.adapter = ProductListAdapter(productList)
        val productRequest = JsonArrayRequest(
            Request.Method.GET, "${Network.PRODUCT_CATEGORY_URL}/1/2",
            null,
            { response ->
                Log.e("CONSOLE", "${response.getJSONObject(0)}", )
                if (true){//response.getJSONObject(0).getBoolean("result")) {
                    for (i in 0 until response.length()) {
                        val item = response.getJSONObject(i)

                        val id = item.getInt("id")
                        val imageID = item.getString("image1ID")

                        val format = NumberFormat.getCurrencyInstance()
                        format.maximumFractionDigits = 0
                        format.currency = Currency.getInstance("KOR")

                        productList.add(ProductItem(
                            id,
                            null,
                            item.getString("name"),
                            item.getString("brand"),
                            format.format(item.getInt("price")),
                            null
                        ))
                        binding.productRecycler.adapter?.notifyItemInserted(i)
                        val favoriteRequest = JsonObjectRequest(
                            Request.Method.GET, "${Network.PRODUCT_COUNT_FAVORITE_URL}/$id",
                            null,
                            { response ->
                                if (response.getBoolean("result")) {
                                    productList[i].favorite = response.getInt("favorite")
                                    binding.productRecycler.adapter?.notifyItemChanged(i)
                                }
                            },
                            {

                            }
                        )
                        favoriteRequest.tag = PRODUCT_TAG
                        Network.getInstance(requireContext()).addToRequestQueue(favoriteRequest)

                        val imageRequest = ImageRequest(
                            "${Network.PRODUCT_IMAGE_URL}/${imageID}",
                            { bitmap ->
                                bitmap?.run {
                                    productList[i].image = bitmap
                                    binding.productRecycler.adapter?.notifyItemChanged(i)
                                }
                            },
                            0,
                            0,
                            ImageView.ScaleType.FIT_CENTER,
                            Bitmap.Config.RGB_565,
                            null
                        )
                        imageRequest.tag = PRODUCT_TAG
                        Network.getInstance(requireContext())
                            .addToRequestQueue(imageRequest)
                    }
                }
            },
            { error ->

            }
        )
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