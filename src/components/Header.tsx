
import React from 'react';
import { APP_TITLE } from '../constants';
import { MenuIcon, BackIcon } from './IconComponents';

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ showBackButton, onBack, title = APP_TITLE }) => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton && onBack && (
            <button onClick={onBack} className="mr-3 p-1 rounded-full hover:bg-blue-700 transition-colors">
              <BackIcon className="w-6 h-6" />
            </button>
          )}
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        {/* Placeholder for potential future icons like settings or profile */}
        {/* <MenuIcon className="w-6 h-6 cursor-pointer" /> */}
      </div>
    </header>
  );
};
    