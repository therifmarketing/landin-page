import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  theme?: 'light' | 'dark';
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, theme = 'light' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const themeClasses = {
    light: {
      border: 'border-blue-200',
      titleText: 'text-navy',
      iconColor: 'text-primary-blue',
      contentText: 'text-slate-700',
    },
    dark: {
      border: 'border-primary-blue/30',
      titleText: 'text-pale-blue',
      iconColor: 'text-light-blue',
      contentText: 'text-gray-300',
    }
  };

  const currentTheme = themeClasses[theme];

  return (
    <div className={`border-b py-2 ${currentTheme.border}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
      >
        <span className={`text-md md:text-lg font-semibold ${currentTheme.titleText}`}>{title}</span>
        <span className={currentTheme.iconColor}>
             <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className={`pt-2 pb-4 ${currentTheme.contentText}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;