"use client";

import { Provider } from 'react-redux';
import { store } from '@/lib/config/store';

export default function FormProviderWrapper({children}: React.PropsWithChildren) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}