import store from './store/index';
import { Provider } from 'react-redux';

import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
      <App />
  </Provider>,
);
