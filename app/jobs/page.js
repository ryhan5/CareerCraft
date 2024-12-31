'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Header from '../dashboard/Header';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BriefcaseIcon,
  CalendarIcon,
  NewspaperIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  StarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Mock data - Replace with actual API calls
const jobExams = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer",
    examDate: "2024-04-15",
    registrationDeadline: "2024-03-30",
    status: "Upcoming",
    requirements: "Bachelor's in CS/related field, 3+ years experience",
    applicationLink: "https://careers.google.com",
    logo: './-logo.png', // Add logo path
    salary: '$120,000',
    location: 'Mountain View, CA',
    skills: ['JavaScript', 'React', 'Node.js'],
    applicants: 50
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Full Stack Developer",
    examDate: "2024-04-10",
    registrationDeadline: "2024-03-25",
    status: "Registration Open",
    requirements: "5+ years experience in web development",
    applicationLink: "https://careers.microsoft.com",
    logo: '/path/to/microsoft-logo.png', // Add logo path
    salary: '$130,000',
    location: 'Redmond, WA',
    skills: ['C#', '.NET', 'Azure'],
    applicants: 60
  },
  // Add more exams...
];

const jobNews = [
  {
    title: "Tech Industry Hiring Surge Expected in Q2 2024",
    date: "2024-03-01",
    source: "Tech News Daily",
    category: "Industry Trends",
    summary: "Major tech companies announce plans to increase hiring...",
    link: "#"
  },
  {
    title: "New Remote Work Policies Reshape Job Market",
    date: "2024-02-28",
    source: "Career Insights",
    category: "Work Trends",
    summary: "Companies adapt hiring practices for remote-first approach...",
    link: "#"
  },
  // Add more news...
];

const JobCard = ({ job, toggleSaveJob, savedJobs, showJobDetails }) => {
  if (!job) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl border border-gray-500 p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="bg-white rounded-xl border border-blue-300 p-6 hover:shadow-xl transition-all duration-300">
  <div className="flex items-start justify-between">
    <div className="flex items-start space-x-4">
      <div className="w-16 h-16 relative">
        <Image
          src={job.logo}
          alt={job.company}
          width={64}
          height={64}
          className="rounded-lg object-contain"
        />
      </div>
      <div>
        <h3 className="text-xl font-bold text-blue-800">{job.role}</h3>
        <p className="text-blue-600">{job.company}</p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <span
        className={`px-4 py-1 rounded-full text-sm font-medium ${
          job.status === 'Upcoming' ? 'bg-indigo-300 text-indigo-700' :
          job.status === 'Registration Open' ? 'bg-green-100 text-green-700' :
          'bg-red-100 text-red-700'
        }`}
      >
        {job.status}
      </span>
      <button
        onClick={() => toggleSaveJob(job)}
        className="p-2 hover:bg-indigo-300 rounded-full transition-all"
      >
        <BookmarkIcon
          className={`w-5 h-5 ${
            savedJobs.includes(job.id) ? 'text-yellow-500 fill-current' : 'text-gray-400'
          }`}
        />
      </button>
    </div>
  </div>

  <div className="mt-4 grid grid-cols-2 gap-4">
    <div className="flex items-center text-blue-600">
      <CalendarIcon className="w-5 h-5 mr-2" />
      <span>Exam: {new Date(job.examDate).toLocaleDateString()}</span>
    </div>
    <div className="flex items-center text-blue-600">
      <ClockIcon className="w-5 h-5 mr-2" />
      <span>Deadline: {new Date(job.registrationDeadline).toLocaleDateString()}</span>
    </div>
    <div className="flex items-center text-blue-600">
      <CurrencyDollarIcon className="w-5 h-5 mr-2" />
      <span>{job.salary}</span>
    </div>
    <div className="flex items-center text-blue-600">
      <MapPinIcon className="w-5 h-5 mr-2" />
      <span>{job.location}</span>
    </div>
  </div>

  <div className="mt-4">
    <h4 className="font-semibold text-blue-900">Required Skills:</h4>
    <div className="mt-2 flex flex-wrap gap-2">
      {job.skills.map((skill, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-indigo-200 text-indigo-800 rounded-full text-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>

  <div className="mt-4 flex items-center justify-between">
    <div className="flex items-center text-blue-600">
      <UserGroupIcon className="w-5 h-5 mr-2" />
      <span>{job.applicants} applicants</span>
    </div>
    <div className="flex space-x-2">
      <button
        onClick={() => window.open(job.applicationLink, '_blank')}
        className="px-4 py-2 bg-green-600 text-black rounded-lg hover:bg-green-700 transition-colors"
      >
        Apply Now
      </button>
      <button
        onClick={() => showJobDetails(job)}
        className="px-4 py-2 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
      >
        Learn More
      </button>
    </div>
  </div>
</div>

    </motion.div>
  );
};

export default function Jobs() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('exams');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    company: 'all',
    location: 'all',
    salary: 'all'
  });
  const [savedJobs, setSavedJobs] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Function to toggle save job
  const toggleSaveJob = (job) => {
    try {
      if (savedJobs.includes(job.id)) {
        setSavedJobs(savedJobs.filter(id => id !== job.id));
        showNotificationMessage('Job removed from saved items');
      } else {
        setSavedJobs([...savedJobs, job.id]);
        showNotificationMessage('Job saved successfully');
      }
    } catch (error) {
      console.error('Error toggling job save:', error);
      showNotificationMessage('Error saving job');
    }
  };

  // Function to show job details
  const showJobDetails = (job) => {
    // Implement job details modal or navigation
    console.log('Showing details for:', job);
  };

  // Function to show notification
  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Filter jobs based on search and filters
  const filteredJobs = () => {
    try {
      return jobExams.filter(job => {
        const matchesSearch = job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            job.company.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filters.status === 'all' || job.status.toLowerCase() === filters.status;
        const matchesCompany = filters.company === 'all' || job.company.toLowerCase() === filters.company;
        const matchesLocation = filters.location === 'all' || job.location.toLowerCase() === filters.location;
        const matchesSalary = filters.salary === 'all' || job.salary.toLowerCase() === filters.salary;
        return matchesSearch && matchesStatus && matchesCompany && matchesLocation && matchesSalary;
      });
    } catch (error) {
      console.error('Error filtering jobs:', error);
      return [];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      <Header />
      
      {/* Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            {notificationMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Career Opportunities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest job opportunities, company exams, and industry news.
          </p>
        </div>

        {/* Enhanced Search and Filter Bar */}
<div className="bg-white rounded-xl shadow-lg p-6 mb-8">
  <div className="space-y-6">
    {/* Search Bar */}
    <div className="relative">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search for jobs, companies, or skills..."
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-800 placeholder-gray-400 text-lg"
      />
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
        Search
      </button>
    </div>

    {/* Filter Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Status Filter */}
      <div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Status
  </label>
  <select
    className="w-full rounded-lg border-2 border-blue-500 focus:border-blue-700 focus:ring-2 focus:ring-blue-500/20 bg-blue-50 text-gray-800 px-4 py-2"
    value={filters.status}
    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
  >
    <option value="all">All Statuses</option>
    <option value="upcoming">Upcoming</option>
    <option value="registration open">Registration Open</option>
    <option value="closed">Closed</option>
  </select>
</div>

              {/* Company Filter */}
              <div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Company
  </label>
  <select
    className="w-full rounded-lg border-2 border-blue-500 focus:border-blue-700 focus:ring-2 focus:ring-blue-500/20 bg-blue-50 text-gray-800 px-4 py-2"
    value={filters.company}
    onChange={(e) => setFilters({ ...filters, company: e.target.value })}
  >
    <option value="all">All Companies</option>
    <option value="google">Google</option>
    <option value="microsoft">Microsoft</option>
    <option value="amazon">Amazon</option>
    <option value="meta">Meta</option>
    <option value="apple">Apple</option>
  </select>
</div>

              {/* Location Filter */}
              <div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Location
  </label>
  <select
    className="w-full rounded-lg border-2 border-blue-500 focus:border-blue-700 focus:ring-2 focus:ring-blue-500/20 bg-blue-50 text-gray-800 px-4 py-2"
    value={filters.location}
    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
  >
    <option value="all" className="text-gray-800">All Locations</option>
    <option value="mountain view, ca">Mountain View, CA</option>
    <option value="redmond, wa">Redmond, WA</option>
    {/* Add more locations */}
  </select>
</div>

              {/* Salary Range Filter */}
              <div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Salary Range
  </label>
  <select
    className="w-full rounded-lg border-2 border-blue-500 focus:border-blue-700 focus:ring-2 focus:ring-blue-500/20 bg-blue-50 text-gray-800 px-4 py-2"
    value={filters.salary}
    onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
  >
    <option value="all">All Ranges</option>
    <option value="0-50">$0 - $50K</option>
    <option value="50-100">$50K - $100K</option>
    <option value="100-150">$100K - $150K</option>
    <option value="150-200">$150K - $200K</option>
    <option value="200+">$200K+</option>
  </select>
</div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => {
                if (value !== 'all') {
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-brand-50 text-brand-700"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                      <button
                        onClick={() => setFilters({ ...filters, [key]: 'all' })}
                        className="ml-2 hover:text-brand-900"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </span>
                  );
                }
                return null;
              })}
              {Object.values(filters).some(value => value !== 'all') && (
                <button
                  onClick={() => setFilters({
                    status: 'all',
                    company: 'all',
                    location: 'all',
                    salary: 'all'
                  })}
                  className="text-sm text-black hover:text-black"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Content Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
  <div className="border-b border-gray-200">
    <nav className="flex -mb-px">
      <button
        onClick={() => setActiveTab('exams')}
        className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 ${
          activeTab === 'exams'
            ? 'border-blue-500 text-blue-600 bg-blue-50'
            : 'border-transparent text-gray-500 hover:text-blue-600 hover:bg-blue-50'
        }`}
      >
        <AcademicCapIcon className="w-5 h-5 inline-block mr-2" />
        Company Exams
      </button>
      <button
        onClick={() => setActiveTab('news')}
        className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 ${
          activeTab === 'news'
            ? 'border-blue-500 text-blue-600 bg-blue-50'
            : 'border-transparent text-gray-500 hover:text-blue-600 hover:bg-blue-50'
        }`}
      >
        <NewspaperIcon className="w-5 h-5 inline-block mr-2" />
        Job News
      </button>
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
                    Registration Deadline: {new Date(exam.registrationDeadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                exam.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                exam.status === 'Registration Open' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
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
    ) : (
      <div className="space-y-6">
        {jobNews.map((news, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-display text-lg font-semibold text-gray-900">
                {news.title}
              </h3>
              <span className="text-sm text-gray-500">
                {new Date(news.date).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{news.summary}</p>
            <div className="mt-4 flex justify-between items-center">
              <a
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Read More
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
      </main>
    </div>
  );
}
