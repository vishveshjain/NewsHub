import React from 'react';

interface TabProps {
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
}

export const Tab: React.FC<TabProps> = ({ isActive, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
        isActive
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};