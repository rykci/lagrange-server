import store from '../store'
import axios from 'axios'
import { ElMessage } from 'element-plus'
let lastTime = 0

async function sendRequest (apilink, type, jsonObject) {
  // axios.defaults.timeout = 60000
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.accessToken
  try {
    let response
    switch (type) {
      case 'post':
        response = await axios.post(apilink, jsonObject)
        return response.data
      case 'put':
        response = await axios.put(apilink, jsonObject)
        return response.data
      case 'get':
        response = await axios.get(apilink)
        return response.data
      case 'delete':
        response = await axios.delete(apilink, {
          data: jsonObject
        })
        return response.data
    }
  } catch (err) {
    console.error(err, err.response)
    messageTip('error', err.response.data.msg || 'Fail')
    if(String(err.response.status).indexOf('4') > -1) {
      signOutFun()
    }
  }
}

async function timeout (delay) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

async function Init(callback){
  if (typeof window.ethereum === 'undefined') {
    window.open('https://metamask.io/download.html')
    alert("Consider installing MetaMask!");
  } else {
    const ethereum = window.ethereum;
    ethereum
    .request({ method: 'eth_requestAccounts' })
    .then((accounts) => {
      if(!accounts){
        return false
      }
      web3Init.eth.getAccounts().then(async webAccounts => {
        store.dispatch('setMetaAddress', webAccounts[0])
        // const chainId = await ethereum.request({ method: 'eth_chainId' })
        // console.log(parseInt(chainId, 16))
        callback(webAccounts[0])
      })
      .catch(async (error) => {
        store.dispatch('setMetaAddress', accounts[0])
        callback(accounts[0])
      })
    })
    .catch((error) => {
      store.dispatch('setNavLogin', false)
      store.dispatch('setLogin', false)
      if (error === "User rejected provider access") {
      } else {
        alert("Please unlock MetaMask and switch to the correct network.");
        return false
      }
      console.error(
        `Error fetching accounts: ${error.message}.
        Code: ${error.code}. Data: ${error.data}`
      );
    });
  }
}

async function login () {
  if (!store.state.metaAddress || store.state.metaAddress === undefined) {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    store.dispatch('setMetaAddress', accounts[0])
  }

  const time = await throttle()
  if (!time) return false
  const signature = await sign()
  if (!signature) return false
  const token = await performSignin(signature)
  return !!token
}

async function throttle(){
  // Prevent multiple signatures
  let now = new Date().valueOf();
  if (lastTime > 0 && (now-lastTime) <= 2000) return false
  lastTime = now
  return true
}


async function sign (nonce) {
  store.dispatch('setLogin', false)
  const rightnow = (Date.now() / 1000).toFixed(0)
  const sortanow = rightnow - (rightnow % 600)
  const local = process.env.VUE_APP_DOMAINNAME
  const buff = Buffer.from("Signing in to " + local + " at " + sortanow, 'utf-8')
  let signature = null
  await ethereum.request({
    method: 'personal_sign',
    params: [buff.toString('hex'), store.state.metaAddress]
  }).then(sig => {
    signature = sig
  }).catch(err => {
    console.log(err)
    signature = ''
    signOutFun()
  })
  return signature
}

async function performSignin (sig) {
  try {
    const reqOpts = [store.state.metaAddress, sig]
    const response = await sendRequest(`${process.env.VUE_APP_BASEAPI}login`, 'post', reqOpts)
    if (response) {
      store.dispatch('setAccessToken', response.access_token)
      store.dispatch('setLogin', true)
      return true
    }
    messageTip('error', response.message || 'Fail')
    return null
  } catch (err) {
    console.log('login err:', err)
    messageTip('error', 'Fail')
    return null
  }
}

async function messageTip (type, text) {
  ElMessage({
    showClose: true,
    message: text,
    type: type,
  })
}

async function signOutFun () {
  store.dispatch('setAccessToken', '')
  store.dispatch('setLogin', false)
  store.dispatch('setNavLogin', false)
  store.dispatch('setMetaAddress', '')
}

const Web3 = require('web3');
let web3Init
if (typeof window.ethereum === 'undefined') {
  window.open('https://metamask.io/download.html')
  alert("Consider installing MetaMask!");
} else { 
  if (window.ethereum) {
    web3 = new Web3(ethereum);
    web3.setProvider(ethereum);
  }
  else if (window.web3) {
    web3 = window.web3;
    console.log("Injected web3 detected.");
  }
  else {
    var currentProvider = web3.currentProvider;
    web3 = new Web3(currentProvider);
    web3.setProvider(currentProvider);
    console.log("No web3 instance injected, using Local web3.");
  }
  web3Init = web3
}

export default {
  sendRequest,
  timeout,
  Init,
  web3Init,
  login,
  messageTip,
  signOutFun
}
