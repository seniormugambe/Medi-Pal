
import React from 'react';
import type { SymptomCategory } from '../../types';
import { MOCK_SYMPTOM_CATEGORIES } from '../../constants';
import { Button } from '../Button';

interface CategorySelectionProps {
  onSelectCategory: (category: SymptomCategory) => void;
  onSkip?: () => void; // Optional: If user wants to directly input symptoms
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({ onSelectCategory, onSkip }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Symptom Checker</h2>
      <p className="text-gray-600 mb-6">Please select a category that best describes your symptoms, or skip to describe them directly.</p>
      <div className="space-y-3">
        {MOCK_SYMPTOM_CATEGORIES.map((category) => (
          <Button
            key={category.id}
            variant="secondary"
            className="w-full text-left justify-start !bg-gray-100 hover:!bg-gray-200 !text-gray-700"
            onClick={() => onSelectCategory(category)}
          >
            <span className="font-medium">{category.name}</span>
            {category.description && <span className="text-sm text-gray-500 ml-2 hidden sm:inline">- {category.description}</span>}
          </Button>
        ))}
      </div>
      {onSkip && (
         <div className="mt-6 text-center">
            <Button
                variant="ghost"
                onClick={onSkip}
            >
                Skip and Describe Symptoms Directly
            </Button>
         </div>
      )}
    </div>
  );
};
    