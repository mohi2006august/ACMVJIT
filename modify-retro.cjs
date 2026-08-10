const fs = require('fs');
const filePath = 'src/pages/events/retro-computer-workshop/index.astro';
let code = fs.readFileSync(filePath, 'utf8');

// Normalize line endings
code = code.replace(/\r\n/g, '\n');

// 1. Update frontmatter
code = code.replace(/title: '3D Website Workshop 2026'/, "title: 'Retro Computing Workshop 2026'");
code = code.replace(/3D Animated Website/, "Retro Website");

// 2. Replace CSS
const cssTarget = `      /* ═══════════════════════════════════════
         Virtual 3D Screen Styles
      ═══════════════════════════════════════ */`;
const cssEnd = `    </style>`;
const newCss = `      /* ═══════════════════════════════════════
         Virtual Windows 95 Screen Styles
      ═══════════════════════════════════════ */
      #css-renderer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      
      .page-wrapper {
        width: 1024px;
        height: 768px;
        background: #008080; /* Win95 Teal Desktop */
        overflow: hidden;
        border: 2px solid #000;
        pointer-events: auto; /* Allow interactions */
        position: relative;
        font-family: 'Courier New', Courier, monospace; /* Retro font */
      }
      
      .win95-window {
        position: absolute;
        top: 40px;
        left: 60px;
        width: 900px;
        height: 650px;
        background: #c0c0c0;
        border: 2px solid;
        border-color: #dfdfdf #000000 #000000 #dfdfdf;
        box-shadow: 2px 2px 0px rgba(0,0,0,0.5);
        display: flex;
        flex-direction: column;
      }

      .win95-titlebar {
        background: #000080;
        color: white;
        padding: 4px 8px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
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

      /* Reset text colors inside win95 content to be visible */
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
        height: 40px;
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
        padding: 4px 8px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 8px;
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
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
        z-index: 9999;
        background-size: 100% 4px, 3px 100%;
        pointer-events: none;
      }

      /* Start Screen Overlay */
      #start-screen {
        position: fixed;
        inset: 0;
        background: #000;
        z-index: 100000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        transition: opacity 1s ease;
      }
      #start-screen h1 {
        font-size: 1.5rem;
        margin-bottom: 2rem;
        font-family: monospace;
      }
      #start-btn-overlay {
        background: transparent;
        border: 2px solid white;
        color: white;
        padding: 10px 30px;
        font-size: 1.2rem;
        cursor: pointer;
        font-family: monospace;
      }
      #start-btn-overlay:hover {
        background: white;
        color: black;
      }
`;

const idxCSS = code.indexOf(cssTarget);
const endIdxCSS = code.indexOf(cssEnd, idxCSS);
if (idxCSS !== -1 && endIdxCSS !== -1) {
    code = code.substring(0, idxCSS) + newCss + code.substring(endIdxCSS);
    console.log("CSS Replaced successfully.");
} else {
    console.log("Could not find CSS target.");
}

// 3. Replace HTML Structure
const htmlTargetStart = `    <div class="page-wrapper">`;
const htmlTargetEnd = `    </div>`; 

const idxHTML = code.indexOf(htmlTargetStart);
const endIdxHTML = code.indexOf("    <!-- ═══════════════════════════════════════\n         Three.js", idxHTML);

if (idxHTML !== -1 && endIdxHTML !== -1) {
    const innerHTML = code.substring(idxHTML + htmlTargetStart.length, endIdxHTML - 5); // strip some whitespace
    
    const newHTML = `    <!-- Start Screen -->
    <div id="start-screen">
      <h1>Retro Computer Workshop 2026</h1>
      <button id="start-btn-overlay">START</button>
    </div>

    <div class="page-wrapper">
      <div class="win95-window">
        <div class="win95-titlebar">
          <span>EventInfo.exe</span>
          <span style="background: #c0c0c0; color: black; border: 2px solid; border-color: #dfdfdf #000 #000 #dfdfdf; width: 16px; height: 16px; display: inline-flex; justify-content: center; align-items: center; font-size: 12px; cursor: pointer;">X</span>
        </div>
        <div class="win95-content">
${innerHTML}
        </div>
      </div>
      <div class="win95-taskbar">
        <div class="win95-start-btn">
          <img src="https://win98icons.alexmeub.com/icons/png/windows-0.png" width="20" height="20" alt="start"/>
          Start
        </div>
        <div style="margin-left: auto; border: 2px inset #dfdfdf; padding: 2px 6px;">
          4:20 PM
        </div>
      </div>
    </div>
`;
    
    code = code.substring(0, idxHTML) + newHTML + code.substring(endIdxHTML);
    console.log("HTML replaced successfully.");
} else {
    console.log("Could not find HTML target.");
}

// 4. Replace Three.js Logic
const jsTargetStart = `<script type="module">`;
// find the end of the module script
const jsTargetEnd = `</script>`;
const idxJS = code.indexOf(jsTargetStart, code.indexOf("Three.js 3D Virtual Setup"));
const endIdxJS = code.indexOf(jsTargetEnd, idxJS);

if (idxJS !== -1 && endIdxJS !== -1) {
    const newJS = `<script type="module">
      import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
      import { CSS3DRenderer, CSS3DObject } from 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/renderers/CSS3DRenderer.js';

      const canvas = document.getElementById('three-canvas');
      const cssContainer = document.getElementById('css-renderer');
      const scene = new THREE.Scene();
      
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const cssRenderer = new CSS3DRenderer();
      cssRenderer.setSize(window.innerWidth, window.innerHeight);
      cssContainer.appendChild(cssRenderer.domElement);

      // ── Soft Lighting ──
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(10, 20, 10);
      dirLight.castShadow = true;
      dirLight.shadow.camera.left = -30;
      dirLight.shadow.camera.right = 30;
      dirLight.shadow.camera.top = 30;
      dirLight.shadow.camera.bottom = -30;
      scene.add(dirLight);

      const fillLight = new THREE.DirectionalLight(0x90b0d0, 0.5);
      fillLight.position.set(-10, 10, -10);
      scene.add(fillLight);

      // ── Materials ──
      const retroPlastic = new THREE.MeshStandardMaterial({ color: 0xddddcc, roughness: 0.7 });
      const deskMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.9 });
      const keyMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.6 });

      // ── Desk ──
      const desk = new THREE.Mesh(new THREE.BoxGeometry(100, 2, 60), deskMat);
      desk.position.set(0, -12, 0);
      desk.receiveShadow = true;
      scene.add(desk);

      // ── Monitor Casing ──
      const monitorGroup = new THREE.Group();
      
      const monitorBase = new THREE.Mesh(new THREE.BoxGeometry(12, 2, 10), retroPlastic);
      monitorBase.position.set(0, -10, -5);
      monitorBase.castShadow = true;
      monitorBase.receiveShadow = true;
      monitorGroup.add(monitorBase);

      const monitorNeck = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 4), retroPlastic);
      monitorNeck.position.set(0, -8, -5);
      monitorNeck.castShadow = true;
      monitorNeck.receiveShadow = true;
      monitorGroup.add(monitorNeck);

      // Main chunky monitor body
      const monitorBody = new THREE.Mesh(new THREE.BoxGeometry(32, 24, 20), retroPlastic);
      monitorBody.position.set(0, 4, -8);
      monitorBody.castShadow = true;
      monitorBody.receiveShadow = true;
      monitorGroup.add(monitorBody);

      // The screen bezel area (slightly inset)
      const bezel = new THREE.Mesh(new THREE.BoxGeometry(28, 20, 21), new THREE.MeshStandardMaterial({color: 0x111111}));
      bezel.position.set(0, 4, -8);
      monitorGroup.add(bezel);
      
      // Invisible click target for the raycaster
      const screenTarget = new THREE.Mesh(new THREE.PlaneGeometry(28, 20), new THREE.MeshBasicMaterial({visible: false}));
      screenTarget.position.set(0, 4, 2.6); // slightly in front of bezel
      screenTarget.userData.isScreen = true;
      monitorGroup.add(screenTarget);

      scene.add(monitorGroup);

      // ── Keyboard ──
      const keyboardGroup = new THREE.Group();
      keyboardGroup.position.set(0, -10.5, 10);
      keyboardGroup.rotation.x = -0.05; 
      scene.add(keyboardGroup);

      const kbBase = new THREE.Mesh(new THREE.BoxGeometry(24, 0.8, 8), retroPlastic);
      kbBase.castShadow = true;
      kbBase.receiveShadow = true;
      keyboardGroup.add(kbBase);

      const keys = [];
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 16; c++) {
          const key = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 1.2), keyMat);
          key.position.set(-10.5 + c * 1.4, 0.6, -2.5 + r * 1.4);
          key.castShadow = true;
          keys.push(key);
          keyboardGroup.add(key);
        }
      }

      // ── Mouse ──
      const mouse3D = new THREE.Mesh(new THREE.BoxGeometry(3, 1.5, 4.5), retroPlastic);
      mouse3D.position.set(16, -10.5, 10);
      mouse3D.castShadow = true;
      mouse3D.receiveShadow = true;
      scene.add(mouse3D);

      // ── CSS3D Screen ──
      const screenEl = document.querySelector('.page-wrapper');
      const cssObject = new CSS3DObject(screenEl);
      // Map 1024px to the 28 unit wide bezel
      const scale = 28 / 1024;
      cssObject.scale.set(scale, scale, scale);
      cssObject.position.set(0, 4, 2.6); // Match screenTarget position
      scene.add(cssObject);

      // ── State & Animation Logic ──
      let currentState = 'START'; // START, DESK, ZOOM, SCREEN
      
      // Initial Isometric Camera Position
      const ISOMETRIC_POS = new THREE.Vector3(30, 20, 30);
      const SCREEN_POS = new THREE.Vector3(0, 4, 25);
      
      camera.position.copy(ISOMETRIC_POS);
      camera.lookAt(0, 0, 0);

      // ── Interaction ──
      const startBtn = document.getElementById('start-btn-overlay');
      const startScreen = document.getElementById('start-screen');
      
      startBtn.addEventListener('click', () => {
        startScreen.style.opacity = '0';
        setTimeout(() => {
            startScreen.style.display = 'none';
            currentState = 'DESK';
            // Start rendering 3D after start is clicked if we wanted to save battery, but we render immediately
        }, 1000);
      });

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      
      window.addEventListener('click', (event) => {
        if (currentState !== 'DESK') return;
        
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        
        const intersects = raycaster.intersectObjects(monitorGroup.children);
        if (intersects.length > 0) {
            // Check if we clicked the screen target
            if(intersects[0].object.userData.isScreen || intersects[0].object === monitorBody) {
                currentState = 'ZOOM';
                // ensure mouse works when zoomed in
                cssContainer.style.pointerEvents = 'auto';
            }
        }
      });
      
      // Make CSS wrapper click-through until zoomed in
      cssContainer.style.pointerEvents = 'none';

      // Mouse Parallax (only in SCREEN mode)
      const mouse = { x: 0, y: 0 };
      document.addEventListener('mousemove', (e) => {
        if (currentState === 'SCREEN') {
            mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
        }
      });

      // ── Render Loop ──
      const clock = new THREE.Clock();
      
      // We will manually interpolate camera using lerp
      function animate() {
        requestAnimationFrame(animate);

        if (currentState === 'ZOOM') {
            camera.position.lerp(SCREEN_POS, 0.04);
            
            // simple look at center during zoom
            camera.lookAt(0, 4, 0);
            
            if (camera.position.distanceTo(SCREEN_POS) < 0.2) {
                currentState = 'SCREEN';
            }
        } else if (currentState === 'SCREEN') {
            // Slight parallax when fully zoomed in
            camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.1;
            camera.position.y += (4 - mouse.y * 1.5 - camera.position.y) * 0.1;
            camera.lookAt(0, 4, 2.6); // look at screen center
            
            // Move 3D mouse on desk
            mouse3D.position.x = 16 + mouse.x * 4;
            mouse3D.position.z = 10 + mouse.y * 4;
        } else if (currentState === 'DESK') {
            camera.position.copy(ISOMETRIC_POS);
            camera.lookAt(0, 0, 0);
        }

        renderer.render(scene, camera);
        cssRenderer.render(scene, camera);
      }
      animate();

      // ── Resize Handler ──
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        cssRenderer.setSize(window.innerWidth, window.innerHeight);
      });
`;
    
    code = code.substring(0, idxJS) + newJS + code.substring(endIdxJS);
    console.log("JS Replaced successfully.");
} else {
    console.log("Could not find JS target.");
}


fs.writeFileSync(filePath, code);
console.log("Retro computer page modified successfully!");
