'use client';

import { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const skillsData = [
  { id: 1, name: 'JavaScript', level: 3, target: 5 },
  { id: 2, name: 'React', level: 4, target: 5 },
  { id: 3, name: 'Node.js', level: 2, target: 4 },
  { id: 4, name: 'TypeScript', level: 1, target: 3 },
  { id: 5, name: 'AWS', level: 2, target: 4 },
];

const SkillAssessment = () => {
  const [skills, setSkills] = useState(skillsData);

  const calculateProgress = (level, target) => {
    return Math.round((level / target) * 100);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blue-900">Skill Assessment</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
          <ArrowPathIcon className="w-4 h-4 mr-1" />
          Refresh
        </button>
      </div>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{skill.name}</span>
              <span className="text-xs text-gray-500">
                Level {skill.level} / {skill.target}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
                style={{ width: `${calculateProgress(skill.level, skill.target)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg bg-green-50 flex items-center">
          <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
          <div>
            <p className="text-sm text-green-900">Skills Achieved</p>
            <p className="font-semibold">3/5</p>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-red-50 flex items-center">
          <XCircleIcon className="w-5 h-5 mr-2 text-red-600" />
          <div>
            <p className="text-sm text-red-900">Skills to Improve</p>
            <p className="font-semibold">2/5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment;
