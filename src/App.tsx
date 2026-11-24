import { useState } from 'react';
import { MobileContainer } from './components/layout/MobileContainer';
import { LanguageSelection } from './components/screens/LanguageSelection';
import { RoyalEntrance } from './components/screens/RoyalEntrance';
import { EnvelopeOpening } from './components/screens/EnvelopeOpening';
import { InvitationScreen } from './components/screens/InvitationScreen';
import type { Language } from './types';

type ScreenStep = 'language' | 'entrance' | 'envelope' | 'invitation';

export function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [currentStep, setCurrentStep] = useState<ScreenStep>('language');

  const handleSelectLanguage = (language: Language) => {
    setSelectedLanguage(language);
    setCurrentStep('entrance');
  };

  const handleEntranceComplete = () => {
    setCurrentStep('envelope');
  };

  const handleEnvelopeComplete = () => {
    setCurrentStep('invitation');
  };

  return (
    <MobileContainer>
      {/* Step 1: Language Selection Screen */}
      {currentStep === 'language' && (
        <LanguageSelection
          onSelectLanguage={handleSelectLanguage}
          selectedLanguage={selectedLanguage}
        />
      )}

      {/* Step 2: Royal Entrance Video & Golden Transition */}
      {currentStep === 'entrance' && selectedLanguage && (
        <RoyalEntrance
          language={selectedLanguage}
          onComplete={handleEntranceComplete}
        />
      )}

      {/* Step 3: Automatic Royal Envelope Opening Experience */}
      {currentStep === 'envelope' && selectedLanguage && (
        <EnvelopeOpening
          language={selectedLanguage}
          onComplete={handleEnvelopeComplete}
        />
      )}

      {/* Step 4: Final Stationary Full-Screen Invitation */}
      {currentStep === 'invitation' && selectedLanguage && (
        <InvitationScreen
          language={selectedLanguage}
        />
      )}
    </MobileContainer>
  );
}

export default App;
