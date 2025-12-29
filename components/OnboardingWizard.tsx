import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Lock, Dices, Key, Shield, Sparkles, Map, ArrowRight, Check } from 'lucide-react';

export const OnboardingWizard: React.FC = () => {
  const { completeOnboarding } = useGame();
  const [step, setStep] = useState(0);

  const steps = [
    {
      id: 'welcome',
      title: "Your Fate is Locked",
      icon: Lock,
      color: 'text-purple-400',
      description: "Welcome to the Fate-Locked Ironman challenge. You begin with nothing. No skills. No equipment. No map access. Only your wit and the roll of the dice.",
      actionLabel: "How do I play?"
    },
    {
      id: 'grind',
      title: "Step 1: The Grind",
      icon: Dices,
      color: 'text-green-400',
      description: "Complete in-game tasks (Quests, Diaries, Slayer) or level up your skills. Once a task is complete, click the corresponding button in the 'Farm Keys' section to roll.",
      actionLabel: "What happens next?"
    },
    {
      id: 'keys',
      title: "Step 2: The Reward",
      icon: Key,
      color: 'text-osrs-gold',
      description: (
        <>
          <span className="text-green-400 font-bold">Success:</span> You earn a Key.
          <br /><br />
          <span className="text-red-400 font-bold">Failure:</span> You gain Fate Points.
          <br /><br />
          Use Keys in the 'Spend Keys' section to randomly unlock Skills, Regions, or Gear Slots.
        </>
      ),
      actionLabel: "What if I'm unlucky?"
    },
    {
      id: 'pity',
      title: "Bad Luck Protection",
      icon: Shield,
      color: 'text-osrs-pity',
      description: "Fate is cruel, but fair. If you fail rolls repeatedly, you accumulate Fate Points. Once you reach 50 points, your next failure is converted into a guaranteed Key.",
      actionLabel: "Anything else?"
    },
    {
      id: 'omni',
      title: "Omni-Keys & Chaos",
      icon: Sparkles,
      color: 'text-purple-400',
      description: "Rarely, you may find an Omni-Key. These powerful artifacts bypass the RNG, allowing you to choose exactly what you unlock. Additionally, every 50 Total Levels grants a Chaos Key—a complete wildcard unlock.",
      actionLabel: "Begin the Challenge"
    }
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-500">

      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-transparent via-${currentStep.color.split('-')[1]}-900/20 to-transparent rounded-full blur-[100px] transition-all duration-1000`}></div>
      </div>

      <div className="relative w-full max-w-lg bg-[#161616] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">

        {/* Progress Bar */}
        <div className="flex h-1 bg-black/50">
           {steps.map((_, i) => (
               <div key={i} className={`flex-1 transition-all duration-500 ${i <= step ? 'bg-osrs-gold' : 'bg-transparent'}`}></div>
           ))}
        </div>

        <div className="p-8 text-center flex flex-col items-center flex-1">

            {/* Animated Icon Container */}
            <div className="relative mb-6">
                <div className={`absolute inset-0 blur-xl opacity-40 transition-colors duration-500 ${currentStep.color.replace('text', 'bg')}`}></div>
                <div className={`w-20 h-20 bg-[#222] rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl relative z-10 transition-transform duration-500 ${step % 2 === 0 ? 'rotate-3' : '-rotate-3'}`}>
                    <Icon size={40} className={`transition-colors duration-500 ${currentStep.color}`} />
                </div>
            </div>

            <h2 className="text-2xl font-black text-white uppercase tracking-wide mb-4 animate-in slide-in-from-bottom-2 fade-in duration-500 key={step}">
                {currentStep.title}
            </h2>

            <div className="text-gray-400 leading-relaxed text-sm mb-8 min-h-[100px] animate-in slide-in-from-bottom-4 fade-in duration-700 key={`desc-${step}`}">
                {currentStep.description}
            </div>

            <button
                onClick={handleNext}
                className={`group w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${step === steps.length - 1 ? 'bg-osrs-gold text-black hover:bg-yellow-400' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}
            >
                {currentStep.actionLabel}
                {step === steps.length - 1 ? <Check size={18} /> : <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/40 text-center text-[10px] text-gray-600 font-mono uppercase tracking-widest">
            Step {step + 1} of {steps.length}
        </div>

      </div>
    </div>
  );
};