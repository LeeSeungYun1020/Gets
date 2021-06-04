package com.sys.gets.ui.closet

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.Toast
import androidx.core.content.res.ResourcesCompat
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
import kotlin.collections.List
import kotlin.collections.MutableList
import kotlin.collections.listOf
import kotlin.collections.mutableListOf

class ClosetFragment : Fragment() {

    private lateinit var closetViewModel: ClosetViewModel
    private var _binding: FragmentClosetBinding? = null
    private val binding get() = _binding!!

    private lateinit var categoryButtons: List<Pair<Button, Category>>
    private lateinit var chipGroup: ChipGroup
    private var clothingList: MutableList<ClothingItem> = mutableListOf<ClothingItem>()
    private var chipList: MutableList<Chip> = mutableListOf<Chip>()
    private var code = 0

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
        categoryButtons = listOf(
            binding.outerButton to Category.OUTER,
            binding.topButton to Category.TOP,
            binding.pantsButton to Category.PANTS,
            binding.skirtButton to Category.SKIRT,
            binding.setButton to Category.SET,
            binding.shoesButton to Category.SHOES,
            binding.bagButton to Category.BAG,
            binding.hatButton to Category.HAT
        )
        chipGroup = binding.clothingChipGroup

        val clear: Int = ResourcesCompat.getColor(resources, R.color.clear, null)
        val black: Int = ResourcesCompat.getColor(resources, R.color.black, null)
        val white: Int = ResourcesCompat.getColor(resources, R.color.white, null)

        // category 버튼에 click listener 지정
        for(i in 0 until categoryButtons.size){
            categoryButtons[i].first.setOnClickListener{
                code = 0
                val categoryTitle = getString(Category.values()[i].resID) //Locale 적용됨
                Toast.makeText(context, "${categoryTitle} button clicked", Toast.LENGTH_SHORT).show()

                chipGroup.removeAllViews()
                chipList.clear()

                when(categoryButtons[i].second) {
                    Category.OUTER -> {
                        for (item in Outer.values()) {
                            Chip(context).apply {
                                text = getString(item.resID)
                                isCheckable = true
                                setOnCheckedChangeListener { _, isChecked ->
                                    if (isChecked)
                                        code += item.code
                                    else
                                        code -= item.code
                                }
                                chipList.add(this)
                            }
                        }
                    }
                    Category.TOP -> {
                        for (item in Top.values()) {
                            Chip(context).apply {
                                text = getString(item.resID)
                                isCheckable = true
                                setOnCheckedChangeListener { _, isChecked ->
                                    if (isChecked)
                                        code += item.code
                                    else
                                        code -= item.code
                                }
                                chipList.add(this)
                            }
                        }
                    }
                    Category.PANTS -> {
                        for (item in Pants.values()) {
                            Chip(context).apply {
                                text = getString(item.resID)
                                isCheckable = true
                                setOnCheckedChangeListener { _, isChecked ->
                                    if (isChecked)
                                        code += item.code
                                    else
                                        code -= item.code
                                }
                                chipList.add(this)
                            }
                        }
                    }
                    Category.SKIRT -> {
                        for (item in Skirt.values()) {
                            Chip(context).apply {
                                text = getString(item.resID)
                                isCheckable = true
                                setOnCheckedChangeListener { _, isChecked ->
                                    if (isChecked)
                                        code += item.code
                                    else
                                        code -= item.code
                                }
                                chipList.add(this)
                            }
                        }
                    }
                    Category.SET -> {
                        for (item in Set.values()) {
                            Chip(context).apply {
                                text = getString(item.resID)
                                isCheckable = true
                                setOnCheckedChangeListener { _, isChecked ->
                                    if (isChecked)
                                        code += item.code
                                    else
                                        code -= item.code
                                }
                                chipList.add(this)
                            }
                        }
                    }
                    Category.SHOES -> {
                        for (item in Shoes.values()) {
                            Chip(context).apply {
                                text = getString(item.resID)
                                isCheckable = true
                                setOnCheckedChangeListener { _, isChecked ->
                                    if (isChecked)
                                        code += item.code
                                    else
                                        code -= item.code
                                }
                                chipList.add(this)
                            }
                        }
                    }
                    Category.BAG -> {
                        for (item in Bag.values()) {
                            Chip(context).apply {
                                text = getString(item.resID)
                                isCheckable = true
                                setOnCheckedChangeListener { _, isChecked ->
                                    if (isChecked)
                                        code += item.code
                                    else
                                        code -= item.code
                                }
                                chipList.add(this)
                            }
                        }
                    }
                    Category.HAT -> {
                        for (item in Hat.values()) {
                            Chip(context).apply {
                                text = getString(item.resID)
                                isCheckable = true
                                setOnCheckedChangeListener { _, isChecked ->
                                    if (isChecked)
                                        code += item.code
                                    else
                                        code -= item.code
                                }
                                chipList.add(this)
                            }
                        }
                    }
                }

                for(j in 0 until chipList.size)
                    chipGroup.addView(chipList[j])

                for(j in 0 until categoryButtons.size) {
                    categoryButtons[j].first.setBackgroundColor(clear)
                    categoryButtons[j].first.setTextColor(black)
                }
                categoryButtons[i].first.setBackgroundColor(black)
                categoryButtons[i].first.setTextColor(white)

                clothingList.clear()
                for(j in 1..21){
                    clothingList.add(ClothingItem("clothing_example_${i+1}"))
                    // TODO: 파일명이 아니라 code(Int)로 가져올 파일 선택하기
                }
                binding.clothingRecyclerview.adapter?.notifyDataSetChanged()
                // TODO: 스크롤 젤 위로 오도록
            }

            //default : outer
            categoryButtons[0].first.performClick()
        }

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
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