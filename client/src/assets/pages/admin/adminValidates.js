// adminValidates.js
const adminValidate = (formData) => {
    const errors = {};
  
    if (!formData.email.trim()) {
      errors.email = 'Email is required!';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = 'Invalid email format!';
    }
  
    if (!formData.password.trim()) {
      errors.password = 'Password is required!';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters!';
    }
  
    return errors;
  };
  
  export default adminValidate;
  