package com.sys.gets.ui.filter

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.sys.gets.R
import com.sys.gets.databinding.FragmentFilterBinding

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

        binding.searchFilterExpandButton.setOnClickListener {
            controlFilterVisibility(!isFilterVisible, isFitVisible)
        }
        binding.searchCustomCheckbox.setOnCheckedChangeListener { _, isChecked ->
            controlFilterVisibility(isFilterVisible, !isChecked)
        }
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(FilterViewModel::class.java)
        // TODO: Use the ViewModel
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
}