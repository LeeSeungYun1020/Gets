package com.sys.gets.ui.settings

import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.preference.Preference
import androidx.preference.PreferenceFragmentCompat
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
        findPreference<Preference>("login")?.setOnPreferenceClickListener {
           // TODO: 로그인 화면으로 이동
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