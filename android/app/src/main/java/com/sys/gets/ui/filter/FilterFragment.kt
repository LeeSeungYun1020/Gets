package com.sys.gets.ui.filter

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.EditorInfo
import android.view.inputmethod.InputMethodManager
import androidx.fragment.app.Fragment
import androidx.fragment.app.commit
import androidx.fragment.app.replace
import androidx.lifecycle.ViewModelProvider
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.sys.gets.R
import com.sys.gets.databinding.FragmentFilterBinding
import com.sys.gets.ui.product.ProductListFragment

class FilterFragment : Fragment() {

    private var _binding: FragmentFilterBinding? = null
    private val binding get() = _binding!!
    private var isFilterVisible = false
    private var isFitVisible = false

    companion object {
        fun newInstance() = FilterFragment()
    }

    private lateinit var viewModel: FilterViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentFilterBinding.inflate(inflater, container, false)

        binding.apply {
            searchFilterExpandButton.setOnClickListener {
                controlFilterVisibility(!isFilterVisible, isFitVisible)
            }
            searchCustomCheckbox.setOnCheckedChangeListener { _, isChecked ->
                controlFilterVisibility(isFilterVisible, !isChecked)
            }
            searchBox.apply {
                setEndIconOnClickListener {
                    showSearchResult()
                }
                editText?.setOnEditorActionListener { v, actionId, event ->
                    if (actionId == EditorInfo.IME_ACTION_SEARCH) {
                        showSearchResult()
                    }
                    true
                }
            }

        }
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(FilterViewModel::class.java)
        // Use the ViewModel
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun controlFilterVisibility(filter: Boolean, fit: Boolean) {
        isFilterVisible = filter
        isFitVisible = fit
        when (filter to fit) {
            true to true -> {
                binding.searchFilterBody.root.visibility = View.VISIBLE
                binding.searchFilterGeneral.root.visibility = View.VISIBLE
                binding.searchFilterExpandButton.setIconResource(R.drawable.ic_baseline_expand_less_24)
            }
            true to false -> {
                binding.searchFilterBody.root.visibility = View.GONE
                binding.searchFilterGeneral.root.visibility = View.VISIBLE
                binding.searchFilterExpandButton.setIconResource(R.drawable.ic_baseline_expand_less_24)
            }
            else -> {
                binding.searchFilterBody.root.visibility = View.GONE
                binding.searchFilterGeneral.root.visibility = View.GONE
                binding.searchFilterExpandButton.setIconResource(R.drawable.ic_baseline_expand_more_24)
            }
        }
    }

    private fun showSearchResult() {
        if (binding.searchBox.editText?.text?.length ?: 0 >= 1) {
            parentFragmentManager.commit {
                replace<ProductListFragment>(R.id.search_fragment_container)
                addToBackStack(null) // 뒤로가기 test용
            }
            context?.getSystemService(Context.INPUT_METHOD_SERVICE).let {
                if (it is InputMethodManager)
                    it.hideSoftInputFromWindow(this.activity?.currentFocus?.windowToken, 0)
            }
        } else {
            context?.let {
                MaterialAlertDialogBuilder(it)
                    .setTitle(resources.getString(R.string.msg_search_length))
                    .setMessage(resources.getString(R.string.msg_search_length_desc))
                    .setPositiveButton(getString(R.string.msg_ok), null)
                    .show()
            }
        }
    }
}