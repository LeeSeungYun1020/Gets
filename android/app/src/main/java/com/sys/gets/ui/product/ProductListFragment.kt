package com.sys.gets.ui.product

import android.os.Bundle
import android.view.*
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.sys.gets.R
import com.sys.gets.databinding.FragmentProductListBinding

class ProductListFragment : Fragment() {

    private var _binding: FragmentProductListBinding? = null
    private val binding get() = _binding!!

    companion object {
        fun newInstance() = ProductListFragment()
    }

    private lateinit var viewModel: ProductListViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentProductListBinding.inflate(inflater, container, false)
        setHasOptionsMenu(true)
        binding.root.apply {
            layoutManager = GridLayoutManager(requireContext(), 2)
            adapter = ProductListAdapter(
                listOf(
                    // TODO: test data
                    ProductSimple("img", "Name1", "Brand1", "30,000"),
                    ProductSimple("img", "Name2", "Brand2", "10,000"),
                    ProductSimple("img", "Name3", "Brand3", "20,000"),
                    ProductSimple("img", "Name4", "Brand4", "40,000"),
                    ProductSimple("img", "Name5", "Brand5", "530,000")
                )
            )
        }
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(ProductListViewModel::class.java)

    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        inflater.inflate(R.menu.search_menu, menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.menu_filter -> {
                parentFragmentManager.popBackStack()
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }
}

class ProductListAdapter(private val dataSet: List<ProductSimple>) :
    RecyclerView.Adapter<ProductListAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val image: ImageView = view.findViewById(R.id.product_preview_image)
        val name: TextView = view.findViewById(R.id.product_preview_name)
        val brand: TextView = view.findViewById(R.id.product_preview_brand)
        val price: TextView = view.findViewById(R.id.product_preview_price)
    }

    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(viewGroup.context)
            .inflate(R.layout.card_product, viewGroup, false)

        return ViewHolder(view)
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
        val data = dataSet[position]
        viewHolder.apply {
            image.setImageResource(R.drawable.clothing_example_outer)
            // TODO: 이미지 표시
            name.text = data.name
            brand.text = data.brand
            price.text = data.price
        }
    }

    override fun getItemCount() = dataSet.size

}