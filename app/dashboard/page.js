'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  ChartBarIcon, 
  AcademicCapIcon, 
  BookOpenIcon, 
  BriefcaseIcon,
  ClockIcon,
  CodeBracketIcon,
  EllipsisHorizontalIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  BookmarkIcon 
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Header from './Header';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('exams');

  const jobExams = []; // Define your job exams data here
  const jobInterviews = []; // Define your job interviews data here
  const practiceMaterials = []; // Define your practice materials data here
  const otherResources = []; // Define your other resources data here

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back, {session?.user?.name}! 👋
          </h1>
          <p className="mt-2 text-blue-800">Track your learning progress and career growth</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'exams', label: 'Exams', icon: AcademicCapIcon },
                { id: 'job-interviews', label: 'Job Interviews', icon: BriefcaseIcon },
                { id: 'practice', label: 'Practice', icon: BookOpenIcon },
                { id: 'coding-prep', label: 'Coding Prep', icon: CodeBracketIcon },
                { id: 'other', label: 'Other', icon: EllipsisHorizontalIcon },
              ].map((tab) => (
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
            {activeTab === 'exams' ? (
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
                        <h3 className="font-display text-lg font-semibold text-gray-900">
                          {exam.company} - {exam.role}
                        </h3>
                        <div className="mt-2 space-y-2">
                          <p className="text-sm text-gray-600 flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            Exam Date: {new Date(exam.examDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                            Registration Deadline: {new Date(
                              exam.registrationDeadline
                            ).toLocaleDateString()}
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
                        <BookmarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : activeTab === 'job-interviews' ? (
              <div className="space-y-6">
                {jobInterviews.map((interview, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-gray-900">
                          {interview.company} - {interview.position}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                          Interview Date: {new Date(interview.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          interview.status === 'Scheduled'
                            ? 'bg-blue-100 text-blue-800'
                            : interview.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {interview.status}
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">{interview.tips}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <a
                        href={interview.resourcesLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        View Resources
                      </a>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <BookmarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : activeTab === 'practice' ? (
              <div className="space-y-6">
                {practiceMaterials.map((material, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-display text-lg font-semibold text-gray-900">
                      {material.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">{material.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <a
                        href={material.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        Start Practicing
                      </a>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <BookmarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {otherResources.map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-display text-lg font-semibold text-gray-900">
                      {resource.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">{resource.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        Explore More
                      </a>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <BookmarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Course Progress', value: '68%', icon: ChartBarIcon, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
            { title: 'Completed Courses', value: '12', icon: AcademicCapIcon, color: 'bg-gradient-to-r from-green-500 to-green-600' },
            { title: 'Active Courses', value: '3', icon: BookOpenIcon, color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
            { title: 'Study Hours', value: '156', icon: ClockIcon, color: 'bg-gradient-to-r from-orange-500 to-orange-600' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1 text-blue-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Current Courses
            </h2>
            <div className="space-y-4">
              {[
                { name: 'Advanced JavaScript', progress: 75, time: '2h 15m remaining' },
                { name: 'React Fundamentals', progress: 45, time: '4h 30m remaining' },
                { name: 'Data Structures', progress: 20, time: '8h remaining' },
              ].map((course, index) => (
                <div key={index} className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-blue-900">{course.name}</h3>
                    <span className="text-sm text-blue-700">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full h-2 transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">{course.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {[
                { 
                  title: 'Mock Interview', 
                  date: 'Today, 3:00 PM',
                  type: 'Interview',
                  icon: BriefcaseIcon
                },
                { 
                  title: 'JavaScript Workshop', 
                  date: 'Tomorrow, 1:00 PM',
                  type: 'Workshop',
                  icon: AcademicCapIcon
                },
                { 
                  title: 'Code Review Session', 
                  date: 'Thu, 11:00 AM',
                  type: 'Review',
                  icon: BookOpenIcon
                },
              ].map((event, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-50">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                    <event.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-blue-900">{event.title}</h3>
                    <p className="text-sm text-blue-700">{event.date}</p>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 font-medium hover:text-blue-700 flex items-center justify-center space-x-2 group">
              <span>View All Events</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}