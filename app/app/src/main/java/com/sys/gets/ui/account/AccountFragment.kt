package com.sys.gets.ui.account

import android.content.Intent
import android.os.Bundle
import androidx.preference.Preference
import androidx.preference.PreferenceFragmentCompat
import com.google.android.material.snackbar.Snackbar
import com.sys.gets.R
import com.sys.gets.sign.LoginActivity

class AccountFragment : PreferenceFragmentCompat() {

    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        setPreferencesFromResource(R.xml.root_preferences, rootKey)

        findPreference<Preference>("signout")?.setOnPreferenceClickListener {
            startActivity(Intent(requireContext(), LoginActivity::class.java))
            true
        }

        findPreference<Preference>("feedback")?.setOnPreferenceClickListener {
            val email = Intent(Intent.ACTION_SEND).apply {
                type = "message/rfc822"
                putExtra(Intent.EXTRA_EMAIL, arrayOf("leeseungyun@pusan.ac.kr"))
                putExtra(Intent.EXTRA_SUBJECT, getString(R.string.msg_feedback_title))
                putExtra(
                    Intent.EXTRA_TEXT,
                    "${System.currentTimeMillis()}\n" + getString(R.string.msg_feedback_text)
                )
            }
            try {
                startActivity(email)
            } catch (e: Exception) {
                Snackbar.make(
                    requireView(),
                    R.string.msg_feedback_error,
                    Snackbar.LENGTH_SHORT
                ).show()
            }
            true
        }
    }
}