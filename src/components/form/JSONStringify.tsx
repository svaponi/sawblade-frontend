'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  obj: any;
}

export default function JSONStringify({ obj }: Props) {
  const [show, setShow] = useState(false);
  return show ? (
    <div className="my-4">
      <Button variant={'ghost'} onClick={() => setShow(false)}>
        Hide JSON
      </Button>
      <div className="my-4 rounded-xl bg-accent-foreground p-4 text-xs text-accent">
        <code>
          <pre>{JSON.stringify(obj, null, 2)}</pre>
        </code>
      </div>
    </div>
  ) : (
    <div className="my-4">
      <Button variant={'ghost'} onClick={() => setShow(true)}>
        Show JSON
      </Button>
    </div>
  );
}
