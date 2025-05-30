//import React, { useState, useMemo } from 'react';
import { useState, useMemo } from 'react';

import { AppScreen } from './types';
import { Layout } from './components/Layout';
import { MainMenu } from './components/MainMenu';
import { EmergencyContacts } from './components/EmergencyContacts';
import { HealthTipsView } from './components/HealthTipsView';
import { SymptomCheckerFlow } from './components/SymptomChecker/SymptomCheckerFlow';
import { USSDInfoScreen } from './components/USSDInfoScreen'; // Import new screen
import { GeminiService } from './services/GeminiService';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.MainMenu);
  
  // Initialize Gemini Service. API key is handled within the service.
  // useMemo ensures the service is instantiated only once.
  const geminiService = useMemo(() => new GeminiService(), []);

  const navigateTo = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  const navigateToMain = () => {
    setCurrentScreen(AppScreen.MainMenu);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.MainMenu:
        return <MainMenu onNavigate={navigateTo} />;
      case AppScreen.SymptomCheckerFlow:
        return <SymptomCheckerFlow geminiService={geminiService} onFlowComplete={navigateToMain} />;
      case AppScreen.EmergencyContacts:
        return <EmergencyContacts />;
      case AppScreen.HealthTips:
        return <HealthTipsView />;
      case AppScreen.USSDInfo: // Add case for USSDInfo
        return <USSDInfoScreen />;
      default:
        return <p>Unknown screen</p>;
    }
  };

  return (
    <Layout currentScreen={currentScreen} onNavigateToMain={navigateToMain}>
      {renderScreen()}
    </Layout>
  );
};

export default App;