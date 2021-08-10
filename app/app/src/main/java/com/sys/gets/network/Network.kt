package com.sys.gets.network

import android.content.Context
import android.graphics.Bitmap
import androidx.collection.LruCache
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.toolbox.ImageLoader
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import java.net.CookieHandler
import java.net.CookieManager


class Network(context: Context) {
    companion object {
        @Volatile
        private var INSTANCE: Network? = null
        fun getInstance(context: Context) =
            INSTANCE ?: synchronized(this) {
                INSTANCE ?: Network(context).also {
                    INSTANCE = it
                }
            }

        const val BASE_URL = "http://10.0.2.2:3000"
        const val API_URL = "$BASE_URL/api"
        const val SIGN_IN_URL = "$BASE_URL/auth/signin"
        const val SIGN_OUT_URL = "$BASE_URL/auth/signout"
        const val SIGN_UP_CHECK_URL = "$BASE_URL/auth/signup/check"
        const val SIGN_UP_BASIC_URL = "$BASE_URL/auth/signup/basic"
        const val SIGN_UP_INFO_URL = "$BASE_URL/auth/signup/info"
        const val SIGN_UP_ADDRESS_URL = "$BASE_URL/auth/signup/address"
        const val SIGN_UP_PASSWORD_URL = "$BASE_URL/auth/signup/password"
        const val SIGN_USER_URL = "$BASE_URL/auth/user"

        const val PRODUCT_CATEGORY_URL = "$BASE_URL/product/category"
        const val PRODUCT_LIST_URL = "$BASE_URL/product/list"
        const val PRODUCT_URL = "$BASE_URL/product"
        const val PRODUCT_IMAGE_URL = "$BASE_URL/product/image"
        const val PRODUCT_FAVORITE_URL = "$BASE_URL/product/favorite"
        const val PRODUCT_UNFAVORITE_URL = "$BASE_URL/product/unfavorite"
        const val PRODUCT_COUNT_FAVORITE_URL = "$BASE_URL/product/count/favorite"
        const val PRODUCT_CHECK_FAVORITE_URL = "$BASE_URL/product/check/favorite"

        const val COORDINATION_URL = "$BASE_URL/coordination"
        const val COORDINATION_IMAGE_URL = "$BASE_URL/coordination/image"
        const val COORDINATION_FAVORITE_URL = "$BASE_URL/coordination/favorite"
        const val COORDINATION_UNFAVORITE_URL = "$BASE_URL/coordination/unfavorite"
        const val COORDINATION_COUNT_FAVORITE_URL = "$BASE_URL/coordination/count/favorite"
        const val COORDINATION_CHECK_FAVORITE_URL = "$BASE_URL/coordination/check/favorite"

        const val HOME_TOP_TRENDS_URL = "$BASE_URL/home/toptrends"
        const val HOME_CUSTOM_URL = "$BASE_URL/home/custom"
        const val HOME_STYLE_URL = "$BASE_URL/home/style"

        const val CLOSET_PRODUCT_URL = "$BASE_URL/closet/product"
        const val CLOSET_COORDINATION_URL = "$BASE_URL/closet/coordination"

        fun addSimpleRequest(context: Context, url:String, id: Int, callback: () -> Unit) {
            val jsonObjectRequest = JsonObjectRequest(
                Request.Method.GET, "$url/$id",
                null,
                { response ->
                    if (response.getBoolean("result")) {
                        callback()
                    }
                },
                {

                }
            )
            Network.getInstance(context).addToRequestQueue(jsonObjectRequest)
        }
    }

    val imageLoader: ImageLoader by lazy {
        ImageLoader(requestQueue,
            object : ImageLoader.ImageCache {
                private val cache = LruCache<String, Bitmap>(30)
                override fun getBitmap(url: String): Bitmap? {
                    return cache.get(url)
                }

                override fun putBitmap(url: String, bitmap: Bitmap) {
                    cache.put(url, bitmap)
                }
            })
    }
    val requestQueue: RequestQueue by lazy {
        CookieHandler.setDefault(CookieManager())
        Volley.newRequestQueue(context.applicationContext)
    }

    fun <T> addToRequestQueue(req: Request<T>) {
        requestQueue.add(req)
    }
}