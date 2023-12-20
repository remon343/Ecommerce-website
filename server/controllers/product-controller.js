const Product = require("../models/product-model");

const addProduct = async (req, res) =>{
    try{
        const { name, price, image, description, category, countInStock, rating, numReviews} = req.body;
        const product = await Product.create({
            name,
            price, 
            image,
            description,
            category,
            countInStock,
            rating,
            numReviews
        })
        res.status(200).json(product);
    }catch(err){
        res.status(404).send({msg : err.message});
    }
}

const getProducts = async (req, res) =>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(err){
        res.status(404).send({msg : err.message});
    }
}

const getProductById = async(req,res) =>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){
        res.status(404).send({msg : err.message});
    }
}

const updateProduct = async(req,res) =>{
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            product.name = req.body.name || product.name;
            product.price = req.body.price || product.price;
            product.image = req.body.image || product.image;
            product.description = req.body.description || product.description;
            product.category = req.body.category || product.category;
            product.countInStock = req.body.countInStock || product.countInStock;
            product.rating = req.body.rating || product.rating;
            product.numReviews = req.body.numReviews || product.numReviews;
            product.updatedAt = Date.now();
            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        }
    }catch(err){
        res.status(404).send({msg : err.message});
    }
}

const deleteProduct = async(req,res) =>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(product){
            res.status(200).json({msg : "Product removed"});
        }else{
            res.status(404).send({msg : "Product not found"}); 
        }
    }catch(err){
        res.status(404).send({msg : err.message});
    }
}

module.exports = {addProduct, getProducts, getProductById, updateProduct, deleteProduct};