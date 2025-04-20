
type StoryParams = {
  topic: string;
  goal: string;
  age: number;
  duration: string;
};

export const generateMockStoryText = (storyParams: StoryParams): string => {
  let storyText = `Once upon a time, there was a wonderful story about ${storyParams.topic}. `;
  
  if (storyParams.goal === "bedtime") {
    storyText += "As the stars twinkled softly in the night sky, our characters embarked on a gentle, soothing adventure. ";
  } else if (storyParams.goal === "learning") {
    storyText += "Through exciting discoveries and fascinating experiences, our characters learned valuable lessons about the world around them. ";
  } else {
    storyText += "With excitement and wonder, our characters set out on an unforgettable journey filled with surprises. ";
  }
  
  storyText += `This enchanting tale, perfect for ${storyParams.age} year olds, unfolds over ${storyParams.duration} of magical storytelling. `;
  storyText += "The characters learned that friendship, courage, and kindness could overcome any challenge. ";
  storyText += "And so, with hearts full of joy and minds full of wonder, they lived happily ever after.";
  
  return storyText;
};
