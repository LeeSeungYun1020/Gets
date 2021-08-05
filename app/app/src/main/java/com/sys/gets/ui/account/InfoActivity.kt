package com.sys.gets.ui.account

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.sys.gets.databinding.ActivityInfoBinding

class InfoActivity : AppCompatActivity() {
    private lateinit var binding: ActivityInfoBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityInfoBinding.inflate(layoutInflater)
        setContentView(binding.root)


        binding.styleList.apply {
            listOf(
                minimalChip, casualChip, campusChip, streetChip, rockChicChip, amekajiChip,
                cityBoyChip, officeChip, sexyGlamChip, feminineChip, lovelyChip
            ).forEach {
                it.setOnClickListener { _ ->
                    it.isChecked = !it.isChecked
//                        if (it.isChecked) { // 선택된 경우
//                            it.alpha = 0.7f
//                        } else {
//                            it.alpha = 1f
//                        }
                }
            }
        }
    }
}