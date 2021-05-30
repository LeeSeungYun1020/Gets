package com.sys.gets.ui.closet

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import com.sys.gets.R
import com.sys.gets.data.Category
import com.sys.gets.databinding.FragmentClosetBinding

class ClosetFragment : Fragment() {

    private lateinit var closetViewModel: ClosetViewModel
    private var _binding: FragmentClosetBinding? = null
    // This property is only valid between onCreateView and onDestroyView.
    private val binding get() = _binding!!

    private lateinit var categoryButtons: List<Button>
    private var clothingList: MutableList<ClothingItem> = mutableListOf<ClothingItem>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        closetViewModel =
            ViewModelProvider(this).get(ClosetViewModel::class.java)

        _binding = FragmentClosetBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.clothingRecyclerview.apply {
            layoutManager = GridLayoutManager(requireContext(), 3)
            adapter = ClothingRecyclerAdapter(context, clothingList)
        }

        categoryButtons = listOf(
            root.findViewById(R.id.outerButton),
            root.findViewById(R.id.topButton),
            root.findViewById(R.id.pantsButton),
            root.findViewById(R.id.skirtButton),
            root.findViewById(R.id.setButton),
            root.findViewById(R.id.shoesButton),
            root.findViewById(R.id.bagButton),
            root.findViewById(R.id.hatButton)
        )

        for(i in 1..21){ //outer가 default
            clothingList.add(ClothingItem("clothing_example_outer"))
        }

        for(i in 0 until categoryButtons.size){
            categoryButtons[i].setOnClickListener{
                val example: String = Category.values()[i].name.toLowerCase()
                Toast.makeText(context, "${example} button", Toast.LENGTH_SHORT).show()

                // TODO: 버튼마다 다른 chip 추가
                // TODO: 선택된 버튼 색상 변경
                clothingList.clear()
                for(i in 1..21){
                    clothingList.add(ClothingItem("clothing_example_${example}"))
                }
                binding.clothingRecyclerview.adapter?.notifyDataSetChanged()
            }
        }

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}