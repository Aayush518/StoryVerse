// Simulated AI suggestions using predefined patterns
export const generateSuggestions = (content: string): string[] => {
  const suggestions = [];
  
  // Word count analysis
  const words = content.split(/\s+/).length;
  if (words < 100) {
    suggestions.push("Consider expanding your story with more descriptive details");
  }

  // Emotional tone detection (simplified)
  const emotionalWords = ['happy', 'sad', 'angry', 'excited', 'worried'];
  const hasEmotions = emotionalWords.some(word => content.toLowerCase().includes(word));
  if (!hasEmotions) {
    suggestions.push("Try incorporating emotional elements to engage readers");
  }

  // Scene structure
  const paragraphs = content.split('\n\n').length;
  if (paragraphs < 3) {
    suggestions.push("Break your story into more scenes for better pacing");
  }

  return suggestions;
}