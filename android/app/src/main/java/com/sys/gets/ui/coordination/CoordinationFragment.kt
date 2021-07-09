package com.sys.gets.ui.coordination

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.card.MaterialCardView
import com.sys.gets.R
import com.sys.gets.databinding.FragmentCoordinationBinding
import java.util.*


class CoordinationFragment : Fragment() {

    private lateinit var coordinationViewModel: CoordinationViewModel
    private var _binding: FragmentCoordinationBinding? = null
    // This property is only valid between onCreateView and onDestroyView.
    private val binding get() = _binding!!

    private var coordinationList: MutableList<CoordinationItem> = mutableListOf()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        coordinationViewModel =
            ViewModelProvider(this).get(CoordinationViewModel::class.java)

        _binding = FragmentCoordinationBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.coordinationRecyclerview.apply{
            layoutManager = GridLayoutManager(activity, 2)
            adapter = CoordinationRecyclerAdapter(context, coordinationList)
        }

        coordinationList.add(CoordinationItem(1, "cody_example_3", "제니룩"))
        coordinationList.add(CoordinationItem(2, "cody_example_7", "소개팅룩"))
        coordinationList.add(CoordinationItem(3, "cody_example_8", "오피스룩"))
        coordinationList.add(CoordinationItem(4, "cody_example_4", "패피룩"))
        coordinationList.add(CoordinationItem(5, "cody_example_9", "꾸안꾸룩"))
        coordinationList.add(CoordinationItem(6, "cody_example_25", "댄디룩"))
        coordinationList.add(CoordinationItem(7, "cody_example_17", "데이트룩"))
        coordinationList.add(CoordinationItem(8, "cody_example_5", "꾸안꾸룩"))
        coordinationList.add(CoordinationItem(9, "cody_example_15", "걸리시룩"))
        coordinationList.add(CoordinationItem(10, "cody_example_2", "댄디룩"))



        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

data class CoordinationItem(val coordinationId: Int, val imageId: String, val title: String)

class CoordinationRecyclerAdapter(val context: Context, val codyList: List<CoordinationItem>)
    : RecyclerView.Adapter<CoordinationRecyclerAdapter.ViewHolder>() {

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val card: MaterialCardView = itemView.findViewById(R.id.coordination_card)
        val codyTitle: TextView = itemView.findViewById(R.id.codyTitle)
        val codyImage: ImageView = itemView.findViewById(R.id.codyImage)

        fun bind(cody: CoordinationItem, context: Context) {
            card.setOnClickListener {
                Log.e("LOGE", "bind: click ${cody.title}")
                val intent = Intent(context, CoordinationPreviewActivity::class.java)
                context.startActivity(intent)
            }
            if (cody.imageId.isNotBlank()) {
                val resourceId =
                    context.resources.getIdentifier(cody.imageId, "drawable", context.packageName)

                codyImage.setImageResource(resourceId)
            }
            else {
                codyImage.setImageResource(R.mipmap.ic_launcher)
            }

            codyTitle.text = cody.title
        }
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val v = LayoutInflater.from(parent.context)
            .inflate(R.layout.coordination_item, parent, false)
        return ViewHolder(v)
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
        viewHolder.bind(codyList[position], context)
//            viewHolder.codyTitle.text = codyList[position].title
//            viewHolder.codyImage.setImageResource(R.drawable.cody_example)
    }

    override fun getItemCount() = codyList.size
}