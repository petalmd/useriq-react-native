const WebSocket = require('ws')
const {SimpleRpc} = require('@unfold/simple-rpc')
const {WSTransport} = require('@unfold/simple-rpc')

function start(port, cb) {
  /** @type WebSocket.ServerOptions */
  const opts = {
    path: '/',
    port,
    verifyClient: (info, verifyCb) => verifyCb(true),
  }

  const wss = new WebSocket.Server(opts, cb)
  wss.on('connection', addClient)
  wss.on('error', err => {
    throw err
  })
}


function addClient(ws) {
  const req = ws.upgradeReq
  const id = req.headers['id']
  const kind = req.headers['kind']

  const rpc = new SimpleRpc(new WSTransport(ws),{
    onApp: onApp,
    onCloseApp: onCloseApp,
    onUpdateUser: onUpdateUser,
    onPrefEvert: onPrefEvent,
    onRotation: onRotation,
    captureScreen: onRotation,
    getAppInfo: getAppInfo,
    onEMUEvent: onEMUEvent,
    syncApp: syncApp,
    onLog: onLog,
    onSDKEvent: onSDKEvent,
    getSyncData: getSyncData
  });
}


onApp = async (props, id) => {
  const {userId, apiKey, versionCode, versionString} = props;
}

onCloseApp = async (appProps, id) => {

}

onUpdateUser = async (appProps, userData) => {
  console.log("onUpdateUser called");
}

onPrefEvent = async (p, appProps, id) => {

}

onRotation = async (n, id) => {

}

captureScreen = async (apiKey, id) => {

}

getAppInfo = async (apiKey, id) => {

}

onEMUEvent = async (e, id) => {

}

syncApp = async (data, apiKey, id) => {
  console.log("sync app called");
}

onLog = async (props, e , id) => {

}

onSDKEvent = async (appProps, userData, e, id) => {
  const evts = e['events']
  const first_evt = evts[0]
  const evt_type = first_evt['evt'];
  if (evt_type == 1) {
    return [{"type":"v1Modal","value":"NAVrA4"},{"type":"v1Modal","value":"rAqQAY"},{"type":"v1Modal","value":"O7GZmK"}]
  }
}


getSyncData = async (apiKey) => {
  const syncData = '{"syncVersion":1566308321057,"sdkEnabled":true,"fabEnabled":true,"eventOpts":{"enabled":true,"bufSize":0},"theme":{"color":[255,255,255,255],"textSize":12,"titleColor":[255,255,255,255],"titleSize":16,"bgColor":[230,64,40,79],"borderColor":[255,64,40,79],"borderRadius":4,"borderWidth":1,"fabColor":[255,255,255,255],"fabBgColor":[230,7,136,136],"ctxBtnBorderColor":[96,69,69,69],"ctxBtnColor":[96,69,69,69],"ctxColor":[200,50,50,50],"ctxBgColor":[200,255,255,255]},"logLevel":3,"hcWelcomeText":"We are here to help you with anything and everything related about the app.","trackPerformance":false,"screens":[{"id":"NmE27K","predicate":{"controller":"com.aravind.crawltestapp.FirstViewController","allOf":["ea346500","2e96995e"]},"imageId":"a77249ce-c142-4c98-a2a3-635ab0e90161","elements":[{"id":"NmE27K","key":"ea346500","props":{"accId":"accId"},"bounds":[0,0,750,1334]},{"id":"NAVrA4","key":"2e96995e","props":{"accId":"accId"},"bounds":[296,570,454,630]},{"id":"rAqQAY","key":"294a8efe","props":{"wIndex":0,"text":"Register","cls":"UIButton"},"bounds":[296,704,454,764]}]},{"id":"NAVrA4","predicate":{"controller":"com.aravind.crawltestapp.LoginViewController","allOf":["2313fa9d","365c91a2"]},"imageId":"3bef8f23-63f8-4fe4-9483-d456bae8e0ec","elements":[{"id":"O7GZmK","key":"2313fa9d","props":{"wIndex":0,"text":"Login With Google","cls":"UIButton"},"bounds":[215,561,535,621]},{"id":"57b4l6","key":"365c91a2","props":{"wIndex":0,"text":"Login With Facebook","cls":"UIButton"},"bounds":[215,637,535,697]},{"id":"WAZ2A2","key":"74f2505c","props":{"wIndex":0,"text":"Login With LinkedIn","cls":"UIButton"},"bounds":[215,713,535,773]}]},{"id":"O7GZmK","predicate":{"controller":"com.aravind.crawltestapp.SecondLoggedViewController","allOf":["b2c7e4b6"]},"imageId":"8f76272a-79b9-4317-9c86-82f397c6a9e9","elements":[{"id":"jmN37W","key":"b2c7e4b6","props":{"wIndex":0,"text":"Reload","cls":"UIButton"},"bounds":[328,637,422,697]}]},{"id":"rAqQAY","predicate":{"controller":"com.aravind.crawltestapp.FirstLoggedViewController","allOf":["3fbbc2ff"]},"imageId":"55e57ded-c2b3-4eb1-a9d2-069f10786150","elements":[{"id":"E70NlO","key":"3fbbc2ff","props":{"wIndex":0,"text":"Name : Emp 0","cls":"UILabel"},"bounds":[30,144,245,186]}]},{"id":"57b4l6","predicate":{"controller":"com.aravind.crawltestapp.InfoViewController","allOf":["7b183ad2","09abb12f"]},"imageId":"e29ebd0b-31b8-4e4e-9c6e-50350e909bfb","elements":[{"id":"jmYN7q","key":"7b183ad2","props":{"wIndex":0,"text":"Appunfold Sample App Developed by Aravind G S 2017-2018","cls":"UILabel"},"bounds":[80,536,670,874]},{"id":"27QDmW","key":"09abb12f","props":{"wIndex":0,"text":"Done","cls":"UIButton"},"bounds":[338,890,412,950]}]},{"id":"WAZ2A2","predicate":{"controller":"com.aravind.crawltestapp.RegisterViewController","allOf":["3e190ace","c650359c"]},"imageId":"59fc335b-1616-42a6-8126-95c33be10468","elements":[{"id":"YAekmg","key":"3e190ace","props":{"wIndex":0,"text":"Email","cls":"UITextField"},"bounds":[210,637,540,697]},{"id":"pmRPAY","key":"c650359c","props":{"wIndex":0,"text":"Register","cls":"UIButton"},"bounds":[286,713,464,773]}]},{"id":"E70NlO","predicate":{"controller":"com.aravind.crawltestapp.UIViewController","allOf":["d2e640c2"]},"imageId":"d81d2d8c-3ad9-4c6e-b08c-757f2337015b","elements":[{"id":"GmaQmj","key":"d2e640c2","props":{"wIndex":0,"text":"Continue","cls":"UIButton"},"bounds":[281,728,469,788]}]}],"assets":["c9d07c2a-700c-4d55-b413-68426e156221"],"v1Modal":[{"id":"O7GZmK","name":"Star Default","layout":{"id":"backdrop","type":"node","l":"$parent.l+0","t":"$parent.t+0","r":"$parent.r+0","b":"$parent.b+0","bgColor":[102,47,47,47],"borderRadius":[0,0,0,0],"borderWidth":0,"borderColor":[255,255,255,255],"children":[{"id":"outsideClick","type":"button","label":"","action":"CLOSE","l":"$parent.l+0","t":"$parent.t+0","r":"$parent.r+0","b":"$parent.b+0"},{"id":"frame","type":"node","l":"$parent.l+4.1%","t":"$parent.t+23.1%","r":"$parent.r-3.2%","b":"$parent.b-20%","bgColor":[255,255,255,255],"borderRadius":[10,10,10,10],"borderWidth":0,"borderColor":[255,255,255,255],"children":[{"id":"stars","type":"rating","l":"$parent.l+5%","t":"$parent.t+5%","r":"$parent.r-5%","b":"$parent.b-60%","activeColor":[255,248,231,28],"borderRadius":[20,20,20,20],"borderWidth":1,"borderColor":[200,50,50,50],"bgColor":[0,0,0,0],"numStars":5},{"id":"title","type":"text","alignX":"center","alignY":"center","text":"Rate Our Application","textSize":24,"l":"$parent.l+5%","t":"$parent.t+25.7%","r":"$parent.r-5%","b":"$parent.b-53.1%","color":[255,50,50,50],"borderRadius":[0,0,0,0],"borderWidth":0,"borderColor":[255,255,255,255],"bgColor":[0,0,0,0]},{"id":"content","type":"text","alignX":"center","alignY":"center","text":"How would you rate this feature?","textSize":20,"l":"$parent.l+5%","t":"$parent.t+35.3%","r":"$parent.r-5%","b":"$parent.b-30.7%","color":[255,50,50,50],"borderRadius":[0,0,0,0],"borderWidth":0,"borderColor":[255,255,255,255],"bgColor":[0,0,0,0]},{"id":"close","type":"button","label":"SUBMIT","action":"SUBMIT","l":"$parent.l+27.3%","t":"$parent.t+79.4%","r":"$parent.r-27.6%","b":"$parent.b-8.3%","textSize":15,"color":[200,255,255,255],"bgColor":[255,16,98,162],"borderRadius":[30,30,30,30],"borderWidth":0,"borderColor":[255,255,255,255]},{"id":"cross","type":"button","label":"×","action":"CLOSE","l":"$parent.l+90%","t":"$parent.t","r":"$parent.r","b":"$parent.t+10%","textSize":32,"color":[255,0,0,0],"bgColor":[0,0,0,0],"borderRadius":[0,0,0,0],"borderWidth":0,"borderColor":[255,245,195,0]},{"id":"editText","type":"editText","l":"$parent.l+5%","t":"$parent.t+65%","r":"$parent.r-5%","b":"$parent.t+75%","borderRadius":[24,24,24,24],"borderWidth":1,"borderColor":[155,155,155,155],"bgColor":[255,255,255,255],"placeholder":"Please tell us why you gave this rating"}]}]},"assets":[],"type":"starDefault"},{"id":"rAqQAY","name":"NPS Default","layout":{"id":"backdrop","type":"node","l":"$parent.l+0","t":"$parent.t+0","r":"$parent.r+0","b":"$parent.b+0","bgColor":[102,47,47,47],"borderRadius":[0,0,0,0],"borderWidth":0,"borderColor":[255,255,255,255],"children":[{"id":"outsideClick","type":"button","label":"","action":"CLOSE","l":"$parent.l+0","t":"$parent.t+0","r":"$parent.r+0","b":"$parent.b+0"},{"id":"frame","type":"node","l":"$parent.l+7.3%","t":"$parent.t+25.7%","r":"$parent.r-7.1%","b":"$parent.b-18.2%","bgColor":[255,255,255,255],"borderRadius":[10,10,10,10],"borderWidth":0,"borderColor":[255,255,255,255],"children":[{"id":"title","type":"text","alignX":"center","alignY":"center","text":"How likely are you to recommend our product to someone?","textSize":15,"l":"$parent.l+0%","t":"$parent.t+0%","r":"$parent.r+0%","b":"$parent.t+30%","color":[255,255,255,255],"borderRadius":[0,0,0,0],"borderWidth":0,"borderColor":[255,255,255,255],"bgColor":[255,16,98,162]},{"id":"cross","type":"button","label":"×","action":"CLOSE","l":"$parent.l+92%","t":"$parent.t","r":"$parent.r","b":"$parent.t+8%","textSize":22,"color":[255,255,255,255],"bgColor":[0,0,0,0],"borderRadius":[0,0,0,0],"borderWidth":0,"borderColor":[255,245,195,0]},{"id":"npsFrame","type":"nps","l":"$parent.l","t":"$parent.t+30%","r":"$parent.r","b":"$parent.t+70%","borderRadius":[0,0,0,0],"borderWidth":0,"activeColor":[255,216,103,78],"bgColor":[255,255,255,255],"numStart":0,"numEnd":10},{"id":"label1","type":"text","alignX":"left","alignY":"center","text":"0-Not likely","textSize":11,"l":"$parent.l+5%","t":"$parent.t+70%","r":"$parent.l+45%","b":"$parent.t+75%","color":[255,0,0,0],"borderRadius":[0,0,0,0],"borderWidth":0,"borderColor":[255,255,255,255],"bgColor":[255,255,255,255]},{"id":"label2","type":"text","alignX":"right","alignY":"center","text":"10-Extremely likely","textSize":11,"l":"$parent.l+55%","t":"$parent.t+70%","r":"$parent.r-5%","b":"$parent.t+75%","color":[255,0,0,0],"borderRadius":[0,0,0,0],"borderWidth":0,"borderColor":[255,255,255,255],"bgColor":[255,255,255,255]},{"id":"close","type":"button","label":"SUBMIT","action":"SUBMIT","l":"$parent.l+27.3%","t":"$parent.t+82%","r":"$parent.r-27.6%","b":"$parent.t+93%","textSize":15,"color":[255,255,255,255],"bgColor":[255,16,98,162],"borderRadius":[30,30,30,30],"borderWidth":0,"borderColor":[255,255,255,255]}]}]},"assets":[],"type":"npsDefault"},{"id":"NAVrA4","name":"Sample Modal","layout":{"id":"backdrop","type":"node","l":"$parent.l+0","t":"$parent.t+0","r":"$parent.r+0","b":"$parent.b+0","bgColor":[102,47,47,47],"borderRadius":[0,0,0,0],"borderWidth":0,"borderColor":[255,255,255,255],"children":[{"id":"outsideClick","type":"button","label":"","action":"CLOSE","l":"$parent.l+0","t":"$parent.t+0","r":"$parent.r+0","b":"$parent.b+0"},{"id":"frame","type":"node","l":"$parent.l+12%","t":"$parent.t+17.5%","r":"$parent.r-12%","b":"$parent.t+82.5%","bgColor":[255,255,255,255],"borderRadius":[10,10,10,10],"borderWidth":1,"borderColor":[255,255,255,255],"children":[{"id":"Image","type":"image","assetId":"c9d07c2a-700c-4d55-b413-68426e156221","crop":true,"alignX":"center","alignY":"center","l":"$parent.l+0","t":"$parent.t","r":"$parent.r+0","b":"$parent.t+40%","bgColor":[255,255,255,255],"borderRadius":[0,0,0,0],"borderWidth":0,"borderColor":[255,255,255,255]},{"id":"title","type":"text","alignX":"center","alignY":"center","text":"Your Headlines Goes Here","textSize":22,"l":"$parent.l+5%","t":"$parent.t+45%","r":"$parent.r-5%","b":"$parent.t+60%","color":[255,54,172,173],"borderRadius":[0,0,0,0],"borderWidth":0,"borderColor":[255,255,255,255],"bgColor":[255,255,255,255]},{"id":"body","type":"text","alignX":"center","alignY":"center","text":"Tell your users more but not too much. We recommend 50 words or less","textSize":13,"l":"$parent.l+5%","t":"$parent.t+60%","r":"$parent.r-5%","b":"$parent.t+75%","color":[255,75,75,75],"borderRadius":[0,0,0,0],"borderWidth":0,"borderColor":[255,255,255,255],"bgColor":[255,255,255,255]},{"id":"footer","type":"node","l":"$parent.l","t":"$parent.t+75%","r":"$parent.r","b":"$parent.b","borderRadius":[0,0,20,20],"borderWidth":0,"borderColor":[255,255,255,255],"bgColor":[255,255,255,255],"children":[{"id":"button1","type":"button","label":"LET\'S GO","action":"CLOSE","l":"$parent.l+15.5%","t":"$parent.t+5%","r":"$parent.r-15.5%","b":"$parent.t+40%","textSize":14,"color":[255,255,255,255],"bgColor":[255,54,172,173],"borderRadius":[30,30,30,30],"borderWidth":0,"borderColor":[255,255,255,255]},{"id":"button2","type":"button","label":"LATER","action":"CLOSE","l":"$parent.l+15.5%","t":"$parent.t+50%","r":"$parent.r-15.5%","b":"$parent.t+85%","textSize":14,"color":[255,54,172,173],"bgColor":[255,255,255,255],"borderRadius":[30,30,30,30],"borderWidth":3,"borderColor":[255,54,172,173]}]},{"id":"cross","type":"button","label":"×","action":"CLOSE","l":"$parent.l+92%","t":"$parent.t-1%","r":"$parent.r-1%","b":"$parent.t+10%","textSize":25,"color":[255,85,85,85],"bgColor":[0,0,0,0],"borderRadius":[0,0,0,0],"borderWidth":0,"borderColor":[255,245,195,0]}]}]},"assets":["c9d07c2a-700c-4d55-b413-68426e156221"],"type":"inAppDefault"}],"qGroup":[{"id":"NmE27K","name":"Group 1","questions":[{"id":"NmE27K","name":"Question 1","desc":[{"type":"rtf","value":"<p>Answer 1</p>"}]}]}],"walkthrough":[],"ctxHelp":[]}';
  return syncData
}


/**
 * start listens to connections from Real devices
 */
start(4444, () => {
  console.log('Mock Sync Server started at ' + 4444)
})

