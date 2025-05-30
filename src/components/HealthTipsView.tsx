
import React from 'react';
import { HEALTH_TIPS_CONTENT } from '../constants';
import { HealthTipsIcon } from './IconComponents';

export const HealthTipsView: React.FC = () => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <HealthTipsIcon className="w-10 h-10 text-green-500 mr-3" />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">General Health Tips</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Here are some general tips to help you maintain a healthy lifestyle, including some traditional wellness insights. Small changes can make a big difference!
      </p>
      <ul className="space-y-3 text-gray-700">
        {HEALTH_TIPS_CONTENT.map((tip, index) => (
          <li key={index} className="p-3 bg-green-50 border border-green-200 rounded-md flex items-start">
            <span className="mr-2 text-green-600">&#8226;</span> {/* Custom bullet point */}
            <span>{tip}</span>
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-500 mt-8">
        <strong>Disclaimer:</strong> These tips are for general informational purposes only and do not constitute medical or herbalist advice.
        Always consult with a healthcare professional or qualified herbalist for personalized advice regarding your health and before trying new remedies or supplements.
      </p>
    </div>
  );
};
