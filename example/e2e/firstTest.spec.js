describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('FAB enabled', async () => {
    await waitFor(element(by.text('?'))).toExist().withTimeout(15000);
  });

  it('Open Helpcenter', async () => {
    await element(by.text('Open Help Centre')).tap();
    await expect(element(by.text('We are here to help you with anything and everything related about the app.'))).toBeVisible();
    if (device.getPlatform() === 'ios') {
      await element(by.text('←')).tap();
    } else {
      await device.pressBack();  
    }
  });

  it('Open Ctx Help', async () => {
    await element(by.text('Open Ctx Help')).tap();
    await expect(element(by.text('GUIDES'))).toBeVisible();
  });

  it('Open Question', async() => {
    await element(by.text('UserIQ Demo app')).tap();
    await expect(element(by.text('Integration successful'))).toBeVisible();
  });

  it ('Close Question and Helpcenter', async() => {
    if (device.getPlatform() === 'ios') {
      await element(by.text('←')).tap();
      await element(by.text('←')).tap();
    } else {
      await device.pressBack(); 
      await device.pressBack();   
    }
    if (device.getPlatform() === 'ios') {
      await expect(element(by.text('HELLO WORLD'))).toBeVisible();
    } else {

    }
  });

  it('Launch Walkthrough', async() => {
    await element(by.text('Open Ctx Help')).tap();
    await element(by.text('Home Guide')).tap();
    await expect(element(by.text('STEP 1'))).toBeVisible();
  });

  it('Proceeded to step 2 by click on next', async() => {
    await element(by.text('NEXT')).tap();
    await expect(element(by.text('STEP 2'))).toBeVisible();
  });

  it('Go to previous step', async() => {
    await element(by.text('PREVIOUS')).tap();
    await expect(element(by.text('STEP 1'))).toBeVisible();
  });

  it('Close walkthrough by clicking on close', async() => {
    await element(by.text('✕')).tap();
    await expect(element(by.text('STEP 1'))).toNotExist();
    await expect(element(by.text('STEP 2'))).toNotExist();
    await expect(element(by.text('STEP 3'))).toNotExist();
    await expect(element(by.text('?'))).toExist();
  });

  // it('Proceeded to step 3 by clicking on next', async() => {
  //   await element(by.text('The idea with React Native Elements is more about component structure than actual design')).tap();
  //   await expect(element(by.text('STEP 3'))).toBeVisible();
  // });

});
