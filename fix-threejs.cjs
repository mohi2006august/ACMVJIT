const fs = require('fs');

let fileContent = fs.readFileSync('src/pages/events/3d-website-workshop-2026/index.astro', 'utf8');

const targetStart = "      const cyanPoint = new THREE.PointLight(0x06b6d4, 12, 100);";
const targetEnd = "    </script>";

const startIdx = fileContent.indexOf(targetStart);
// Find the first </script> after startIdx
const endIdx = fileContent.indexOf(targetEnd, startIdx) + targetEnd.length;

if (startIdx === -1 || endIdx === -1) {
    console.log("Could not find start or end index.");
    process.exit(1);
}

const replacement = `      const cyanPoint = new THREE.PointLight(0x06b6d4, 12, 100);
      cyanPoint.position.set(-20, -10, 20);
      scene.add(cyanPoint);

      // ── Computer Setup Materials ──
      const darkMetal = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3, metalness: 0.8 });
      const deskMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.1, metalness: 0.9 });
      const keyMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.6 });
      const keyPressMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 0.5 });

      // ── Desk ──
      const desk = new THREE.Mesh(new THREE.BoxGeometry(60, 2, 30), deskMat);
      desk.position.set(0, -12, 0);
      scene.add(desk);

      // ── Monitor Casing ──
      const monitorBase = new THREE.Mesh(new THREE.BoxGeometry(8, 1, 6), darkMetal);
      monitorBase.position.set(0, -11, -5);
      scene.add(monitorBase);

      const monitorNeck = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 4), darkMetal);
      monitorNeck.position.set(0, -9, -5);
      scene.add(monitorNeck);

      const monitorBody = new THREE.Mesh(new THREE.BoxGeometry(36, 22, 2), darkMetal);
      monitorBody.position.set(0, 2, -5);
      scene.add(monitorBody);

      // ── Keyboard ──
      const keyboardGroup = new THREE.Group();
      keyboardGroup.position.set(0, -10.5, 6);
      keyboardGroup.rotation.x = -0.1;
      scene.add(keyboardGroup);

      const kbBase = new THREE.Mesh(new THREE.BoxGeometry(16, 0.5, 6), darkMetal);
      keyboardGroup.add(kbBase);

      const keys = [];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 12; c++) {
          const key = new THREE.Mesh(new THREE.BoxGeometry(1, 0.4, 1), keyMat);
          key.position.set(-6.6 + c * 1.2, 0.4, -1.8 + r * 1.2);
          keys.push(key);
          keyboardGroup.add(key);
        }
      }

      // ── Mouse ──
      const mouse3D = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 3.5), darkMetal);
      mouse3D.position.set(12, -10.5, 6);
      scene.add(mouse3D);

      // ── CSS3D Screen ──
      const screenEl = document.querySelector('.page-wrapper');
      const cssObject = new CSS3DObject(screenEl);
      const scale = 34 / 1280;
      cssObject.scale.set(scale, scale, scale);
      cssObject.position.set(0, 2, -3.9);
      scene.add(cssObject);

      // ── Interaction ──
      const mouse = { x: 0, y: 0 };
      document.addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      document.addEventListener('keydown', () => {
        if(keys.length > 0) {
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            randomKey.position.y = 0.2;
            randomKey.material = keyPressMat;
            setTimeout(() => {
            randomKey.position.y = 0.4;
            randomKey.material = keyMat;
            }, 150);
        }
      });

      // ── Mobile Optimization ──
      function updateCamera() {
        if (window.innerWidth < 768) {
          camera.position.set(0, 2, 25);
          camera.lookAt(0, 2, -3.9);
        } else {
          camera.position.set(0, 4, 30);
          camera.lookAt(0, 0, 0);
        }
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        cssRenderer.setSize(window.innerWidth, window.innerHeight);
      }
      window.addEventListener('resize', updateCamera);
      updateCamera();

      // ── Render Loop ──
      function animate() {
        requestAnimationFrame(animate);

        if (window.innerWidth >= 768) {
          camera.position.x += (mouse.x * 3 - camera.position.x) * 0.05;
          camera.position.y += (4 - mouse.y * 2 - camera.position.y) * 0.05;
          camera.lookAt(0, 0, 0);

          mouse3D.position.x = 12 + mouse.x * 4;
          mouse3D.position.z = 6 + mouse.y * 4;
        }

        renderer.render(scene, camera);
        cssRenderer.render(scene, camera);
      }
      animate();
    </script>`;

fileContent = fileContent.substring(0, startIdx) + replacement + fileContent.substring(endIdx);

fs.writeFileSync('src/pages/events/3d-website-workshop-2026/index.astro', fileContent);
console.log("Replacement successful.");
