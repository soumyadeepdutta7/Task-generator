import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Spec from '@/models/Spec';
import ResultsClient from './ResultsClient';

async function getSpec(id: string) {
    try {
        await dbConnect();
        const spec = await Spec.findById(id).lean();
        if (!spec) return null;
        return JSON.parse(JSON.stringify(spec));
    } catch (error) {
        return null;
    }
}

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const spec = await getSpec(id);

    if (!spec) {
        notFound();
    }

    return <ResultsClient initialData={spec} />;
}
