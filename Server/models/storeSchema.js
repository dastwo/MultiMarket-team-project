const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  barcode: {
    type: String,
    required: true,
    formStep: 1,
  },
  image: {
    type: String,
    noSearch: true,
    width: 320,
    format: 'png',
    fit: 'contain',
    formStep: 1,
  },
  name: {
    type: String,
    required: true,
    formStep: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    step: 'any',
    formStep: 1,
  },
  priority: {
    type: Number,
    formStep: 2,
    enum: [1, 2, 3, 4, 5],
  },
  sectionId: {
    type: String,
    autocomplete: { collection: 'section' },
    formStep: 2,
  },
  sectionName: { type: String },
  departmentId: {
    type: String,
    autocomplete: { collection: 'department' },
    formStep: 2,
  },
  departmentName: { type: String },
  kosherType: {
    type: String,
    enum: [`בד"ץ`, 'רבנות', 'מהדרין'],
    formStep: 2,
    hide: true,
  },
  productTag: {
    type: String,
    enum: ['surfaces', 'short-exp'],
    formStep: 2,
    hide: false,
  },
  storeId: {
    type: String,
    select: false,
    autocomplete: { collection: 'store' },
    formStep: 2,
    required: true,
  },
  subCategory: { type: String },
  fields: { type: Object },
  active: {
    type: Boolean,
    default: true,
  },
  weight: {
    type: Object,
    formStep: 3,
    inWeight: { type: Boolean },
    avgWeightPerUnit: {
      type: Number,
      hide: true,
      required: true,
      min: 0,
      step: 'any',
    },
    weightUnit: {
      type: String,
      required: true,
      enum: ['kgs', 'grams', 'liters', 'mls'],
      default: 'kgs',
      hide: true,
    },
  },
  units: {
    type: Object,
    formStep: 3,
    unitsInCarton: { type: Number, min: '0', default: 1 },
    amount: { type: Number, default: 1, min: '0' },
    minimumOrderCartonsCount: {
      type: Number,
      default: 1,
      min: '0',
    },
    measureUnits: {
      type: String,
      enum: ['units', 'kgs', 'grams', 'liters', 'mls'],
      default: 'units',
      hide: true,
    },
  },
  deliveryOrderPlace: {
    type: Object,
    formStep: 4,
    city: { type: String },
    street: { type: String },
    number: { type: Number },
    floor: { type: Number },
  },
  contactInfo: {
    type: Object,
    formStep: 4,
    contactNumber: { type: String },
    contactName: { type: String },
  },
  expirationDate: {
    type: Date,
    required: true,
    default: Date.now,
    formStep: 1,
  },
  manufacturer: {
    type: String,
    formStep: 1,
  },
  deliveryTime: {
    type: Date,
    required: true,
    default: Date.now,
    formStep: 4,
  },
  parallelImporter: {
    type: Boolean,
    default: false,
    formStep: 2,
  },
  brand: { type: String, formStep: 1 },
  salesQuantity: { type: Number, required: true, default: 0 },
  productStock: { type: Number, required: true, default: '' },
  keywords: { type: [String], tagsInput: true, formStep: 1 },
  lastUpdate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  description: {
    type: String,
    required: true,
    noSearch: true,
  },
  createdBy: { type: String, required: true, noSearch: true },
});

const StoreSchema = new mongoose.Schema({
  bnNumber: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  urlName: {
    type: String,
  },
  description: {
    type: String,
    noSearch: true,
  },
  logo: {
    type: String,
    noSearch: true,
  },
  lightlogo: {
    type: String,
    noSearch: true,
  },
  darklogo: {
    type: String,
    noSearch: true,
  },
  coverImage: {
    type: String,
    required: true,
    noSearch: true,
    width: 1000,
    ratio: 2.5,
    format: 'jpg',
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
  departmentIds: {
    type: [String],
  },
  products: [ProductSchema],
  address: {
    type: Object,
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    building: {
      type: Number,
      required: true,
    },
    apartment: { type: Number },
    coordinates: { lat: Number, lng: Number },
  },
  active: {
    type: Boolean,
    default: true,
  },
  lastUpdate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true, noSearch: true },
});

module.exports = new mongoose.model('store', StoreSchema);
