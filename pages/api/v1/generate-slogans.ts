import { NextApiRequest, NextApiResponse } from 'next';

// Libs
import generateSlogans from '@lib/generate-slogans';
// import { filterUnsafeContent } from '@lib/filter-completions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // if (!process.env.OPENAI_TOKEN) {
  //   res.status(500).send('No API key found');
  //   return;
  // }

  if (req.method !== 'POST') {
    return res.status(400).send({ message: 'Bad HTTP method' });
  }

  try {
    const { name, description } = req.body;

    const completions = await generateSlogans(name, description);

    res.status(200).send({
      message: 'Taglines generated successfully',
      completions,
    });
    return;
  } catch (err) {
    res.status(500).send('There was an error generating your taglines');
  }

  // If no OpenAI key found
  res.status(500).end();
  return;
}
