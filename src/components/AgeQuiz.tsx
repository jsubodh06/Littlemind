import React, { useState } from 'react';
import { Product, QuizQuestion } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductIllustration } from './ProductIllustrations';
import { soundManager } from '../utils/audio';

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: "How many months old is your baby?",
    subtitle: "Every month brings new neurological superpowers.",
    options: [
      { id: '0-3m', label: '0 – 3 Months', reaction: 'giggle', subtext: 'Sleepy gazing, high contrast & soothing lullabies' },
      { id: '4-8m', label: '4 – 8 Months', reaction: 'clap', subtext: 'Reaching, grasping & soothing teething gums' },
      { id: '9-18m', label: '9 – 18 Months', reaction: 'thumbsup', subtext: 'Crawling, first steps & stacking towers' },
      { id: '2-4y', label: '2+ Years', reaction: 'clap', subtext: 'Shape sorting, pretend play & active motor skills' },
    ],
  },
  {
    id: 2,
    title: "What makes them light up right now?",
    subtitle: "Tell us their favorite mode of play.",
    options: [
      { id: 'sound', label: 'Gentle sounds & swaying mobiles', reaction: 'giggle', subtext: 'Acoustic comfort and celestial shapes' },
      { id: 'chew', label: 'Chewing & grasping everything', reaction: 'clap', subtext: 'Safe food-grade silicone & beechwood textures' },
      { id: 'stack', label: 'Tumbling, stacking & rolling', reaction: 'thumbsup', subtext: 'Physics cause-and-effect and first balance' },
      { id: 'rhythm', label: 'Drumming, tapping & beats', reaction: 'clap', subtext: 'Early rhythm and bilateral hand coordination' },
    ],
  },
  {
    id: 3,
    title: "What style aesthetic do you love most?",
    subtitle: "We curate heirloom pieces that complement your home.",
    options: [
      { id: 'scandi', label: 'Natural Scandinavian Wood', reaction: 'thumbsup', subtext: 'Unfinished beech, warm amber & clean lines' },
      { id: 'pastel', label: 'Soft Whimsical Pastels', reaction: 'clap', subtext: 'Dusty rose, butter yellow, sage & sky blue' },
      { id: 'cozy', label: 'Organic Cotton & Knit Plush', reaction: 'giggle', subtext: 'Heirloom stitches and breathable sleepwear' },
    ],
  },
];

interface AgeQuizProps {
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
}

export const AgeQuiz: React.FC<AgeQuizProps> = ({ onAddToCart }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [activeReaction, setActiveReaction] = useState<'clap' | 'giggle' | 'thumbsup' | null>(null);
  const [unwrappedBoxes, setUnwrappedBoxes] = useState<Record<number, boolean>>({});

  const handleSelectOption = (option: { id: string; reaction: 'clap' | 'giggle' | 'thumbsup' }) => {
    setActiveReaction(option.reaction);
    soundManager.playGiggle();
    setAnswers((prev) => ({ ...prev, [currentStep]: option.id }));

    setTimeout(() => {
      setActiveReaction(null);
      if (currentStep < QUIZ_QUESTIONS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // Complete quiz -> reveal unwrapping boxes
        setCurrentStep(QUIZ_QUESTIONS.length);
        soundManager.playCelebration();
        // Automatically unwrap boxes one by one with cascade!
        setTimeout(() => setUnwrappedBoxes((p) => ({ ...p, 0: true })), 500);
        setTimeout(() => setUnwrappedBoxes((p) => ({ ...p, 1: true })), 1200);
        setTimeout(() => setUnwrappedBoxes((p) => ({ ...p, 2: true })), 1900);
      }
    }, 700);
  };

  const restartQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setUnwrappedBoxes({});
    setActiveReaction(null);
  };

  // Curate 3 recommended products based on answers or default best matching
  const recommendedProducts: Product[] = [PRODUCTS[0], PRODUCTS[2], PRODUCTS[4]];

  return (
    <section id="milestones-quiz" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-rose-50/60 via-amber-50/40 to-sky-50/60 rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-xs relative overflow-hidden">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 bg-rose-100/70 px-3 py-1 rounded-full">
            Personalized Milestone Matcher
          </span>
          <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
            Find the Perfect Play Stage Match
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Answer 3 quick questions. Watch the little baby react, then unwrap tailored recommendations!
          </p>
        </div>

        {/* Baby Reaction Character Banner */}
        <div className="flex justify-center mb-6">
          <div className="relative w-28 h-24 flex items-center justify-center">
            {/* Clap Animation */}
            {activeReaction === 'clap' && (
              <div className="flex flex-col items-center animate-baby-giggle">
                <svg viewBox="0 0 80 80" className="w-20 h-20">
                  <circle cx="40" cy="40" r="28" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1.5" />
                  <circle cx="28" cy="44" r="5" fill="#FDA4AF" />
                  <circle cx="52" cy="44" r="5" fill="#FDA4AF" />
                  {/* Clapping Hands */}
                  <g className="animate-ping">
                    <circle cx="32" cy="62" r="6" fill="#FED7AA" />
                    <circle cx="48" cy="62" r="6" fill="#FED7AA" />
                  </g>
                  {/* Happy closed arched eyes */}
                  <path d="M30 36 Q34 32 38 36" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M42 36 Q46 32 50 36" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M34 48 Q40 54 46 48" stroke="#E11D48" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
                <span className="bg-white text-rose-600 font-bold text-xs px-2 py-0.5 rounded-full shadow-xs border border-rose-200 -mt-2 animate-popcorn">
                  Clap Clap! 👏
                </span>
              </div>
            )}

            {/* Giggle Animation */}
            {activeReaction === 'giggle' && (
              <div className="flex flex-col items-center animate-baby-giggle">
                <svg viewBox="0 0 80 80" className="w-20 h-20">
                  <circle cx="40" cy="40" r="28" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1.5" />
                  <circle cx="28" cy="44" r="6" fill="#FDA4AF" />
                  <circle cx="52" cy="44" r="6" fill="#FDA4AF" />
                  <circle cx="34" cy="35" r="3" fill="#1E293B" />
                  <circle cx="46" cy="35" r="3" fill="#1E293B" />
                  {/* Open laugh mouth */}
                  <path d="M34 46 C34 56 46 56 46 46 Z" fill="#E11D48" />
                </svg>
                <span className="bg-white text-amber-600 font-bold text-xs px-2 py-0.5 rounded-full shadow-xs border border-amber-200 -mt-2 animate-popcorn">
                  Tee-hee! 🍼
                </span>
              </div>
            )}

            {/* Thumbs Up Animation */}
            {activeReaction === 'thumbsup' && (
              <div className="flex flex-col items-center animate-popcorn">
                <svg viewBox="0 0 80 80" className="w-20 h-20">
                  <circle cx="40" cy="40" r="28" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1.5" />
                  <circle cx="28" cy="44" r="5" fill="#FDA4AF" />
                  <circle cx="52" cy="44" r="5" fill="#FDA4AF" />
                  <circle cx="34" cy="36" r="3" fill="#1E293B" />
                  <circle cx="46" cy="36" r="3" fill="#1E293B" />
                  <path d="M35 48 Q40 54 45 48" stroke="#E11D48" strokeWidth="2" fill="none" strokeLinecap="round" />
                  {/* Baby Thumbs Up Fist */}
                  <circle cx="62" cy="46" r="7" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1" />
                  <path d="M62 46 L62 36 C62 34 65 34 65 36 L65 46" stroke="#FDBA74" strokeWidth="2.5" fill="#FED7AA" strokeLinecap="round" />
                </svg>
                <span className="bg-white text-emerald-600 font-bold text-xs px-2 py-0.5 rounded-full shadow-xs border border-emerald-200 -mt-2 animate-popcorn">
                  Yay! 👍
                </span>
              </div>
            )}

            {/* Neutral Waiting Baby */}
            {!activeReaction && (
              <svg viewBox="0 0 80 80" className="w-18 h-18 opacity-90 hover:scale-105 transition-transform">
                <circle cx="40" cy="40" r="26" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1.2" />
                <circle cx="29" cy="43" r="4.5" fill="#FDA4AF" />
                <circle cx="51" cy="43" r="4.5" fill="#FDA4AF" />
                <circle cx="35" cy="37" r="2.5" fill="#1E293B" />
                <circle cx="45" cy="37" r="2.5" fill="#1E293B" />
                <path d="M37 46 Q40 50 43 46" stroke="#E11D48" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              </svg>
            )}
          </div>
        </div>

        {/* Question View */}
        {currentStep < QUIZ_QUESTIONS.length ? (
          <div>
            <div className="flex justify-between items-center max-w-lg mx-auto mb-4 text-xs text-stone-500 font-medium">
              <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
              <div className="flex gap-1.5">
                {QUIZ_QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-1.5 rounded-full transition-colors ${
                      i <= currentStep ? 'bg-amber-400' : 'bg-stone-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="max-w-xl mx-auto bg-white/80 rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
              <h3 className="font-['Outfit'] text-xl font-bold text-stone-900 text-center mb-1">
                {QUIZ_QUESTIONS[currentStep].title}
              </h3>
              <p className="text-xs text-stone-500 text-center mb-6">
                {QUIZ_QUESTIONS[currentStep].subtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {QUIZ_QUESTIONS[currentStep].options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    className="p-4 rounded-xl border border-stone-200 bg-white hover:border-amber-400 hover:bg-amber-50/40 text-left transition-all hover:scale-[1.02] active:scale-98 shadow-2xs group cursor-pointer"
                  >
                    <div className="font-['Outfit'] font-bold text-stone-900 text-sm group-hover:text-amber-900 flex items-center justify-between">
                      <span>{opt.label}</span>
                      <span className="text-sm opacity-60 group-hover:opacity-100 transition-opacity">
                        {opt.reaction === 'clap' ? '👏' : opt.reaction === 'giggle' ? '🍼' : '👍'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {opt.subtext}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Result View: 3 Unwrapping Gift Boxes */
          <div className="text-center">
            <h3 className="font-['Outfit'] text-2xl font-bold text-stone-900 mb-2">
              🎉 Unwrapped Just for Your Little One!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mb-8 max-w-md mx-auto">
              Our child development experts matched these heirloom essentials to your milestone stage:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              {recommendedProducts.map((prod, index) => {
                const isUnwrapped = !!unwrappedBoxes[index];

                return (
                  <div
                    key={prod.id}
                    className="relative bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm flex flex-col justify-between"
                  >
                    {/* Wrapped Gift Box Overlay (unwraps with animation) */}
                    {!isUnwrapped && (
                      <div
                        onClick={() => {
                          soundManager.playCelebration();
                          setUnwrappedBoxes((p) => ({ ...p, [index]: true }));
                        }}
                        className="absolute inset-0 bg-gradient-to-br from-rose-100 via-amber-100 to-rose-200 rounded-3xl z-20 flex flex-col items-center justify-center p-6 cursor-pointer hover:scale-102 transition-transform shadow-md animate-cradle-gentle"
                        title="Click to unwrap this surprise box!"
                      >
                        <div className="text-4xl mb-2 animate-bounce">🎁</div>
                        <span className="font-['Outfit'] font-bold text-stone-800 text-sm">
                          Milestone Pick #{index + 1}
                        </span>
                        <span className="text-xs text-stone-600 mt-1 bg-white/80 px-2 py-0.5 rounded-full border border-stone-200">
                          Click to Unwrap ✨
                        </span>
                      </div>
                    )}

                    {/* Unwrapped Product Inside */}
                    <div className={isUnwrapped ? 'animate-popcorn' : 'opacity-0'}>
                      <div className="w-full aspect-4/3 rounded-2xl bg-amber-50/50 p-4 mb-3 flex items-center justify-center">
                        <ProductIllustration type={prod.imageType} className="w-full h-full object-contain" />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider">
                          {prod.ageLabel}
                        </span>
                        <h4 className="font-['Outfit'] font-bold text-stone-900 text-sm mt-0.5 line-clamp-1">
                          {prod.name}
                        </h4>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
                          <span className="font-mono font-bold text-stone-900 text-base">
                            ₹{prod.price}
                          </span>
                          <button
                            onClick={(e) => onAddToCart(prod, e)}
                            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={restartQuiz}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 underline underline-offset-4 cursor-pointer"
            >
              ← Retake Milestone Quiz
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
