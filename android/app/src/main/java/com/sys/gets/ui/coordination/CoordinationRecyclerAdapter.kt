package com.sys.gets.ui.coordination

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.sys.gets.R


class CoordinationRecyclerAdapter(val context: Context, val codyList: List<CoordinationItem>)
   : RecyclerView.Adapter<CoordinationRecyclerAdapter.ViewHolder>() {

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val codyTitle: TextView = itemView.findViewById(R.id.codyTitle)
        val codyImage: ImageView = itemView.findViewById(R.id.codyImage)

        fun bind(cody: CoordinationItem, context: Context) {
            if (cody.imageId != "") {
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
                .inflate(R.layout.cody_item, parent, false)
            return ViewHolder(v)
        }

        override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
            viewHolder.bind(codyList[position], context)
//            viewHolder.codyTitle.text = codyList[position].title
//            viewHolder.codyImage.setImageResource(R.drawable.cody_example)
        }

    override fun getItemCount() = codyList.size
    }



