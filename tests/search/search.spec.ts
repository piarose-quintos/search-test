import { test, expect } from '@playwright/test';
import { TopPage } from '../../pages/top'
import { CategoryPage } from '../../pages/category'
import { BrowserPage } from '../../pages/browser'

test('Scenario 1: Verify Search Conditions', async ({ page }) => {

  const Top = new TopPage(page);
  const Category = new CategoryPage(page);
  const TIER_1_CATEGORY_TEXT = '本・音楽・ゲーム';
  const TIER_2_CATEGORY_TEXT = '本';
  const TIER_3_CATEGORY_TEXT = 'コンピュータ/IT';

  //Go to mercari top page
  await Top.gotoURL();

  //Click on the search bar
  await Top.clickSearchBox();

  //Click on "Select by category" 
  await Top.selectCategory();

  //Select "Books, Music & Games" as the tier 1 category
  await Category.setCategoryByLink(TIER_1_CATEGORY_TEXT);

  //Get the option value of "本・音楽・ゲーム"] to be used for verfication in search results
  const TIER_1_CATEGORY_VALUE = await Category.getOptionValue();

  //Select "本" as the tier 2 category
  await Category.setCategoryById(TIER_2_CATEGORY_TEXT);

  //Get the option value of "本"] to be used for verfication in search results
  const TIER_2_CATEGORY_VALUE = await Category.getOptionValue();

  //Select "Computers & Technology" as the tier; 3 category
  await Category.setCategoryByLink(TIER_3_CATEGORY_TEXT);

  //Verify the search conditions on the left sidebar are set correctly
  await Category.verifyTierOneOption(TIER_1_CATEGORY_VALUE);
  await Category.verifyTierTwoOption(TIER_2_CATEGORY_VALUE);
  await Category.verifyHasChecked(TIER_3_CATEGORY_TEXT);
});


test('Scenario 2: Verify Browser History', async ({ page }) => {

  const Top = new TopPage(page);
  const Category = new CategoryPage(page);
  const Browser = new BrowserPage(page);

  const TIER1_CATEGORY1_TEXT = 'メンズ';
  const TIER2_CATEGORY1_TEXT = 'トップス';
  const TIER3_CATEGORY1_TEXT = 'ポロシャツ';

  const TIER1_CATEGORY2_TEXT = '本・音楽・ゲーム';
  const TIER2_CATEGORY2_TEXT = '本';
  const TIER3_CATEGORY2_TEXT = 'コンピュータ/IT';

  const KEYWORD_TEXT = 'javascript';
  const HISTORY_KEYWORD_TEXT = 'javascript, コンピュータ/IT';

  //Go to mercari top page 
  await Top.gotoURL();
  //Click on the search bar
  await Top.clickSearchBox();
  //Click on "Select by category" 
  await Top.selectCategory();
  //Select tier 1 category for 1st browsing history
  await Category.setCategoryByLink(TIER1_CATEGORY1_TEXT);
  //Select  tier 2 category for 1st browsing history
  await Category.setCategoryById(TIER2_CATEGORY1_TEXT);
  //Select  tier 3 category for 1st browsing history
  await Category.setCategoryByLink(TIER3_CATEGORY1_TEXT);

  //Click on the search bar
  await Top.clickSearchBox();
  //Click on "Select by category" 
  await Top.selectCategory();
  //Select tier 1 category for 2nd browsing history
  await Category.setCategoryByLink(TIER1_CATEGORY2_TEXT);
  //Get the option value of "本・音楽・ゲーム"] to be used for verfication in search results
  const TIER_1_CATEGORY2_VALUE = await Category.getOptionValue();
  //Select tier 2 category for 2nd browsing history
  await Category.setCategoryById(TIER2_CATEGORY2_TEXT);
  //Get the option value of "本"] to be used for verfication in search results
  const TIER_2_CATEGORY2_VALUE = await Category.getOptionValue();
  //Select tier 3 category for 2nd browsing history
  await Category.setCategoryByLink(TIER3_CATEGORY2_TEXT);

  //Click on the search bar to check history
  await Top.clickSearchBox();
  //verify there are two browsing histories
  await Browser.verifyBrowserHistoryCount(2);
  //verify the latest browser history is showing
  await Browser.verifyBrowserHistoryText(0, TIER3_CATEGORY2_TEXT);

  //select Latest Browser History
  await Browser.selectLatestBrowserHistory();
  //Verify the search conditions on the left sidebar are set correctly
  await Category.verifyTierOneOption(TIER_1_CATEGORY2_VALUE);
  await Category.verifyTierTwoOption(TIER_2_CATEGORY2_VALUE);
  await Category.verifyHasChecked(TIER3_CATEGORY2_TEXT);

  //search javascript
  await Top.setKeyword(KEYWORD_TEXT);

  //Click on the search bar to check history
  await Top.gotoURL();
  await Top.clickSearchBox();
  //verify there are three browsing histories
  await Browser.verifyBrowserHistoryCount(3);

  //verify Browsing History
  await Browser.verifyBrowserHistoryText(0, HISTORY_KEYWORD_TEXT);
  await Browser.verifyBrowserHistoryText(1, TIER3_CATEGORY2_TEXT);
  await Browser.verifyBrowserHistoryText(2, TIER3_CATEGORY1_TEXT);

});