package com.sys.gets.ui.account

import android.os.Bundle
import androidx.preference.Preference
import androidx.preference.PreferenceFragmentCompat
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.sys.gets.R

class AccountFragment : PreferenceFragmentCompat() {

    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        setPreferencesFromResource(R.xml.root_preferences, rootKey)

        findPreference<Preference>("signout")?.setOnPreferenceClickListener {
            MaterialAlertDialogBuilder(requireContext()).setMessage("done!!").show()
            true
        }
    }
}