package com.sys.gets.ui.home

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Bitmap
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Request
import com.android.volley.toolbox.ImageRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.google.android.material.button.MaterialButton
import com.sys.gets.R
import com.sys.gets.databinding.FragmentHomeBinding
import com.sys.gets.network.Network
import org.json.JSONObject

class HomeFragment : Fragment() {

    private lateinit var homeViewModel: HomeViewModel
    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!
    private val cardList = mutableListOf<MainItem>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        homeViewModel =
            ViewModelProvider(this).get(HomeViewModel::class.java)

        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.homeRecyclerview.apply {
            layoutManager = GridLayoutManager(activity, 2)
            adapter = MainListAdapter(this@HomeFragment.requireContext(),cardList)
        }


        val jsonObjectRequest = JsonObjectRequest(
            Request.Method.POST, "${Network.BASE_URL}/weather",
            JSONObject().apply {
                put("latitude", 37.5552483)
                put("longitude", 126.9711526)
                // TODO: 기기의 위경도로 변경
            },
            { response ->
                if (response.getBoolean("error")) {
                    onServerDisconnected()
                } else {
                    val status =
                        when (response.getInt("form")) {
                            1 -> R.string.weather_rain
                            2 -> R.string.weather_rain_snow
                            3 -> R.string.weather_snow
                            4 -> R.string.weather_shower
                            5 -> R.string.weather_rain_light
                            6 -> R.string.weather_rain_snow_light
                            7 -> R.string.weather_snow_light
                            else -> {
                                when (response.getInt("sky")) {
                                    1 -> R.string.weather_clear
                                    2, 3 -> R.string.weather_partly_cloudy
                                    else -> R.string.weather_cloudy
                                }
                            }
                        }
                    val icon = when (response.getInt("form")) {
                        1 -> R.drawable.ic_weather_rain
                        2 -> R.drawable.ic_weather_rain_snow
                        3 -> R.drawable.ic_weather_snow
                        4 -> R.drawable.ic_weather_shower
                        5 -> R.drawable.ic_weather_rain_light
                        6 -> R.drawable.ic_weather_rain_snow_light
                        7 -> R.drawable.ic_weather_snow_light
                        else -> {
                            when (response.getInt("sky")) {
                                1 -> R.drawable.ic_weather_clear
                                2, 3 -> R.drawable.ic_weather_partly_cloudy
                                else -> R.drawable.ic_weather_cloudy
                            }
                        }
                    }
                    cardList.add(
                        0,
                        Weather(
                            icon,
                            status,
                            response.getDouble("tem"),
                            response.getDouble("min"),
                            response.getDouble("max")
                        )
                    )
                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(0)
                }
            },
            { error ->
                onServerDisconnected()
            }
        )



        val codyRequest1 = ImageRequest("${Network.BASE_URL}/product/image/0_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/11_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/59_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/271_2", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest1)

        val codyRequest2 = ImageRequest("${Network.BASE_URL}/product/image/0_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/143_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/298_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/58_1", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest2)

        val codyRequest3 = ImageRequest("${Network.BASE_URL}/product/image/0_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/139_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/395_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/58_1", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest3)

        val codyRequest4 = ImageRequest("${Network.BASE_URL}/product/image/0_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/370_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/370_2", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/170_1", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest4)

        val codyRequest5 = ImageRequest("${Network.BASE_URL}/product/image/251_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/400_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/400_2", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/186_2", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest5)

        val codyRequest6 = ImageRequest("${Network.BASE_URL}/product/image/0_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/361_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/9_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/174_2", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest6)

        val codyRequest7 = ImageRequest("${Network.BASE_URL}/product/image/0_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/324_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/332_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/269_2", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest7)

        val codyRequest8 = ImageRequest("${Network.BASE_URL}/product/image/324_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/15_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/12_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/269_2", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest8)

        val codyRequest9 = ImageRequest("${Network.BASE_URL}/product/image/203_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/131_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/52_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/261_2", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest9)

        val codyRequest10 = ImageRequest("${Network.BASE_URL}/product/image/243_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/119_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/167_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/174_2", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest10)

        val codyRequest11 = ImageRequest("${Network.BASE_URL}/product/image/264_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/89_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/94_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/101_1", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest11)

        val codyRequest12 = ImageRequest("${Network.BASE_URL}/product/image/0_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/122_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/64_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/154_3", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest12)

        val codyRequest13 = ImageRequest("${Network.BASE_URL}/product/image/264_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/148_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/302_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/268_1", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest13)

        val codyRequest14 = ImageRequest("${Network.BASE_URL}/product/image/325_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/392_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/392_2", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/270_2", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest14)

        val codyRequest15 = ImageRequest("${Network.BASE_URL}/product/image/259_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/202_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/401_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/262_2", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest15)

        val codyRequest16 = ImageRequest("${Network.BASE_URL}/product/image/0_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/32_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/375_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/269_2", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest16)

        val codyRequest17 = ImageRequest("${Network.BASE_URL}/product/image/323_2", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/39_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/383_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/154_3", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest17)

        val codyRequest18 = ImageRequest("${Network.BASE_URL}/product/image/325_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/345_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/342_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/269_2", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest18)

        val codyRequest19 = ImageRequest("${Network.BASE_URL}/product/image/0_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/212_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/294_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/58_1", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest19)

        val codyRequest20 = ImageRequest("${Network.BASE_URL}/product/image/204_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/198_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/193_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/103_1", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest20)

        val codyRequest21 = ImageRequest("${Network.BASE_URL}/product/image/218_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/358_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/239_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/186_2", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest21)

        val codyRequest22 = ImageRequest("${Network.BASE_URL}/product/image/211_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/60_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/94_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/272_1", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest22)

        val codyRequest23 = ImageRequest("${Network.BASE_URL}/product/image/139_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/336_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/382_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/58_1", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest23)

        val codyRequest24 = ImageRequest("${Network.BASE_URL}/product/image/0_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/20_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/387_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/106_1", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest24)

        val codyRequest25 = ImageRequest("${Network.BASE_URL}/product/image/205_1", {hatBitmap ->
            Network.getInstance(this.requireContext()).addToRequestQueue(
                ImageRequest("${Network.BASE_URL}/product/image/109_1", {topBitmap ->
                    Network.getInstance(this.requireContext()).addToRequestQueue(
                        ImageRequest("${Network.BASE_URL}/product/image/191_1", {bottomBitmap ->
                            Network.getInstance(this.requireContext()).addToRequestQueue(
                                ImageRequest("${Network.BASE_URL}/product/image/190_3", {shoesBitmap ->
                                    cardList.add(Cody(hatBitmap, topBitmap, bottomBitmap, shoesBitmap))
                                    _binding?.homeRecyclerview?.adapter?.notifyItemInserted(cardList.lastIndex)
                                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null))
        }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565, null)

        Network.getInstance(this.requireContext()).addToRequestQueue(codyRequest25)

        Network.getInstance(this.requireContext()).addToRequestQueue(jsonObjectRequest)

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun onServerDisconnected() {
        cardList.add(
            0,
            Notice(
                R.drawable.ic_baseline_server_off_24,
                R.string.msg_server_error,
                R.string.msg_server_disconnected,
                R.string.msg_close
            ) {
                if (cardList.removeFirstOrNull() != null)
                    _binding?.homeRecyclerview?.adapter?.notifyItemRemoved(0)
            }
        )
        _binding?.homeRecyclerview?.adapter?.notifyItemInserted(0)
    }
}

enum class MainItemType(val code: Int) {
    TYPE_NOTICE(1), TYPE_WEATHER(2), TYPE_COORDINATION(3);

    companion object {
        fun valueOf(code: Int): MainItemType = when (code) {
            1 -> TYPE_NOTICE
            2 -> TYPE_WEATHER
            else -> TYPE_COORDINATION
        }
    }
}

open class MainItem(val type: MainItemType)

data class Notice(
    val iconID: Int,
    val titleID: Int,
    val subtitleID: Int,
    val buttonTextID: Int? = null,
    val buttonIconID: Int? = null,
    val buttonAction: ((View) -> Unit)? = null
) : MainItem(MainItemType.TYPE_NOTICE)

data class Weather(
    val iconID: Int,
    val statusID: Int,
    val tem: Double,
    val min: Double,
    val max: Double
) : MainItem(MainItemType.TYPE_WEATHER)

data class Cody(
    val hat: Bitmap,
    val top: Bitmap,
    val bottom: Bitmap,
    val shoes: Bitmap,
//    val outer:Bitmap,
//    val set:Bitmap
) : MainItem(MainItemType.TYPE_COORDINATION)

class MainListAdapter(val context: Context, val list: List<MainItem>) :
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    override fun getItemViewType(position: Int) = list[position].type.code

    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): RecyclerView.ViewHolder =
        when (MainItemType.valueOf(viewType)) {
            MainItemType.TYPE_NOTICE -> {
                NoticeViewHolder(
                    LayoutInflater.from(viewGroup.context)
                        .inflate(R.layout.card_weather, viewGroup, false)
                )
            }
            MainItemType.TYPE_WEATHER -> {
                WeatherViewHolder(
                    LayoutInflater.from(viewGroup.context)
                        .inflate(R.layout.card_weather, viewGroup, false)
                )
            }
            MainItemType.TYPE_COORDINATION -> {
                CoordinationViewHolder(
                    LayoutInflater.from(viewGroup.context)
                        .inflate(R.layout.card_coordination_clothes, viewGroup, false)
                )
            }
        }

    @SuppressLint("SetTextI18n")
    override fun onBindViewHolder(viewHolder: RecyclerView.ViewHolder, position: Int) {
        val data = list[position]
        viewHolder.apply {
            when (data.type) {
                MainItemType.TYPE_NOTICE -> {
                    if (viewHolder is NoticeViewHolder && data is Notice) {
                        with(viewHolder) {
                            icon.setImageResource(data.iconID)
                            title.text = context.getText(data.titleID)
                            subtitle.text = context.getText(data.subtitleID)
                            data.buttonTextID?.let {
                                button.visibility = View.VISIBLE
                                button.text = context.getText(it)
                                button.setOnClickListener(data.buttonAction)
                            }
                            data.buttonIconID?.let { button.setIconResource(it) }

                        }
                    }
                }
                MainItemType.TYPE_WEATHER -> {
                    if (viewHolder is WeatherViewHolder && data is Weather) {
                        with(viewHolder) {
                            icon.setImageResource(data.iconID)
                            title.text = "${data.tem}°C, ${context.getString(data.statusID)}"
                            subtitle.text =
                                "${context.getString(R.string.weather_max)} ${data.max}°C, ${
                                    context.getString(R.string.weather_min)
                                } ${data.min}°C"
                        }
                    }
                }
                MainItemType.TYPE_COORDINATION -> {
                    if (viewHolder is CoordinationViewHolder && data is Cody) {
                        // TODO: 메인 코디 카드 표시할 내용 작업
                        with(viewHolder) {
                            hat.setImageBitmap(data.hat)
                            top.setImageBitmap(data.top)
                            bottom.setImageBitmap(data.bottom)
                            shoes.setImageBitmap(data.shoes)
                        }
                    }
                }
            }
        }
    }

    override fun getItemCount() = list.size

}

class NoticeViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    val icon: ImageView = view.findViewById(R.id.weather_card_image)
    val title: TextView = view.findViewById(R.id.weather_card_title)
    val subtitle: TextView = view.findViewById(R.id.weather_card_subtitle)
    val button: MaterialButton = view.findViewById(R.id.weather_card_button)
}

class WeatherViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    val icon: ImageView = view.findViewById(R.id.weather_card_image)
    val title: TextView = view.findViewById(R.id.weather_card_title)
    val subtitle: TextView = view.findViewById(R.id.weather_card_subtitle)
}

class CoordinationViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    // TODO: 메인 코디 카드
    val hat: ImageView = itemView.findViewById(R.id.card_hat)
    val top: ImageView = itemView.findViewById(R.id.card_top)
    val bottom: ImageView = itemView.findViewById(R.id.card_bottom)
    val shoes: ImageView = itemView.findViewById(R.id.card_shoes)
    /*val bag: ImageView = itemView.findViewById(R.id.card_bag)
    val outer: ImageView = itemView.findViewById(R.id.card_outer)
    val set: ImageView = itemView.findViewById(R.id.card_set)*/

}