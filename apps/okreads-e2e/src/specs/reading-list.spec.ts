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
  it('Then: Should be able to mark book as finished', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    browser.sleep(2000);

    await element(by.id('action-btn-1')).click();
    browser.sleep(2000);

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await element(by.id('action-finished-1')).click();
    const readingListClose = await $('[data-testing="close-reading-list"]');
    await readingListClose.click();
    
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('#action-btn-1'),
        'Finished'
      )
    );
 });
});
