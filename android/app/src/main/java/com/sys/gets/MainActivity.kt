package com.sys.gets

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.android.material.snackbar.Snackbar
import com.sys.gets.databinding.ActivityMainBinding
import com.sys.gets.ui.login.LoginActivity

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val navView: BottomNavigationView = binding.navView

        val navController = findNavController(R.id.nav_host_fragment_activity_main)
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        val appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.navigation_home,
                R.id.navigation_category,
                R.id.navigation_closet,
                R.id.navigation_coordination,
                R.id.navigation_more
            )
        )
        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)
        navController.addOnDestinationChangedListener { controller, destination, arguments ->
            showLoginPrompt()
        }
    }

    override fun onStart() {
        showLoginPrompt()
        super.onStart()
    }

    private fun showLoginPrompt() {
        Snackbar.make(binding.container, R.string.msg_request_login, Snackbar.LENGTH_SHORT)
            .setAnchorView(binding.navView)
            .setAction(R.string.msg_login) {
                startActivity(Intent(this, LoginActivity::class.java))
            }
            .show()
    }
}