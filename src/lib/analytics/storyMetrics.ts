export interface StoryMetrics {
  readingTime: number;
  wordCount: number;
  uniqueWords: number;
  readabilityScore: number;
}

export const analyzeStory = (content: string): StoryMetrics => {
  const words = content.split(/\s+/);
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  
  // Calculate reading time (avg 200 words per minute)
  const readingTime = Math.ceil(words.length / 200);
  
  // Simple readability score (0-100)
  const avgWordLength = words.join('').length / words.length;
  const readabilityScore = Math.max(0, Math.min(100, 100 - (avgWordLength - 5) * 10));
  
  return {
    readingTime,
    wordCount: words.length,
    uniqueWords: uniqueWords.size,
    readabilityScore
  };
}