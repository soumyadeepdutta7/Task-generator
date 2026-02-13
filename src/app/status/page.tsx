'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader, Activity } from 'lucide-react';

interface HealthStatus {
    database: 'healthy' | 'unhealthy' | 'unknown';
    llm: 'healthy' | 'unhealthy' | 'unknown';
    backend: 'healthy' | 'unhealthy' | 'unknown';
}

const StatusItem = ({ label, state }: { label: string, state: string }) => {
    return (
        <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg border border-slate-700">
            <span className="font-medium text-slate-300">{label}</span>
            <div className="flex items-center gap-2">
                {state === 'healthy' && (
                    <>
                        <span className="text-green-400 text-sm">Operational</span>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                    </>
                )}
                {state === 'unhealthy' && (
                    <>
                        <span className="text-red-400 text-sm">Outage</span>
                        <XCircle className="w-5 h-5 text-red-500" />
                    </>
                )}
                {state === 'unknown' && (
                    <>
                        <span className="text-slate-400 text-sm">Checking...</span>
                        <Loader className="w-4 h-4 text-slate-500 animate-spin" />
                    </>
                )}
            </div>
        </div>
    );
};

export default function StatusPage() {
    const [status, setStatus] = useState<HealthStatus>({
        database: 'unknown',
        llm: 'unknown',
        backend: 'unknown',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/health')
            .then((res) => res.json())
            .then((data) => setStatus(data))
            .catch((err) => {
                console.error(err);
                setStatus({ database: 'unhealthy', llm: 'unhealthy', backend: 'unhealthy' });
            })
            .finally(() => setLoading(false));
    }, []);



    return (
        <div className="max-w-2xl mx-auto py-10">
            <div className="text-center mb-10">
                <Activity className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                    System Status
                </h1>
                <p className="text-slate-400 mt-2">Real-time health check of system components</p>
            </div>

            <div className="glass p-8 rounded-xl space-y-4 border border-slate-700/50">
                <StatusItem label="Backend API" state={status.backend} />
                <StatusItem label="MongoDB Database" state={status.database} />
                <StatusItem label="Google Gemini LLM" state={status.llm} />
            </div>
        </div>
    );
}
