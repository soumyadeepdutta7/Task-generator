import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Spec from '@/models/Spec';

export async function GET() {
    try {
        await dbConnect();

        const history = await Spec.find({})
            .sort({ createdAt: -1 })
            .limit(5);

        return NextResponse.json({ success: true, data: history }, { status: 200 });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { error: 'Failed to fetch history', details: errorMessage },
            { status: 500 }
        );
    }
}
