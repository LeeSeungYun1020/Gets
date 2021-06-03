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
import java.util.*
import kotlin.collections.HashMap
import kotlin.collections.LinkedHashMap
import kotlin.collections.List
import kotlin.collections.MutableList
import kotlin.collections.listOf
import kotlin.collections.map
import kotlin.collections.mutableListOf
import kotlin.collections.set

class Type(val code: Int, val resID: Int)

class ClosetFragment : Fragment() {

    private lateinit var closetViewModel: ClosetViewModel
    private var _binding: FragmentClosetBinding? = null
    private val binding get() = _binding!!

    private lateinit var categoryButtons: List<Button>
    private lateinit var chipGroup: ChipGroup
    private var clothingList: MutableList<ClothingItem> = mutableListOf<ClothingItem>()
    private var chipList: MutableList<Chip> = mutableListOf<Chip>()

    val categoryList: Array<Int> = arrayOf(
        R.string.category_outer,
        R.string.category_top,
        R.string.category_pants,
        R.string.category_skirt,
        R.string.category_set,
        R.string.category_shoes,
        R.string.category_bag,
        R.string.category_hat
    )
    val data: HashMap<Int, List<String>>
        get() {
            val listData = LinkedHashMap<Int, List<String>>()
            val titles = arrayOf(
                Outer.values().map { getString(it.resID) },
                Top.values().map { getString(it.resID) },
                Pants.values().map { getString(it.resID) },
                Skirt.values().map { getString(it.resID) },
                Set.values().map { getString(it.resID) },
                Shoes.values().map { getString(it.resID) },
                Bag.values().map { getString(it.resID) },
                Hat.values().map { getString(it.resID) }
            )
            for(i in 0 until titles.size){
                listData[i] = titles[i]
            }
            return listData
        }

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
            binding.outerButton,
            binding.topButton,
            binding.pantsButton,
            binding.skirtButton,
            binding.setButton,
            binding.shoesButton,
            binding.bagButton,
            binding.hatButton
        )
        chipGroup = binding.clothingChipGroup

        val clear: Int = ResourcesCompat.getColor(resources, R.color.clear, null)
        val black: Int = ResourcesCompat.getColor(resources, R.color.black, null)
        val white: Int = ResourcesCompat.getColor(resources, R.color.white, null)

        // category 버튼에 click listener 지정
        for(i in 0 until categoryButtons.size){
            categoryButtons[i].setOnClickListener{
                val name = getString(categoryList[i]) // 한글
                Toast.makeText(context, "${name} button", Toast.LENGTH_SHORT).show()

                chipGroup.removeAllViews()
                chipList.clear()

                for(item in data[i]!!){
                    val exampleChip = Chip(context)
                    exampleChip.text = item.toString()
                    exampleChip.isCheckable = true
                    chipList.add(exampleChip)
                }

                for(j in 0 until chipList.size)
                    chipGroup.addView(chipList[j])

                // TODO: chip group checked change listener


                for(j in 0 until categoryButtons.size) {
                    categoryButtons[j].setBackgroundColor(clear)
                    categoryButtons[j].setTextColor(black)
                }
                categoryButtons[i].setBackgroundColor(black)
                categoryButtons[i].setTextColor(white)

                clothingList.clear()
                for(j in 1..21){
                    clothingList.add(ClothingItem("clothing_example_${i+1}"))
                    // locale 때문에 name이 한글이 되버려서 파일을 불러올 수가 없어서
                    // 카테고리를 type no로 처리한 임시 example 파일을 추가하였다.
                    // TODO: 파일명이 아니라 code(Int)로 가져올 파일 선택하기
                    // chip group checked change listener에서..?
                }
                binding.clothingRecyclerview.adapter?.notifyDataSetChanged()
                // TODO: 스크롤 젤 위로 오도록
            }

            //default : outer
            categoryButtons[0].performClick()
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
            // Define click listener for the ViewHolder's View.
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