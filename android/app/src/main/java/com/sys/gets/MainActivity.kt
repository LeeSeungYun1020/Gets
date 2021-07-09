package com.sys.gets

import android.content.ContentValues
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.android.material.snackbar.Snackbar
import com.sys.gets.databinding.ActivityMainBinding
import com.sys.gets.ui.login.LoginActivity
import com.sys.gets.ui.login.MySharedPreferences

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
        showAutomaticLoginState()
    }

    override fun onStart() {
        showLoginPrompt()
        super.onStart()
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main_menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.menu_search -> {
                startActivity(Intent(this, SearchActivity::class.java))
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }

    private fun showLoginPrompt() {
        if (MySharedPreferences.getUserId(this).isNullOrBlank() || MySharedPreferences.getUserPass(this).isNullOrBlank()){
            Snackbar.make(binding.container, R.string.msg_request_login, Snackbar.LENGTH_SHORT)
                .setAnchorView(binding.navView)
                .setAction(R.string.msg_login) {
                    startActivity(Intent(this, LoginActivity::class.java))
                }
            .show()
            Log.e(ContentValues.TAG, "자동로그인 안됨")
        }
    }

    private fun showAutomaticLoginState(){
        if (!MySharedPreferences.getUserId(this).isNullOrBlank() && !MySharedPreferences.getUserPass(this).isNullOrBlank()) {
            Toast.makeText(
                this,
                "${MySharedPreferences.getUserId(this)}님 자동 로그인 되었습니다.",
                Toast.LENGTH_SHORT
            ).show()
            Log.e(ContentValues.TAG, "자동로그인 됨")
        }
    }
}