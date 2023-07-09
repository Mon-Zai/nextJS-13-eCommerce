import { prisma } from '@/db'
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { username,email,password,confirmPassword } = await request.json();
        console.log('Username: '+username);
        console.log('email: '+email);
        console.log('password: '+password);
        console.log('confirmPassword: '+confirmPassword);
        
        await prisma.user.create({
            data: {
                name: username,
                email: email,
                password: password
            }
        })
        return NextResponse.json({ message: 'User Added successfully!' });
      } catch (error) {
        console.error(error);
        return NextResponse.error();
      }
    }