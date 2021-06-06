package com.sys.gets.ui.category

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ExpandableListAdapter
import android.widget.ExpandableListView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.sys.gets.R
import com.sys.gets.data.*
import com.sys.gets.data.Set
import com.sys.gets.databinding.FragmentCategoryListBinding
import java.util.*
import kotlin.collections.LinkedHashMap
import kotlin.collections.List
import kotlin.collections.map
import kotlin.collections.set

class CategoryListFragment : Fragment() {

    private lateinit var categoryViewModel: CategoryViewModel
    private var _binding: FragmentCategoryListBinding? = null
    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    internal var expandableListView: ExpandableListView? = null
    internal var adapter: ExpandableListAdapter? = null
    internal var titleList: List<String> ? = null

    val data: HashMap<String, List<String>>
        get() {
            val listData = LinkedHashMap<String, List<String>>()
            val outers = Outer.values().map { getString(it.resID) }
            val tops = Top.values().map { getString(it.resID) }
            val pants = Pants.values().map { getString(it.resID) }
            val skirts = Skirt.values().map { getString(it.resID) }
            val sets = Set.values().map { getString(it.resID) }
            val shoes = Shoes.values().map { getString(it.resID) }
            val bags = Bag.values().map { getString(it.resID) }
            val hats = Hat.values().map { getString(it.resID) }

            listData[getString(R.string.category_outer)] = outers
            listData[getString(R.string.category_top)] = tops
            listData[getString(R.string.category_pants)] = pants
            listData[getString(R.string.category_skirt)] = skirts
            listData[getString(R.string.category_set)] = sets
            listData[getString(R.string.category_shoes)] = shoes
            listData[getString(R.string.category_bag)] = bags
            listData[getString(R.string.category_hat)] = hats
            return listData
        }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        categoryViewModel =
            ViewModelProvider(this).get(CategoryViewModel::class.java)

        _binding = FragmentCategoryListBinding.inflate(inflater, container, false)
        val root: View = binding.root


        expandableListView = binding.expandableListView

        if (expandableListView != null) {
            val listData = data
            titleList = ArrayList(listData.keys)
            adapter = CategoryExpandableListAdapter(this.requireContext(), titleList as ArrayList<String>, listData)
            expandableListView!!.setAdapter(adapter)

            expandableListView!!.setOnGroupExpandListener { groupPosition -> Toast.makeText(this.requireContext(), (titleList as ArrayList<String>)[groupPosition] + " List Expanded.", Toast.LENGTH_SHORT).show() }

            expandableListView!!.setOnGroupCollapseListener { groupPosition -> Toast.makeText(this.requireContext(), (titleList as ArrayList<String>)[groupPosition] + " List Collapsed.", Toast.LENGTH_SHORT).show() }

            expandableListView!!.setOnChildClickListener { parent, v, groupPosition, childPosition, id ->
                Toast.makeText(this.requireContext(), "Clicked: " + (titleList as ArrayList<String>)[groupPosition] + " -> " + listData[(titleList as ArrayList<String>)[groupPosition]]!!.get(childPosition), Toast.LENGTH_SHORT).show()
                false
            }
        }

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
