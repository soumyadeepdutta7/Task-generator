'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Download, ArrowUp, ArrowDown, Trash2, Plus, Edit2, Save, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

interface Task {
    id: string;
    title: string;
    description: string;
    type: string;
    status: string;
}

interface UserStory {
    id: string;
    role: string;
    goal: string;
    benefit: string;
}

interface SpecData {
    _id: string;
    goal: string;
    users: string;
    constraints: string;
    template: string;
    tasks: Task[];
    userStories: UserStory[];
}

export default function ResultsClient({ initialData }: { initialData: SpecData }) {
    const [data, setData] = useState<SpecData>(initialData);
    const [editingTask, setEditingTask] = useState<string | null>(null);
    const [newTask, setNewTask] = useState<Task | null>(null);

    // Group tasks by type
    const groupedTasks = data.tasks.reduce((acc, task) => {
        const type = task.type || 'other';
        if (!acc[type]) acc[type] = [];
        acc[type].push(task);
        return acc;
    }, {} as Record<string, Task[]>);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData('text/plain', id);
    };

    // Simple Reordering
    const moveTask = (index: number, direction: 'up' | 'down') => {
        const newTasks = [...data.tasks];
        if (direction === 'up' && index > 0) {
            [newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]];
        } else if (direction === 'down' && index < newTasks.length - 1) {
            [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
        }
        setData({ ...data, tasks: newTasks });
    };

    const deleteTask = (id: string) => {
        setData({ ...data, tasks: data.tasks.filter(t => t.id !== id) });
    };

    const updateTask = (id: string, field: keyof Task, value: string) => {
        setData({
            ...data,
            tasks: data.tasks.map(t => t.id === id ? { ...t, [field]: value } : t)
        });
    };

    const copyToClipboard = () => {
        const text = generateMarkdown(data);
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    const downloadMarkdown = () => {
        const text = generateMarkdown(data);
        const blob = new Blob([text], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `spec-${data.goal.slice(0, 20).replace(/\s+/g, '-')}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const generateMarkdown = (spec: SpecData) => {
        return `
# ${spec.goal}

## Context
- **Users**: ${spec.users}
- **Constraints**: ${spec.constraints || 'None'}
- **Template**: ${spec.template}

## User Stories
${spec.userStories.map(us => `- **As a** ${us.role}, **I want to** ${us.goal}, **so that** ${us.benefit}`).join('\n')}

## Engineering Tasks
${spec.tasks.map(task => `- [ ] **${task.title}** (${task.type}): ${task.description}`).join('\n')}
    `.trim();
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Project Plan</h1>
                    <p className="text-slate-400 mt-1">{data.goal}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={copyToClipboard} size="sm">
                        <Copy className="w-4 h-4 mr-2" /> Copy
                    </Button>
                    <Button variant="primary" onClick={downloadMarkdown} size="sm">
                        <Download className="w-4 h-4 mr-2" /> Export
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* User Stories */}
                <div className="glass p-6 rounded-xl border border-slate-700/30">
                    <h2 className="text-xl font-semibold mb-4 text-indigo-300">User Stories</h2>
                    <div className="space-y-4">
                        {data.userStories.map((story) => (
                            <div key={story.id} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                                <p>
                                    <span className="font-semibold text-purple-300">As a</span> {story.role},
                                    <span className="font-semibold text-purple-300"> I want to</span> {story.goal},
                                    <span className="font-semibold text-purple-300"> so that</span> {story.benefit}.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tasks */}
                <div className="glass p-6 rounded-xl border border-slate-700/30">
                    <h2 className="text-xl font-semibold mb-4 text-pink-300">Engineering Tasks</h2>
                    <div className="space-y-3">
                        <AnimatePresence>
                            {data.tasks.map((task, index) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="group bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="w-full mr-4">
                                            {editingTask === task.id ? (
                                                <div className="space-y-2">
                                                    <Input
                                                        value={task.title}
                                                        onChange={(e) => updateTask(task.id, 'title', e.target.value)}
                                                        className="h-8 text-sm"
                                                    />
                                                    <Textarea
                                                        value={task.description}
                                                        onChange={(e) => updateTask(task.id, 'description', e.target.value)}
                                                        className="min-h-[60px] text-sm"
                                                    />
                                                    <div className="flex justify-end gap-2 mt-2">
                                                        <Button size="sm" variant="ghost" onClick={() => setEditingTask(null)}>Done</Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${task.type === 'feature' ? 'bg-blue-500/20 text-blue-300' :
                                                                task.type === 'bug' ? 'bg-red-500/20 text-red-300' :
                                                                    'bg-slate-500/20 text-slate-300'
                                                            }`}>
                                                            {task.type}
                                                        </span>
                                                        <h3 className="font-medium text-slate-200">{task.title}</h3>
                                                    </div>
                                                    <p className="text-sm text-slate-400">{task.description}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => moveTask(index, 'up')} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white" disabled={index === 0}>
                                                <ArrowUp className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => moveTask(index, 'down')} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white" disabled={index === data.tasks.length - 1}>
                                                <ArrowDown className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => setEditingTask(task.id)} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-blue-400">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => deleteTask(task.id)} className="p-1 hover:bg-slate-700 text-slate-400 hover:text-red-400 rounded">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
