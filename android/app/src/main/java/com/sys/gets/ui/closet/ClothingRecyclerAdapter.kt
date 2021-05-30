package com.sys.gets.ui.closet

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.core.content.ContextCompat.getDrawable
import androidx.recyclerview.widget.RecyclerView
import com.sys.gets.R

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