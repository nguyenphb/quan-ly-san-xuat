import React, { ComponentType } from 'react';
import { sleep } from './common';
//https://stackoverflow.com/questions/54158994/react-suspense-lazy-delay
export function myLazy<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  minimumDelay?: number,
) {
  return React.lazy(() =>
    Promise.all([factory(), sleep(minimumDelay || 700)]).then(([moduleExports]) => moduleExports),
  );
}
