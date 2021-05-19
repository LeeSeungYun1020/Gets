package com.sys.gets.ui.closet

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.sys.gets.R
import com.sys.gets.databinding.FragmentClosetBinding
import com.sys.gets.ui.coordination.CoordinationItem
import com.sys.gets.ui.coordination.CoordinationRecyclerAdapter

class ClosetFragment : Fragment() {

  private lateinit var closetViewModel: ClosetViewModel
private var _binding: FragmentClosetBinding? = null
  // This property is only valid between onCreateView and
  // onDestroyView.
  private val binding get() = _binding!!

  override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?
  ): View? {
    closetViewModel =
            ViewModelProvider(this).get(ClosetViewModel::class.java)

    _binding = FragmentClosetBinding.inflate(inflater, container, false)
    val root: View = binding.root

    return root
  }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onViewCreated(itemView: View, savedInstanceState: Bundle?) {
        super.onViewCreated(itemView, savedInstanceState)
        var recycler_view: RecyclerView = itemView.findViewById(R.id.clothingRecyclerview)
        var clothingList = arrayListOf<ClothingItem>(
            //임의 데이터
            ClothingItem("clothing_example"),
            ClothingItem("clothing_example"),
            ClothingItem("clothing_example"),
            ClothingItem("clothing_example"),
            ClothingItem("clothing_example"),
            ClothingItem("clothing_example"),
            ClothingItem("clothing_example"),
            ClothingItem("clothing_example"),
            ClothingItem("clothing_example"),
            ClothingItem("clothing_example"),
            ClothingItem("clothing_example"),
            ClothingItem("clothing_example"),
            ClothingItem("clothing_example"),
            ClothingItem("clothing_example"),
            ClothingItem("clothing_example"),
            ClothingItem("clothing_example")

        )


        recycler_view.apply {
            // set a GridLayoutManager to handle Android
            // RecyclerView behavior
            layoutManager = GridLayoutManager(activity, 3)
            // set the custom adapter to the RecyclerView
            adapter = ClothingRecyclerAdapter(context, clothingList)
        }
    }
}