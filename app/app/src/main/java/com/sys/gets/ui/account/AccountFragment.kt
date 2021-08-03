package com.sys.gets.ui.account

import android.content.Intent
import android.os.Bundle
import androidx.preference.Preference
import androidx.preference.PreferenceFragmentCompat
import com.sys.gets.R
import com.sys.gets.sign.LoginActivity

class AccountFragment : PreferenceFragmentCompat() {

    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        setPreferencesFromResource(R.xml.root_preferences, rootKey)

        findPreference<Preference>("signout")?.setOnPreferenceClickListener {
            startActivity(Intent(requireContext(), LoginActivity::class.java))
            true
        }
    }
}