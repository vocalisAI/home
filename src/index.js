import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { loadInitialRoute } from './App';
import { LEGACY_HASHES } from './data/site';
import reportWebVitals from './reportWebVitals';

function mount(initialRoute) {
  const root = document.getElementById('root');
  const { hash, search } = window.location;
  // The static HTML contains the canonical page. These two URL options can change its initial view.
  const featureLink = initialRoute?.path === '/product' && new URLSearchParams(search).has('feature');
  const legacyLink = initialRoute?.path === '/' && Object.hasOwn(LEGACY_HASHES, hash);
  const app = (
    <React.StrictMode>
      <App initialRoute={initialRoute} />
    </React.StrictMode>
  );
  if (root.dataset.prerendered === initialRoute?.path && initialRoute && !featureLink && !legacyLink) {
    ReactDOM.hydrateRoot(root, app);
  } else {
    ReactDOM.createRoot(root).render(app);
  }
}

// Keep the pre-rendered page visible until its interactive route is ready.
loadInitialRoute(window.location.pathname).then(mount).catch(() => {
  if (!document.querySelector('#root main')) mount();
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
