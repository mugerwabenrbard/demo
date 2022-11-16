const products = require('../Models/products')
const router = require('express').Router()
const multer = require('multer')
const fs = require('fs')
const cloudinary = require('../cloudinary')

// const storage = multer.diskStorage({
//     destination: (req,file, callBack)=>{
//         callBack(null,"./client/public/uploads")
//     },
//     filename: (req,file, callBack) =>{
//         callBack(null, file.originalname)
//     }
// })

// const upload = multer({storage:storage})

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
router.post('/add', async(req,res)=>{
        try {
            const imageResult = await cloudinary.uploader.upload(req.body.image,{
                folder: "productsImage",
            })
            const newProduct = new products({
                label:req.body.label,
                brand:req.body.brand,
                name:req.body.name,
                price:req.body.price,
                ingredients:req.body.ingredients,
                description:req.body.description,
                featured:req.body.featured,
                image: {
                    publicID: imageResult.public_id,
                    url: imageResult.secure_url
                }
            })
           
            const savedPdt = await newProduct.save()
            res.json({status:'SUCCESSFUL', message:'Product Saved Successfully', data: savedPdt})
    
        } catch (error) {
            res.json({status:'FAILED TRY', message:'Product Failed To Save', data:error})
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
router.put('/update/:id', async(req,res)=>{

    try {
        const id = req.params.id

        if (typeof req.body.image === 'string') {
            // Delete image from cloudinary
            const image = await products.findById(id)
            const imageID = image.image.publicID
            await cloudinary.uploader.destroy(imageID)

            // add new image to cloudinary
            const imageResult = await cloudinary.uploader.upload(req.body.image,{
                folder: "productsImage",
            })

            // Update product
                const singleProduct = await products.findByIdAndUpdate(id, {
                    label:req.body.label,
                    brand:req.body.brand,
                    name:req.body.name,
                    price:req.body.price,
                    ingredients:req.body.ingredients,
                    description:req.body.description,
                    featured:req.body.featured,
                    image: {
                        publicID:imageResult.public_id,
                        url: imageResult.secure_url
                    }
                })
                singleProduct ? res.send({status:'SUCCESSFUL', message:'Product updated succesfully', data: singleProduct}):
            res.send({status:'Failed', message:'Product ID Does Not Exist'})
        }else{
            const singleProduct = await products.findByIdAndUpdate(id, {
                label:req.body.label,
                brand:req.body.brand,
                name:req.body.name,
                price:req.body.price,
                ingredients:req.body.ingredients,
                description:req.body.description,
                featured:req.body.featured,
                image: req.body.image
            })

            singleProduct ? res.send({status:'SUCCESSFUL', message:'Product updated succesfully', data: singleProduct}):
            res.send({status:'Failed', message:'Product ID Does Not Exist'})
        }
    } catch (error) {
        res.json({status:'FAILED', message:'Product Update Failed'})
    }
})

router.delete('/delete/:id', async(req,res)=>{

    try {
        const id = req.params.id
        
        if (id) {
            const image = await products.findById(id)
            const imageID = image.image.publicID
            await cloudinary.uploader.destroy(imageID) 
                       
            const data = await products.findByIdAndRemove(id)
        }

        singleProduct ? res.json({status:'SUCCESSFUL', message:'Product Deleted succesfully'}) :
        res.json({status:'Failed', message:'Product ID Does Not Exist'})

    } catch (error) {
        res.json({status:'FAILED', message:'Product Deleting Failed'})
    }
})
module.exports = router