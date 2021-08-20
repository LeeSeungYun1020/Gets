package com.sys.gets.ui.home

import android.graphics.Bitmap
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.fragment.app.Fragment
import com.sys.gets.R
import com.sys.gets.databinding.FragmentSliderBinding

private const val ARG_POS = "param_pos"
private const val ARG_IMAGE = "param_img"
private const val ARG_BITMAP = "param_bitmap"

class SliderFragment : Fragment() {
    private var _binding: FragmentSliderBinding? = null
    private val binding get() = _binding!!
    private var imageID: Int? = null
    private var position: Int? = null
    private var bitmap: Bitmap? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            bitmap = it.getParcelable(ARG_BITMAP)
            imageID = it.getInt(ARG_IMAGE)
            position = it.getInt(ARG_POS)
        }

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentSliderBinding.inflate(inflater, container, false)
        if (bitmap != null) {
            binding.sliderImage.setImageBitmap(bitmap)
            binding.sliderImage.scaleType = ImageView.ScaleType.CENTER_CROP
        } else {
            binding.sliderImage.setImageResource(imageID ?: R.drawable.sl_welcome)
        }
        return binding.root
    }

    companion object {
        @JvmStatic
        fun newInstance(position: Int, imageID: Int) =
            SliderFragment().apply {
                arguments = Bundle().apply {
                    putInt(ARG_POS, position)
                    putInt(ARG_IMAGE, imageID)
                }
            }

        @JvmStatic
        fun newInstance(position: Int, image: Bitmap) =
            SliderFragment().apply {
                arguments = Bundle().apply {
                    putInt(ARG_POS, position)
                    putParcelable(ARG_BITMAP, image)
                }
            }
    }
}