package com.sys.gets.ui.settings

import android.os.Bundle
import androidx.preference.Preference
import androidx.preference.PreferenceFragmentCompat
import com.sys.gets.R

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
    }


}