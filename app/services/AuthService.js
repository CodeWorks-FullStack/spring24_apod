import { AppState } from '../AppState.js'
import { audience, clientId, domain } from '../env.js'
import { accountService } from './AccountService.js'
import { api } from './AxiosService.js'

// @ts-ignore
// eslint-disable-next-line no-undef
export const AuthService = Auth0Provider.initialize({
  domain,
  clientId,
  audience,
  useRefreshTokens: true,
  redirectUri: window.location.href,
  onRedirectCallback: () => {
    window.location.replace(window.location.href)
  }
})


AuthService.redirectOptions = {
  authorizationParams: {
    redirectUri: window.location.href
  }
}
export function AuthGuard(next) {
  if (!AuthService || AuthService.loading) {
    return setTimeout(() => AuthGuard(next), 750)
  }
  return AuthService.isAuthenticated ? next() : AuthService.loginWithRedirect(AuthService.redirectOptions)
}

AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, async () => {
  api.defaults.headers.authorization = AuthService.bearer
  api.interceptors.request.use(refreshAuthToken)
  AppState.user = AuthService.user
  await accountService.getAccount()
})

async function refreshAuthToken(config) {
  if (!AuthService.isAuthenticated) { return config }
  const expires = AuthService.identity.exp * 1000
  const expired = expires < Date.now()
  const needsRefresh = expires < Date.now() + (1000 * 60 * 60 * 12)
  if (expired) {
    await AuthService.loginWithPopup()
  } else if (needsRefresh) {
    await AuthService.getTokenSilently()
  }
  api.defaults.headers.authorization = AuthService.bearer
  return config
}
