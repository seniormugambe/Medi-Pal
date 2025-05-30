
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} AI Health Assistant. All rights reserved.
      </p>
      <p className="text-xs mt-1">
        This service provides general information on health, including conventional and herbal approaches. 
        It is not a substitute for professional medical advice or consultation with a qualified herbalist.
      </p>
    </footer>
  );
};


