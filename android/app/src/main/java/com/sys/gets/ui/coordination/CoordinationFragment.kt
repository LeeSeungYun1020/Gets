package com.sys.gets.ui.coordination

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.sys.gets.databinding.FragmentCoordinationBinding

class CoordinationFragment : Fragment() {

    private lateinit var coordinationViewModel: CoordinationViewModel
    private var _binding: FragmentCoordinationBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        coordinationViewModel =
            ViewModelProvider(this).get(CoordinationViewModel::class.java)

        _binding = FragmentCoordinationBinding.inflate(inflater, container, false)
        val root: View = binding.root

        val textView: TextView = binding.textCoordination
        coordinationViewModel.text.observe(viewLifecycleOwner, Observer {
            textView.text = it
        })
        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

}