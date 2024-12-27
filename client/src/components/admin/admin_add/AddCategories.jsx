import React, { useState } from 'react';
import axios from 'axios';
import { showToast } from '../../../helper/toast';
import { useNavigate } from 'react-router-dom';

const AddCategories = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: '',
    status: 'listed', 
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const validateForm = () => {
    const errors = {};
    if (!category.name) errors.name = 'Category name is required.';
    else if (!/^[a-zA-Z\s]+$/.test(category.name)) errors.name = 'Category name must contain only letters.';
    else if (category.name.length < 3) errors.name = 'Category name must have at least 3 characters.';
    if (!image) errors.image = 'Please upload an image.';
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
    try {
      const formData = new FormData();
      formData.append('name', category.name);
      formData.append('status', category.status);
      formData.append('image', image);

      const response = await axios.post('http://localhost:3000/admin/addcategory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      showToast('Category added successfully!');
      navigate('/admin/dashboard/categories');
      setCategory({ name: '', status: 'listed' });
      setImage(null);
      setImagePreview(null);

    } catch (err) {
      alert(`Failed to add category: ${err.response?.data?.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
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

        {/* Image Upload */}
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

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-md border"
              />
            </div>
          )}
        </div>

        {/* Status Selection */}
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

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Adding...' : 'Add Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategories;
