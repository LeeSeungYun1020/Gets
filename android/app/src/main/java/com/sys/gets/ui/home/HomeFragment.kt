package com.sys.gets.ui.home

import android.annotation.SuppressLint
import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
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
    ): View? {
        homeViewModel =
            ViewModelProvider(this).get(HomeViewModel::class.java)

        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.homeRecyclerview.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = MainListAdapter(this@HomeFragment.requireContext(), cardList)
        }

        val jsonObjectRequest = JsonObjectRequest(
            Request.Method.POST, "http://10.0.2.2:3000/api/weather",
            JSONObject().apply {
                put("latitude", 37.5552483)
                put("longitude", 126.9711526)
                // TODO: 기기의 위경도로 변경
            },
            { response ->
                if (response.getBoolean("error")) {

                } else {
                    val status = getString(
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
                    )
                    cardList.add(
                        0,
                        Weather(
                            status,
                            response.getDouble("tem"),
                            response.getDouble("min"),
                            response.getDouble("max")
                        )
                    )
                    binding.homeRecyclerview.adapter?.notifyItemInserted(0)
                }
            },
            { error ->
                Log.e("LOGE", "onCreateView: $error")
            }
        )
        Network.getInstance(this.requireActivity()).addToRequestQueue(jsonObjectRequest)

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

open class MainItem(val type: Int) {
    companion object {
        val TYPE_WEATHER = 1
        val TYPE_COORDINATION = 2
    }
}

data class Weather(
    // TODO: 아이콘 추가
    val status: String,
    val tem: Double,
    val min: Double,
    val max: Double
) : MainItem(MainItem.TYPE_WEATHER)

class MainListAdapter(val context: Context, val list: List<MainItem>) :
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    override fun getItemViewType(position: Int) = list[position].type

    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): RecyclerView.ViewHolder =
        when (viewType) {
            MainItem.TYPE_WEATHER -> {
                WeatherViewHolder(
                    LayoutInflater.from(viewGroup.context)
                        .inflate(R.layout.card_weather, viewGroup, false)
                )
            }
            else -> {
                // TODO: inflate coordination card
                WeatherViewHolder(
                    LayoutInflater.from(viewGroup.context)
                        .inflate(R.layout.card_weather, viewGroup, false)
                )
            }
        }

    @SuppressLint("SetTextI18n")
    override fun onBindViewHolder(viewHolder: RecyclerView.ViewHolder, position: Int) {
        val data = list[position]
        viewHolder.apply {
            when (data.type) {
                MainItem.TYPE_WEATHER -> {
                    if (viewHolder is WeatherViewHolder && data is Weather) {
                        viewHolder.title.text = "${data.tem}°C, ${data.status}"
                        viewHolder.subtitle.text =
                            "${context.getString(R.string.weather_max)} ${data.max}°C, ${
                                context.getString(R.string.weather_min)
                            } ${data.min}°C"
                    }
                }
                else -> {
                    if (viewHolder is CoordinationViewHolder) {

                    }
                }
            }
        }
    }

    override fun getItemCount() = list.size

}

class WeatherViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    val icon: ImageView = view.findViewById(R.id.weather_card_image)
    val title: TextView = view.findViewById(R.id.weather_card_title)
    val subtitle: TextView = view.findViewById(R.id.weather_card_subtitle)
}

class CoordinationViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    // TODO: 메인 코디 카드
}