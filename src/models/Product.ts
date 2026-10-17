import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  unit: string;
  rating: number;
  image: string;
  tag: string;
  createdAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, default: 'kg' },
    rating: { type: Number, default: 5.0 },
    image: { type: String, required: true },
    tag: { type: String, default: 'Organic' },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;