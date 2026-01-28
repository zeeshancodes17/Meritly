
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  BookText, 
  BarChart2, 
  GraduationCap, 
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Timer,
  Moon,
  Sun,
  X,
  Sparkles,
  Award,
  Filter,
  RotateCcw,
  ArrowRight,
  Send,
  Trash2,
  FileEdit,
  Play,
  Pause,
  Brain,
  Target,
  Building2,
  CircleStop,
  History,
  ChevronRight,
  SlidersHorizontal,
  XCircle,
  Star,
  MessageCircle,
  ThumbsUp,
  Bot,
  User,
  Zap,
  Lightbulb,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { UNIVERSITIES, CATEGORIES, ENTRY_TESTS } from './constants';
import { EducationSystem, UserEducation, CalculationResult, View, Task, Note, FeedbackEntry } from './types';
import { getAIAnalysis, getMentorResponse, summarizeNote } from './services/geminiService';

// --- Global Helpers ---

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

// --- Stable Input Components ---

const MarksInput = ({ label, value, onChange, placeholder }: { label: string, value: number, onChange: (val: number) => void, placeholder?: string }) => {
  const [localValue, setLocalValue] = useState<string>(value === 0 ? '' : value.toString());
  
  useEffect(() => {
    const valStr = value === 0 ? '' : value.toString();
    if (valStr !== localValue && document.activeElement !== null) {
      if (Math.abs(Number(localValue) - value) > 0.001 || localValue === '') {
        setLocalValue(valStr);
      }
    }
  }, [value]);

  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-slate-400 uppercase px-1">{label}</label>
      <input 
        type="number" 
        placeholder={placeholder} 
        className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 font-bold outline-none focus:border-indigo-500 transition-all dark:text-white" 
        value={localValue} 
        onChange={e => {
          setLocalValue(e.target.value);
          onChange(Number(e.target.value) || 0);
        }}
      />
    </div>
  );
};

// --- View Components ---

const DashboardView = ({ tasks, toggleTask, studyHistory, isStudying, toggleStudySession, pomodoro, setPomodoro, setActiveView }: any) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t: any) => t.completed).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const todayMins = studyHistory[(new Date().getDay() + 6) % 7].mins;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Welcome back! Logged {todayMins} mins today.</p>
        </div>
        <button 
          onClick={toggleStudySession}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black transition-all shadow-lg ${
            isStudying ? 'bg-rose-600 text-white' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20'
          }`}
        >
          {isStudying ? <CircleStop size={20} className="animate-spin" /> : <Play size={20} />}
          {isStudying ? 'Recording...' : 'Start Session'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-card p-8 rounded-[40px] lg:col-span-2 shadow-xl shadow-slate-100 dark:shadow-none">
           <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-black flex items-center gap-2">
               <Target className="text-indigo-600" /> Today's Focus
             </h3>
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-full border-4 border-slate-50 dark:border-slate-800 flex items-center justify-center relative">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-indigo-100 dark:text-indigo-900" />
                    <motion.circle 
                      cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" 
                      strokeDasharray="125.66"
                      animate={{ strokeDashoffset: 125.66 - (progressPercent / 100) * 125.66 }}
                      transition={{ duration: 1 }}
                      className="text-indigo-600"
                    />
                  </svg>
                  <span className="text-[10px] font-black">{completedTasks}/{totalTasks}</span>
               </div>
               <button onClick={() => setActiveView('planner')} className="ml-4 text-xs font-bold text-indigo-600 uppercase tracking-widest hover:underline">View All</button>
             </div>
           </div>
           <div className="space-y-4">
             {tasks.filter((t: any) => !t.completed).slice(0, 4).map((task: any) => (
               <div key={task.id} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800 group transition-all hover:translate-x-1">
                  <div className="flex items-center gap-4">
                    <button onClick={() => toggleTask(task.id)} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${task.completed ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200'}`}>
                      {task.completed && <CheckCircle2 size={14} />}
                    </button>
                    <p className="font-bold text-slate-900 dark:text-white">{task.title}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
               </div>
             ))}
           </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-8 rounded-[40px] bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-2xl">
             <div className="flex items-center justify-between mb-8"><Timer size={32} /><div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{pomodoro.mode}</div></div>
             <div className="text-7xl font-black text-center mb-10 tracking-tighter">{formatTime(pomodoro.timeLeft)}</div>
             <button onClick={() => setPomodoro((p: any) => ({ ...p, isActive: !p.isActive }))} className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black shadow-lg">
               {pomodoro.isActive ? 'Pause' : 'Start Focus'}
             </button>
          </div>
          <div className="glass-card p-8 rounded-[40px] shadow-xl">
             <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Study History</h3>
             <div className="flex items-end justify-between gap-2 h-20">
               {studyHistory.map((val: any, i: number) => {
                  const hPercent = (val.mins / Math.max(...studyHistory.map((h:any) => h.mins), 60)) * 100;
                  return (
                    <div key={i} className="flex-1 bg-indigo-50 dark:bg-slate-800 rounded-t-lg relative group overflow-hidden">
                      <motion.div initial={{ height: 0 }} animate={{ height: `${hPercent}%` }} transition={{ duration: 1, delay: i * 0.05 }} className="absolute bottom-0 left-0 right-0 bg-indigo-500" />
                    </div>
                  );
               })}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlannerView = ({ tasks, addTask, toggleTask, deleteTask }: any) => {
  const [titleInput, setTitleInput] = useState('');
  const [subjectInput, setSubjectInput] = useState('');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">Study Planner</h1>
      <div className="glass-card p-8 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-transparent">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={titleInput} onChange={e => setTitleInput(e.target.value)} placeholder="What to study?" className="p-4 bg-white dark:bg-slate-900 border rounded-2xl font-bold dark:text-white outline-none focus:border-indigo-500" />
          <div className="flex gap-4">
            <input value={subjectInput} onChange={e => setSubjectInput(e.target.value)} placeholder="Subject?" className="flex-1 p-4 bg-white dark:bg-slate-900 border rounded-2xl font-bold dark:text-white outline-none focus:border-indigo-500" />
            <button onClick={() => { addTask(titleInput, subjectInput); setTitleInput(''); setSubjectInput(''); }} className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg"><Plus size={24} /></button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
         {tasks.map((task: any) => (
           <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={task.id} className="glass-card p-6 rounded-3xl flex items-center justify-between border">
              <div className="flex items-center gap-6">
                <button onClick={() => toggleTask(task.id)} className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center ${task.completed ? 'bg-indigo-600 border-indigo-600 text-white' : ''}`}>{task.completed && <CheckCircle2 size={18} />}</button>
                <h4 className={`text-lg font-black ${task.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>{task.title}</h4>
              </div>
              <button onClick={() => deleteTask(task.id)} className="p-3 text-slate-300 hover:text-rose-500"><Trash2 size={18} /></button>
           </motion.div>
         ))}
      </div>
    </div>
  );
};

const MentorView = ({ mentorChat, mentorInput, setMentorInput, mentorMode, setMentorMode, isTyping, handleMentorSend }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mentorChat, isTyping]);

  const modes = [
    { id: 'explain', label: 'Explain', icon: Lightbulb, color: 'text-amber-500', desc: 'Step-by-step guidance' },
    { id: 'exam', label: 'Exam', icon: Zap, color: 'text-indigo-500', desc: 'Concise, point-based' },
    { id: 'simplify', label: 'Simplify', icon: Sparkles, color: 'text-emerald-500', desc: 'Beginner friendly' },
    { id: 'teach', label: 'Teach', icon: HelpCircle, color: 'text-rose-500', desc: 'Quiz & feedback' }
  ];

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col max-w-5xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 px-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">StudyMate</h1>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Online</span>
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium italic">
            {modes.find(m => m.id === mentorMode)?.desc}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-inner">
          {modes.map(m => (
            <button 
              key={m.id} 
              onClick={() => setMentorMode(m.id as any)} 
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[11px] font-black uppercase transition-all ${mentorMode === m.id ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-lg ring-1 ring-slate-200 dark:ring-slate-600' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
            >
              <m.icon size={14} className={mentorMode === m.id ? m.color : 'text-slate-400'} />
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 glass-card rounded-[48px] mb-8 overflow-hidden flex flex-col shadow-2xl border-2 border-white/50 dark:border-slate-800/50 relative">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {mentorChat.length === 0 && !isTyping && (
            <div className="h-full flex flex-col items-center justify-center space-y-8 text-center px-4">
              <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center text-indigo-600 animate-bounce">
                <Bot size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">How can I help you today?</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Ask me to explain a concept, help with an exam topic, or solve a tricky question.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                {[
                  "Explain the aggregate formula for NUST",
                  "What is the scope of Software Engineering?",
                  "Help me prepare for MDCAT Biology",
                  "Explain O-Level vs Matric system"
                ].map((q, i) => (
                  <button key={i} onClick={() => {setMentorInput(q);}} className="text-left p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 transition-all">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {mentorChat.map((chat: any, idx: number) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-4 ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {chat.role === 'ai' && (
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex-shrink-0 flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none mt-1">
                    <Bot size={20} />
                  </div>
                )}
                <div className={`max-w-[80%] p-6 rounded-3xl relative ${
                  chat.role === 'user' 
                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-tr-none shadow-xl' 
                    : 'bg-white dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-700 shadow-md'
                }`}>
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap font-medium">{chat.content}</p>
                </div>
                {chat.role === 'user' && (
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center text-slate-400 dark:text-slate-300 shadow-sm mt-1">
                    <User size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex-shrink-0 flex items-center justify-center shadow-lg">
                <Bot size={20} />
              </div>
              <div className="flex gap-1.5 p-4 bg-white dark:bg-slate-800 rounded-3xl rounded-tl-none border border-slate-100 dark:border-slate-700">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-t border-slate-100 dark:border-slate-800">
           <div className="relative flex gap-4 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-xl ring-4 ring-transparent focus-within:ring-indigo-500/10 transition-all">
             <input 
               value={mentorInput} 
               onChange={e => setMentorInput(e.target.value)} 
               onKeyDown={(e) => e.key === 'Enter' && handleMentorSend()} 
               placeholder="Type a message..." 
               className="flex-1 pl-4 bg-transparent font-bold dark:text-white outline-none placeholder:text-slate-400" 
             />
             <button 
               disabled={isTyping || !mentorInput.trim()} 
               onClick={handleMentorSend} 
               className={`p-4 rounded-2xl transition-all flex items-center justify-center shadow-lg ${
                 isTyping || !mentorInput.trim() 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95'
               }`}
             >
               <Send size={24} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const NotesView = ({ notes, activeNoteId, setActiveNoteId, addNote, updateActiveNote, summarizeNote, isTyping }: any) => {
  const activeNote = notes.find((n: any) => n.id === activeNoteId);
  return (
    <div className="h-[calc(100vh-12rem)] flex gap-8 max-w-6xl mx-auto">
      <div className="w-72 flex flex-col gap-4">
        <button onClick={addNote} className="w-full p-4 bg-indigo-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg"><Plus size={20} /> New Note</button>
        <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
          {notes.map((note: any) => (
            <button key={note.id} onClick={() => setActiveNoteId(note.id)} className={`w-full p-5 rounded-2xl text-left border transition-all ${activeNoteId === note.id ? 'bg-white dark:bg-slate-800 border-indigo-600' : 'bg-slate-50 dark:bg-slate-900/50'}`}><p className="font-black truncate">{note.title || 'Untitled'}</p></button>
          ))}
        </div>
      </div>
      <div className="flex-1 glass-card rounded-[40px] flex flex-col shadow-2xl overflow-hidden">
        {activeNote ? (
          <>
            <div className="p-8 border-b flex items-center justify-between">
              <input value={activeNote.title} onChange={e => updateActiveNote({ title: e.target.value })} placeholder="Note Title" className="bg-transparent text-2xl font-black outline-none w-full dark:text-white" />
              <button onClick={() => summarizeNote(activeNote)} disabled={isTyping} className="px-6 py-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-2xl font-black text-sm">Summarize</button>
            </div>
            <textarea value={activeNote.content} onChange={e => updateActiveNote({ content: e.target.value })} placeholder="Start typing..." className="flex-1 p-8 bg-transparent outline-none resize-none leading-relaxed text-lg dark:text-white" />
          </>
        ) : <div className="flex-1 flex items-center justify-center text-slate-400 font-black">Select a note to begin.</div>}
      </div>
    </div>
  );
};

const UniversityView = ({ education, setEducation, meritResults, step, setStep, handleRunUniAnalysis, isAnalyzing, darkMode, selectedUniId, setSelectedUniId, selectedCategory, setSelectedCategory, uniSearch, setUniSearch }: any) => {
  const meritChartData = useMemo(() => meritResults.slice(0, 8).map((r: any) => ({ name: r.universityName, merit: parseFloat(r.meritScore.toFixed(2)), lastYear: r.lastYearMerit })), [meritResults]);
  const formProgress = useMemo(() => {
    const fields = [education.matricObtained, education.matricTotal, education.hsscObtained, education.hsscTotal, education.testScore, education.testTotal];
    return Math.round((fields.filter(v => v !== 0).length / fields.length) * 100);
  }, [education]);

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">University Explorer</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Discover your path to admission.</p>
        </div>
        <div className="flex items-center gap-4">
          {step === 3 && <button onClick={() => setStep(2)} className="px-6 py-3 bg-white dark:bg-slate-800 rounded-2xl font-black text-sm shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:bg-slate-50 dark:hover:bg-slate-700">Recalculate</button>}
          {step === 2 && <div className="text-xs font-black bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 p-3 rounded-2xl border border-indigo-100 dark:border-indigo-800">Profile {formProgress}% Completed</div>}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-card p-10 rounded-[40px] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-black">1</div>
                      <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Matric / O-Level</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <MarksInput label="Obtained" value={education.matricObtained} onChange={val => setEducation({...education, matricObtained: val})} />
                      <MarksInput label="Total" value={education.matricTotal} onChange={val => setEducation({...education, matricTotal: val})} />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 font-black">2</div>
                      <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Inter / A-Level</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <MarksInput label="Obtained" value={education.hsscObtained} onChange={val => setEducation({...education, hsscObtained: val})} />
                      <MarksInput label="Total" value={education.hsscTotal} onChange={val => setEducation({...education, hsscTotal: val})} />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 font-black">3</div>
                      <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Entrance Exam</h4>
                    </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {ENTRY_TESTS.map(t => (
                      <button key={t.id} onClick={() => setEducation({...education, testType: t.id, testTotal: t.total})} className={`p-4 rounded-2xl border-2 font-black text-xs transition-all ${education.testType === t.id ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200'}`}>{t.name}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[32px] space-y-6 border border-slate-100 dark:border-slate-700 shadow-inner">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 font-black">4</div>
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Test Score</h4>
                </div>
                <MarksInput label="Your Score" value={education.testScore} onChange={val => setEducation({...education, testScore: val})} />
                <MarksInput label="Max Marks" value={education.testTotal} onChange={val => setEducation({...education, testTotal: val})} />
              </div>
            </div>
            <div className="mt-12 flex justify-end">
              <button disabled={formProgress < 100} onClick={() => setStep(3)} className={`px-12 py-5 rounded-[24px] font-black shadow-xl transition-all ${formProgress < 100 ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1'}`}>Calculate Merit Results</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            {/* Search Header */}
            <div className="glass-card p-8 rounded-[40px] shadow-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -mr-20 -mt-20"></div>
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1 w-full relative">
                    <Search size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-600" />
                    <input 
                      type="text" 
                      value={uniSearch} 
                      onChange={e => setUniSearch(e.target.value)} 
                      placeholder="Search for a university, abbreviation, or program..." 
                      className="w-full pl-16 pr-14 py-6 bg-white dark:bg-slate-900 border-none rounded-[28px] font-bold text-lg dark:text-white outline-none ring-4 ring-transparent focus:ring-indigo-500/10 shadow-inner transition-all"
                    />
                    {uniSearch && (
                      <button onClick={() => setUniSearch('')} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors">
                        <XCircle size={24} />
                      </button>
                    )}
                  </div>
                  <div className="w-full md:w-64 h-full">
                    <div className="flex items-center gap-3 px-6 py-5 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-[28px] border border-indigo-100 dark:border-indigo-800">
                      <Target className="text-indigo-600" size={20} />
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400">Total Matches</p>
                        <p className="text-lg font-black text-indigo-700 dark:text-indigo-400">{meritResults.length}</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1 glass-card p-6 rounded-[32px] h-max sticky top-24 space-y-8 border border-slate-100 dark:border-slate-800 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                      <SlidersHorizontal size={16} /> Filters
                    </h3>
                    <button onClick={() => {setSelectedUniId('All'); setSelectedCategory('All');}} className="text-[10px] font-black uppercase text-indigo-600 hover:underline">Reset</button>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-slate-300 px-2">Institution Type</p>
                    <select 
                      value={selectedUniId} 
                      onChange={e => setSelectedUniId(e.target.value)} 
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl font-bold text-sm dark:text-white outline-none ring-2 ring-transparent focus:ring-indigo-500 transition-all"
                    >
                      <option value="All">All Universities</option>
                      {UNIVERSITIES.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase text-slate-300 px-2">Program Category</p>
                  <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat} 
                        onClick={() => setSelectedCategory(cat)} 
                        className={`text-left px-4 py-3 rounded-xl text-xs font-black uppercase transition-all ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Results Content */}
              <div className="lg:col-span-3 space-y-12">
                <div className="glass-card p-10 rounded-[40px] shadow-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black flex items-center gap-2">
                      <BarChart2 className="text-indigo-600" /> Cutoff Visualization
                    </h3>
                  </div>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={meritChartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#334155' : '#f1f5f9'} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} />
                        <YAxis domain={[0,100]} axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#64748b'}} />
                        <Tooltip 
                          cursor={{fill: 'rgba(99, 102, 241, 0.05)'}}
                          contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', background: darkMode ? '#1e293b' : 'white'}} 
                        />
                        <Bar dataKey="merit" radius={[12,12,0,0]} barSize={40}>
                          {meritChartData.map((e:any,i:number) => (
                            <Cell key={i} fill={e.merit >= (e.lastYear || 0) ? '#6366f1' : '#f43f5e'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {meritResults.length > 0 ? (
                    meritResults.map((res: any, idx: number) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{delay: idx * 0.02}} 
                        key={`${res.universityName}-${res.programName}`} 
                        className="glass-card p-8 rounded-[32px] border hover:border-indigo-600 transition-all shadow-lg flex flex-col group cursor-default"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-100 dark:border-slate-700">{res.universityName}</span>
                          <div className={`w-2 h-2 rounded-full ${res.isSafe ? 'bg-emerald-500 animate-pulse' : res.isMatch ? 'bg-amber-500 animate-pulse' : 'bg-rose-500'}`} />
                        </div>
                        <h4 className="text-lg font-black mt-2 mb-6 line-clamp-2 h-14 group-hover:text-indigo-600 transition-colors leading-tight">{res.programName}</h4>
                        <div className="mt-auto">
                          <div className="flex items-end gap-1 mb-4">
                            <p className="text-4xl font-black tracking-tighter">{res.meritScore.toFixed(2)}</p>
                            <p className="text-lg font-black text-slate-300 pb-1">%</p>
                          </div>
                          <div className="h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden mb-4 shadow-inner">
                            <motion.div initial={{width: 0}} animate={{width: `${res.meritScore}%`}} transition={{duration: 1.5, ease: "circOut"}} className={`h-full ${res.isSafe ? 'bg-emerald-500' : res.isMatch ? 'bg-amber-500' : 'bg-rose-500'}`} />
                          </div>
                          <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/30 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <span className={`text-[9px] font-black uppercase tracking-widest ${res.isSafe ? 'text-emerald-600' : res.isMatch ? 'text-amber-600' : 'text-rose-600'}`}>{res.isSafe ? 'Safe' : res.isMatch ? 'Match' : 'Reach'}</span>
                            {res.lastYearMerit && <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Target: {res.lastYearMerit}%</span>}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="col-span-full py-24 text-center glass-card rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
                      <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                        <Search size={40} />
                      </div>
                      <h3 className="text-2xl font-black text-slate-400">No matches found.</h3>
                      <p className="text-slate-500 mt-2 font-medium">Try adjusting your filters or search query.</p>
                      <button onClick={() => {setUniSearch(''); setSelectedUniId('All'); setSelectedCategory('All');}} className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:-translate-y-1">Clear all filters</button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-20">
            <div className="flex flex-col justify-center space-y-6">
              <div className="bg-indigo-600 w-16 h-1 w-1 rounded-full"></div>
              <h2 className="text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Admission Planning</span></h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">Choose your educational background to receive precise aggregate calculations and strategic counseling for Pakistan's top-tier universities.</p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {[
                {id: EducationSystem.MATRIC_FSC, title: 'Matric / FSc', desc: 'National Board Curriculum (BISE)', icon: Award, color: 'indigo'},
                {id: EducationSystem.O_A_LEVEL, title: 'O / A Levels', icon: Building2, desc: 'Cambridge / International Curriculum', color: 'violet'}
              ].map(opt => (
                <button 
                  key={opt.id} 
                  onClick={() => { setEducation({...education, system: opt.id}); setStep(2); }} 
                  className="group p-8 bg-white dark:bg-slate-900 rounded-[36px] border border-slate-100 dark:border-slate-800 shadow-2xl flex items-center gap-8 hover:border-indigo-500 transition-all text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                  <div className="p-5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all rounded-3xl z-10 shadow-lg">
                    <opt.icon size={36}/>
                  </div>
                  <div className="z-10">
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-1">{opt.title}</h4>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-tighter">{opt.desc}</p>
                  </div>
                  <ChevronRight className="ml-auto text-slate-300 group-hover:text-indigo-600 transition-all z-10" size={32} />
                </button>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FeedbackView = ({ feedbackList, addFeedback }: { feedbackList: FeedbackEntry[], addFeedback: (entry: Omit<FeedbackEntry, 'id' | 'date'>) => void }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    addFeedback({ name, comment, rating });
    setName('');
    setComment('');
    setRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">User Feedback</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">Help us improve Meritly by sharing your thoughts and experience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="glass-card p-8 rounded-[40px] shadow-2xl border border-slate-100 dark:border-slate-800 h-max">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3">
            <MessageCircle className="text-indigo-600" /> Share Your Thoughts
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Your Name</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Experience Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button 
                    key={star} 
                    type="button"
                    onClick={() => setRating(star)}
                    className={`p-1 transition-all ${rating >= star ? 'text-amber-500 scale-110' : 'text-slate-200 dark:text-slate-700'}`}
                  >
                    <Star size={24} fill={rating >= star ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Comment</label>
              <textarea 
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Tell us what you like or how we can improve..."
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white min-h-[120px] resize-none"
                required
              />
            </div>

            <button 
              type="submit" 
              className={`w-full py-4 rounded-2xl font-black shadow-lg transition-all flex items-center justify-center gap-3 ${submitted ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
            >
              {submitted ? (
                <>
                  <ThumbsUp size={20} /> Thank You!
                </>
              ) : (
                <>
                  <Send size={20} /> Submit Feedback
                </>
              )}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-black flex items-center gap-3">
            <Sparkles className="text-indigo-600" /> Recent Comments
          </h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
            {feedbackList.length > 0 ? (
              feedbackList.map((entry) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={entry.id} 
                  className="glass-card p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="space-y-1">
                      <p className="font-black text-slate-900 dark:text-white">{entry.name}</p>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} size={10} className={entry.rating >= s ? 'text-amber-500' : 'text-slate-200'} fill={entry.rating >= s ? 'currentColor' : 'none'} />
                        ))}
                      </div>
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">"{entry.comment}"</p>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                <p className="font-bold text-slate-400">No feedback yet. Be the first!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sidebar Component ---

const Sidebar = ({ activeView, setActiveView, darkMode, setDarkMode }: any) => (
  <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 fixed h-screen flex flex-col z-[150] shadow-sm">
    <div className="p-10">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-2xl text-white shadow-xl shadow-indigo-100 dark:shadow-none flex items-center justify-center">
          <div className="relative flex items-center justify-center w-8 h-8">
            <span className="font-black text-3xl leading-none font-sans">M</span>
            <div className="absolute -top-1.5 -right-2 transform rotate-12">
               <GraduationCap size={16} fill="white" className="text-white" />
            </div>
          </div>
        </div>
        <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white">Meritly</span>
      </div>
    </div>
    <nav className="flex-1 px-6 space-y-3">
      {[
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'planner', icon: Calendar, label: 'Planner' },
        { id: 'mentor', icon: MessageSquare, label: 'StudyMate' },
        { id: 'notes', icon: BookText, label: 'Notes' },
        { id: 'university', icon: GraduationCap, label: 'University' },
        { id: 'analytics', icon: BarChart2, label: 'Analytics' },
        { id: 'feedback', icon: MessageCircle, label: 'Feedback' },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveView(item.id as View)}
          className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all ${
            activeView === item.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600'
          }`}
        >
          <item.icon size={22} />
          <span className="text-sm tracking-tight">{item.label}</span>
        </button>
      ))}
    </nav>
    <div className="p-8 border-t border-slate-50 dark:border-slate-800">
      <button onClick={() => setDarkMode(!darkMode)} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
        {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        <span className="text-sm">{darkMode ? 'Light' : 'Dark'}</span>
      </button>
    </div>
  </aside>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [tasks, setTasks] = useState<Task[]>(() => JSON.parse(localStorage.getItem('sm_tasks') || '[]'));
  const [notes, setNotes] = useState<Note[]>(() => JSON.parse(localStorage.getItem('sm_notes') || '[]'));
  const [feedbackList, setFeedbackList] = useState<FeedbackEntry[]>(() => JSON.parse(localStorage.getItem('sm_feedback') || '[]'));
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isStudying, setIsStudying] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [studyHistory, setStudyHistory] = useState(() => {
    const saved = localStorage.getItem('sm_study_history');
    return saved ? JSON.parse(saved) : [
      { day: 'Mon', mins: 0 }, { day: 'Tue', mins: 0 }, { day: 'Wed', mins: 0 },
      { day: 'Thu', mins: 0 }, { day: 'Fri', mins: 0 }, { day: 'Sat', mins: 0 }, { day: 'Sun', mins: 0 }
    ];
  });
  const [pomodoro, setPomodoro] = useState({ timeLeft: 25 * 60, isActive: false, mode: 'work' });
  const [mentorChat, setMentorChat] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [mentorInput, setMentorInput] = useState('');
  const [mentorMode, setMentorMode] = useState<'explain' | 'exam' | 'simplify' | 'teach'>('explain');
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(1);
  const [education, setEducation] = useState<UserEducation>({
    system: EducationSystem.MATRIC_FSC, matricTotal: 1100, matricObtained: 0,
    hsscTotal: 1200, hsscObtained: 0, testScore: 0, testTotal: 180, testType: 'mdcat',
    useCustomWeightage: false, customWeightage: { matric: 10, hssc: 40, test: 50 }
  });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedUniId, setSelectedUniId] = useState('All');
  const [uniSearch, setUniSearch] = useState('');

  useEffect(() => {
    document.body.className = darkMode ? 'dark text-slate-900 font-sans' : 'light text-slate-900 font-sans';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => localStorage.setItem('sm_tasks', JSON.stringify(tasks)), [tasks]);
  useEffect(() => localStorage.setItem('sm_notes', JSON.stringify(notes)), [notes]);
  useEffect(() => localStorage.setItem('sm_study_history', JSON.stringify(studyHistory)), [studyHistory]);
  useEffect(() => localStorage.setItem('sm_feedback', JSON.stringify(feedbackList)), [feedbackList]);

  useEffect(() => {
    let interval: any = null;
    if (pomodoro.isActive && pomodoro.timeLeft > 0) {
      interval = setInterval(() => setPomodoro(p => ({ ...p, timeLeft: p.timeLeft - 1 })), 1000);
    } else if (pomodoro.timeLeft === 0) {
      const nextMode = pomodoro.mode === 'work' ? 'break' : 'work';
      setPomodoro({ mode: nextMode, timeLeft: nextMode === 'work' ? 25 * 60 : 5 * 60, isActive: false });
    }
    return () => clearInterval(interval);
  }, [pomodoro.isActive, pomodoro.timeLeft]);

  const toggleStudySession = () => {
    if (!isStudying) {
      setSessionStartTime(Date.now());
      setIsStudying(true);
    } else {
      if (sessionStartTime) {
        const diff = Math.max(1, Math.floor((Date.now() - sessionStartTime) / 60000));
        const dayIdx = (new Date().getDay() + 6) % 7;
        const newHistory = [...studyHistory];
        newHistory[dayIdx].mins += diff;
        setStudyHistory(newHistory);
      }
      setIsStudying(false);
      setSessionStartTime(null);
    }
  };

  const addTask = (title: string, subject: string) => {
    if (!title.trim()) return;
    setTasks([{ id: Math.random().toString(36).substr(2, 9), title, subject, priority: 'medium', duration: 30, completed: false, date: new Date().toISOString() }, ...tasks]);
  };

  const addFeedback = (entry: Omit<FeedbackEntry, 'id' | 'date'>) => {
    setFeedbackList([{
      id: Math.random().toString(36).substr(2, 9),
      ...entry,
      date: new Date().toISOString()
    }, ...feedbackList]);
  };

  const toggleTask = (id: string) => setTasks(tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t));
  const deleteTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));
  
  const handleMentorSend = async () => {
    if (!mentorInput.trim()) return;
    const query = mentorInput;
    setMentorChat([...mentorChat, { role: 'user', content: query }]);
    setMentorInput('');
    setIsTyping(true);
    const resp = await getMentorResponse(query, mentorMode);
    setMentorChat(prev => [...prev, { role: 'ai', content: resp || '' }]);
    setIsTyping(false);
  };

  const handleSummarizeNote = async (note: Note) => {
    setIsTyping(true);
    const summary = await summarizeNote(note.content);
    updateActiveNote({ content: note.content + '\n\nAI Summary:\n' + summary });
    setIsTyping(false);
  };

  const updateActiveNote = (updates: Partial<Note>) => {
    if (!activeNoteId) return;
    setNotes(notes.map(n => n.id === activeNoteId ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n));
  };

  const meritResults: CalculationResult[] = useMemo(() => {
    const list: CalculationResult[] = [];
    UNIVERSITIES.forEach(uni => {
      if (selectedUniId !== 'All' && uni.id !== selectedUniId) return;
      
      uni.programs.forEach(prog => {
        const matricPct = (education.matricObtained / (education.matricTotal || 1)) * 100;
        const hsscPct = (education.hsscObtained / (education.hsscTotal || 1)) * 100;
        const testPct = (education.testScore / (education.testTotal || 1)) * 100;
        const w = education.useCustomWeightage ? education.customWeightage : prog.weightage;
        const score = (matricPct * (w.matric / 100)) + (hsscPct * (w.hssc / 100)) + (testPct * (w.test / 100));
        
        list.push({
          meritScore: score, programName: prog.name, universityName: uni.abbreviation,
          fullUniversityName: uni.name,
          isSafe: score - (prog.lastYearMerit || 0) > 2, isMatch: Math.abs(score - (prog.lastYearMerit || 0)) <= 2,
          isReach: (prog.lastYearMerit || 0) - score > 2, lastYearMerit: prog.lastYearMerit, isCustomWeightage: false
        });
      });
    });

    return list.filter(r => {
      const matchesCategory = selectedCategory === 'All' || r.programName.includes(selectedCategory);
      const searchLower = uniSearch.toLowerCase();
      const matchesSearch = uniSearch === '' || 
        r.universityName.toLowerCase().includes(searchLower) || 
        (r.fullUniversityName || "").toLowerCase().includes(searchLower) ||
        r.programName.toLowerCase().includes(searchLower);
      
      return matchesCategory && matchesSearch;
    }).sort((a, b) => b.meritScore - a.meritScore);
  }, [education, selectedCategory, selectedUniId, uniSearch]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
      <Sidebar activeView={activeView} setActiveView={setActiveView} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-1 ml-64 p-8 md:p-12 pb-24 relative overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeView} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
              {activeView === 'dashboard' && <DashboardView tasks={tasks} toggleTask={toggleTask} studyHistory={studyHistory} isStudying={isStudying} toggleStudySession={toggleStudySession} pomodoro={pomodoro} setPomodoro={setPomodoro} setActiveView={setActiveView} />}
              {activeView === 'planner' && <PlannerView tasks={tasks} addTask={addTask} toggleTask={toggleTask} deleteTask={deleteTask} />}
              {activeView === 'mentor' && <MentorView mentorChat={mentorChat} mentorInput={mentorInput} setMentorInput={setMentorInput} mentorMode={mentorMode} setMentorMode={setMentorMode} isTyping={isTyping} handleMentorSend={handleMentorSend} />}
              {activeView === 'notes' && <NotesView notes={notes} activeNoteId={activeNoteId} setActiveNoteId={setActiveNoteId} addNote={() => { const id = Math.random().toString(36).substr(2, 9); setNotes([{ id, title: 'New Note', content: '', tags: [], updatedAt: new Date().toISOString() }, ...notes]); setActiveNoteId(id); }} updateActiveNote={updateActiveNote} summarizeNote={handleSummarizeNote} isTyping={isTyping} />}
              {activeView === 'university' && <UniversityView education={education} setEducation={setEducation} meritResults={meritResults} step={step} setStep={setStep} selectedUniId={selectedUniId} setSelectedUniId={setSelectedUniId} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} uniSearch={uniSearch} setUniSearch={setUniSearch} darkMode={darkMode} />}
              {activeView === 'analytics' && <div className="p-8 glass-card rounded-[40px] shadow-xl"><h1 className="text-3xl font-black mb-10 tracking-tight">Academic Analytics</h1><div className="h-[400px]"><ResponsiveContainer width="100%" height="100%"><AreaChart data={studyHistory}><defs><linearGradient id="cH" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#334155' : '#f1f5f9'} /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#64748b'}} /><YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#64748b'}} /><Tooltip contentStyle={{borderRadius: '16px', border: 'none', background: darkMode ? '#1e293b' : 'white'}} /><Area type="monotone" dataKey="mins" stroke="#6366f1" strokeWidth={5} fill="url(#cH)" /></AreaChart></ResponsiveContainer></div></div>}
              {activeView === 'feedback' && <FeedbackView feedbackList={feedbackList} addFeedback={addFeedback} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <div className="fixed bottom-8 right-8 z-[100] bg-white dark:bg-slate-900 border shadow-2xl rounded-2xl p-4 flex items-center gap-4 transition-transform hover:scale-105">
        <div className="flex items-center gap-3 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm font-black ring-1 ring-indigo-100 dark:ring-indigo-800">
            <Clock size={18} /> {formatTime(pomodoro.timeLeft)}
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white cursor-pointer" onClick={() => setPomodoro(p => ({ ...p, isActive: !p.isActive }))}>
          {pomodoro.isActive ? <Pause size={20} /> : <Play size={20} />}
        </div>
      </div>
    </div>
  );
};

export default App;
