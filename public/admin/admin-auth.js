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

  if (!window.netlifyIdentity) return;

  function reloadCleanAdmin() {
    if (
      normalizePath(window.location.pathname) === adminPath &&
      !window.location.search &&
      !window.location.hash
    ) {
      window.location.reload();
      return;
    }

    window.location.replace(adminPath);
  }

  window.netlifyIdentity.on("login", function () {
    if (hasIdentityToken) {
      window.location.replace(adminPath);
    }
  });

  window.netlifyIdentity.on("logout", function () {
    window.setTimeout(reloadCleanAdmin, 0);
  });
})();
