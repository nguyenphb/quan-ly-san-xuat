import { DEFAULT_FALLBACK_IMG } from '@/common/contanst/img';
import { SyntheticEvent } from 'react';

export const onImageLoadError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.onerror = null;
  e.currentTarget.setAttribute('src', DEFAULT_FALLBACK_IMG);
  e.currentTarget.removeAttribute('srcset');
};
