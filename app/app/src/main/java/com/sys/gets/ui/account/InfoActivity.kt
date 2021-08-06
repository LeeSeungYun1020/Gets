package com.sys.gets.ui.account

import android.os.Bundle
import android.util.Log
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import androidx.appcompat.app.AppCompatActivity
import com.sys.gets.R
import com.sys.gets.data.BodyShape
import com.sys.gets.data.Size
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
                }
            }
        }

        val sizeAdapter =
            ArrayAdapter(this, R.layout.list_item, Size.values().map { getString(it.resID) })
        (binding.topSizeTextfield.editText as? AutoCompleteTextView)?.setAdapter(sizeAdapter)
        (binding.bottomSizeTextfield.editText as? AutoCompleteTextView)?.setAdapter(sizeAdapter)

        val bodyShapeAdapter =
            ArrayAdapter(this, R.layout.list_item, BodyShape.values().map { getString(it.resID) })
        (binding.shoulderTextfield.editText as? AutoCompleteTextView)?.setAdapter(bodyShapeAdapter)
        (binding.waistTextfield.editText as? AutoCompleteTextView)?.setAdapter(bodyShapeAdapter)
        (binding.hipTextfield.editText as? AutoCompleteTextView)?.setAdapter(bodyShapeAdapter)
        (binding.thighTextfield.editText as? AutoCompleteTextView)?.setAdapter(bodyShapeAdapter)

        binding.sendButton.setOnClickListener {
            val i = BodyShape.values()
                .filter { getString(it.resID) == binding.shoulderTextfield.editText?.text.toString() }
                .map { it.code }
            Log.e("CONSOLE", "onCreate: $i") // [] [1] [2] [4]
        }

    }
}