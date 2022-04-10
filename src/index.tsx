import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { store } from './store/store';
import { useStorage } from './store/persist';
import { AuthenticationState } from './data/slices/authenticationSlice';

const [_, saveAuth] = useStorage<AuthenticationState>('auth');
store.subscribe(() => saveAuth(store.getState().authentication));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
