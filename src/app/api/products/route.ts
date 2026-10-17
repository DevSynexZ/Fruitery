import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

// GET: Fetch all products from MongoDB
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).lean();

    // Convert MongoDB ObjectIds to strings so Next.js can serialize them safely
    const formattedProducts = products.map((product) => ({
      ...product,
      _id: product._id.toString(),
    }));

    return NextResponse.json({ success: true, data: formattedProducts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST: Add a new product to MongoDB
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newProduct = await Product.create(body);
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}