const fs = require("fs");
const child_process = require('child_process');

function main() {
  //Go to project root
  process.chdir('../../..')

  //Check if iOS Folder exists
  //If yes proceed, else exit
  const iOSFolderPath = process.cwd() + "/ios"
  if (fs.existsSync(iOSFolderPath)) {

    //Check if cocoapods is installed
    if (!checkIfPodIsInstalled()) {
      
      //If not installed, exit process
      console.error(
        `Cocoapods is not installed. Install cocoapods using "sudo gem install cocoapods"`
      );
      process.exit();
    }

    // Switch to iOS directory
    process.chdir(iOSFolderPath)

    //Check if podfile is present
    if (!checkIfPodfilePresent()) {
      //If podfile not found, create podfile
      createPodfile()
    }

    //Install all pods. If react-native version >= 0.60
    //it will automatically download UserIQ framework,
    //after reading dependencies in UseriqReactNative.podspec
    //If this is a library update, it will not download UserIQ latest version, as it already has an older version.
    installAllPods()

    //Check if UserIQ framework is installed
    //If not, it is because react-native version < 0.60.
    //Manually add `pod 'UserIQ'` to Podfile
    if (!checkIfUserIQPodIsInstalled()) {
      console.log("Adding UserIQ to podfile")
      addUserIQToPodfile()
      installAllPods()
    }
    //Update UserIQ pod to make sure latest version of framework gets downloded in case its a react-native library update
    updateUserIQPod()
  } else
    console.log("iOS Folder not found to install UserIQ framework")
}

function checkIfPodIsInstalled() {
  try {
    child_process.execSync('pod --version')
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

function installCocoapods() {
  console.log('sudo gem install cocoapods')
  const installCocoapodsOutput = child_process.execSync('sudo gem install cocoapods')
  console.log(installCocoapodsOutput.toString('utf-8'))
}

function checkIfPodfilePresent() {
  return fs.existsSync(process.cwd() + '/Podfile')
}

function createPodfile() {
  console.log('pod init')
  const createOutput = child_process.execSync('pod init')
  console.log(createOutput.toString('utf-8'))
  addUserIQToPodfile()
}

function checkIfUserIQPodIsInstalled() {
  return (fs.existsSync(process.cwd() + '/Pods/UserIQ'))
}

function addUserIQToPodfile() {
  const  podfileContents = fs.readFileSync(process.cwd()+'/Podfile',{encoding:'utf-8'})
  let result = podfileContents.match(`target '[A-Za-z0-9]*' do`);
  var srr = podfileContents.split(result[0])
  srr[0] = srr[0] +result[0]+`\n  pod 'UserIQ'\n`
  const writeFile = fs.writeFileSync(process.cwd()+'/Podfile',srr.join(''))
}

function installAllPods() {
  console.log('pod install')
  let installOutput = child_process.execSync('pod install')
  console.log(installOutput.toString('utf-8'))
}

function updateUserIQPod() {
  console.log('pod update UserIQ')
  const updateOutput = child_process.execSync('pod update UserIQ')
  console.log(updateOutput.toString('utf-8'))
}

if (require.main === module) {
  main()
  process.exit()
}