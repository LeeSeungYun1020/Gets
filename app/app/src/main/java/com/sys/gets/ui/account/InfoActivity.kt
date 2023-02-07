package com.sys.gets.ui.account

import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.inputmethod.InputMethodManager
import android.widget.AdapterView
import android.widget.AdapterView.OnItemSelectedListener
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.textfield.TextInputLayout
import com.sys.gets.R
import com.sys.gets.data.BodyShape
import com.sys.gets.data.Gender
import com.sys.gets.data.Size
import com.sys.gets.data.Style
import com.sys.gets.databinding.ActivityInfoBinding
import com.sys.gets.network.Network
import com.sys.gets.ui.setWhiteCenterTitle
import org.json.JSONObject

class InfoActivity : AppCompatActivity() {
    companion object {
        const val INFO = "INFO"
        const val INPUT = "INPUT"
    }

    private lateinit var binding: ActivityInfoBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityInfoBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.setWhiteCenterTitle(R.string.title_info_detail)
        initComponents()
        initData()

        binding.sendButton.setOnClickListener {
            validateData()
        }

    }

    private fun initComponents() {
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
        listOf(binding.topSizeTextfield.editText, binding.bottomSizeTextfield.editText).forEach {
            (it as? AutoCompleteTextView)?.setAdapter(sizeAdapter)
            it?.setOnClickListener {
                (getSystemService(INPUT_METHOD_SERVICE) as? InputMethodManager)?.hideSoftInputFromWindow(
                    binding.root.windowToken,
                    0
                )
            }
        }
        binding.topSizeTextfieldRe.apply {
            adapter = sizeAdapter
            onItemSelectedListener = object: OnItemSelectedListener {
                override fun onItemSelected(parent: AdapterView<*>?, view: View?, pos: Int, id: Long) {
                    Log.d("LSYD", "onItemSelected: $pos($id)")
                }

                override fun onNothingSelected(parent: AdapterView<*>?) {
                    Log.d("LSYD", "onNothingSelected: ")
                }

            }
        }


        val bodyShapeAdapter =
            ArrayAdapter(this, R.layout.list_item, BodyShape.values().map { getString(it.resID) })
        listOf(
            binding.shoulderTextfield.editText, binding.waistTextfield.editText,
            binding.hipTextfield.editText, binding.thighTextfield.editText
        ).forEach {
            (it as? AutoCompleteTextView)?.setAdapter(bodyShapeAdapter)
            it?.setOnClickListener {
                (getSystemService(INPUT_METHOD_SERVICE) as? InputMethodManager)?.hideSoftInputFromWindow(
                    binding.root.windowToken,
                    0
                )
            }
        }
    }

    private fun initData() {
        val dataRequest =
            JsonObjectRequest(Request.Method.GET, Network.SIGN_USER_URL, null, { data ->
                try {
                    val gender = data.getInt("gender")
                    val height = data.getInt("height")
                    val weight = data.getInt("weight")
                    val topSize = data.getInt("topSize")
                    val bottomSize = data.getInt("bottomSize")
                    val shoulder = data.getInt("shoulder")
                    val waist = data.getInt("waist")
                    val hip = data.getInt("hip")
                    val thigh = data.getInt("thigh")
                    val style = data.getInt("style")

                    when (gender) {
                        Gender.MALE.code -> binding.genderButtonGroup.check(binding.genderMaleButton.id)
                        Gender.FEMALE.code -> binding.genderButtonGroup.check(binding.genderFemaleButton.id)
                    }

                    binding.heightTextfield.editText?.setText(height.toString())
                    binding.weightTextfield.editText?.setText(weight.toString())

                    (binding.topSizeTextfield.editText as? AutoCompleteTextView)?.setText(
                        Size.values().filter { it.code == topSize }.map { getString(it.resID) }[0],
                        false
                    )
                    (binding.bottomSizeTextfield.editText as? AutoCompleteTextView)?.setText(
                        Size.values().filter { it.code == bottomSize }
                            .map { getString(it.resID) }[0], false
                    )
                    (binding.shoulderTextfield.editText as? AutoCompleteTextView)?.setText(
                        BodyShape.values().filter { it.code == shoulder }
                            .map { getString(it.resID) }[0], false
                    )
                    (binding.waistTextfield.editText as? AutoCompleteTextView)?.setText(
                        BodyShape.values().filter { it.code == waist }
                            .map { getString(it.resID) }[0], false
                    )
                    (binding.hipTextfield.editText as? AutoCompleteTextView)?.setText(
                        BodyShape.values().filter { it.code == hip }.map { getString(it.resID) }[0],
                        false
                    )
                    (binding.thighTextfield.editText as? AutoCompleteTextView)?.setText(
                        BodyShape.values().filter { it.code == thigh }
                            .map { getString(it.resID) }[0], false
                    )

                    binding.styleList.run {
                        minimalChip.isChecked = style.and(Style.MINIMAL.code) != 0
                        casualChip.isChecked = style.and(Style.CASUAL.code) != 0
                        campusChip.isChecked = style.and(Style.CAMPUS.code) != 0
                        streetChip.isChecked = style.and(Style.STREET.code) != 0
                        rockChicChip.isChecked = style.and(Style.ROCK_CHIC.code) != 0
                        amekajiChip.isChecked = style.and(Style.AMEKAJI.code) != 0
                        cityBoyChip.isChecked = style.and(Style.CITY_BOY.code) != 0
                        officeChip.isChecked = style.and(Style.OFFICE.code) != 0
                        sexyGlamChip.isChecked = style.and(Style.SEXY_GLAM.code) != 0
                        feminineChip.isChecked = style.and(Style.FEMININE.code) != 0
                        lovelyChip.isChecked = style.and(Style.LOVELY.code) != 0
                    }
                } catch (e: Exception) {
                }

            }, {

            })
        Network.getInstance(this).addToRequestQueue(dataRequest)
    }

    private fun TextInputLayout.toBodyShapeCode(): Int {
        return BodyShape.values()
            .filter { getString(it.resID) == this.editText?.text.toString() }
            .map { it.code }.getOrElse(0) {
                this.error = getString(R.string.msg_required_field_error)
                0
            }
    }

    private fun TextInputLayout.toSizeCode(): Int {
        return Size.values()
            .filter { getString(it.resID) == this.editText?.text.toString() }
            .map { it.code }.getOrElse(0) {
                this.error = getString(R.string.msg_required_field_error)
                0
            }
    }

    private fun validateData() {
        (getSystemService(INPUT_METHOD_SERVICE) as? InputMethodManager)?.hideSoftInputFromWindow(
            binding.root.windowToken,
            0
        )

        val gender = when (binding.genderButtonGroup.checkedButtonId) {
            -1 -> 0
            binding.genderMaleButton.id -> 1
            else -> 2
        }

        val height = binding.heightTextfield.editText?.text.toString()
        if (height.isEmpty())
            binding.heightTextfield.error = getString(R.string.msg_required_field_error)

        val weight = binding.weightTextfield.editText?.text.toString()
        if (weight.isEmpty())
            binding.weightTextfield.error = getString(R.string.msg_required_field_error)

        val topSize = binding.topSizeTextfield.toSizeCode()
        val bottomSize = binding.bottomSizeTextfield.toSizeCode()
        val shoulder = binding.shoulderTextfield.toBodyShapeCode()
        val waist = binding.waistTextfield.toBodyShapeCode()
        val hip = binding.hipTextfield.toBodyShapeCode()
        val thigh = binding.thighTextfield.toBodyShapeCode()
        val style = binding.styleList.run {
            var code = 0
            if (minimalChip.isChecked) code += Style.MINIMAL.code
            if (casualChip.isChecked) code += Style.CASUAL.code
            if (campusChip.isChecked) code += Style.CAMPUS.code
            if (streetChip.isChecked) code += Style.STREET.code
            if (rockChicChip.isChecked) code += Style.ROCK_CHIC.code
            if (amekajiChip.isChecked) code += Style.AMEKAJI.code
            if (cityBoyChip.isChecked) code += Style.CITY_BOY.code
            if (officeChip.isChecked) code += Style.OFFICE.code
            if (sexyGlamChip.isChecked) code += Style.SEXY_GLAM.code
            if (feminineChip.isChecked) code += Style.FEMININE.code
            if (lovelyChip.isChecked) code += Style.LOVELY.code
            code
        }

        if (gender != 0 && height.isNotBlank() && weight.isNotBlank() &&
            topSize != 0 && bottomSize != 0 && style != 0 &&
            shoulder != 0 && waist != 0 && hip != 0 && thigh != 0
        ) {
            val jsonObjectRequest = JsonObjectRequest(
                Request.Method.POST, Network.SIGN_UP_INFO_URL,
                JSONObject().apply {
                    // gender, height, weight, topSize, bottomSize, style, shoulder, waist, hip, thigh
                    put("gender", gender)
                    put("height", height)
                    put("weight", weight)
                    put("topSize", topSize)
                    put("bottomSize", bottomSize)
                    put("style", style)
                    put("shoulder", shoulder)
                    put("waist", waist)
                    put("hip", hip)
                    put("thigh", thigh)
                },
                { response ->
                    if (response.getBoolean("result")) {
                        val editor = this.getSharedPreferences(INFO, MODE_PRIVATE).edit()
                        editor.putBoolean(INPUT, true)
                        editor.apply()
                        finish()
                    } else {
                        Snackbar.make(
                            binding.sendButton,
                            R.string.msg_signup_error,
                            Snackbar.LENGTH_SHORT
                        ).show()
                    }
                },
                {
                    Snackbar.make(
                        binding.sendButton,
                        R.string.msg_server_error,
                        Snackbar.LENGTH_SHORT
                    ).show()
                }
            )
            Network.getInstance(this).addToRequestQueue(jsonObjectRequest)
        }
    }
}