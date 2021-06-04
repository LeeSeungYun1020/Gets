package com.sys.gets.ui.coordination

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.sys.gets.databinding.FragmentCoordinationPreviewBinding

class CoordinationPreviewFragment: Fragment() {
    private lateinit var coordinationPreviewViewModel: CoordinationPreviewViewModel
    private var _binding: FragmentCoordinationPreviewBinding? = null
    // This property is only valid between onCreateView and onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        coordinationPreviewViewModel = ViewModelProvider(this).get(CoordinationPreviewViewModel::class.java)

        _binding = FragmentCoordinationPreviewBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.coordinationPreviewTextView.text = coordinationPreviewViewModel.text.toString()

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

