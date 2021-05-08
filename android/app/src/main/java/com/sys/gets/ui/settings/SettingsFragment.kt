package com.sys.gets.ui.settings

import android.os.Bundle
import androidx.preference.PreferenceFragmentCompat
import com.sys.gets.R

class SettingsFragment : PreferenceFragmentCompat() {

    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        setPreferencesFromResource(R.xml.settings_preferences, rootKey)
    }
}