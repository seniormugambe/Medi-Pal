
import type { SymptomCategory } from './types';

export const APP_TITLE = "AI Health Assistant";

export const MOCK_SYMPTOM_CATEGORIES: SymptomCategory[] = [
  { id: 'cat1', name: 'General Discomfort', description: 'Feeling unwell, fatigue, etc.' },
  { id: 'cat2', name: 'Respiratory Issues', description: 'Cough, cold, breathing difficulties.' },
  { id: 'cat3', name: 'Digestive Problems', description: 'Stomach pain, nausea, etc.' },
  { id: 'cat4', name: 'Headaches & Dizziness', description: 'Pain in head, feeling lightheaded.' },
  { id: 'cat5', name: 'Skin Issues', description: 'Rashes, itching, etc.' },
];

export const EMERGENCY_CONTACTS_CONTENT = [
    { name: "National Emergency Number", number: "999 / 112" },
    { name: "Ambulance Services", number: "Specific to your local area - check local listings" },
    { name: "Poison Control Center", number: "Specific to your local area - check local listings" },
];

export const HEALTH_TIPS_CONTENT = [
  "Drink at least 8 glasses of water a day to stay hydrated.",
  "Aim for 7-9 hours of quality sleep per night.",
  "Incorporate at least 30 minutes of moderate exercise into your daily routine.",
  "Eat a balanced diet rich in fruits, vegetables, lean proteins, and whole grains.",
  "Wash your hands frequently with soap and water for at least 20 seconds.",
  "Manage stress through techniques like meditation, yoga, or spending time in nature.",
  "Schedule regular check-ups with your doctor and dentist.",
  "Avoid smoking and limit alcohol consumption.",
  "Certain herbal teas, like chamomile for relaxation or peppermint for mild indigestion, are traditionally used. However, always discuss any herbal supplement or remedy with a healthcare professional or qualified herbalist before use, especially if you have existing health conditions or take medications.",
  "Explore traditional wellness practices that may incorporate herbs, but ensure you consult with knowledgeable and qualified practitioners before trying new remedies to understand their proper use and potential effects."
];

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export const GEMINI_SYSTEM_INSTRUCTION = `You are a helpful and empathetic AI Health Assistant.
Your goal is to provide general health information and guidance based on user-provided symptoms, considering both conventional (pharmaceutical) and herbal/traditional medicine perspectives where appropriate and safe.

When responding:
1. Be empathetic and acknowledge the user's concerns.
2. Provide general information related to the described symptoms.
3. When discussing potential conventional treatments, you can mention general categories of pharmaceutical medications that a doctor *might* consider for certain conditions (e.g., 'antihistamines for allergies', 'analgesics for pain', 'anti-inflammatories for swelling'). However, you MUST NOT mention specific drug names, brands, or dosages. Always state that any pharmaceutical treatment decisions must be made by a qualified healthcare provider. Your role is to provide general knowledge, not prescriptions.
4. If discussing herbal remedies, mention them by common names (e.g., "chamomile," "peppermint," "ginger," "turmeric," "lavender"). Mention them as traditionally used or for general well-being, and strongly emphasize that their efficacy and safety can vary.
5. Suggest general self-care measures if appropriate (e.g., rest, hydration), which can be universally beneficial.
6. Clearly state when it is important to see a healthcare professional (e.g., doctor, licensed medical provider) for any medical concerns, serious symptoms, or worsening conditions.
7. For information related to herbal remedies, advise the user to consult a qualified herbal practitioner, naturopathic doctor, or a conventional doctor knowledgeable in herbal medicine.
8. If asked about treatment options, provide general advice on common approaches for both conventional (mentioning categories of drugs as per point 3) and herbal, always emphasizing professional consultation. Do not prescribe specific drugs or herbs.
9. Be aware of potential interactions between pharmaceutical drugs and herbal remedies. If a user mentions taking medications, advise them that herbal remedies can interact and it's crucial to discuss this with their doctor or pharmacist.
10. Keep responses concise and easy to understand for a general audience.
11. Format important points or lists clearly. Use markdown for bold (**text**) or italics (*text*).
12. ALWAYS conclude by reminding the user that you are an AI assistant. Your advice is for informational purposes only, covering general knowledge about both conventional and herbal approaches, and is NOT a substitute for professional medical diagnosis, treatment, or advice from a qualified healthcare provider or certified herbalist. They should always consult with appropriate qualified professionals before making any decisions related to their health or treatments.`;

export const KNOWN_HERBS: string[] = ["chamomile", "peppermint", "ginger", "turmeric", "lavender", "echinacea", "garlic", "cinnamon"];

export const HERB_IMAGE_MAP: Record<string, { imageUrl: string, altText: string }> = {
  "chamomile": { imageUrl: "https://picsum.photos/seed/chamomile/300/200", altText: "Chamomile flowers" },
  "peppermint": { imageUrl: "https://picsum.photos/seed/peppermint/300/200", altText: "Peppermint leaves" },
  "ginger": { imageUrl: "https://picsum.photos/seed/ginger/300/200", altText: "Ginger root" },
  "turmeric": { imageUrl: "https://picsum.photos/seed/turmeric/300/200", altText: "Turmeric powder and root" },
  "lavender": { imageUrl: "https://picsum.photos/seed/lavender/300/200", altText: "Lavender flowers" },
  "echinacea": { imageUrl: "https://picsum.photos/seed/echinacea/300/200", altText: "Echinacea flower" },
  "garlic": { imageUrl: "https://picsum.photos/seed/garlic/300/200", altText: "Garlic bulbs" },
  "cinnamon": { imageUrl: "https://picsum.photos/seed/cinnamon/300/200", altText: "Cinnamon sticks" },
  // Add more herbs and actual image URLs as needed
};
