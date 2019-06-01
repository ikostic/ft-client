export default global.window && global.window.localStorage ? global.window.localStorage : require('localStorage')
