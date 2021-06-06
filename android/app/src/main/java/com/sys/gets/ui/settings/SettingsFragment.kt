package com.sys.gets.ui.settings

import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.preference.Preference
import androidx.preference.PreferenceFragmentCompat
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.sys.gets.MainActivity
import com.sys.gets.R
import com.sys.gets.SearchActivity
import com.sys.gets.ui.login.LoginActivity
import com.sys.gets.ui.login.MySharedPreferences


class SettingsFragment : PreferenceFragmentCompat() {
    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        setPreferencesFromResource(R.xml.settings_preferences, rootKey)
        findPreference<Preference>("account")?.setOnPreferenceClickListener {
            parentFragmentManager.beginTransaction()
                .replace(id, AccountSettingsFragment())
                .addToBackStack(null)
                .commit()
            true
        }

        findPreference<Preference>("notice")?.setOnPreferenceClickListener {
            MaterialAlertDialogBuilder(requireContext())
                .setTitle("NOTICE")
                .setMessage("To celebrate the founding of Gets, we will hold a 40% sale on all items for a month in June. Thank you:)")
                .setPositiveButton("Ok", null)
                .show()
            true
        }
        if(MySharedPreferences.getUserId(requireContext()).isNullOrBlank() || MySharedPreferences.getUserPass(requireContext()).isNullOrBlank()) {
            val signaturePreference1: Preference? = findPreference("account")
            val signaturePreference2: Preference? = findPreference("login")
            signaturePreference1?.isVisible = false
            signaturePreference2?.isVisible = true
        }
        else {
            val signaturePreference1: Preference? = findPreference("account")
            val signaturePreference2: Preference? = findPreference("login")
            signaturePreference1?.isVisible = true
            signaturePreference2?.isVisible = false
        }
    }


}