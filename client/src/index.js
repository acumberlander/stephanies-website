import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import reducers from './reducers';

import App from './App';

const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(thunk))
);
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
<Provider store={store}>
		<App />
</Provider>
)

