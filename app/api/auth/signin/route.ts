"use server";

import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';

import { sign } from 'jsonwebtoken';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    console.log("email: ", email)

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    

    let redirectPath = '/create-organization';

    const organizations = await db.organization.findMany({
      where: { 
        ownerId: user.id
       },
    });

    let selectedOrganization;

    if (organizations.length > 0) {
      selectedOrganization = organizations[0];
      redirectPath = `/organization/${selectedOrganization.id}`;
    }

    const response = NextResponse.json({ user, token, organizations, selectedOrganization });

    response.headers.set('X-Redirect-URL', redirectPath);
    response.headers.set('X-Redirect-URL', redirectPath);
    response.cookies.set('token', token, { path: '/', httpOnly: true });

    return response;
  } catch (error) {
    console.error('Error during sign-in:', error);
    return NextResponse.json({ error: 'Sign-in failed' }, { status: 500 });
  }
}
