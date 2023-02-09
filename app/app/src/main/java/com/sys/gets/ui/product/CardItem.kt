package com.sys.gets.ui.product

import android.content.Intent
import android.graphics.Bitmap
import android.graphics.Rect
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.RecyclerView.ItemDecoration
import com.android.volley.Request
import com.android.volley.toolbox.ImageRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.google.android.material.circularreveal.cardview.CircularRevealCardView
import com.sys.gets.R
import com.sys.gets.data.Format
import com.sys.gets.network.Network
import com.sys.gets.ui.closet.CLOSET_TAG
import com.sys.gets.ui.coordination.COORDINATION_TAG
import com.sys.gets.ui.coordination.CoordinationActivity

data class CardItem(
    val id: Int,
    val imageID: String,
    val title: String,
    val brand: String,
    val price: Int,
    var image: Bitmap? = null,
)

class CardListAdapter(val type: String, val tag: String, val list: MutableList<CardItem>) :
    RecyclerView.Adapter<CardListViewHolder>() {
    private val imageURL = when (type) {
        PRODUCT_TAG -> Network.PRODUCT_IMAGE_URL
        else -> Network.COORDINATION_IMAGE_URL
    }

    private val countFavoriteURL = when (type) {
        PRODUCT_TAG -> Network.PRODUCT_COUNT_FAVORITE_URL
        else -> Network.COORDINATION_COUNT_FAVORITE_URL
    }

    private val checkFavoriteURL = when (type) {
        PRODUCT_TAG -> Network.PRODUCT_CHECK_FAVORITE_URL
        else -> Network.COORDINATION_CHECK_FAVORITE_URL
    }

    private val favoriteURL = when (type) {
        PRODUCT_TAG -> Network.PRODUCT_FAVORITE_URL
        else -> Network.COORDINATION_FAVORITE_URL
    }

    private val unfavoriteURL = when (type) {
        PRODUCT_TAG -> Network.PRODUCT_UNFAVORITE_URL
        else -> Network.COORDINATION_UNFAVORITE_URL
    }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) = when (type) {
        COORDINATION_TAG -> CardListViewHolder(
            LayoutInflater.from(parent.context)
                .inflate(R.layout.component_card_title_revert, parent, false)
        )
        else -> CardListViewHolder(
            LayoutInflater.from(parent.context)
                .inflate(R.layout.component_card_title, parent, false)
        )
    }


    override fun onBindViewHolder(holder: CardListViewHolder, position: Int) {
        val data = list[position]
        holder.apply {

            if (type == PRODUCT_TAG) {
                root.setOnClickListener {
                    Intent(it.context, ProductActivity::class.java).apply {
                        putExtra(ProductActivity.EXTRA_ID, data.id)
                        it.context.startActivity(this)
                    }
                }
            } else {
                root.setOnClickListener {
                    Intent(it.context, CoordinationActivity::class.java).apply {
                        putExtra(CoordinationActivity.EXTRA_ID, data.id)
                        it.context.startActivity(this)
                    }
                }
            }


            titleView.text = data.title
            imageView.setImageResource(R.drawable.tm_default)
            brandView.text = data.brand
            priceView.text = Format.currency(data.price)

            if (data.image == null) {
                Log.d("LSYD", "onBindViewHolder: image null pos: $position id: ${data.id}")
                val imageRequest = ImageRequest(
                    "$imageURL/${data.imageID}",
                    { bitmap ->
                        bitmap?.also {
                            imageView.setImageBitmap(it)
                            data.image = it
                        }
                    },
                    0,
                    0,
                    ImageView.ScaleType.FIT_CENTER,
                    Bitmap.Config.RGB_565,
                    null
                )
                imageRequest.tag = this@CardListAdapter.tag
                Network.getInstance(imageView.context)
                    .addToRequestQueue(imageRequest)
            }

            val favoriteRequest = JsonObjectRequest(
                Request.Method.GET, "$countFavoriteURL/${data.id}",
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
            favoriteRequest.tag = this@CardListAdapter.tag
            Network.getInstance(favoriteView.context).addToRequestQueue(favoriteRequest)

            favoriteButton.apply {
                isChecked = false
                setOnClickListener {
                    if (!isChecked) { // 체크 안되어있는 경우
                        Network.addSimpleRequest(
                            context,
                            this@CardListAdapter.tag,
                            favoriteURL,
                            data.id
                        ) {
                            isChecked = true
                            favoriteView.text =
                                ((favoriteView.text.toString().toIntOrNull() ?: 0) + 1).toString()
                        }
                    } else { // 체크 되어있는 경우
                        Network.addSimpleRequest(
                            context,
                            this@CardListAdapter.tag,
                            unfavoriteURL,
                            data.id
                        ) {
                            isChecked = false
                            favoriteView.text =
                                ((favoriteView.text.toString().toIntOrNull() ?: 1) - 1).toString()

                            if (this@CardListAdapter.tag == CLOSET_TAG) {
                                val index = list.indexOf(list.find { it.id == data.id })
                                if (index >= 0) {
                                    list.removeAt(index)
                                    notifyItemRemoved(index)
                                }
                            }
                        }
                    }
                }
                Network.addSimpleRequest(
                    context,
                    this@CardListAdapter.tag,
                    checkFavoriteURL,
                    data.id
                ) {
                    isChecked = true
                }
            }
        }
    }

    override fun getItemCount() = list.size

}

class CardListViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    val root: ConstraintLayout = view.findViewById(R.id.card_root)
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