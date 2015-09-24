export default {

  fetchUser(){
    return fetch(`/api/account/user`, {
      method: 'GET'
    })
  }

}