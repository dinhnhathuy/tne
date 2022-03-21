import Cookie from 'js-cookie';
import {
  unWrap
} from '~/utils/fetchUtils';

export default ({
  $config,
  store
}, inject) => {
  window.initAuth = init
  addScript()

  function addScript() {
    const script = document.createElement('script')
    script.src = "https://apis.google.com/js/platform.js?onload=initAuth"
    script.async = true
    document.head.appendChild(script)
  }

  function init() {
    window.gapi.load('auth2', async () => {
      const auth2 = await window.gapi.auth2.init({
        client_id: $config.auth.clientId,
      })

      auth2.currentUser.listen(parseUser)
    });
    window.gapi.signin2.render('gs2', {
      onsuccess: parseUser,
    })
  }

  async function parseUser(user) {

    if (!user.isSignedIn()) {
      Cookie.remove($config.auth.cookieName)
      store.commit('auth/USER', null)
      return true
    }

    const idToken = user.getAuthResponse().id_token
    Cookie.set($config.auth.cookieName, idToken, {
      expires: 1 / 24,
      sameSite: 'lax'
    })

    try {
      const response = await unWrap(await fetch('/api/user'))
      const userProfile = response.json

      store.commit('auth/USER', {
        fullName: userProfile.name,
        profileUrl: userProfile.image,
      })
    } catch (error) {
      console.error(error)
    }


  }

  function signOut() {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut()
  }

  inject('auth', {
    signOut,
  })
}