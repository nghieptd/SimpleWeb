/* Replace with your client id and tenant id */
export const msalConfig = {
  auth: {
    clientId: '[client_id]',
    authority: 'https://login.microsoftonline.com/[tenant_id]',
    redirectUri: 'http://localhost:3000'
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  }
}

/* Note: Use full scope URI */
export const loginRequest = {
  scopes: ["[full_scope_uri]"]
};
