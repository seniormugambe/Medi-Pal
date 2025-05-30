
//import React from 'react';
import { EMERGENCY_CONTACTS_CONTENT } from '../constants';
import { EmergencyIcon } from './IconComponents';

export const EmergencyContacts: React.FC = () => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <EmergencyIcon className="w-10 h-10 text-red-500 mr-3" />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Emergency Contacts</h2>
      </div>
      <p className="text-gray-600 mb-6">
        In case of a medical emergency, please use the following numbers. Note that some numbers may vary by region.
        Always confirm local emergency services.
      </p>
      <ul className="space-y-4">
        {EMERGENCY_CONTACTS_CONTENT.map((contact) => (
          <li key={contact.name} className="p-4 bg-red-50 border border-red-200 rounded-md">
            <h3 className="text-lg font-semibold text-red-700">{contact.name}</h3>
            <p className="text-red-600 text-xl font-mono">{contact.number}</p>
          </li>
        ))}
      </ul>
       <p className="text-sm text-gray-500 mt-8">
        <strong>Important:</strong> If you or someone else is experiencing a life-threatening emergency,
        call your local emergency number immediately or go to the nearest emergency room.
      </p>
    </div>
  );
};
    