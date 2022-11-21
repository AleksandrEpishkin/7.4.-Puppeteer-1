let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
    await page.setDefaultTimeout(6000);
  });
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  });
  // afterEach(() => {
  //   page.close();
  // });
});

describe("Actions page", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/features/actions");
  }, 6000);

  test("Actions page header", async () => {
    const pageHeader = await page.$("h1");
    const elementText = await pageHeader.evaluate((el) => el.textContent);
    expect(elementText).toEqual(
      "Automate your workflow from idea to production"
    );
  });

  test("Actions page header langruage", async () => {
    const pageHeader = await page.$(
      "body > div.application-main > main > div:nth-child(3) > div.container-xl.mx-auto.p-responsive.z-1.position-relative.mt-10.mt-md-0 > div.d-flex.gutter-spacious.flex-wrap.mb-12 > div.col-10.col-sm-12.mx-auto > div > div:nth-child(3) > div:nth-child(2) > h3"
    );
    const elementText = await pageHeader.evaluate((el) => el.textContent);
    expect(elementText).toContain("Any language");
  }, 10000);

  test("Pricing page", async () => {
    await page.goto("https://github.com/pricing");
    const pageTitle = await page.title();
    expect(pageTitle).toEqual("Pricing · Plans for every developer · GitHub");
  });
});
