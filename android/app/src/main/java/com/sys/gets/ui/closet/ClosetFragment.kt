package com.sys.gets.ui.closet

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.chip.Chip
import com.google.android.material.chip.ChipGroup
import com.sys.gets.R
import com.sys.gets.data.*
import com.sys.gets.data.Set
import com.sys.gets.databinding.FragmentClosetBinding

class ClosetFragment : Fragment() {

    private lateinit var closetViewModel: ClosetViewModel
    private var _binding: FragmentClosetBinding? = null
    private val binding get() = _binding!!

    private lateinit var chipGroup: ChipGroup
    private var clothingList: MutableList<ClothingItem> = mutableListOf() // 표시될 제품 리스트

    private var categoryCode = 0 // 어떤 카테고리 선택?
    private var detailCode = 0 // 어떤 세부 분류 선택?

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

        //init
        chipGroup = binding.clothingChipGroup
        listOf(
            binding.outerButton to Category.OUTER,
            binding.topButton to Category.TOP,
            binding.pantsButton to Category.PANTS,
            binding.skirtButton to Category.SKIRT,
            binding.setButton to Category.SET,
            binding.shoesButton to Category.SHOES,
            binding.bagButton to Category.BAG,
            binding.hatButton to Category.HAT
        ).forEach {
            it.first.setOnClickListener { view ->
                categoryCode = it.second.code
                detailCode = 0
                chipGroup.removeAllViews()

                when (it.second) {
                    Category.OUTER -> {
                        for (item in Outer.values()) {
                            makeChip(item.resID, item.code)
                        }
                    }
                    Category.TOP -> {
                        for (item in Top.values()) {
                            makeChip(item.resID, item.code)
                        }
                    }
                    Category.PANTS -> {
                        for (item in Pants.values()) {
                            makeChip(item.resID, item.code)
                        }
                    }
                    Category.SKIRT -> {
                        for (item in Skirt.values()) {
                            makeChip(item.resID, item.code)
                        }
                    }
                    Category.SET -> {
                        for (item in Set.values()) {
                            makeChip(item.resID, item.code)
                        }
                    }
                    Category.SHOES -> {
                        for (item in Shoes.values()) {
                            makeChip(item.resID, item.code)
                        }
                    }
                    Category.BAG -> {
                        for (item in Bag.values()) {
                            makeChip(item.resID, item.code)
                        }
                    }
                    Category.HAT -> {
                        for (item in Hat.values()) {
                            makeChip(item.resID, item.code)
                        }
                    }
                }
                clothingList.clear()
                for (i in 1..21) {
                    clothingList.add(ClothingItem("clothing_example_$categoryCode"))
                    // TODO: 파일명이 아니라 code(Int)로 가져올 파일 선택하기
                }
                binding.clothingRecyclerview.apply {
                    adapter?.notifyDataSetChanged()
                    scrollToPosition(0)
                }
            }
        }
        binding.outerButton.performClick()
        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun makeChip(resID: Int, code: Int) {
        Chip(context).apply {
            text = getString(resID)
            isCheckable = true
            setOnCheckedChangeListener { _, isChecked ->
                if (isChecked)
                    detailCode += code
                else
                    detailCode -= code
            }
            chipGroup.addView(this)
        }
    }
}

data class ClothingItem(
    val imageId: String
)

class ClothingRecyclerAdapter(val context: Context, val clothingList: List<ClothingItem>)
    : RecyclerView.Adapter<ClothingRecyclerAdapter.ViewHolder>(){

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val image: ImageView

        init{
            image = view.findViewById(R.id.clothing_item_image)
        }
        fun bind(cody: ClothingItem, context: Context){
            if (cody.imageId != "") {
                val resourceId =
                    context.resources.getIdentifier(cody.imageId, "drawable", context.packageName)
                image.setImageResource(resourceId)
            } else {
                image.setImageResource(R.mipmap.ic_launcher)
            }
        }
    }

    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int)
            : ViewHolder {
        val view = LayoutInflater.from(viewGroup.context)
            .inflate(R.layout.clothing_item, viewGroup, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
        viewHolder.bind(clothingList[position], context)
    }

    override fun getItemCount() = clothingList.size
}