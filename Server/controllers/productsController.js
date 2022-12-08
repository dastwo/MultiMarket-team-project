const productsModel = require('../models/productSchema');

// GET ALL PRODUCTS
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productsModel.find({});
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// GET PRODUCT
exports.getProductById = async (req, res, next) => {
  try {
    const product = await productsModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// CREATE A NEW PRODUCT
exports.createNewProduct = async (req, res, next) => {
  const newProduct = new productsModel(req.body);
  try {
    const saveProduct = await newProduct.save();
    res.status(200).json(saveProduct);
  } catch (err) {
    next(err);
  }
};

// UPDATE A PRODUCT
exports.updateProduct = async (req, res, next) => {
  try {
    const updateProduct = await productsModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (err) {
    next(err);
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res, next) => {
  try {
    await productsModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Product Deleted');
  } catch (error) {
    next(error);
  }
};

// module.exports = { getAllProducts };
