'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface SpecHistory {
    _id: string;
    goal: string;
    template: string;
    createdAt: string;
}

export default function HistoryPage() {
    const [history, setHistory] = useState<SpecHistory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/history')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setHistory(data.data);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-3xl mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Recent Activity
            </h1>

            {loading ? (
                <div className="text-slate-400">Loading history...</div>
            ) : history.length === 0 ? (
                <div className="text-slate-500 italic">No history found. Generate your first plan!</div>
            ) : (
                <div className="space-y-4">
                    {history.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/results/${item._id}`}>
                                <div className="glass p-6 rounded-xl hover:bg-slate-800/60 transition-colors group cursor-pointer border border-slate-700/50">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors line-clamp-1">
                                                {item.goal}
                                            </h3>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                                                <span className="bg-slate-800 px-2 py-0.5 rounded text-xs border border-slate-700">
                                                    {item.template}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
