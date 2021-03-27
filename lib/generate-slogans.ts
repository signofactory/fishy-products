const generateSlogans = async (name: string, _description: string) => {
  // Generates the results using OpenAI
  const fakeGenerations = [
    `Idea 1 for ${name}`,
    `Idea 2 for ${name}`,
    `Idea 3 for ${name}`,
  ];
  return fakeGenerations;
};

export default generateSlogans;
