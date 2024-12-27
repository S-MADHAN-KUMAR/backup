import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IoIosCloseCircle } from 'react-icons/io';
import { MdCropFree } from 'react-icons/md';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // Cropper CSS
import { showToast } from '../../../helper/toast';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cropperRef = useRef(null);

  const brands = [
    'Nike',
    'Adidas',
    'Puma',
    'Under Armour',
    'Levi\'s',
    'Zara',
    'Optimum Nutrition',
  ];

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    brand: '',
    images: [],
    croppedImages: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingbtn, setLoadingbtn] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/categories');
      console.log('API Response:', response.data); 

      const listedCategories = response.data.filter(element => element.status === 'listed');
      
      if (listedCategories.length > 0) {
        setCategories(listedCategories);
      } else {
        console.error('No listed categories found');
        setCategories([]); 
      }
      

    } catch (err) {
      console.error(err);
      showToast('Failed to load categories.');
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/admin/geteditproducts?id=${id}`);

      const productData = response.data.product;
      setProduct(productData);
      setFormData({
        ...formData,
        name: productData?.name || '',
        description: productData?.description || '',
        price: productData?.price || '',
        stock: productData?.stock || '',
        status: productData?.status || '',
        category: productData?.category || '',
        brand: productData?.brand || '',
        images: productData?.imageUrls || [],
        croppedImages: productData?.imageUrls || [],
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to load product data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const fieldErrors = {};
    if (!formData.name) fieldErrors.name = "Name cannot be empty.";
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) fieldErrors.name = "Name must contain only letters.";
    if (formData.name.length < 3) fieldErrors.name = "Name must be at least 3 characters.";

    if (!formData.price) fieldErrors.price = "Price cannot be empty.";
    if (!/^\d+$/.test(formData.price)) fieldErrors.price = "Price must contain only numbers.";

    if (!formData.description) fieldErrors.description = "Description cannot be empty.";
    // if (!/^[a-zA-Z\s]+$/.test(formData.description)) fieldErrors.description = "Name must contain only letters.";
    if (formData.description.length < 10) fieldErrors.description = "Description must be at least 10 characters.";

    if (!formData.stock) fieldErrors.stock = "stock cannot be empty.";
    if (!/^\d+$/.test(formData.stock)) fieldErrors.stock = "stock must contain only numbers.";


    if (!formData.category) fieldErrors.category = "Category is required.";
    if (!formData.brand) fieldErrors.brand = "Brand is required.";

    if (formData.images.length < 3) fieldErrors.images = "You must upload at least 3 images.";
    return fieldErrors;
  };


  
  const openCropper = (image, index) => {
    setCurrentImage(image); 
    setImageIndex(index);  
    setShowCropper(true);    
  };
  
  

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    let isValid = true;
  
    const invalidFiles = files.filter((file) => !validImageTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      setErrors((prev) => ({
        ...prev,
        images: "Please upload only valid images (jpeg, png, gif).",
      }));
      e.target.value = '';
      isValid = false;
    } 
  
    if (files.length > 5) {
      setErrors((prev) => ({
        ...prev,
        images: "You can upload up to 5 images only.",
      }));
      e.target.value = '';
      isValid = false;
    }
  
    if (isValid) {
      setFormData((prevData) => ({
        ...prevData,
        images: files,
      }));
      setErrors((prev) => ({
        ...prev,
        images: "", 
      }));
    }
  };
  

 const [isCropped , setIsCropped]= useState(false)

 const handleCrop = (event) => {
  if (event) {
    event.preventDefault();
  }

  if (cropperRef.current) {
    const cropper = cropperRef.current.cropper;
    const canvas = cropper.getCroppedCanvas();
    const croppedImageUrl = canvas.toDataURL(); 

    setFormData((prev) => {
      const updatedImages = [...prev.images];
      const updatedCroppedImages = [...prev.croppedImages];
      updatedCroppedImages[imageIndex] = croppedImageUrl;
      updatedImages[imageIndex] = croppedImageUrl
      return {
        ...prev,
        croppedImages: updatedCroppedImages, 
        images:updatedImages,
      };
    });

    setShowCropper(false);
    setIsCropped(true);
  }
};
  

  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    
    const updatedCroppedImages = [...formData.croppedImages];
    updatedCroppedImages.splice(index, 1); 
    
    setFormData({
      ...formData,
      images: updatedImages,
      croppedImages: updatedCroppedImages,
    });
  };
  
  const convertToBlob = async (file, index) => {
    if (typeof file === "string" && file.startsWith("data:image/")) {

      const [metadata, base64Data] = file.split(",");
      const mimeType = metadata.match(/data:(image\/[a-zA-Z]+);base64/)[1];
      const binaryData = atob(base64Data);
      const arrayBuffer = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        arrayBuffer[i] = binaryData.charCodeAt(i);
      }
      return new Blob([arrayBuffer], { type: mimeType });
    } else if (typeof file === "string" && file.startsWith("http")) {

      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Failed to fetch image from URL: ${file}`);
      }
      return await response.blob();
    } else if (file instanceof File || file instanceof Blob) {

      return file;
    } else {
      throw new Error(`Unsupported file format: ${file}`);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Cropped Images: ", formData.croppedImages);
    console.log("Normal Images: ", formData.images);
  
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
  
    setLoadingbtn(true);
  
    const uploadData = new FormData();
    uploadData.append("name", formData.name);
    uploadData.append("price", formData.price);
    uploadData.append("description", formData.description);
    uploadData.append("stock", formData.stock);
    uploadData.append("status", formData.status);
    uploadData.append("category", formData.category);
    uploadData.append("brand", formData.brand);
  
    try {
      
      const blobImages = await Promise.all(
        formData.images.map((file, index) => convertToBlob(file, index))
      );
  
      blobImages.forEach((blob, index) => {
        uploadData.append("images", blob, `image-${index}`);
      });
  
      console.log("Uploading Product Data: ", uploadData);
  
      const response = await axios.put(
        `http://localhost:3000/admin/updateProduct/${id}`,
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      showToast("Product updated successfully!",'light','success');
      navigate("/admin/dashboard/products");
    } catch (error) {
      console.error("Error updating product:", error);
      setErrors({
        general: error.response?.data?.message || "Failed to update product.",
      });
    } finally {
      setLoadingbtn(false);
    }
  };
   
  
 
  
  
  if (loading) return <div>Loading...</div>;

  return (
    <div className=" bg-gray-10 flex flex-wrap items-center justify-center">
      <div className="w-full  bg-white  p-6">
        <h1 className="text-3xl mb-8 uppercase tracking-wider font-audiowide  drop-shadow-md ">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col justify-center items-center ">
{/* Name ,category And Description */}
         <div className="flex justify-between gap-x-12 w-full">

<div className="flex flex-col w-full justify-around ">
             {/* Name */}
             <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full border rounded-md p-2 focus:outline-none ${errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

                    {/* Category */}
                    <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full border rounded-md p-2 focus:outline-none ${errors.category ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

</div>
          {/* Description */}
          <div className="w-full ">
            <label className="block text-gray-700 font-semibold mb-1">Description</label>
            <textarea
              style={{ height: '150px', resize: 'none' }}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full border rounded-md p-2 focus:outline-none ${errors.description ? "border-red-500 h-full" : "border-gray-300 h-full"}`}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
         </div>

<div className="flex justify-between w-full gap-x-6">
            {/* Price */}
            <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className={`w-full border rounded-md p-2 focus:outline-none ${errors.price ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          {/* Stock */}
          <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className={`w-full border rounded-md p-2 focus:outline-none ${errors.stock ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
          </div>



          {/* Brand */}
          <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-1">Brand</label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className={`w-full border rounded-md p-2 focus:outline-none ${errors.brand ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select Brand</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
          </div>
</div>

          {/* Image Upload */}
          <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-1">Product Images (Max 5)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="border rounded-md p-2 focus:outline-none w-full"
            />
            {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
            <div className="flex flex-wrap gap-4 mt-4">
  {
  formData.images.map((image, index) => (
    <div key={index} className="relative">
      <img
       
        src={formData.croppedImages[index] || URL.createObjectURL(image)}
        alt="preview"
        className="w-24 h-24 object-cover"
      />
      <IoIosCloseCircle
        onClick={() => removeImage(index)}
        className="text-red-600 w-7 h-7 absolute -top-3 -right-3 cursor-pointer"
      />
      <MdCropFree
        onClick={() => openCropper(image, index)}
        className="text-blue-600 w-7 h-7 absolute -bottom-3 -right-3 cursor-pointer"
      />
    </div>
  ))
}

</div>

          </div>

          {showCropper && currentImage && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
    <div className="relative bg-white p-4">
      {/* Log the image type for debugging */}
      {console.log(currentImage)}

      {/* Check if currentImage is a valid File or a URL */}
      {currentImage instanceof File || typeof currentImage === 'string' ? (
        <Cropper
          ref={cropperRef}
          src={currentImage instanceof File ? URL.createObjectURL(currentImage) : currentImage} 
          style={{ width: '400px', height: '400px' }}
          aspectRatio={1}
          guides={false}
        />
      ) : (
        <p>Invalid image file.</p>  
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setShowCropper(false)}
          className="bg-gray-400 text-white px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
        type='button'
          onClick={handleCrop}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Crop
        </button>
      </div>
    </div>
  </div>
)}



          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md"
            >
             {loadingbtn
              ?
              "updating...."
              :" Update Product"
             }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
