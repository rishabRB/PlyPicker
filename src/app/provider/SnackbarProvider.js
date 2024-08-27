'use client';

import { SnackbarProvider as NotistackProvider } from 'notistack';

export default function SnackbarProvider({ children }) {
  return (
    <NotistackProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      {children}
    </NotistackProvider>
  );
}