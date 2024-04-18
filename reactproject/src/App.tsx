import { FormEvent, useState } from 'react';

function App() {
  const [num1, setNumber1] = useState('');
  const [num2, setNumber2] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (num1 === '' || num2 === '') {
      setError('Por favor, preencha os dois campos!');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('http://localhost:3000/sum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          num1: parseInt(num1),
          num2: parseInt(num2),
        }),
      }).finally(() => setLoading(false));

      if (!response.ok) {
        throw new Error('Failed to fetch the result');
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err: unknown) {
      setError('Parece que houve um erro. Tente novamente mais tarde.');
    }
  }

  async function handleClear(e: FormEvent) {
    e.preventDefault();

    setNumber1('');
    setNumber2('');
    setResult('');
    setError('');
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-screen font-bold bg-container-background antialiased'>
      <form className='flex gap-4 flex-col md:flex-row' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 w-full'>
          <div className='flex gap-4'>
            <input
              type='number'
              className='px-3 rounded'
              placeholder='Valor 1'
              value={num1}
              onChange={(e) => setNumber1(e.target.value)}
            />
            <input
              type='number'
              className='p-3 rounded'
              placeholder='Valor 2'
              value={num2}
              onChange={(e) => setNumber2(e.target.value)}
            />
          </div>

          {error && <p className='text-red-500'>{error}</p>}

          <p className='bg-result-background p-4 rounded'>
            Resultado: <span>{result}</span>{' '}
          </p>
        </div>

        <div className='flex items-start gap-4'>
          <button
            className='bg-blue-button px-6 py-3.5 text-white rounded text-sm disable:cursor-not-allowed disable:bg-gray-400 disable:text-gray-800'
            disabled={loading}
            type='submit'
          >
            Calcular
          </button>
          <button
            className='bg-gray-button px-6 py-3.5 text-white rounded text-sm '
            type='button'
            onClick={handleClear}
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
 