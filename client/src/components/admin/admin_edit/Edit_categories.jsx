import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { showToast } from '../../../helper/toast';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosCloseCircle } from "react-icons/io";

const EditCategories = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: '',
    status: 'listed',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEditCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/admin/geteditcategory/${id}`);
        const categoryData = res.data.category;
        setCategory({
          id: categoryData?._id || '',
          name: categoryData?.name || '',
          status: categoryData?.status || 'listed',
        });
        setImagePreview(categoryData?.imageUrl || null);
      } catch (error) {
        console.error('Error fetching category:', error);
        showToast('Failed to load category data.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchEditCategories();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (file) {
      if (validImageTypes.includes(file.type)) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        setErrors((prev) => ({ ...prev, image: '' }));
      } else {
        setErrors((prev) => ({ ...prev, image: 'Invalid file type. Please upload a JPEG, PNG, or GIF image.' }));
      }
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setImagePreview(null);
  };

  const validateForm = () => {
    const errors = {};
    if (!category.name) {
      errors.name = 'Category name is required.';
    } else if (!/^[a-zA-Z\s]+$/.test(category.name)) {
      errors.name = 'Category name must contain only letters and spaces.';
    }

    if (!image && !imagePreview) {
      errors.image = 'Please upload an image.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('name', category.name);
    formData.append('status', category.status);
    if (image) formData.append('image', image);

    try {
      const response = await axios.put(`http://localhost:3000/admin/updateCategory/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        showToast('Category updated successfully!', 'success');
        navigate('/admin/dashboard/categories');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred. Please try again.';
      showToast(errorMessage, 'error');
      console.error('Error updating category:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Edit Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={category.name}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 p-2 border rounded-md w-full"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

          {imagePreview && (
            <div className="mt-4 relative w-fit">
          
              <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className=" h-48 object-cover rounded-md border "
              />


<button
                type="button"
                onClick={handleImageRemove}
                className="absolute bottom-[180px] -right-3"
              >
                <IoIosCloseCircle className='w-6 h-6 text-red-600'/>
              </button>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={category.status}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="listed">Listed</option>
            <option value="unlisted">Unlisted</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Updating...' : 'Update Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategories;
