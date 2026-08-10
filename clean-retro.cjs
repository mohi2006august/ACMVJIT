const fs = require('fs');
const srcPath = 'src/pages/events/3d-website-workshop-2026/index.astro';
const destPath = 'src/pages/events/retro-computer-workshop/index.astro';
let code = fs.readFileSync(srcPath, 'utf8');

// Normalize line endings
code = code.replace(/\r\n/g, '\n');

// ── 1. Update frontmatter slug ──
code = code.replace(
  "const event = eventsData.find((e) => e.slug === '3d-website-workshop-2026')!;",
  "const event = eventsData.find((e) => e.slug === 'retro-computer-workshop')!;"
);

// ── 2. Replace CSS Custom Properties + Body + Background + Canvas + Page Wrapper ──
// We replace from the CSS root block all the way through the page-wrapper style
const cssRootStart = `      :root {`;
const pageWrapperEnd = `      .page-wrapper {
        position: relative;
        z-index: 1;
        min-height: 100vh;
      }`;

const idxCSSRoot = code.indexOf(cssRootStart);
const idxPageWrapperEnd = code.indexOf(pageWrapperEnd) + pageWrapperEnd.length;

if (idxCSSRoot !== -1 && idxPageWrapperEnd > idxCSSRoot) {
  const newCSS = `      :root {
        --accent: #8b5cf6;
        --accent-light: #c084fc;
        --accent-glow: rgba(139, 92, 246, 0.3);
        --cyan: #06b6d4;
        --pink: #ec4899;
        --gold: #f59e0b;
        --bg-deep: #c8c0b8;
        --bg-mid: #d4ccc4;
        --surface: rgba(0, 0, 0, 0.03);
        --surface-hover: rgba(0, 0, 0, 0.07);
        --border: rgba(0, 0, 0, 0.08);
        --text-primary: #1a1a1a;
        --text-secondary: rgba(0, 0, 0, 0.6);
        --text-muted: rgba(0, 0, 0, 0.35);
      }

      /* ═══════════════════════════════════════
         Reset & Base
      ═══════════════════════════════════════ */
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      html { scroll-behavior: smooth; }

      body {
        font-family: 'Inter', -apple-system, sans-serif;
        background: #c8c0b8;
        color: var(--text-primary);
        min-height: 100vh;
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* ═══════════════════════════════════════
         Three.js Canvas
      ═══════════════════════════════════════ */
      #three-canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
      }

      /* ═══════════════════════════════════════
         Page Wrapper (hidden until SCREEN mode)
      ═══════════════════════════════════════ */
      .page-wrapper {
        position: relative;
        z-index: 1;
        min-height: 100vh;
      }`;
  code = code.substring(0, idxCSSRoot) + newCSS + code.substring(idxPageWrapperEnd);
  console.log("1. CSS root/body/bg replaced.");
} else {
  console.log("1. FAILED to find CSS root.");
}

// ── 3. Replace the Virtual 3D Screen Styles CSS section ──
const virtualCSSStart = `      /* ═══════════════════════════════════════
         Virtual 3D Screen Styles
      ═══════════════════════════════════════ */`;
const styleEnd = `    </style>`;

const idxVCSS = code.indexOf(virtualCSSStart);
const idxStyleEnd = code.indexOf(styleEnd, idxVCSS);

if (idxVCSS !== -1 && idxStyleEnd !== -1) {
  const newVirtualCSS = `      /* ═══════════════════════════════════════
         Virtual Windows 95 Screen Styles
      ═══════════════════════════════════════ */
      #css-renderer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }

      .page-wrapper {
        width: 1024px;
        height: 768px;
        background: #008080;
        overflow: hidden;
        border: 2px solid #000;
        pointer-events: auto;
        position: relative;
        font-family: 'Courier New', Courier, monospace;
      }

      .win95-window {
        position: absolute;
        top: 30px;
        left: 40px;
        width: 940px;
        height: 680px;
        background: #c0c0c0;
        border: 2px solid;
        border-color: #dfdfdf #000000 #000000 #dfdfdf;
        box-shadow: 2px 2px 0px rgba(0,0,0,0.5);
        display: flex;
        flex-direction: column;
      }

      .win95-titlebar {
        background: linear-gradient(90deg, #000080, #1084d0);
        color: white;
        padding: 4px 8px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        font-size: 13px;
      }

      .win95-content {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        background: #ffffff;
        border: 2px solid;
        border-color: #808080 #ffffff #ffffff #808080;
        margin: 4px;
        color: #000;
      }

      .win95-content h1, .win95-content h2, .win95-content p {
        color: #000;
        text-shadow: none;
      }
      .win95-content .gradient-text {
        background: none;
        -webkit-text-fill-color: #000;
        color: #000;
      }
      .win95-content .hero-subtitle { color: #333; }
      .win95-content .hero-badge { display: none; }

      .win95-taskbar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 36px;
        background: #c0c0c0;
        border-top: 2px solid #dfdfdf;
        display: flex;
        align-items: center;
        padding: 0 4px;
        z-index: 1000;
      }

      .win95-start-btn {
        background: #c0c0c0;
        border: 2px solid;
        border-color: #dfdfdf #000000 #000000 #dfdfdf;
        padding: 3px 8px;
        font-weight: bold;
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
      }
      .win95-start-btn:active {
        border-color: #000000 #dfdfdf #dfdfdf #000000;
      }

      /* CRT Scanline Effect */
      .page-wrapper::after {
        content: " ";
        display: block;
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
        background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.15) 50%),
                    linear-gradient(90deg, rgba(255,0,0,0.04), rgba(0,255,0,0.015), rgba(0,0,255,0.04));
        z-index: 9999;
        background-size: 100% 3px, 3px 100%;
        pointer-events: none;
      }

      /* ── Info HUD (top-left labels) ── */
      .info-hud {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 50;
        font-family: 'Courier New', monospace;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .info-hud span {
        display: inline-block;
        background: #1a1a1a;
        color: #fff;
        padding: 4px 12px;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0.5px;
      }

      /* ── Start Screen ── */
      #start-screen {
        position: fixed;
        inset: 0;
        background: #c8c0b8;
        z-index: 100000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #1a1a1a;
        transition: opacity 1.5s ease;
        cursor: pointer;
      }
      #start-screen h1 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
        font-family: 'Courier New', monospace;
        font-weight: bold;
      }
      #start-screen p {
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        opacity: 0.6;
        animation: blink 1.5s infinite;
      }
      @keyframes blink {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 0.2; }
      }
`;
  code = code.substring(0, idxVCSS) + newVirtualCSS + code.substring(idxStyleEnd);
  console.log("2. Virtual CSS replaced.");
} else {
  console.log("2. FAILED to find Virtual CSS.");
}

// ── 4. Replace HTML body content ──
// Remove bg layers and old start screen, replace with new ones
const bodyStart = `  <body>`;
const threeJsComment = `    <!-- ═══════════════════════════════════════
         Three.js`;

const idxBody = code.indexOf(bodyStart);
const idxPageWrapper = code.indexOf('<div class="page-wrapper">', idxBody);
const idxThreeJS = code.indexOf(threeJsComment);

// Find the closing </div> of page-wrapper (it's right before the Three.js comment)
const closingDivBeforeThreeJS = code.lastIndexOf('</div>', idxThreeJS);

if (idxBody !== -1 && idxPageWrapper !== -1 && idxThreeJS !== -1) {
  // Get the inner content of page-wrapper (the event sections)
  const pageWrapperContent = code.substring(
    code.indexOf('>', idxPageWrapper) + 1,
    closingDivBeforeThreeJS
  );

  const newBodyContent = `  <body>
    <!-- Three.js Canvas -->
    <canvas id="three-canvas"></canvas>

    <!-- CSS3D Container -->
    <div id="css-renderer"></div>

    <!-- Info HUD -->
    <div class="info-hud" id="info-hud">
      <span>ACM VJIT</span>
      <span>Retro Computing Workshop</span>
      <span id="hud-clock">--:--:-- --</span>
    </div>

    <!-- Start Screen -->
    <div id="start-screen">
      <h1>Retro Computing Workshop</h1>
      <p>[ Click anywhere to enter ]</p>
    </div>

    <div class="page-wrapper">
      <div class="win95-window">
        <div class="win95-titlebar">
          <span>📁 EventInfo.exe</span>
          <div style="display:flex;gap:2px;">
            <span style="background:#c0c0c0;color:black;border:2px solid;border-color:#dfdfdf #000 #000 #dfdfdf;width:16px;height:16px;display:inline-flex;justify-content:center;align-items:center;font-size:10px;cursor:pointer;">_</span>
            <span style="background:#c0c0c0;color:black;border:2px solid;border-color:#dfdfdf #000 #000 #dfdfdf;width:16px;height:16px;display:inline-flex;justify-content:center;align-items:center;font-size:10px;cursor:pointer;">□</span>
            <span style="background:#c0c0c0;color:black;border:2px solid;border-color:#dfdfdf #000 #000 #dfdfdf;width:16px;height:16px;display:inline-flex;justify-content:center;align-items:center;font-size:10px;cursor:pointer;">✕</span>
          </div>
        </div>
        <div class="win95-content">
${pageWrapperContent}
        </div>
      </div>
      <div class="win95-taskbar">
        <div class="win95-start-btn">
          <img src="https://win98icons.alexmeub.com/icons/png/windows-0.png" width="18" height="18" alt="start"/>
          Start
        </div>
        <div style="margin-left:auto;border:2px inset #dfdfdf;padding:2px 8px;font-size:12px;font-family:Tahoma,sans-serif;" id="taskbar-clock">
          4:20 PM
        </div>
      </div>
    </div>
`;

  code = code.substring(0, idxBody) + newBodyContent + code.substring(closingDivBeforeThreeJS + 6);
  console.log("3. HTML body replaced.");
} else {
  console.log("3. FAILED to find HTML body markers. idxBody:", idxBody, "idxPageWrapper:", idxPageWrapper, "idxThreeJS:", idxThreeJS);
}

// ── 5. Replace Three.js script ──
const jsStart = `<script type="module">`;
const jsEnd = `</script>`;
const idxJSAnchor = code.indexOf("Three.js 3D Virtual Setup");
const idxJS = code.indexOf(jsStart, idxJSAnchor);
const idxJSEnd = code.indexOf(jsEnd, idxJS);

if (idxJS !== -1 && idxJSEnd !== -1) {
  const newJS = `<script type="module">
      import * as THREE from 'https://esm.sh/three@0.170.0';
      import { CSS3DRenderer, CSS3DObject } from 'https://esm.sh/three@0.170.0/examples/jsm/renderers/CSS3DRenderer.js';

      // ── Setup ──
      const canvas = document.getElementById('three-canvas');
      const cssContainer = document.getElementById('css-renderer');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xc8c0b8);

      const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 2000);

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;

      const cssRenderer = new CSS3DRenderer();
      cssRenderer.setSize(window.innerWidth, window.innerHeight);
      cssContainer.appendChild(cssRenderer.domElement);

      // ── Lighting (studio-style) ──
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
      scene.add(hemiLight);

      const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
      mainLight.position.set(15, 30, 20);
      mainLight.castShadow = true;
      mainLight.shadow.mapSize.width = 2048;
      mainLight.shadow.mapSize.height = 2048;
      mainLight.shadow.camera.left = -50;
      mainLight.shadow.camera.right = 50;
      mainLight.shadow.camera.top = 50;
      mainLight.shadow.camera.bottom = -50;
      mainLight.shadow.camera.near = 0.5;
      mainLight.shadow.camera.far = 100;
      mainLight.shadow.bias = -0.001;
      scene.add(mainLight);

      const fillLight = new THREE.DirectionalLight(0xd0d8e8, 0.4);
      fillLight.position.set(-15, 10, -10);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffeedd, 0.3);
      rimLight.position.set(0, 5, -20);
      scene.add(rimLight);

      // ── Materials ──
      const retroBeige = new THREE.MeshStandardMaterial({ color: 0xd4cbb8, roughness: 0.7, metalness: 0.05 });
      const deskMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.8, metalness: 0.1 });
      const deskLegMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.5, metalness: 0.3 });
      const keyMat = new THREE.MeshStandardMaterial({ color: 0xc8c0b0, roughness: 0.6 });
      const screenBlack = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.3 });
      const whitePaper = new THREE.MeshStandardMaterial({ color: 0xf5f5f0, roughness: 0.95 });
      const brownMat = new THREE.MeshStandardMaterial({ color: 0x654321, roughness: 0.8 });
      const darkBrownMat = new THREE.MeshStandardMaterial({ color: 0x3b2010, roughness: 0.7 });
      const chairBrown = new THREE.MeshStandardMaterial({ color: 0x8b6914, roughness: 0.6 });
      const metalMat = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.3, metalness: 0.6 });
      const mugMat = new THREE.MeshStandardMaterial({ color: 0xe8e8e0, roughness: 0.4 });
      const plantGreen = new THREE.MeshStandardMaterial({ color: 0x2d7a3a, roughness: 0.7 });
      const potMat = new THREE.MeshStandardMaterial({ color: 0xc87533, roughness: 0.7 });
      const floorMat = new THREE.MeshStandardMaterial({ color: 0xb8b0a8, roughness: 0.95 });

      // ── Floor ──
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -25;
      floor.receiveShadow = true;
      scene.add(floor);

      // ── Back Wall ──
      const wallMat = new THREE.MeshStandardMaterial({ color: 0xccc4bc, roughness: 0.95 });
      const backWall = new THREE.Mesh(new THREE.PlaneGeometry(300, 150), wallMat);
      backWall.position.set(0, 50, -60);
      backWall.receiveShadow = true;
      scene.add(backWall);

      // ── Desk ──
      // Table top
      const deskTop = new THREE.Mesh(new THREE.BoxGeometry(80, 2, 40), deskMat);
      deskTop.position.set(0, -12, 0);
      deskTop.castShadow = true;
      deskTop.receiveShadow = true;
      scene.add(deskTop);

      // Desk legs (4 corners)
      const legGeo = new THREE.BoxGeometry(2, 12, 2);
      [[-38, -19, 18], [38, -19, 18], [-38, -19, -18], [38, -19, -18]].forEach(([x,y,z]) => {
        const leg = new THREE.Mesh(legGeo, deskLegMat);
        leg.position.set(x, y, z);
        leg.castShadow = true;
        scene.add(leg);
      });

      // Right-side drawer unit
      const drawerUnit = new THREE.Mesh(new THREE.BoxGeometry(18, 11, 36), deskMat);
      drawerUnit.position.set(30, -18, 0);
      drawerUnit.castShadow = true;
      scene.add(drawerUnit);
      // Drawer lines
      [-15, -19, -23].forEach(y => {
        const drawerLine = new THREE.Mesh(new THREE.BoxGeometry(16, 0.3, 0.3), deskLegMat);
        drawerLine.position.set(30, y, 18.2);
        scene.add(drawerLine);
      });

      // ── PC Base Unit (CPU tower lying flat) ──
      const pcBase = new THREE.Mesh(new THREE.BoxGeometry(22, 5, 18), retroBeige);
      pcBase.position.set(0, -9.5, 0);
      pcBase.castShadow = true;
      pcBase.receiveShadow = true;
      scene.add(pcBase);
      // Floppy slot
      const floppySlot = new THREE.Mesh(new THREE.BoxGeometry(8, 0.8, 0.3), screenBlack);
      floppySlot.position.set(-3, -8, 9.2);
      scene.add(floppySlot);
      // Power button
      const powerBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.3, 16), new THREE.MeshStandardMaterial({color: 0x444444}));
      powerBtn.rotation.x = Math.PI / 2;
      powerBtn.position.set(6, -9, 9.2);
      scene.add(powerBtn);

      // ── Monitor ──
      const monitorGroup = new THREE.Group();

      // Monitor body (chunky CRT)
      const monitorBody = new THREE.Mesh(new THREE.BoxGeometry(26, 22, 20), retroBeige);
      monitorBody.position.set(0, 5, -2);
      monitorBody.castShadow = true;
      monitorBody.receiveShadow = true;
      monitorGroup.add(monitorBody);

      // Screen bezel
      const bezel = new THREE.Mesh(new THREE.BoxGeometry(22, 17, 0.5), screenBlack);
      bezel.position.set(0, 5.5, 8.3);
      monitorGroup.add(bezel);

      // Green power LED
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), new THREE.MeshStandardMaterial({color: 0x00ff00, emissive: 0x00ff00, emissiveIntensity: 0.5}));
      led.position.set(8, -2, 8.5);
      monitorGroup.add(led);

      // Brand label
      const labelGeo = new THREE.BoxGeometry(8, 1.5, 0.2);
      const labelMat = new THREE.MeshStandardMaterial({color: 0xa09888});
      const label = new THREE.Mesh(labelGeo, labelMat);
      label.position.set(0, -3, 8.5);
      monitorGroup.add(label);

      // Screen click target
      const screenTarget = new THREE.Mesh(
        new THREE.PlaneGeometry(22, 17),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      screenTarget.position.set(0, 5.5, 8.6);
      screenTarget.userData.isScreen = true;
      monitorGroup.add(screenTarget);

      monitorGroup.position.set(0, -7, -5);
      scene.add(monitorGroup);

      // ── Keyboard ──
      const kbGroup = new THREE.Group();
      kbGroup.position.set(0, -11, 14);

      const kbBase = new THREE.Mesh(new THREE.BoxGeometry(28, 1, 10), retroBeige);
      kbBase.castShadow = true;
      kbGroup.add(kbBase);

      const keys = [];
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 18; c++) {
          const kw = c === 17 ? 2.4 : 1.2;
          const key = new THREE.Mesh(new THREE.BoxGeometry(kw, 0.35, 1.1), keyMat);
          key.position.set(-12 + c * 1.4, 0.65, -3.5 + r * 1.3);
          key.castShadow = true;
          keys.push(key);
          kbGroup.add(key);
        }
      }
      scene.add(kbGroup);

      // ── Mouse ──
      const mouse3D = new THREE.Group();
      const mouseBody = new THREE.Mesh(new THREE.BoxGeometry(3, 1.2, 5), retroBeige);
      mouseBody.castShadow = true;
      mouse3D.add(mouseBody);
      const mouseBtn = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 2), keyMat);
      mouseBtn.position.set(-0.5, 0.7, -0.8);
      mouse3D.add(mouseBtn);
      const mouseBtn2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 2), keyMat);
      mouseBtn2.position.set(0.5, 0.7, -0.8);
      mouse3D.add(mouseBtn2);
      mouse3D.position.set(18, -11, 14);
      scene.add(mouse3D);

      // ── Paper Tray (left side) ──
      const trayGroup = new THREE.Group();
      trayGroup.position.set(-30, -11, 5);
      // Bottom tray
      const tray1 = new THREE.Mesh(new THREE.BoxGeometry(14, 1, 10), deskLegMat);
      tray1.position.set(0, 0, 0);
      tray1.castShadow = true;
      trayGroup.add(tray1);
      // Paper stack 1
      const paper1 = new THREE.Mesh(new THREE.BoxGeometry(12, 2, 8), whitePaper);
      paper1.position.set(0, 1.5, 0);
      paper1.castShadow = true;
      trayGroup.add(paper1);
      // Top tray (elevated)
      const traySupport1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3, 0.5), deskLegMat);
      traySupport1.position.set(-6, 3, -4);
      trayGroup.add(traySupport1);
      const traySupport2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3, 0.5), deskLegMat);
      traySupport2.position.set(6, 3, -4);
      trayGroup.add(traySupport2);
      const traySupport3 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3, 0.5), deskLegMat);
      traySupport3.position.set(-6, 3, 4);
      trayGroup.add(traySupport3);
      const traySupport4 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3, 0.5), deskLegMat);
      traySupport4.position.set(6, 3, 4);
      trayGroup.add(traySupport4);
      const tray2 = new THREE.Mesh(new THREE.BoxGeometry(14, 1, 10), deskLegMat);
      tray2.position.set(0, 4.5, 0);
      tray2.castShadow = true;
      trayGroup.add(tray2);
      const paper2 = new THREE.Mesh(new THREE.BoxGeometry(12, 1.5, 8), whitePaper);
      paper2.position.set(0, 5.5, 0);
      paper2.castShadow = true;
      trayGroup.add(paper2);
      scene.add(trayGroup);

      // ── Loose paper on desk ──
      const loosePaper = new THREE.Mesh(new THREE.BoxGeometry(8, 0.1, 6), whitePaper);
      loosePaper.position.set(-28, -10.9, 16);
      loosePaper.rotation.y = 0.15;
      loosePaper.castShadow = true;
      scene.add(loosePaper);

      // ── Binders/Folders (right side) ──
      const binder1 = new THREE.Mesh(new THREE.BoxGeometry(3, 14, 10), brownMat);
      binder1.position.set(35, -4, -5);
      binder1.castShadow = true;
      scene.add(binder1);

      const binder2 = new THREE.Mesh(new THREE.BoxGeometry(4, 14, 10), darkBrownMat);
      binder2.position.set(31, -4, -5);
      binder2.castShadow = true;
      scene.add(binder2);

      const binder3 = new THREE.Mesh(new THREE.BoxGeometry(2.5, 12, 10), new THREE.MeshStandardMaterial({color: 0x2c3e6b, roughness: 0.7}));
      binder3.position.set(27.5, -5, -5);
      binder3.castShadow = true;
      scene.add(binder3);

      // ── Mug ──
      const mugGroup = new THREE.Group();
      mugGroup.position.set(35, -11, 12);
      const mugBody = new THREE.Mesh(new THREE.CylinderGeometry(2, 1.8, 5, 16), mugMat);
      mugBody.position.set(0, 2.5, 0);
      mugBody.castShadow = true;
      mugGroup.add(mugBody);
      // Handle (simple torus segment)
      const handleGeo = new THREE.TorusGeometry(1.2, 0.25, 8, 12, Math.PI);
      const handle = new THREE.Mesh(handleGeo, mugMat);
      handle.position.set(2, 2.5, 0);
      handle.rotation.z = Math.PI / 2;
      mugGroup.add(handle);
      // Coffee inside
      const coffee = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, 0.3, 16), new THREE.MeshStandardMaterial({color: 0x3b1f0a, roughness: 0.3}));
      coffee.position.set(0, 4.7, 0);
      mugGroup.add(coffee);
      scene.add(mugGroup);

      // ── Office Chair ──
      const chairGroup = new THREE.Group();
      chairGroup.position.set(0, -25, 30);

      // Chair base (5-star)
      const chairPole = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 8, 8), metalMat);
      chairPole.position.set(0, 4, 0);
      chairPole.castShadow = true;
      chairGroup.add(chairPole);

      // Star legs
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const legArm = new THREE.Mesh(new THREE.BoxGeometry(1, 0.8, 6), metalMat);
        legArm.position.set(Math.sin(angle) * 3, 0.4, Math.cos(angle) * 3);
        legArm.rotation.y = -angle;
        chairGroup.add(legArm);
        // Wheel
        const wheel = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 8), new THREE.MeshStandardMaterial({color: 0x222222}));
        wheel.position.set(Math.sin(angle) * 5.5, 0.3, Math.cos(angle) * 5.5);
        chairGroup.add(wheel);
      }

      // Seat
      const seat = new THREE.Mesh(new THREE.BoxGeometry(12, 2, 12), chairBrown);
      seat.position.set(0, 9, 0);
      seat.castShadow = true;
      chairGroup.add(seat);

      // Backrest
      const backrest = new THREE.Mesh(new THREE.BoxGeometry(12, 14, 2), chairBrown);
      backrest.position.set(0, 17, -6);
      backrest.castShadow = true;
      chairGroup.add(backrest);

      // Armrests
      const armrestGeo = new THREE.BoxGeometry(1.5, 1, 8);
      const armL = new THREE.Mesh(armrestGeo, metalMat);
      armL.position.set(-6, 12, -1);
      chairGroup.add(armL);
      const armR = new THREE.Mesh(armrestGeo, metalMat);
      armR.position.set(6, 12, -1);
      chairGroup.add(armR);
      // Armrest supports
      const armSupportGeo = new THREE.BoxGeometry(1, 3, 1);
      const armSL = new THREE.Mesh(armSupportGeo, metalMat);
      armSL.position.set(-6, 10.5, 2);
      chairGroup.add(armSL);
      const armSR = new THREE.Mesh(armSupportGeo, metalMat);
      armSR.position.set(6, 10.5, 2);
      chairGroup.add(armSR);

      scene.add(chairGroup);

      // ── Plant ──
      const plantGroup = new THREE.Group();
      plantGroup.position.set(35, -11, -20);

      // Pot
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(3, 2.5, 5, 8), potMat);
      pot.position.set(0, 2.5, 0);
      pot.castShadow = true;
      plantGroup.add(pot);

      // Soil
      const soil = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2.8, 0.5, 8), new THREE.MeshStandardMaterial({color: 0x3d2b1f}));
      soil.position.set(0, 5, 0);
      plantGroup.add(soil);

      // Leaves (simple ellipses / flat stretched spheres)
      for (let i = 0; i < 7; i++) {
        const angle = (i / 7) * Math.PI * 2 + Math.random() * 0.5;
        const height = 5 + Math.random() * 8;
        const leafLen = 3 + Math.random() * 4;
        const leaf = new THREE.Mesh(
          new THREE.SphereGeometry(1, 8, 4),
          plantGreen
        );
        leaf.scale.set(0.6, 0.15, leafLen / 2);
        leaf.position.set(Math.sin(angle) * 2, height, Math.cos(angle) * 2);
        leaf.rotation.set(
          Math.random() * 0.5 - 0.8,
          angle,
          Math.random() * 0.3
        );
        leaf.castShadow = true;
        plantGroup.add(leaf);
      }
      // Stem
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 10, 6), new THREE.MeshStandardMaterial({color: 0x2a5a1a}));
      stem.position.set(0, 9, 0);
      plantGroup.add(stem);

      scene.add(plantGroup);

      // ── CSS3D Screen ──
      const screenEl = document.querySelector('.page-wrapper');
      const cssObject = new CSS3DObject(screenEl);
      const cssScale = 22 / 1024;
      cssObject.scale.set(cssScale, cssScale, cssScale);
      cssObject.position.set(0, -1.5, 3.6);
      scene.add(cssObject);

      // ── State Machine ──
      let currentState = 'START';

      const OVERVIEW_POS = new THREE.Vector3(60, 35, 70);
      const OVERVIEW_TARGET = new THREE.Vector3(0, -5, 0);

      const DESK_POS = new THREE.Vector3(0, 8, 45);
      const DESK_TARGET = new THREE.Vector3(0, -5, 0);

      const SCREEN_POS = new THREE.Vector3(0, -1.5, 28);
      const SCREEN_TARGET = new THREE.Vector3(0, -1.5, 3.6);

      camera.position.copy(OVERVIEW_POS);
      camera.lookAt(OVERVIEW_TARGET);

      const cameraTarget = new THREE.Vector3().copy(OVERVIEW_TARGET);
      const cameraTargetDest = new THREE.Vector3().copy(OVERVIEW_TARGET);
      const cameraPosDest = new THREE.Vector3().copy(OVERVIEW_POS);

      // ── Interaction ──
      const startScreen = document.getElementById('start-screen');

      startScreen.addEventListener('click', () => {
        startScreen.style.opacity = '0';
        setTimeout(() => {
          startScreen.style.display = 'none';
          currentState = 'OVERVIEW';
        }, 1500);
      });

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();

      window.addEventListener('click', (event) => {
        if (currentState === 'OVERVIEW') {
          // Any click transitions to DESK view
          currentState = 'TO_DESK';
          cameraPosDest.copy(DESK_POS);
          cameraTargetDest.copy(DESK_TARGET);
          return;
        }

        if (currentState === 'DESK') {
          pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
          pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
          raycaster.setFromCamera(pointer, camera);

          const intersects = raycaster.intersectObjects(monitorGroup.children);
          if (intersects.length > 0) {
            currentState = 'TO_SCREEN';
            cameraPosDest.copy(SCREEN_POS);
            cameraTargetDest.copy(SCREEN_TARGET);
            cssContainer.style.pointerEvents = 'auto';
          }
        }
      });

      cssContainer.style.pointerEvents = 'none';

      // ── Mouse tracking ──
      const mousePos = { x: 0, y: 0 };
      document.addEventListener('mousemove', (e) => {
        mousePos.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mousePos.y = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      // ── HUD Clock ──
      const hudClock = document.getElementById('hud-clock');
      const taskbarClock = document.getElementById('taskbar-clock');
      function updateClocks() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
        if (hudClock) hudClock.textContent = timeStr;
        if (taskbarClock) taskbarClock.textContent = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      }
      updateClocks();
      setInterval(updateClocks, 1000);

      // ── Render Loop ──
      function animate() {
        requestAnimationFrame(animate);

        const lerpSpeed = 0.035;

        if (currentState === 'TO_DESK' || currentState === 'TO_SCREEN') {
          camera.position.lerp(cameraPosDest, lerpSpeed);
          cameraTarget.lerp(cameraTargetDest, lerpSpeed);
          camera.lookAt(cameraTarget);

          if (camera.position.distanceTo(cameraPosDest) < 0.3) {
            if (currentState === 'TO_DESK') currentState = 'DESK';
            else currentState = 'SCREEN';
          }
        } else if (currentState === 'OVERVIEW') {
          // Gentle idle rotation
          const t = Date.now() * 0.0002;
          camera.position.x = OVERVIEW_POS.x + Math.sin(t) * 3;
          camera.position.z = OVERVIEW_POS.z + Math.cos(t) * 3;
          camera.lookAt(OVERVIEW_TARGET);
        } else if (currentState === 'DESK') {
          camera.position.copy(DESK_POS);
          camera.lookAt(DESK_TARGET);
        } else if (currentState === 'SCREEN') {
          // Subtle parallax
          camera.position.x = SCREEN_POS.x + mousePos.x * 1.5;
          camera.position.y = SCREEN_POS.y - mousePos.y * 1.0;
          camera.lookAt(SCREEN_TARGET);

          // Move virtual mouse
          mouse3D.position.x = 18 + mousePos.x * 4;
          mouse3D.position.z = 14 + mousePos.y * 3;
        }

        renderer.render(scene, camera);
        cssRenderer.render(scene, camera);
      }
      animate();

      // ── Resize ──
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        cssRenderer.setSize(window.innerWidth, window.innerHeight);
      });
`;
  code = code.substring(0, idxJS) + newJS + code.substring(idxJSEnd);
  console.log("4. Three.js script replaced.");
} else {
  console.log("4. FAILED to find JS markers.");
}

fs.writeFileSync(destPath, code);
console.log("\n✅ Retro computer workshop page rebuilt successfully!");
