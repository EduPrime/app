import {createZITADELAuth} from "@zitadel/vue";
import {SignInType} from 'vue-oidc-client/vue3';
import {User} from "oidc-client";

const zitadelAuth = createZITADELAuth({
    project_resource_id: '274495810312371494',
    client_id: "274501621537406246@permissao-api",
    issuer: "https://eduprime-ikzrub.zitadel.cloud/",
  }, 'zitadelauth',
  SignInType.Window,
  'http://localhost:5173',
  {redirect_uri: 'http://localhost:5173/callback'})

// handle events
zitadelAuth.oidcAuth.events.addAccessTokenExpiring(function () {
  // eslint-disable-next-line no-console
  console.log('access token expiring')
})

zitadelAuth.oidcAuth.events.addAccessTokenExpired(function () {
  // eslint-disable-next-line no-console
  console.log('access token expired')
})

zitadelAuth.oidcAuth.events.addSilentRenewError(function (err: Error) {
  // eslint-disable-next-line no-console
  console.error('silent renew error', err)
})

zitadelAuth.oidcAuth.events.addUserLoaded(function (user: User) {
  // eslint-disable-next-line no-console
  console.log('user loaded', user)
  localStorage.setItem('user', JSON.stringify(user))
  window.location.replace(window.location.origin + '/home')
})

zitadelAuth.oidcAuth.events.addUserUnloaded(function () {
  // eslint-disable-next-line no-console
  console.log('user unloaded')
  window.location.replace(window.location.origin)
})

zitadelAuth.oidcAuth.events.addUserSignedOut(function () {
  // eslint-disable-next-line no-console
  console.log('user signed out')
})

zitadelAuth.oidcAuth.events.addUserSessionChanged(function () {
  // eslint-disable-next-line no-console
  console.log('user session changed')
})

export default zitadelAuth