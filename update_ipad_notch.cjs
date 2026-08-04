const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'index.astro');
let content = fs.readFileSync(filePath, 'utf-8');

// Update ipad-screen and glowing-tab-border to have a wallpaper and proper glassmorphism
const oldCss = `.ipad-screen {
    background: #000;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 0 10px rgba(0,0,0,1);
    display: flex;
  }`;

const newCss = `.ipad-screen {
    background: #000;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
    box-shadow: inset 0 0 10px rgba(0,0,0,1);
    display: flex;
    /* iPad aesthetic wallpaper */
    background: radial-gradient(circle at top left, #1a0b2e 0%, #000000 60%),
                radial-gradient(circle at bottom right, #0d1b2a 0%, transparent 50%);
  }
  
  .ipad-screen::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: url('https://www.transparenttextures.com/patterns/stardust.png');
    opacity: 0.2;
    z-index: 0;
  }`;

content = content.replace(oldCss, newCss);

const oldNotchCss = `.ipad-notch {
    position: absolute;
    top: 24px; /* Matches the padding of the bezel so it touches the screen edge */
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 25px;
    background: #0f0f11;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 -2px 5px rgba(0,0,0,0.5);
  }`;

const newNotchCss = `.ipad-notch {
    position: absolute;
    top: 23px; 
    left: 50%;
    transform: translateX(-50%);
    width: 130px;
    height: 28px;
    background: #000;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    z-index: 20; /* Ensure it stays above the screen content */
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 -1px 3px rgba(255,255,255,0.1), 0 5px 10px rgba(0,0,0,0.5);
  }`;

content = content.replace(oldNotchCss, newNotchCss);

// Make the tab content translucent to show the wallpaper
const oldTabBorder = `.glowing-tab-border {
    background-color: rgba(10, 10, 10, 0.85); /* Dark translucent background */
    border-radius: 14px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    overflow: hidden;
  }`;

const newTabBorder = `.glowing-tab-border {
    background-color: rgba(10, 10, 15, 0.4); /* Much more transparent */
    border-radius: 14px;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.05);
    height: 100%;
    width: 100%;
    z-index: 1;
    position: relative;
  }`;
  
content = content.replace(oldTabBorder, newTabBorder);

fs.writeFileSync(filePath, content);
console.log('Successfully updated iPad aesthetic.');
