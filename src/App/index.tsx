import { BrowserRouter } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../assets/styles/global';
import defaultTheme from '../assets/styles/themes/default';
import { Header } from '../components/Header';
import { AppRoutes } from '../routes';

import { NavigationContainer } from './styles';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles theme={defaultTheme} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />
      <BrowserRouter>
        <Header />
        <NavigationContainer>
          {/* <SideBar /> */}
          <AppRoutes />
        </NavigationContainer>
      </BrowserRouter>
    </ThemeProvider>
  );
}
