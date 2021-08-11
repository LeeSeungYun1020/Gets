package com.sys.gets.ui.product

import android.graphics.Bitmap
import android.graphics.Rect
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.RecyclerView.ItemDecoration
import com.google.android.material.circularreveal.cardview.CircularRevealCardView
import com.sys.gets.R
import com.sys.gets.network.Network

data class ProductItem(
    val id: Int,
    var image: Bitmap?,
    val title: String,
    val brand: String,
    val price: String,
    var favorite: Int?
)

class ProductListAdapter(val list: List<ProductItem>)  :
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) =
        ProductListViewHolder(
            LayoutInflater.from(parent.context)
                .inflate(R.layout.component_card_title, parent, false)
        )

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        val data = list[position]
        (holder as? ProductListViewHolder)?.apply {
            data.image?.run {
                imageView.setImageBitmap(this)
            }
            titleView.text = data.title
            brandView.text = data.brand
            priceView.text = data.price
            data.favorite?.run {
                favoriteView.text = this.toString()
            }

            favoriteButton.apply {
                setOnClickListener {
                    if (!isChecked) { // 체크 안되어있는 경우
                        Network.addSimpleRequest(context, Network.PRODUCT_FAVORITE_URL, data.id) {
                            isChecked = true
                        }
                        favoriteView.text = (data.favorite ?: 0 + 1).toString()
                    } else { // 체크 되어있는 경우
                        Network.addSimpleRequest(context, Network.PRODUCT_UNFAVORITE_URL, data.id) {
                            isChecked = false
                        }
                        favoriteView.text = (data.favorite ?: 1 - 1).toString()
                    }
                }
                Network.addSimpleRequest(context, Network.PRODUCT_CHECK_FAVORITE_URL, data.id) {
                    isChecked = true
                }
            }
        }
    }

    override fun getItemCount() = list.size

}

class ProductListViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    val imageView: ImageView = view.findViewById(R.id.image)
    val titleView: TextView = view.findViewById(R.id.card_title)
    val brandView: TextView = view.findViewById(R.id.card_brand)
    val priceView: TextView = view.findViewById(R.id.card_price)
    val favoriteView: TextView = view.findViewById(R.id.card_favorite)
    val favoriteButton: CircularRevealCardView = view.findViewById(R.id.favorite_button)
}

class GridSpacingItemDecoration(private val spacing: Int = 50) : ItemDecoration() {
    private val spanCount = 2
    private val includeEdge = false

    override fun getItemOffsets(
        outRect: Rect,
        view: View,
        parent: RecyclerView,
        state: RecyclerView.State
    ) {
        val position = parent.getChildAdapterPosition(view)
        val column = position % spanCount
        if (includeEdge) {
            outRect.left =
                spacing - column * spacing / spanCount
            outRect.right =
                (column + 1) * spacing / spanCount
            if (position < spanCount) {
                outRect.top = spacing
            }
            outRect.bottom = spacing
        } else {
            outRect.left = column * spacing / spanCount
            outRect.right =
                spacing - (column + 1) * spacing / spanCount
            if (position >= spanCount) {
                outRect.top = spacing
            }
        }
    }
}