package com.sys.gets

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.sys.gets.databinding.ActivityMainBinding
import com.sys.gets.ui.MainViewModel

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var mainViewModel: MainViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // navigation
        val navView: BottomNavigationView = binding.navView
        val navController = findNavController(R.id.nav_host_fragment_activity_main)
        val appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.navigation_home,
                R.id.navigation_closet,
                R.id.navigation_product,
                R.id.navigation_magazine
            )
        )
        navView.setupWithNavController(navController)
        // show/hide navView
        mainViewModel = ViewModelProvider(this).get(MainViewModel::class.java)
        mainViewModel.navigationVisibility.observe(this) { visibility ->
            navView.visibility = when {
                visibility -> View.VISIBLE
                else -> View.GONE
            }
        }
    }
}