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
import androidx.fragment.app.FragmentManager
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.card.MaterialCardView
import com.sys.gets.R
import com.sys.gets.SearchActivity
import com.sys.gets.databinding.FragmentCoordinationBinding
import com.sys.gets.ui.settings.AccountSettingsFragment

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

        for(i in 1..12){
            coordinationList.add(CoordinationItem(i, "cody_example", "cody${i}"))
        }

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
                Log.e("LOGE", "bind: click ${cody.title}", )
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