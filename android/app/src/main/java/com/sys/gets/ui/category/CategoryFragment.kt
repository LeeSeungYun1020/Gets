package com.sys.gets.ui.category

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ExpandableListAdapter
import android.widget.ExpandableListView
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.viewpager2.widget.ViewPager2
import com.sys.gets.R
import com.sys.gets.databinding.FragmentCategoryBinding
import java.util.ArrayList
import java.util.HashMap

class CategoryFragment : Fragment() {

  private lateinit var categoryViewModel: CategoryViewModel
private var _binding: FragmentCategoryBinding? = null
  // This property is only valid between onCreateView and
  // onDestroyView.
  private val binding get() = _binding!!

    internal var expandableListView: ExpandableListView? = null
    internal var adapter: ExpandableListAdapter? = null
    internal var titleList: List<String> ? = null

    val data: HashMap<String, List<String>>
        get() {
            val listData = LinkedHashMap<String, List<String>>()

            val outers = ArrayList<String>()
            outers.add(getString(R.string.category_outer_coat))
            outers.add(getString(R.string.category_outer_padded_jacket))
            outers.add(getString(R.string.category_outer_cardigan))
            outers.add(getString(R.string.category_outer_blazer))
            outers.add(getString(R.string.category_outer_jumper))
            outers.add(getString(R.string.category_outer_jacket))
            outers.add(getString(R.string.category_outer_hooded_zipup))
            outers.add(getString(R.string.category_outer_fleece))

            val tops = ArrayList<String>()
            tops.add(getString(R.string.category_top_t_shirt))
            tops.add(getString(R.string.category_top_shirt_blouse))
            tops.add(getString(R.string.category_top_long_sleeve))
            tops.add(getString(R.string.category_top_sweatshirt))
            tops.add(getString(R.string.category_top_hoodie))
            tops.add(getString(R.string.category_top_knit))
            tops.add(getString(R.string.category_top_sleeveless))
            tops.add(getString(R.string.category_top_vest))

            val pants = ArrayList<String>()
            pants.add(getString(R.string.category_pants_jeans))
            pants.add(getString(R.string.category_pants_slacks))
            pants.add(getString(R.string.category_pants_cotton_pants))
            pants.add(getString(R.string.category_pants_training_pants))
            pants.add(getString(R.string.category_pants_jogger_pants))
            pants.add(getString(R.string.category_pants_shorts))
            pants.add(getString(R.string.category_pants_leggings))

            val skirts = ArrayList<String>()
            skirts.add(getString(R.string.category_skirt_mini_skirt))
            skirts.add(getString(R.string.category_skirt_middle_skirt))
            skirts.add(getString(R.string.category_skirt_long_skirt))

            val sets = ArrayList<String>()
            sets.add(getString(R.string.category_set_one_piece))
            sets.add(getString(R.string.category_set_two_piece))
            sets.add(getString(R.string.category_set_suit))
            sets.add(getString(R.string.category_set_jump_suit))

            val shoes = ArrayList<String>()
            shoes.add(getString(R.string.category_shoes_sneakers))
            shoes.add(getString(R.string.category_shoes_loafers))
            shoes.add(getString(R.string.category_shoes_boots))
            shoes.add(getString(R.string.category_shoes_derby))
            shoes.add(getString(R.string.category_shoes_heels_pumps))
            shoes.add(getString(R.string.category_shoes_sandals))
            shoes.add(getString(R.string.category_shoes_slipper))

            val bags = ArrayList<String>()
            bags.add(getString(R.string.category_bag_backpack))
            bags.add(getString(R.string.category_bag_messenger_cross))
            bags.add(getString(R.string.category_bag_tote))
            bags.add(getString(R.string.category_bag_eco))
            bags.add(getString(R.string.category_bag_leather))

            val hats = ArrayList<String>()
            hats.add(getString(R.string.category_hat_cap))
            hats.add(getString(R.string.category_hat_beanie))
            hats.add(getString(R.string.category_hat_bucket_hat))
            hats.add(getString(R.string.category_hat_beret))


            listData[getString(R.string.category_outer)] = outers
            listData[getString(R.string.category_top)] = tops
            listData[getString(R.string.category_pants)] = pants
            listData[getString(R.string.category_skirt)] = skirts
            listData[getString(R.string.category_set)] = sets
            listData[getString(R.string.category_shoes)] = shoes
            listData[getString(R.string.category_bag)] = bags
            listData[getString(R.string.category_hat)] = hats

            return listData
        }



    override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?
  ): View? {
    categoryViewModel =
            ViewModelProvider(this).get(CategoryViewModel::class.java)

    _binding = FragmentCategoryBinding.inflate(inflater, container, false)
    val root: View = binding.root

//      Log.d("jyyyy", "onCreate: ")

      expandableListView = binding.expandableListView
//      Log.d("jyyyy", "$expandableListView")
      if (expandableListView != null) {
          val listData = data
          titleList = ArrayList(listData.keys)
          adapter = CategoryExpandableListAdapter(this.requireContext(), titleList as ArrayList<String>, listData)
          expandableListView!!.setAdapter(adapter)

          expandableListView!!.setOnGroupExpandListener { groupPosition -> Toast.makeText(this.requireContext(), (titleList as ArrayList<String>)[groupPosition] + " List Expanded.", Toast.LENGTH_SHORT).show() }

          expandableListView!!.setOnGroupCollapseListener { groupPosition -> Toast.makeText(this.requireContext(), (titleList as ArrayList<String>)[groupPosition] + " List Collapsed.", Toast.LENGTH_SHORT).show() }

          expandableListView!!.setOnChildClickListener { parent, v, groupPosition, childPosition, id ->
              Toast.makeText(this.requireContext(), "Clicked: " + (titleList as ArrayList<String>)[groupPosition] + " -> " + listData[(titleList as ArrayList<String>)[groupPosition]]!!.get(childPosition), Toast.LENGTH_SHORT).show()
              false
          }
      }


//    val textView: TextView = binding.textDashboard
//    categoryViewModel.text.observe(viewLifecycleOwner, Observer {
//      textView.text = it
//    })
    return root
  }

override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
