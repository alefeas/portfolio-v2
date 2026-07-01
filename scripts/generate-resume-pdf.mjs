import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resumeDir = path.resolve(__dirname, '../public/resume');

const resumes = [
  ['CV_Alejo_Feas_Matej_EN.html', 'CV_Alejo_Feas_Matej_EN.pdf'],
  ['CV_Alejo_Feas_Matej_ES.html', 'CV_Alejo_Feas_Matej_ES.pdf'],
];

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch {
    console.log('Chromium not found. Running setup (one-time)...\n');
    execSync('npx playwright install chromium', { stdio: 'inherit' });
    return chromium.launch({ headless: true });
  }
}

async function generate() {
  console.log('Generating resume PDFs...\n');

  const browser = await launchBrowser();

  for (const [htmlFile, pdfFile] of resumes) {
    const htmlPath = path.join(resumeDir, htmlFile);
    const pdfPath = path.join(resumeDir, pdfFile);

    if (!fs.existsSync(htmlPath)) {
      console.error(`Skipped (not found): ${htmlFile}`);
      continue;
    }

    const page = await browser.newPage();
    const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;

    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '1.5cm', right: '1.5cm', bottom: '1.5cm', left: '1.5cm' },
    });

    await page.close();
    console.log(`✓ ${pdfFile}`);
  }

  await browser.close();
  console.log('\nDone.');
}

generate().catch((error) => {
  console.error('Failed to generate PDFs:', error.message);
  console.error('\nTry running: npm run resume:setup');
  process.exit(1);
});
