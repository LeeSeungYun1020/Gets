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
import com.android.volley.Request
import com.android.volley.toolbox.ImageRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.google.android.material.circularreveal.cardview.CircularRevealCardView
import com.sys.gets.R
import com.sys.gets.network.Network

data class ProductItem(
    val id: Int,
    var imageID: String,
    val title: String,
    val brand: String,
    val price: String
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
            val imageRequest = ImageRequest(
                "${Network.PRODUCT_IMAGE_URL}/${data.imageID}",
                { bitmap ->
                    bitmap?.run {
                        imageView.setImageBitmap(bitmap)
                        // notifyItemChanged(position)
                    }
                },
                0,
                0,
                ImageView.ScaleType.FIT_CENTER,
                Bitmap.Config.RGB_565,
                null
            )
            imageRequest.tag = PRODUCT_TAG
            Network.getInstance(imageView.context)
                .addToRequestQueue(imageRequest)

            titleView.text = data.title
            brandView.text = data.brand
            priceView.text = data.price

            val favoriteRequest = JsonObjectRequest(
                Request.Method.GET, "${Network.PRODUCT_COUNT_FAVORITE_URL}/${data.id}",
                null,
                { response ->
                    if (response.getBoolean("result")) {
                        favoriteView.text = response.getInt("favorite").toString()
                        // notifyItemChanged(position)
                    }
                },
                {

                }
            )
            favoriteRequest.tag = PRODUCT_TAG
            Network.getInstance(favoriteView.context).addToRequestQueue(favoriteRequest)

            favoriteButton.apply {
                isChecked = false
                setOnClickListener {
                    if (!isChecked) { // 체크 안되어있는 경우
                        Network.addSimpleRequest(
                            context,
                            PRODUCT_TAG,
                            Network.PRODUCT_FAVORITE_URL,
                            data.id
                        ) {
                            isChecked = true
                            favoriteView.text =
                                ((favoriteView.text.toString().toIntOrNull() ?: 0) + 1).toString()
                        }
                    } else { // 체크 되어있는 경우
                        Network.addSimpleRequest(
                            context,
                            PRODUCT_TAG,
                            Network.PRODUCT_UNFAVORITE_URL,
                            data.id
                        ) {
                            isChecked = false
                            favoriteView.text =
                                ((favoriteView.text.toString().toIntOrNull() ?: 1) - 1).toString()
                        }
                    }
                }
                Network.addSimpleRequest(
                    context,
                    PRODUCT_TAG,
                    Network.PRODUCT_CHECK_FAVORITE_URL,
                    data.id
                ) {
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