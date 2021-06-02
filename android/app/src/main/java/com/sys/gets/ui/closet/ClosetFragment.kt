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
import com.sys.gets.data.Category
import com.sys.gets.databinding.FragmentClosetBinding

class ClosetFragment : Fragment() {

    private lateinit var closetViewModel: ClosetViewModel
    private var _binding: FragmentClosetBinding? = null
    // This property is only valid between onCreateView and onDestroyView.
    private val binding get() = _binding!!

    private lateinit var categoryButtons: List<Button>
    private var clothingList: MutableList<ClothingItem> = mutableListOf<ClothingItem>()
    private lateinit var chipGroup: ChipGroup
    private var chipList: MutableList<Chip> = mutableListOf<Chip>()


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
        val white: Int = ResourcesCompat.getColor(resources, R.color.white, null)

        // category 버튼에 click listener 지정
        for(i in 0 until categoryButtons.size){
            categoryButtons[i].setOnClickListener{
                val example: String = Category.values()[i].name.toLowerCase()
                Toast.makeText(context, "${example} button", Toast.LENGTH_SHORT).show()

                chipGroup.removeAllViews()
                chipList.clear()

                // TODO: 카테고리 별 하위 카테고리 이름 가져오기
                for(j in 1..5){
                    val exampleChip = Chip(context)
                    exampleChip.text = "${example}_${j}"
                    exampleChip.isCheckable = true
                    chipList.add(exampleChip)
                }

                for(j in 0 until chipList.size)
                    chipGroup.addView(chipList[j])

                // TODO: chip group checked change listener


                // TODO: 색상 오류 수정
                // 하얀색이 아니라 기본색상이 뜬다...
                for(j in 0 until categoryButtons.size)
                    categoryButtons[j].setBackgroundColor(clear)
                categoryButtons[i].setBackgroundColor(white)

                clothingList.clear()
                for(i in 1..21){
                    clothingList.add(ClothingItem("clothing_example_${example}"))
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