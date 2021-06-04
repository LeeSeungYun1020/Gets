package com.sys.gets.ui.home

import android.annotation.SuppressLint
import android.content.Context
import android.os.Bundle
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
            layoutManager = LinearLayoutManager(requireContext())
            adapter = MainListAdapter(this@HomeFragment.requireContext(), cardList)
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
        Network.getInstance(this.requireActivity()).addToRequestQueue(jsonObjectRequest)

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
                    if (viewHolder is CoordinationViewHolder) {
                        // TODO: 메인 코디 카드 표시할 내용 작업
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
}