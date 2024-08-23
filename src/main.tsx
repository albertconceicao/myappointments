import ReactDOM from 'react-dom/client';

import { App } from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
serviceWorkerRegistration.register();
