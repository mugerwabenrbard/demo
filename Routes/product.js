const products = require('../Models/products')
const router = require('express').Router()
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req,file, callBack)=>{
        callBack(null,"../client/public/uploads")
    },
    filename: (req,file, callBack) =>{
        callBack(null, file.originalname)
    }
})

const upload = multer({storage:storage})

// Get all
router.get('/products',async(req,res)=>{
    try {
        const data = await products.find().sort({createdAt: -1})
        res.json({status:'SUCCESSFUL', data:data})

    } catch (error) {
        res.json({status:'FAILED', message:'No Products Found'})
    }
})

// Add product
router.post('/add', upload.single('image'), async(req,res)=>{

    try {
        const newProduct = new products({
            label:req.body.label,
            brand:req.body.brand,
            name:req.body.name,
            price:req.body.price,
            ingredients:req.body.ingredients,
            description:req.body.description,
            featured:req.body.featured,
            image: req.file.originalname
        })
        const savedPdt = await newProduct.save()
        res.json({status:'SUCCESSFUL', message:'Product Saved Successfully'})

    } catch (error) {
        console.log(error)
        res.json({status:'FAILED', message:'Product Failed To Save'})
    }
})

// Get Single
router.get('/find/:id', async(req,res)=>{

    try {
        const id = req.params.id
        const singleProduct = await products.findById(id)

        res.json({status:'SUCCESSFUL', data:singleProduct})

    } catch (error) {
        res.json({status:'FAILED', message:'No Product Found'})
    }
})

// Update
router.put('/update/:id', upload.single('image'), async(req,res)=>{

    try {
        const id = req.params.id
        if (req.file !== undefined) {

            // update with no image included
            const singleProduct = await products.findByIdAndUpdate(id, {
                label:req.body.label,
                brand:req.body.brand,
                name:req.body.name,
                price:req.body.price,
                ingredients:req.body.ingredients,
                description:req.body.description,
                featured:req.body.featured,
                image: req.file.originalname
            })
            
            if (req.file !== undefined && req.file.originalname !== singleProduct.image) {
                fs.unlink(`../client/public/uploads/${singleProduct.image}`, (err)=>{console.log(err)})
                
            }

            singleProduct ? res.send({status:'SUCCESSFUL', message:'Product updated succesfully', data: singleProduct}):
            res.send({status:'Failed', message:'Product ID Does Not Exist'})

        }else{
            // update with no image included
            const singleProduct = await products.findByIdAndUpdate(id, {
                label:req.body.label,
                brand:req.body.brand,
                name:req.body.name,
                price:req.body.price,
                ingredients:req.body.ingredients,
                description:req.body.description,
                featured:req.body.featured,
            })
            console.log(singleProduct)
            singleProduct ? res.send({status:'SUCCESSFUL', message:'Product updated succesfully', data: singleProduct}):
            res.json({status:'Failed', message:'Product ID Does Not Exist'})
        }
        
    } catch (error) {
        res.json({status:'FAILED', message:'Product Update Failed'})
    }
})

router.delete('/delete/:id', async(req,res)=>{

    try {
        const id = req.params.id
        
        if (id) {
            const data = await products.findByIdAndRemove(id).exec()
            fs.unlink(`../client/public/uploads/${data.image}`, (err)=>{console.log(err)})
            
        }

        singleProduct ? res.json({status:'SUCCESSFUL', message:'Product Deleted succesfully'}) :
        res.json({status:'Failed', message:'Product ID Does Not Exist'})

    } catch (error) {
        res.json({status:'FAILED', message:'Product Deleting Failed'})
    }
})
module.exports = router