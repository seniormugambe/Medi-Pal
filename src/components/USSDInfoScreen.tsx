
import React from 'react';
import { USSDIcon } from './IconComponents';

export const USSDInfoScreen: React.FC = () => {
  // Placeholder USSD code. Replace with actual or make configurable if needed.
  const USSD_SERVICE_CODE = "*384*12345#"; // Example

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <USSDIcon className="w-10 h-10 text-purple-500 mr-3" />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Access via USSD</h2>
      </div>
      
      <p className="text-gray-700 mb-4">
        You can also access the AI Health Assistant directly from your mobile phone using USSD, even without an internet connection.
      </p>
      
      <div className="bg-purple-50 border border-purple-200 p-4 rounded-md mb-6">
        <p className="text-gray-700 mb-1">To get started, dial:</p>
        <p className="text-purple-700 text-2xl font-mono font-bold my-2 text-center">{USSD_SERVICE_CODE}</p>
        <p className="text-sm text-gray-600">
          (Please replace <code className="bg-purple-100 px-1 rounded">{USSD_SERVICE_CODE}</code> with the actual service code if different.)
        </p>
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-3">What you can do via USSD:</h3>
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
        <li>Check symptoms by selecting categories and describing your concerns.</li>
        <li>Receive general health advice from our AI assistant.</li>
        <li>Access emergency contact numbers.</li>
        <li>Get quick health tips.</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-700 mb-3">Important Notes:</h3>
      <ul className="list-disc list-inside space-y-2 text-gray-600">
        <li>Standard USSD session charges may apply from your mobile network operator.</li>
        <li>The USSD service provides information similar to this web application.</li>
        <li>
            <strong>Disclaimer:</strong> This service is for informational purposes only and is not a substitute for
            professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or
            other qualified health provider with any questions you may have regarding a medical condition.
        </li>
      </ul>
       <p className="text-xs text-gray-500 mt-8 text-center">
        The availability of the USSD service may depend on your region and mobile operator.
      </p>
    </div>
  );
};
