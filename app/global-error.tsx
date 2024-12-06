'use client';

import { Button } from './_components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className='flex flex-col items-center justify-center rounded-lg bg-gray-50 p-6'>
          <h1 className='text-center text-base font-semibold text-gray-700'>
            Coś poszło nie tak!
          </h1>
          <p className='mt-1 text-center text-sm text-gray-500'>
            {error.message}
          </p>
          <Button onClick={() => reset()} className='mt-6'>
            Odswież
          </Button>
        </div>
      </body>
    </html>
  );
}
