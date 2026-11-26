// Run before the module graph: a stale module must not prevent the worker update.
if ('serviceWorker' in navigator) {
  const hadController = Boolean(navigator.serviceWorker.controller);
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (hadController && !reloading) {
      reloading = true;
      window.location.reload();
    }
  });
  navigator.serviceWorker.register('./sw.js?v=z2-1', {updateViaCache: 'none'})
    .then(registration => registration.update())
    .catch(() => {});
}
