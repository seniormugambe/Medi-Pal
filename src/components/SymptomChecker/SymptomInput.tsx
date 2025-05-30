
import React, { useState } from 'react';
import type { SymptomCategory } from '../../types';
import { Button } from '../Button';

interface SymptomInputProps {
  selectedCategory?: SymptomCategory | null;
  onSubmitSymptoms: (symptoms: string) => void;
}

export const SymptomInput: React.FC<SymptomInputProps> = ({ selectedCategory, onSubmitSymptoms }) => {
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.trim()) {
      onSubmitSymptoms(symptoms.trim());
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Describe Your Symptoms</h2>
      {selectedCategory && (
        <p className="text-gray-600 mb-1">
          Category: <span className="font-semibold">{selectedCategory.name}</span>
        </p>
      )}
      <p className="text-gray-600 mb-4">
        Please describe your symptoms. e.g., "Persistent dry cough and slight fever for 2 days." 
        You can also mention if you're interested in conventional or herbal approaches, or current treatments.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms here..."
          rows={5}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <Button type="submit" className="w-full" disabled={!symptoms.trim()}>
          Get AI Advice
        </Button>
      </form>
       <p className="text-sm text-gray-600 mt-4 text-center">
        <strong>Disclaimer:</strong> This tool provides general information. Always consult a doctor or qualified healthcare/herbal practitioner for medical advice.
      </p>
    </div>
  );
};
