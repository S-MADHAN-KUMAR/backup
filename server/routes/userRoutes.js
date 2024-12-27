import express from 'express';
import { 
    getProducts,
    getCurrentUser,
    getRelatedProducts,
     handleGoogleAuth,
     loginUser,
     productsDetails,
     registerUser,
     resendOtp,
     verifyOTP ,
    breadCrumb,
    updateProfile,
    addAddress,
    getAddress,
    getCurrentAddress,
    forgotPassword,
    verifyForgotPassword,
    resendOtpForgotPassword,
    updatePassword,
    newArrivals
 }
     from '../controllers/userController.js';

const router = express.Router();


//=================User========================//

// Get

router.get('/getCurrentUser',getCurrentUser)

router.get('/forgotPassword/:email',forgotPassword)

// Post

router.post('/register', registerUser)

router.post('/login',loginUser)

router.post('/verify', verifyOTP)

router.post('/resendOtp', resendOtp)

router.post('/oauth',handleGoogleAuth)

// forgot password

router.post('/verifyForgotPassword', verifyForgotPassword); 

router.post('/resendOtpForgotPassword', resendOtpForgotPassword);

router.post('/updatePassword',updatePassword)

// Put

router.put('/updateProfile', updateProfile);


//===================Products========================//

// Get

router.get('/products',getProducts)

router.get('/productsDetails/:id',productsDetails);

router.get('/getRelatedProducts/:id',getRelatedProducts)

router.get('/newArrivals',newArrivals)

//=========================Address==================================//

// Get

router.get('/getAddress/:id', getAddress)

router.get('/getCurrentAddress/:id', getCurrentAddress)

// Post

router.post('/addAddress',addAddress)

//=================BreadCrumb========================//

router.get('/breadcrumb/:productId',breadCrumb );

//===================================================//

export default router;









