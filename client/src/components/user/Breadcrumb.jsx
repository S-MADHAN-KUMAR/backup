import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(true); 

  const pathnames = pathname.split('/').filter((x) => x);

  useEffect(() => {
    const fetchProductName = async () => {
      const productId = pathnames[pathnames.length - 1];
      if (productId) {
        try {
          console.log('Fetching product name for ID:', productId);
          const response = await axios.get(`http://localhost:3000/user/breadcrumb/${productId}`);
          if (response.data) {
            const productData = response.data;
            console.log('API response:', productData)
            setProductName(productData.name)
          }
        } catch (error) {
          console.error('Error fetching product:', error);
          setProductName(''); 
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
  
    fetchProductName();
  }, [pathname, pathnames]);
  

  return (
    <div className="breadcrumb-container font-oswald p-1 sm:p-2 tracking-wider uppercase font-medium text-[10px] sm:text-sm text-blue-700">
      {/* Home link */}
      <Link to="/">Home</Link>

      {/* Loop through the pathnames and create links for each segment */}
      {pathnames.map((name, index) => {
        const to = '/' + pathnames.slice(0, index + 1).join('/');

        if (index === pathnames.length - 1 && productName && !loading) {
          name = productName;
        }

        const isCurrentPage = pathname === to;

        return (
          <span key={index}>
            {'  /  '}
            {isCurrentPage ? (
              <span className="text-gray-400 cursor-not-allowed">{name.length > 20 ? name.slice(0, 20) + '...' : name}</span>
            ) : (
              <Link to={to}>{name}</Link> 
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
