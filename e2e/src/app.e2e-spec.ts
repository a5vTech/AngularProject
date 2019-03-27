/* tslint:disable:prefer-const */
import {AppPage} from './app.po';
import {browser, by, element, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });


  it('1.0 TEST TEST', () => {
    browser.get('home/login');
    let loginText = element(by.id('login')).getText();
    expect(loginText).toEqual('Login');

  });

  it('2.0 Test login in', () => {
    browser.get('home/login');
    element(by.id('username')).sendKeys('Username');
    element(by.id('password')).sendKeys('Password');
    element(by.id('login_btn')).click();

    let title = element(by.id('title')).getText();
    expect(title).toEqual('Quizzes');
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
