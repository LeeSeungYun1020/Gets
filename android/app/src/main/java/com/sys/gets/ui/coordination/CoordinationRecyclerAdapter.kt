package com.sys.gets.ui.coordination

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.sys.gets.R


class CoordinationRecyclerAdapter(val context: Context, val codyList: ArrayList<CoordinationItem>)
   : RecyclerView.Adapter<CoordinationRecyclerAdapter.ViewHolder>() {
//우리가 보여줄 데이터는 RecyclerView에 직접 넣지 않고 Adapter에 추가된다.
//RecyclerView는 Adapter를 통해 데이터를 얻고 View를 생성한다.

    inner class ViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
        var codyTitle: TextView
        var codyImage: ImageView

        init {
            codyTitle = itemView.findViewById(R.id.codyTitle)
            codyImage = itemView.findViewById(R.id.codyImage)
        }

        fun bind(cody: CoordinationItem, context: Context) {
            /* codyImage의 setImageResource에 들어갈 이미지의 id를 파일명(String)으로 찾고,
          이미지가 없는 경우 안드로이드 기본 아이콘을 표시한다.*/
            if (cody.imageId != "") {
                val resourceId =
                    context.resources.getIdentifier(cody.imageId, "drawable", context.packageName)
                codyImage?.setImageResource(resourceId)
            }
            else {
                codyImage?.setImageResource(R.mipmap.ic_launcher)
            }
            /* 나머지 TextView와 String 데이터를 연결한다. */
            codyTitle?.text = cody.title
        }
    }
        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
            val v = LayoutInflater.from(parent.context)
                .inflate(R.layout.cody_item, parent, false)
            return ViewHolder(v)
        }

        override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
            viewHolder?.bind(codyList[position], context)
        }

        override fun getItemCount(): Int {
            return codyList.size
        }

    }



