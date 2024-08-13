import { ThemeProvider } from 'styled-components';

import GlobalStyles from './assets/styles/global';
import defaultTheme from './assets/styles/themes/default';
import { Form } from './components/Form';
import { useRenderCounter } from './hooks/useRenderCounter';

export function App() {
  useRenderCounter('App');

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles theme={defaultTheme} />
      <Form />
    </ThemeProvider>
  );
}
