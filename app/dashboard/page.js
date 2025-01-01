'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  BarChart3, 
  GraduationCap, 
  BookOpen, 
  Briefcase,
  Clock,
  Code2,
  MoreHorizontal,
  Calendar,
  Building2,
  Bookmark,
  Bell,
  Search,
  Menu,
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data
const jobExams = [
  {
    company: 'Google',
    role: 'Senior Frontend Developer',
    examDate: '2024-04-15',
    registrationDeadline: '2024-04-01',
    status: 'Registration Open',
    requirements: 'Strong JavaScript knowledge, 5+ years experience with React',
    applicationLink: '#'
  },
  {
    company: 'Microsoft',
    role: 'Full Stack Engineer',
    examDate: '2024-04-20',
    registrationDeadline: '2024-04-05',
    status: 'Upcoming',
    requirements: 'Full stack development experience, Azure cloud expertise',
    applicationLink: '#'
  }
];

const courses = [
  { name: 'Advanced JavaScript', progress: 75, time: '2h 15m remaining' },
  { name: 'React Fundamentals', progress: 45, time: '4h 30m remaining' },
  { name: 'Data Structures', progress: 20, time: '8h remaining' }
];

const events = [
  { title: 'Mock Interview', date: 'Today, 3:00 PM', type: 'Interview', icon: Briefcase },
  { title: 'JavaScript Workshop', date: 'Tomorrow, 1:00 PM', type: 'Workshop', icon: GraduationCap },
  { title: 'Code Review Session', date: 'Thu, 11:00 AM', type: 'Review', icon: BookOpen }
];

const stats = [
  { title: 'Course Progress', value: '68%', icon: BarChart3, color: 'from-blue-500 to-blue-600' },
  { title: 'Completed Courses', value: '12', icon: GraduationCap, color: 'from-emerald-500 to-emerald-600' },
  { title: 'Active Courses', value: '3', icon: BookOpen, color: 'from-violet-500 to-violet-600' },
  { title: 'Study Hours', value: '156', icon: Clock, color: 'from-amber-500 to-amber-600' }
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('exams');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
          <div className="w-16 h-16 border-4 border-transparent rounded-full absolute top-0 animate-ping border-t-blue-600 opacity-30"></div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // You can also return a loading spinner here if desired
  }

  const tabs = [
    { id: 'exams', label: 'Exams', icon: GraduationCap },
    { id: 'job-interviews', label: 'Job Interviews', icon: Briefcase },
    { id: 'practice', label: 'Practice', icon: BookOpen },
    { id: 'coding-prep', label: 'Coding Prep', icon: Code2 },
    { id: 'other', label: 'Other', icon: MoreHorizontal }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LearnDash
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white border border-transparent focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm transition-all w-64 group-hover:w-72"
                />
              </div>

              <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3">
                <div className="relative group">
                  <Image
                    src={session?.user?.image || 'https://via.placeholder.com/32'}
                    alt={session?.user?.name || 'User'}
                    width={32}
                    height={32}
                    className="rounded-full ring-2 ring-white group-hover:ring-blue-200 transition-all"
                  />
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="font-medium text-gray-700">{session?.user?.name}</span>
              </div>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-3 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white border border-transparent focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm"
                />
              </div>
              <div className="flex items-center gap-3 py-2">
                <Image
                  src={session?.user?.image || 'https://via.placeholder.com/32'}
                  alt={session?.user?.name || 'User'}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-medium text-gray-700">{session?.user?.name}</span>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white mb-8"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <p className="text-blue-100">Dashboard</p>
            </div>
            <h1 className="mt-4 text-3xl font-bold">
              Welcome back, {session?.user?.name}! 👋
            </h1>
            <p className="mt-2 text-blue-100">
              Track your learning progress and career growth
            </p>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4">
            <div className="h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1 text-gray-900">{stat.value}</p>
                </div>
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg text-white`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5 inline-block mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'exams' && (
              <div className="space-y-6">
                {jobExams.map((exam, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {exam.company} - {exam.role}
                        </h3>
                        <div className="mt-2 space-y-2">
                          <p className="text-sm text-gray-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Exam Date: {new Date(exam.examDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Building2 className="w-4 h-4 mr-2" />
                            Registration Deadline: {new Date(exam.registrationDeadline).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          exam.status === 'Upcoming'
                            ? 'bg-blue-100 text-blue-800'
                            : exam.status === 'Registration Open'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {exam.status}
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">{exam.requirements}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <a
                        href={exam.applicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        Apply Now
                      </a>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Current Courses
            </h2>
            <div className="space-y-4">
              {courses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-4 hover:border-blue-500 transition-colors group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {course.name}
                    </h3>
                    <span className="text-sm text-blue-600 font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{course.time}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-50 group cursor-pointer"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <event.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {event.type}
                  </span>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 font-medium hover:text-blue-700 flex items-center justify-center space-x-2 group">
              <span>View All Events</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}