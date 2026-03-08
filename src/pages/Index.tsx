import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import OnboardingScreen from '@/components/OnboardingScreen';
import HomeScreen from '@/components/HomeScreen';
import ServersScreen from '@/components/ServersScreen';
import SettingsScreen from '@/components/SettingsScreen';

const Index = () => {
  const { currentScreen } = useAppStore();

  const screens: Record<string, JSX.Element> = {
    onboarding: <OnboardingScreen />,
    home: <HomeScreen />,
    servers: <ServersScreen />,
    settings: <SettingsScreen />,
  };

  return (
    <div className="h-screen h-[100dvh] overflow-hidden max-w-lg mx-auto relative sm:max-w-md md:max-w-lg lg:max-w-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {screens[currentScreen]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
