import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { optimize, Config } from 'svgo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDirectory = path.join(__dirname, './svg');
const distDirectory = path.join(__dirname, '../../public/img');
const rawSvgPath = path.join(srcDirectory, 'raw');
const readySvgPath = path.join(srcDirectory, 'ready');
const outputSpritePath = path.join(distDirectory, 'sprite.svg');

const svgoConfigRaw: Config = {
  plugins: [
    'removeViewBox',
    'removeDimensions',
    {
      name: 'removeAttrs',
      params: {
        attrs: '(fill|stroke|opacity)',
      },
    },
  ],
};

const svgoConfigReady: Config = {
  plugins: ['removeViewBox', 'removeDimensions'],
};

function processSVG(
  svgPath: string,
  optimizeSVG: boolean,
  useRemoveAttrs: boolean
): string {
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  const svgoConfig = useRemoveAttrs ? svgoConfigRaw : svgoConfigReady;
  const optimizedSvg = optimizeSVG
    ? optimize(svgContent, { path: svgPath, ...svgoConfig }).data
    : svgContent;

  const filename = path.basename(svgPath, '.svg');
  const svgWithId = optimizedSvg.replace(/<svg /, `<svg id="${filename}" `);

  return svgWithId;
}

function createSvgSprite(): void {
  let spriteContent = `<svg xmlns="http://www.w3.org/2000/svg">`;

  const rawSvgs = fs.readdirSync(rawSvgPath);
  rawSvgs.forEach((svg) => {
    const svgContent = processSVG(path.join(rawSvgPath, svg), true, true);
    spriteContent += svgContent;
  });

  const readySvgs = fs.readdirSync(readySvgPath);
  readySvgs.forEach((svg) => {
    const svgContent = processSVG(path.join(readySvgPath, svg), true, false);
    spriteContent += svgContent;
  });

  spriteContent += `</svg>`;

  fs.writeFileSync(outputSpritePath, spriteContent);
  console.log('SVG sprite has been created successfully!');
}

createSvgSprite();
