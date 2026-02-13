'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { motion } from 'framer-motion';

export default function Home() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        goal: '',
        users: '',
        constraints: '',
        template: 'web',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            router.push(`/results/${data.data._id}`);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-4">
                        Transform Ideas into Plans
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Describe your feature idea and let AI generate user stories and engineering tasks instantly.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6 border border-slate-700/50">
                    <Textarea
                        label="What is your feature idea? (Goal)"
                        placeholder="e.g. A real-time chat application for remote teams..."
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        required
                        className="min-h-[100px]"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Who are the target users?"
                            placeholder="e.g. Remote workers, managers..."
                            value={formData.users}
                            onChange={(e) => setFormData({ ...formData, users: e.target.value })}
                            required
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Template</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                                value={formData.template}
                                onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                            >
                                <option value="web">Web Application</option>
                                <option value="mobile">Mobile App</option>
                                <option value="api">API / Backend</option>
                                <option value="internal">Internal Tool</option>
                            </select>
                        </div>
                    </div>

                    <Textarea
                        label="Any constraints or risks? (Optional)"
                        placeholder="e.g. Must use Next.js, Low budget..."
                        value={formData.constraints}
                        onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                    />

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                        size="lg"
                        isLoading={loading}
                    >
                        {loading ? 'Generating Plan...' : 'Generate User Stories & Tasks'}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}
