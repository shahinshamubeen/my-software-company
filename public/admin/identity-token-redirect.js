(function () {
  const identityTokenNames = [
    "invite_token",
    "confirmation_token",
    "recovery_token",
    "access_token",
    "email_change_token",
  ];
  function normalizePath(path) {
    return path.endsWith("/") ? path : `${path}/`;
  }

  const adminPath = normalizePath(window.DECAP_ADMIN_PATH || "/admin/");
  const identityHashParams = new URLSearchParams(
    window.location.hash.replace(/^#/, ""),
  );
  const hasIdentityToken = identityTokenNames.some((token) =>
    identityHashParams.has(token),
  );

  if (!hasIdentityToken || normalizePath(window.location.pathname) === adminPath) {
    return;
  }

  window.location.replace(`${adminPath}${window.location.hash}`);
})();
