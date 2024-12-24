import puppeteer from 'puppeteer';

interface generateVisualSnapshotParams {
  height: number;
  width: number;
  htmlContent: string;
}

export const generateVisualSnapshotFromHTML = async ({
  height,
  width,
  htmlContent,
}: generateVisualSnapshotParams) => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      height,
      width,
    },
  });

  const page = await browser.newPage();

  await page.setContent(htmlContent);

  const image = await page.screenshot({
    encoding: 'base64',
  });

  await browser.close();

  return image;
};
