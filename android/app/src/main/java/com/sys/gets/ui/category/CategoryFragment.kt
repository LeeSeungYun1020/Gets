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
            val listData = HashMap<String, List<String>>()

            val tops = ArrayList<String>()
            tops.add("Short T-shirt")
            tops.add("Long T-shirt")
            tops.add("Short sleeve shirt")
            tops.add("Long sleeve shirt")
            tops.add("Sweatshirt")
            tops.add("Hoodie")
            tops.add("Knit")

            val bottoms = ArrayList<String>()
            bottoms.add("Jeans")
            bottoms.add("Slacks")
            bottoms.add("Cotton pants")
            bottoms.add("Shorts")
            bottoms.add("Training pants")
            bottoms.add("Wide pants")
            bottoms.add("Leggings")
//            bottoms.add("Straight pants")
//            bottoms.add("Slim pants")

            val outers = ArrayList<String>()
            outers.add("Coat")
            outers.add("Padded jacket")
            outers.add("cardigan")
            outers.add("Blazer")
            outers.add("Leather jacket")
            outers.add("Denim jacket")
            outers.add("Hooded zip-up")
            outers.add("Fleece")

            val skirts = ArrayList<String>()
            skirts.add("Mini-skirt")
            skirts.add("Middle-skirt")
            skirts.add("Long-skirt")
            skirts.add("Denim-skirt")
//            skirts.add("Pleated-skirt")

            val onePiece = ArrayList<String>()
            onePiece.add("Short one-piece")
            onePiece.add("Middle one-piece")
            onePiece.add("Long one-piece")
            onePiece.add("Denim one-piece")

            val shoes = ArrayList<String>()
            shoes.add("Sneakers")
            shoes.add("Sandals")
            shoes.add("Loafers")
            shoes.add("Derby shoes")
            shoes.add("Boots")
            shoes.add("Heels/Pumps")

            val bags = ArrayList<String>()
            bags.add("Backpack")
            bags.add("Messenger bag")
            bags.add("Eco bag")
            bags.add("Leather bag")

//            val accessories = ArrayList<String>()
//            accessories.add("Hat")
//            accessories.add("Glasses")
//            accessories.add("Tie")
//            accessories.add("Scarf")
//            accessories.add("Belt")
//            accessories.add("Watch")
//            accessories.add("Gloves")
//            accessories.add("jewelry")


            listData["Top"] = tops
            listData["Bottom"] = bottoms
            listData["Outer"] = outers
            listData["Skirt"] = skirts
            listData["One-piece"] = onePiece
            listData["Shoes"] = shoes
            listData["Bag"] = bags
//            listData["Acc"] = accessories

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
