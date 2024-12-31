import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()
    
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    await connectMongoDB()

    const existingUser = await User.findOne({ email })
    
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      name,
      email,
      password: hashedPassword,
    })

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.log("Registration error:", error)
    return NextResponse.json(
      { message: "Error occurred while registering" },
      { status: 500 }
    )
  }
} 