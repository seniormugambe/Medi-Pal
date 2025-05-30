
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AppScreen } from '../types';


interface LayoutProps {
  children: React.ReactNode;
  currentScreen: AppScreen;
  onNavigateToMain: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentScreen, onNavigateToMain }) => {
  const showBackButton = currentScreen !== AppScreen.MainMenu;
  
  const getTitle = () => {
    switch(currentScreen) {
      case AppScreen.SymptomCheckerFlow: return "Symptom Checker";
      case AppScreen.EmergencyContacts: return "Emergency Contacts";
      case AppScreen.HealthTips: return "Health Tips";
      case AppScreen.USSDInfo: return "Access via USSD";
      case AppScreen.MainMenu:
      default:
        return "AI Health Assistant";
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        showBackButton={showBackButton} 
        onBack={onNavigateToMain}
        title={getTitle()}
      />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};