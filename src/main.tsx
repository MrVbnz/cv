import { StrictMode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { App } from './App';
import { LocaleProvider } from './i18n/LocaleProvider';
import { system } from './theme';
import './print.css';

const root = createRoot(document.getElementById('root')!);

// Mount the fragment targets before the browser resolves the initial anchor.
flushSync(() => {
  root.render(
    <StrictMode>
      <ChakraProvider value={system}>
        <LocaleProvider>
          <App />
        </LocaleProvider>
      </ChakraProvider>
    </StrictMode>,
  );
});
