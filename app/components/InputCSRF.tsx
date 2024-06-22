'use client';

import { getCsrfToken } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function InputCSRF() {
  const [csrfToken, setCsrfToken] = useState<string>('');
  useEffect(() => {
    getCsrfToken().then((val) => setCsrfToken(val));
  }, []);
  return (
    <input type="hidden" id="csrfToken" name="csrfToken" value={csrfToken} />
  );
}
