import { $, browser, by, element, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });
  it('Then: Able to remove book and undo it', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    browser.sleep(2000);

    await element(by.id('btn-action-1')).click();
    browser.sleep(2000);

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await element(by.id('book1')).click();
    browser.sleep(2000);
    const snackBar = element(by.tagName('snack-bar-container'));
    await browser.wait(ExpectedConditions.visibilityOf(snackBar), 30000);
    const undo = element(by.css('.mat-simple-snackbar-action'));
    await browser.wait(ExpectedConditions.visibilityOf(undo), 10000);
    undo.click();
  });
});
