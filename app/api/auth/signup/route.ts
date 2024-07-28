"use server";

import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '@/lib/db';


export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  console.log("existingUser: ", existingUser)

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await hash(password, 12);

  console.log("hashedPassword: ", hashedPassword)

  try {
    // Create user
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        hasCreatedOrg: false,
      },
    });

    // Optionally, you can create a default organization here
    // or redirect the user to create an organization

    return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
