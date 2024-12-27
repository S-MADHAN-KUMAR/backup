import productModel from '../models/productsModel.js'
import categoriesModel from '../models/categoryModel.js';
import userModel from '../models/userModel.js'
import { imageUploadUtil } from '../utils/imageUploadUtil.js';
import BrandModel from '../models/brandsModel.js';



//===================================================Admin-Authentication=========================================///

// Login 

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required!',
    });
  }

  if (email === process.env.ADMIM_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      admin: { email },
    });
  }

  return res.status(400).json({
    success: false,
    message: 'Incorrect credentials!',
  });
};

//=============================================Admin-Products==============================================///

// Add Products

const addProduct = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded files:', req.files);
    const { name, price, description, stock, status, category, brand } = req.body; // Destructure product data
    const files = req.files; // Array of uploaded files

    if (!files || files.length < 3) {
      return res.status(400).send({
        message: 'Please upload at least 3 images (minimum required).',
      });
    }

    // Upload each image to Cloudinary
    const uploadPromises = files.map((file) => imageUploadUtil(file.buffer));
    const imageUrls = await Promise.all(uploadPromises);

    // Create a new product with image URLs
    const productData = { name, price, description, stock, status, imageUrls, category, brand };
    const product = new productModel(productData);
    await product.save();

    console.log('Product added successfully:', product);
    res.status(201).send({
      message: 'Product added successfully',
      product,
    });
  } catch (error) {
    console.error('Error processing /addproduct:', error.message);
    res.status(500).send({
      message: 'An error occurred while adding the product.',
      error: error.message,
    });
  }
};

// Block Products

const blockProduct = async (req, res) => {
  try {
    console.log('Request body:', req.body);

    const { id, status } = req.body; // Destructure product data

    // Check if the id is provided
    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Find the product by its ID and update the status
    const product = await productModel.findByIdAndUpdate(id, { status }, { new: true }); // Get the updated product

    if (product) {
      console.log(`Product with id ${id} has been ${status === "listed" ? 'activated' : 'blocked'}.`);

      // Respond with a success message
      return res.status(200).json({ message: `Product with id ${id} has been ${status === "listed" ? 'activated' : 'blocked'}.` });
    } else {
      console.log(`Product with id ${id} not found.`);

      // Respond if product is not found
      return res.status(404).json({ message: `Product with id ${id} not found.` });
    }
  } catch (error) {
    console.error('Error updating product status:', error);

    // Handle any errors that occur during the process
    return res.status(500).json({ message: 'Error updating product status', error: error.message });
  }
};

//  Get Edit Product

const getEditProduct = async (req, res) => {
  try {
    const { id } = req.query;  // Extract the product ID from the URL parameter

    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Fetch the product by its ID from the database (assuming you have a `productsModel`)
    const product = await productModel.findById(id);  // Use your actual model to fetch the product

    if (product) {
      return res.status(200).json({ product });
    } else {
      console.log(`Product with id ${id} not found.`);
      return res.status(404).json({ message: `Product with id ${id} not found.` });
    }
  } catch (error) {
    console.error('Error retrieving product details:', error);
    return res.status(500).json({ message: 'Error retrieving product details', error: error.message });
  }
};


// Get All Products

const getProducts = async (req, res) => {

  try {
    const products = await productModel.find(); // Fetch all products from the database
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send({
      message: 'Error fetching products',
      error: error.message,
    });
  }


}

// Update Products

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get the product ID from the query
    const { name, price, description, stock, status, category, brand } = req.body;
    const files = req.files; // Array of uploaded files

    if (!id) {
      return res.status(400).send({ message: "Product ID is required" });
    }

    console.log('Received Images: ', files);

    // Validate that there are files to upload
    if (!files || files.length === 0) {
      return res.status(400).send({ message: "At least one image is required" });
    }

    // Upload each image to Cloudinary
    const uploadPromises = files.map((file) => imageUploadUtil(file.buffer));
    const imageUrls = await Promise.all(uploadPromises);

    console.log("Uploaded Image URLs: ", imageUrls);

    const productData = {
      name,
      price,
      description,
      stock,
      status,
      category,
      brand,
      imageUrls,
    };

    const updatedProduct = await productModel.findByIdAndUpdate(id, productData, {
      new: true, // Return the updated product
    });

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ message: "Server error.", error: error.message });
  }
};

// Delete Products

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;  // Get product ID from the URL parameters

    // Ensure id exists before trying to delete
    if (!id) {
      return res.status(400).send({
        message: "Product ID is required.",
      });
    }

    // Use the correct query object to delete the product
    const product = await productModel.findOneAndDelete({ _id: id });

    if (product) {
      res.status(200).send({
        message: "Product deleted successfully",
      });
    } else {
      res.status(404).send({
        message: "Product not found or already deleted",
      });
    }
  } catch (error) {
    console.error(error);  // Log the error
    res.status(500).send({
      message: "Server error occurred while deleting the product",
    });
  }
};


//==================================================Admin-Categories=====================================================///


// Add Categories

const addCategory = async (req, res) => {
  try {
    console.log('Uploaded file:', req.file); // Log the file data to inspect it
    const { name, status } = req.body;
    const image = req.file;

    // Check if all required fields are provided
    if (!name || !status || !image) {
      return res.status(400).json({ message: 'Please provide all the fields including image.' });
    }

    const uploadImage = await imageUploadUtil(image.buffer); 

    const newCategory = new categoriesModel({
      name,
      status,
      imageUrl: uploadImage,  
    });

    await newCategory.save(); // Save to the database

    return res.status(201).json({
      message: 'Category added successfully!',
      category: newCategory
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while adding the category.', error: error.message });
  }
};

// Get Edit Category

const getEditCategory = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: 'Category ID is required' });
    }

    // Fetch the product by its ID from the database
    const Category = await categoriesModel.findById(id);

    if (Category) {
      return res.status(200).json({ category: Category });
    } else {
      console.log(`Category with id ${id} not found.`);
      return res.status(404).json({ message: `Category with id ${id} not found.` });
    }
  } catch (error) {
    console.error('Error retrieving Category details:', error);
    return res.status(500).json({ message: 'Error retrieving Category details', error: error.message });
  }
}


// Update Edit Category

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const image = req.file;

    let uploadImage;
    if (image) {
      // Assuming imageUploadUtil handles the buffer
      uploadImage = await imageUploadUtil(image.buffer);
    } else {
      // Fetch existing imageUrl if no new image is uploaded
      const existingCategory = await categoriesModel.findById(id);
      if (!existingCategory) {
        return res.status(404).json({ message: 'Category not found.' });
      }
      uploadImage = existingCategory.imageUrl;
    }

    const newUpdateCategory = {
      name,
      status,
      imageUrl: uploadImage,
    };

    const updatedCategory = await categoriesModel.findByIdAndUpdate(id, newUpdateCategory, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    res.status(200).json({
      message: 'Category updated successfully!',
      category: updatedCategory,
    });
  } catch (error) {
    console.error('Error while updating category:', error.message);
    return res.status(500).json({
      message: 'An error occurred while updating the category.',
      error: error.message
    });
  }
};


// Get All Categories

const getCategories = async (req, res) => {
  try {
    const categories = await categoriesModel.find(); // Fetch categories
    res.status(200).json(categories); // Return categories as JSON
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    res.status(500).send({
      message: 'Error fetching categories',
      error: error.message,
    });
  }
};

//Block Category

const blockCategory = async (req, res) => {
  try {
    const { id, status } = req.body;

    // Ensure category ID is provided
    if (!id) {
      return res.status(400).json({ message: 'Category ID is required' });
    }

    // Determine product status based on category status
    let productStatus = 'blocked';
    if (status === 'listed') {
      productStatus = 'listed';  // Change product status to 'listed' if category is 'listed'
    }

    // Update the category status
    const category = await categoriesModel.findByIdAndUpdate(id, { status }, { new: true });

    if (!category) {
      return res.status(404).json({ message: `Category with id ${id} not found.` });
    }

    // Update products related to this category
    const products = await productModel.find({ category: id });

    // Check and update the status of each product
    for (let product of products) {
      product.status = productStatus;  // Update product status to 'blocked' or 'listed'
      await product.save(); // Save each updated product
    }

    console.log(`Category with id ${id} has been ${status === 'listed' ? 'activated' : 'blocked'}.`);

    return res.status(200).json({
      message: `Category with id ${id} has been ${status === 'listed' ? 'activated' : 'blocked'}.`,
    });

  } catch (error) {
    console.error('Error updating category status:', error);

    return res.status(500).json({ message: 'Error updating category status', error: error.message });
  }
}



//============================================Admin-Users================================================================//

// Get All Users

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find()
    if (!users) {
      res.status(200).json({ message: "No users are found!" });
    }
    else {
      res.status(200).json(users)
    }
  } catch (error) {

  }
}

// Block User

const blockUser = async (req, res) => {
  try {
    console.log('Request body:', req.body);

    const { id, status } = req.body;


    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    
    const user = await userModel.findByIdAndUpdate(id, { status }, { new: true }); // Get the updated product

    if (user) {
      console.log(`User with id ${id} has been ${status === "active" ? 'active' : 'block'}.`);

      
      return res.status(200).json({ message: `User with id ${id} has been ${status === "active" ? 'Active' : 'Blocked'}.` });
    } else {
      console.log(`Product with id ${id} not found.`);

      return res.status(404).json({ message: `User with id ${id} not found.` });
    }
  } catch (error) {
    console.error('Error updating user status:', error);


    return res.status(500).json({ message: 'Error updating user status', error: error.message });
  }
}

// Get current User

const getCurrentUser = async (req, res) => {
  try {
    const { id } = req.query;
    console.log('Fetching user with ID:', id);

    if (!id) console.log('errorr no id')

    const currUser = await userModel.findById(id);

    if (!currUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      message: 'User retrieved successfully.',
      currentUser: currUser,
    });
  } catch (error) {
    console.error('Error in getCurrentUser:', error.message);
    res.status(500).json({
      message: 'An error occurred while retrieving user details.',
      error: error.message,
    });
  }
};

//============================================Admin-Users================================================================//

// Get all brands

const getbrands = async(req,res)=>{
  try {
    const brands = await BrandModel.find()

    if(!brands){
      res.status(400).json({message:"No products found!"})
    }

    res.status(200).json({brands})

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
}

// Add Brands

const addbrand = async(req,res)=>{
  try {
    const {name} = req.body
    const image = req.file;

    const uploadImage = await imageUploadUtil(image.buffer);

    const newBrand = new BrandModel({
      name,
      imageUrl: uploadImage,  
    });

    await newBrand.save(); 

    return res.status(201).json({
      message: 'Brand added successfully!',
      brand: newBrand
    });


  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
}

// Edit Brand

const getEditBrand = async (req, res) => {
  try {
    const { id } = req.params;

    if(!id){
      res.status(400).json({
        message: 'Brand Id is required!',
      });
      
    }

    const foundBrand = await BrandModel.findById(id);

    if (!foundBrand) {
      return res.status(400).json({
        message: 'Brand not found',
      });
    }

    res.status(200).json({
      message: 'Brand retrieved successfully',
      brand: foundBrand,
    });
  } catch (error) {
    console.error('Error fetching brand:', error.message);

    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};


// Update Brand

const updateBrand = async (req, res) => {
  try {
    const { name, id } = req.body;
    const image = req.file;

    // Validate input
    if (!id || !name) {
      return res.status(400).json({
        message: 'Brand ID and Name are required!',
      });
    }

    // Check if the brand exists
    const foundBrand = await BrandModel.findById(id);
    if (!foundBrand) {
      return res.status(404).json({
        message: 'Brand not found',
      });
    }

    // Optional: Upload the image if provided
    let uploadedImageUrl = foundBrand.image; // Retain the existing image by default
    if (image) {
      const uploadImage = await imageUploadUtil(image.buffer);
      uploadedImageUrl = uploadImage.url; // Assuming imageUploadUtil returns an object with a `url` property
    }

    // Update the brand details
    foundBrand.name = name;
    foundBrand.image = uploadedImageUrl;

    await foundBrand.save();

    // Respond with success
    return res.status(200).json({
      message: 'Brand updated successfully!',
      brand: foundBrand,
    });
  } catch (error) {
    console.error('Error updating brand:', error.message);

    // Handle server error
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};


//=====================================================================================================================//

export {
  login,
  addProduct,
  getProducts,
  addCategory,
  getCategories,
  blockProduct,
  getEditProduct,
  updateProduct,
  deleteProduct,
  getUsers,
  blockUser,
  updateCategory,
  getEditCategory,
  getCurrentUser,
  blockCategory,
  getbrands,
  addbrand,
  getEditBrand,
  updateBrand
}

