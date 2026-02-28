/**
 * Cloudflare Worker – GitHub OAuth-proxy for Decap CMS
 *
 * Miljøvariabler som må settes i Cloudflare-dashboardet:
 *   CLIENT_ID     – GitHub OAuth App Client ID
 *   CLIENT_SECRET – GitHub OAuth App Client Secret (kryptert)
 *
 * Endepunkter:
 *   GET /auth?provider=github&site_id=...  → redirect til GitHub OAuth
 *   GET /callback?code=...                 → bytt kode mot token, lukk popup
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      return handleAuth(url, env);
    }

    if (url.pathname === "/callback") {
      return handleCallback(url, env);
    }

    return new Response("Not found", { status: 404 });
  },
};

function handleAuth(url, env) {
  const provider = url.searchParams.get("provider");
  if (provider !== "github") {
    return new Response("Kun GitHub-autentisering er støttet.", { status: 400 });
  }

  const githubUrl = new URL("https://github.com/login/oauth/authorize");
  githubUrl.searchParams.set("client_id", env.CLIENT_ID);
  githubUrl.searchParams.set("scope", "repo,user");
  githubUrl.searchParams.set("state", url.searchParams.get("site_id") ?? "");

  return Response.redirect(githubUrl.toString(), 302);
}

async function handleCallback(url, env) {
  const code = url.searchParams.get("code");
  if (!code) {
    return errorPage("Manglende 'code'-parameter fra GitHub.");
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      client_id: env.CLIENT_ID,
      client_secret: env.CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    return errorPage(
      `GitHub OAuth-feil: ${tokenData.error_description ?? tokenData.error}`
    );
  }

  const token = tokenData.access_token;
  const content = JSON.stringify({ token, provider: "github" });
  const message = `authorization:github:success:${content}`;

  // Send token tilbake til CMS-vinduet via postMessage.
  // Flyten: popup sender "authorizing:github" til opener (wildcard),
  // CMS svarer med sin origin, popup sender token til den spesifikke origin.
  const html = `<!DOCTYPE html>
<html lang="nb">
<head>
  <meta charset="utf-8">
  <title>Autentisering fullført</title>
</head>
<body>
<p>Autentisering fullført. Vinduet lukkes automatisk.</p>
<script>
(function () {
  const message = ${JSON.stringify(message)};

  function onMessage(e) {
    window.opener.postMessage(message, e.origin);
    window.removeEventListener("message", onMessage);
  }

  window.addEventListener("message", onMessage);
  window.opener.postMessage("authorizing:github", "*");
}());
</script>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
}

function errorPage(message) {
  return new Response(
    `<!DOCTYPE html><html lang="nb"><body><p>Feil: ${message}</p></body></html>`,
    {
      status: 400,
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    }
  );
}
