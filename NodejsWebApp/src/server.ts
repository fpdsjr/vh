import express, { Request, Response } from 'express';
import cors from 'cors';
import z from 'zod';

const app = express();

app.use(express.json());

const sumSchema = z.object({
  num1: z.number(),
  num2: z.number(),
});

app.use(
  cors({
    origin: '*',
  })
);

const port = 3000;

app.use('/sum', (request: Request, response: Response) => {
  try {
    const { num1, num2 } = sumSchema.parse(request.body);
    const result = num1 + num2;
    return response.json({ result });
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} - v.0.11`);
});
