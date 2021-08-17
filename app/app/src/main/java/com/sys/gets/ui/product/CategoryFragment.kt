package com.sys.gets.ui.product

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.core.content.ContextCompat.getColor
import androidx.core.view.allViews
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.sys.gets.R
import com.sys.gets.data.*
import com.sys.gets.data.Set
import com.sys.gets.databinding.ComponentAccordionBinding
import com.sys.gets.databinding.FragmentCategoryBinding
import com.sys.gets.network.Network
import kotlin.collections.List
import kotlin.collections.lastIndex
import kotlin.collections.map

private const val CATEGORY_TAG = "CATEGORY"

class CategoryFragment : Fragment() {
    private lateinit var productViewModel: ProductViewModel
    private var _binding: FragmentCategoryBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        _binding = FragmentCategoryBinding.inflate(inflater, container, false)
        val root: View = binding.root
        productViewModel = ViewModelProvider(requireActivity()).get(ProductViewModel::class.java)

        binding.accordionOuter.title.text.setText(Category.OUTER.resID)
        binding.accordionOuter.title.icon.setImageResource(R.drawable.ic_outer_21)

        binding.accordionTop.title.text.setText(Category.TOP.resID)
        binding.accordionTop.title.icon.setImageResource(R.drawable.ic_top_21)

        binding.accordionPants.title.text.setText(Category.PANTS.resID)
        binding.accordionPants.title.icon.setImageResource(R.drawable.ic_pants_21)

        binding.accordionSkirt.title.text.setText(Category.SKIRT.resID)
        binding.accordionSkirt.title.icon.setImageResource(R.drawable.ic_skirt_21)

        binding.accordionSet.title.text.setText(Category.SET.resID)
        binding.accordionSet.title.icon.setImageResource(R.drawable.ic_set_21)

        binding.accordionShoes.title.text.setText(Category.SHOES.resID)
        binding.accordionShoes.title.icon.setImageResource(R.drawable.ic_shoes_21)

        binding.accordionBag.title.text.setText(Category.BAG.resID)
        binding.accordionBag.title.icon.setImageResource(R.drawable.ic_bag_21)

        binding.accordionHat.title.text.setText(Category.HAT.resID)
        binding.accordionHat.title.icon.setImageResource(R.drawable.ic_hat_21)

        binding.accordionOuter.setText(Category.OUTER.code to Category.OUTER.resID,
            Outer.values().map { it.code to it.resID })
        binding.accordionTop.setText(Category.TOP.code to Category.TOP.resID,
            Top.values().map { it.code to it.resID })
        binding.accordionPants.setText(Category.PANTS.code to Category.PANTS.resID,
            Pants.values().map { it.code to it.resID })
        binding.accordionSkirt.setText(Category.SKIRT.code to Category.SKIRT.resID,
            Skirt.values().map { it.code to it.resID })
        binding.accordionSet.setText(Category.SET.code to Category.SET.resID,
            Set.values().map { it.code to it.resID })
        binding.accordionShoes.setText(Category.SHOES.code to Category.SHOES.resID,
            Shoes.values().map { it.code to it.resID })
        binding.accordionBag.setText(Category.BAG.code to Category.BAG.resID,
            Bag.values().map { it.code to it.resID })
        binding.accordionHat.setText(Category.HAT.code to Category.HAT.resID,
            Hat.values().map { it.code to it.resID })

        binding.closeButton.setOnClickListener {
            closeCategory()
        }

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onStop() {
        super.onStop()
        Network.getInstance(this.requireContext()).requestQueue.apply {
            cancelAll(CATEGORY_TAG)
        }
    }

    private fun ComponentAccordionBinding.setText(
        titleID: Pair<Int, Int>,
        contentsID: List<Pair<Int, Int>>
    ) {
        this.title.text.setText(titleID.second)
        this.title.root.setOnClickListener {
            this.title.expandButton.isChecked = !this.title.expandButton.isChecked
        }
        this.title.expandButton.setOnCheckedChangeListener { buttonView, isChecked ->
            if (isChecked) {
                this.contents.root.visibility = View.VISIBLE
                this.title.icon.setColorFilter(
                    getColor(requireContext(), R.color.secondaryColor),
                    android.graphics.PorterDuff.Mode.SRC_IN
                )
            } else {
                this.contents.root.visibility = View.GONE
                this.title.icon.setColorFilter(
                    getColor(requireContext(), R.color.IconGrey),
                    android.graphics.PorterDuff.Mode.SRC_IN
                )
            }
        }
        var index = 0
        var setAll = false
        this.contents.root.visibility = View.GONE
        this.contents.root.allViews.forEach { view ->
            if (view is TextView) {
                var detail = -1
                if (!setAll) {
                    view.setText(R.string.category_all)
                    setAll = true
                } else if (index <= contentsID.lastIndex) {
                    val cts = contentsID[index]
                    detail = cts.first
                    view.setText(cts.second)
                    index++
                } else {
                    return@forEach
                }
                view.visibility = View.VISIBLE
                view.setOnClickListener {
                    productViewModel.type.value = titleID.first
                    productViewModel.detail.value = detail
                    closeCategory()
                }
            }
        }
    }

    private fun closeCategory() {
        val transaction = parentFragmentManager.beginTransaction().apply {
            replace(R.id.nav_host_fragment_activity_main, ProductFragment())
            addToBackStack(null)
        }
        transaction.commit()
    }
}