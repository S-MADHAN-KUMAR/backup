import axios from 'axios';
import React, { useState } from 'react';

const Add_Brands = () => {
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    imageUrl: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (file) {
      if (validImageTypes.includes(file.type)) {
        setFormData((prev) => ({ ...prev, imageUrl: file }));
        setImagePreview(URL.createObjectURL(file));
        setErrors((prev) => ({ ...prev, imageUrl: '' }));
      } else {
        setErrors((prev) => ({
          ...prev,
          imageUrl: 'Invalid file type. Please upload a JPEG, PNG, or GIF image.',
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation before submitting
    if (!formData.name) {
      setErrors((prev) => ({ ...prev, name: 'Name is required.' }));
      return;
    }

    if (!formData.imageUrl) {
      setErrors((prev) => ({ ...prev, imageUrl: 'Image is required.' }));
      return;
    }

    try {
      // Prepare FormData for file upload
      const data = new FormData();
      data.append('name', formData.name);
      data.append('image', formData.imageUrl);

      const res = await axios.post('http://localhost:3000/admin/addbrand', data);
      console.log('Response:', res.data);
      alert('Brand added successfully!');
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to add brand.');
    }
  };

  return (
    <div>
      <h1>Add Brands</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
        />
        <p className="text-red-600 text-sm font-medium">
          {errors.name ? errors.name : ''}
        </p>

        <label>Image</label>
        {imagePreview && (
          <>
            <img src={imagePreview} alt="Preview" className="w-60 h-40 object-contain " />
          </>
        )}
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <p className="text-red-600 text-sm font-medium">
          {errors.imageUrl ? errors.imageUrl : ''}
        </p>

        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add_Brands;
