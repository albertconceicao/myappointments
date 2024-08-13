import { ThemeProvider } from 'styled-components';

import GlobalStyles from './assets/styles/global';
import defaultTheme from './assets/styles/themes/default';
import { useRenderCounter } from './hooks/useRenderCounter';
import { Login } from './pages/Login';

export function App() {
  useRenderCounter('App');

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles theme={defaultTheme} />
      <Login />
    </ThemeProvider>
  );
}
