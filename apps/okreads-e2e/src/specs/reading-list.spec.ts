import { $, browser, by, element, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
  beforeAll(async ()=>{
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
  })
  it('Then: I should see my reading list', async () => {
    const defaultQuery = await $('[data-testing="default-query"]');
    await defaultQuery.click();
    await browser.sleep(3000);
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
