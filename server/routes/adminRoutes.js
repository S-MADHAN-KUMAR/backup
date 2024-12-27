import express from 'express';
import { login,
     addProduct ,
     getProducts ,
     addCategory,
     getCategories ,
      getUsers,
      blockProduct ,
       getEditProduct, 
       updateProduct,
       deleteProduct,
       blockUser,
       updateCategory, 
       getEditCategory ,
       blockCategory,
       getbrands,
       addbrand,
       getEditBrand,
       updateBrand
} from '../controllers/adminControllers.js';

import upload from '../middleware/multer.js'

const router = express.Router();

//=================Auth=========================//

router.post('/login', login);

//=================Products=========================//

// Get
router.get('/geteditproducts', getEditProduct);

router.get('/products',getProducts)

// Post

router.post('/addproduct',upload.array('images', 5),addProduct);

// Put

router.put('/blockProduct',blockProduct)

router.put('/updateProduct/:id',upload.array('images', 5),updateProduct)

// Delete

router.delete('/deleteProduct/:id', deleteProduct);


//=================Category=========================//

// Get

router.get('/categories', getCategories);

router.get('/geteditcategory/:id', getEditCategory);

// Post

router.post('/addcategory', upload.single('image'), addCategory);

// Put

router.put('/updateCategory/:id', upload.single('image'), updateCategory);

router.put('/blockCategory',blockCategory)

//=================Users=========================//

// Get

router.get('/getUsers',getUsers)

// Put

router.put('/blockUser',blockUser)

//====================Brands===========================//

// Get

router.get('/getbrands',getbrands)

router.get('/getEditBrand', getEditBrand)

// Post

router.post('/addbrand',upload.single('image'),addbrand)

// Put

router.put('/updateBrand', upload.single('image'),updateBrand)

//==============================================================//
export default router;
