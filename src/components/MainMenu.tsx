
import React from 'react';
import { Button } from './Button';
import { AppScreen } from '../types';
import { SymptomsIcon, EmergencyIcon, HealthTipsIcon, USSDIcon } from './IconComponents';

interface MainMenuProps {
  onNavigate: (screen: AppScreen) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onNavigate }) => {
  const menuItems = [
    { label: 'Check Symptoms', screen: AppScreen.SymptomCheckerFlow, icon: <SymptomsIcon className="w-8 h-8 text-blue-500"/> },
    { label: 'Emergency Contacts', screen: AppScreen.EmergencyContacts, icon: <EmergencyIcon className="w-8 h-8 text-red-500"/> },
    { label: 'Health Tips', screen: AppScreen.HealthTips, icon: <HealthTipsIcon className="w-8 h-8 text-green-500"/> },
    { label: 'Access via USSD', screen: AppScreen.USSDInfo, icon: <USSDIcon className="w-8 h-8 text-purple-500"/> },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4">
      <h2 className="text-3xl font-bold text-gray-700 mb-8">Welcome!</h2>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        How can I assist you today? Select an option below. This tool offers informational insights
        on general health, considering both conventional and herbal perspectives.
        It is not a replacement for professional medical or qualified herbalist advice.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.screen)}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col items-center text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <div className="mb-4 p-3 bg-gray-100 rounded-full">
              {item.icon}
            </div>
            <span className="text-lg font-semibold text-gray-700">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
