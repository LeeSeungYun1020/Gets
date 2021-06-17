package com.sys.gets.ui.closet

import android.content.Context
import android.graphics.Bitmap
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Request
import com.android.volley.toolbox.ImageRequest
import com.android.volley.toolbox.JsonArrayRequest
import com.google.android.material.chip.Chip
import com.google.android.material.chip.ChipGroup
import com.sys.gets.R
import com.sys.gets.data.*
import com.sys.gets.data.Set
import com.sys.gets.databinding.FragmentClosetBinding
import com.sys.gets.network.Network
import org.json.JSONArray
import org.json.JSONObject

class ClosetFragment : Fragment() {

    private lateinit var closetViewModel: ClosetViewModel
    private var _binding: FragmentClosetBinding? = null
    private val binding get() = _binding!!

    private lateinit var chipGroup: ChipGroup
    private var clothingList: MutableList<ClothingItem> = mutableListOf() // 표시될 제품 리스트

    private var categoryCode: Int = 0 // 어떤 카테고리 선택?
    private var detailCode: Int = 0 // 어떤 세부 분류 선택?

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
            adapter = ClothingListAdapter(this@ClosetFragment.requireContext(), clothingList)
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

                changeClothingList(this.requireContext())
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

                changeClothingList(context)
            }
            chipGroup.addView(this)
        }
    }

    fun changeClothingList(context: Context){
        clothingList.clear()
        // 이미지 다 로드되기 전에 또 호출하면 앱 꺼지는 에러
        // 해당하는 product가 없으면 꺼지는 것 같음
        // null처리하면 될 것 같음

        val productListRequest = JsonArrayRequest(
            Request.Method.POST, "${Network.BASE_URL}/product/list",
            JSONArray().put(JSONObject().apply {
                put("type", categoryCode)
                put("detail",detailCode)
                Log.d("CLOSET", "request: $this")
            }),
            {response ->
                //Log.d("CLOSET", "response success, category: ${categoryCode}, detail: ${detailCode}")

                for(i in 0.until(response.length())){
                    val item = response.getJSONObject(i)
                    val image1ID = item.getString("image1ID")

                    val clothingRequest = ImageRequest("${Network.BASE_URL}/product/image/${image1ID}",
                        {bitmap ->
                            clothingList.add(ClothingItem(bitmap))
                            binding.clothingRecyclerview.adapter?.notifyItemInserted(clothingList.lastIndex)
                        },
                        0, 0, ImageView.ScaleType.CENTER_CROP,
                        Bitmap.Config.RGB_565, {Log.d("CLOSET", "clothingRequest error")})

                    Network.getInstance(requireContext()).addToRequestQueue(clothingRequest)

                }
            },
            { error ->
                Log.e("CLOSET", error.toString())
                Toast.makeText(context, R.string.msg_server_error, Toast.LENGTH_SHORT).show()
            })

        Network.getInstance(context).addToRequestQueue(productListRequest)

        binding.clothingRecyclerview.scrollToPosition(0)
    }
}

data class ClothingItem(
    val image: Bitmap
)

class ClothingListAdapter(val context: Context, val list: List<ClothingItem>)
    : RecyclerView.Adapter<RecyclerView.ViewHolder>(){

    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return ClothingViewHolder(LayoutInflater.from(viewGroup.context)
            .inflate(R.layout.clothing_item, viewGroup, false)
        )
    }

    override fun onBindViewHolder(viewHolder: RecyclerView.ViewHolder, position: Int) {
        val data = list[position]
        viewHolder.apply{
            if(viewHolder is ClothingViewHolder) {
                with(viewHolder) {
                    icon.setImageBitmap(data.image)
                }
            }
        }
    }

    override fun getItemCount() = list.size
}

class ClothingViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    val icon: ImageView = view.findViewById(R.id.clothing_item_image)
}