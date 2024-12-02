import puppeteer from "puppeteer";

interface generateVisualSnapshotParams {
  height: number;
  width: number;
  pageContent: string;
}

export const generateVisualSnapshot = async ({
  height,
  width,
  pageContent,
}: generateVisualSnapshotParams) => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      height,
      width,
    },
  });

  const page = await browser.newPage();

  await page.setContent(pageContent);

  const image = await page.screenshot({
    encoding: "base64",
  });

  await browser.close();

  return image;
};
