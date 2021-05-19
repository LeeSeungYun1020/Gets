package com.sys.gets.ui.coordination

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.sys.gets.R
import com.sys.gets.databinding.FragmentCoordinationBinding

class CoordinationFragment : Fragment() {

    private lateinit var coordinationViewModel: CoordinationViewModel
    private var _binding: FragmentCoordinationBinding? = null

    private var layoutManager: RecyclerView.LayoutManager? = null
    private var adapter: RecyclerView.Adapter<CoordinationRecyclerAdapter.ViewHolder>? = null

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

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onViewCreated(itemView: View, savedInstanceState: Bundle?) {
        super.onViewCreated(itemView, savedInstanceState)
        var recycler_view: RecyclerView = itemView.findViewById(R.id.codyRecyclerview)
        var codyItemList = arrayListOf<CoordinationItem>(
            //임의 데이터
            CoordinationItem("cody_example","cody1"),
            CoordinationItem("cody_example","cody2"),
            CoordinationItem("cody_example","cody3"),
            CoordinationItem("cody_example","cody4"),
            CoordinationItem("cody_example","cody5"),
            CoordinationItem("cody_example","cody6"),
            CoordinationItem("cody_example","cody7"),
            CoordinationItem("cody_example","cody8")
        )

        recycler_view.apply {
            // set a GridLayoutManager to handle Android
            // RecyclerView behavior
            layoutManager = GridLayoutManager(activity, 2)
            // set the custom adapter to the RecyclerView
            adapter = CoordinationRecyclerAdapter(context, codyItemList)
        }
    }
}