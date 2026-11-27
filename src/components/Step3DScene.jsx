import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons.jsx";
import { prefersReducedMotion } from "../motion/reveal.js";

/* [UPDATED] Realistic PBR Three.js models with soft shadows, ACES filmic tone mapping, and compact WebGL cleanup */

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

function enableShadows(group) {
  group.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });
}

function buildStepModel(THREE, stepIndex) {
  const root = new THREE.Group();

  const matRed = new THREE.MeshStandardMaterial({ color: 0xa11a12, roughness: 0.32, metalness: 0.22 });
  const matBrightRed = new THREE.MeshStandardMaterial({ color: 0xc92218, roughness: 0.3, metalness: 0.18 });
  const matAmber = new THREE.MeshStandardMaterial({ color: 0xe29b32, roughness: 0.34, metalness: 0.25 });
  const matBrass = new THREE.MeshStandardMaterial({ color: 0xd19c42, roughness: 0.26, metalness: 0.82 });
  const matWhite = new THREE.MeshStandardMaterial({ color: 0xf9f8f5, roughness: 0.38, metalness: 0.06 });
  const matSteel = new THREE.MeshStandardMaterial({ color: 0x3b3e42, roughness: 0.34, metalness: 0.78 });
  const matIron = new THREE.MeshStandardMaterial({ color: 0x26282a, roughness: 0.5, metalness: 0.65 });
  const matChrome = new THREE.MeshStandardMaterial({ color: 0xdcdad4, roughness: 0.16, metalness: 0.92 });
  const matGlass = new THREE.MeshStandardMaterial({ color: 0x1a2228, roughness: 0.08, metalness: 0.75 });
  const matRubber = new THREE.MeshStandardMaterial({ color: 0x1c1d1e, roughness: 0.88, metalness: 0.04 });
  const matTurf = new THREE.MeshStandardMaterial({ color: 0x5c7450, roughness: 0.88 });
  const matGrassDark = new THREE.MeshStandardMaterial({ color: 0x475c3e, roughness: 0.9 });
  const matSoil = new THREE.MeshStandardMaterial({ color: 0x6f513b, roughness: 0.92 });
  const matSand = new THREE.MeshStandardMaterial({ color: 0xb08f69, roughness: 0.9 });
  const matClay = new THREE.MeshStandardMaterial({ color: 0x87543c, roughness: 0.9 });
  const matStone = new THREE.MeshStandardMaterial({ color: 0x63605b, roughness: 0.86, metalness: 0.06 });
  const matStoneLight = new THREE.MeshStandardMaterial({ color: 0x87837c, roughness: 0.84 });
  const matWood = new THREE.MeshStandardMaterial({ color: 0x9b744d, roughness: 0.82 });
  const matSkin = new THREE.MeshStandardMaterial({ color: 0xe2b393, roughness: 0.62 });
  const matHair = new THREE.MeshStandardMaterial({ color: 0x2f251e, roughness: 0.82 });
  const matJeans = new THREE.MeshStandardMaterial({ color: 0x2a3644, roughness: 0.82 });
  const matSilverStripe = new THREE.MeshStandardMaterial({ color: 0xdfe3e8, roughness: 0.28, metalness: 0.45 });
  const matWater = new THREE.MeshStandardMaterial({
    color: 0x389dc2,
    roughness: 0.08,
    metalness: 0.12,
    transparent: true,
    opacity: 0.82,
  });
  const matWaterFoam = new THREE.MeshStandardMaterial({
    color: 0xb7edfc,
    roughness: 0.14,
    transparent: true,
    opacity: 0.78,
  });

  if (stepIndex === 0) {
    /* STEP 1: Realistic Surveyor / Technician Inspecting Land */
    const turf = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.28, 0.24, 42), matTurf);
    turf.position.y = -0.96;
    const soil = new THREE.Mesh(new THREE.CylinderGeometry(2.24, 2.08, 0.44, 42), matSoil);
    soil.position.y = -1.3;
    root.add(turf, soil);

    // Natural fieldstones & grass tufts
    const rockCoords = [
      [-1.15, -0.82, 0.65, 0.16],
      [-0.95, -0.83, 0.82, 0.1],
      [1.35, -0.83, -0.45, 0.13],
      [0.45, -0.83, -1.05, 0.11],
    ];
    for (const [rx, ry, rz, rs] of rockCoords) {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(rs, 1), matStoneLight);
      rock.scale.set(1.2, 0.7, 1);
      rock.position.set(rx, ry, rz);
      root.add(rock);
    }
    const tuftCoords = [[-1.3, -0.4], [-0.7, -0.95], [1.25, 0.72], [0.55, 1.15]];
    for (const [tx, tz] of tuftCoords) {
      for (let b = 0; b < 3; b++) {
        const blade = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.2, 5), matGrassDark);
        blade.position.set(tx + (b - 1) * 0.04, -0.76, tz);
        blade.rotation.z = (b - 1) * 0.24;
        root.add(blade);
      }
    }

    // Wooden survey stake + brass marker + red pennant
    const stake = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.72, 0.06), matWood);
    stake.position.set(0.95, -0.5, 0.38);
    const flag = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.34, 4), matBrightRed);
    flag.rotation.z = -Math.PI / 2;
    flag.position.set(1.13, -0.22, 0.38);
    root.add(stake, flag);

    // Ground sonar scan rings
    const ring1 = new THREE.Mesh(
      new THREE.RingGeometry(0.24, 0.29, 36),
      new THREE.MeshBasicMaterial({ color: 0xa11a12, side: THREE.DoubleSide, transparent: true, opacity: 0.6 })
    );
    ring1.rotation.x = -Math.PI / 2;
    ring1.position.set(0.95, -0.83, 0.38);
    const ring2 = new THREE.Mesh(
      new THREE.RingGeometry(0.46, 0.51, 36),
      new THREE.MeshBasicMaterial({ color: 0xe29b32, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
    );
    ring2.rotation.x = -Math.PI / 2;
    ring2.position.set(0.95, -0.83, 0.38);
    root.add(ring1, ring2);

    // Proportioned human technician
    const person = new THREE.Group();
    person.position.set(-0.26, -0.84, 0.05);

    for (const side of [-1, 1]) {
      const sole = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.045, 0.28), matRubber);
      sole.position.set(side * 0.14, 0.022, 0.04);
      const boot = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.12, 0.25), matClay);
      boot.position.set(side * 0.14, 0.1, 0.03);
      const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.068, 0.38, 14), matJeans);
      shin.position.set(side * 0.14, 0.34, 0);
      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.092, 0.078, 0.38, 14), matJeans);
      thigh.position.set(side * 0.14, 0.68, 0);
      person.add(sole, boot, shin, thigh);
    }

    const pelvis = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.19, 0.14, 16), matJeans);
    pelvis.position.y = 0.88;
    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.205, 0.205, 0.05, 16), matRubber);
    belt.position.y = 0.94;
    person.add(pelvis, belt);

    const upperBody = new THREE.Group();
    upperBody.position.set(0, 0.96, 0);

    const shirt = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.19, 0.58, 18), matWhite);
    shirt.position.y = 0.29;
    const vest = new THREE.Mesh(new THREE.CylinderGeometry(0.232, 0.205, 0.48, 18), matAmber);
    vest.position.y = 0.27;
    const stripeLow = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.215, 0.045, 18), matSilverStripe);
    stripeLow.position.y = 0.15;
    const stripeMid = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.225, 0.045, 18), matSilverStripe);
    stripeMid.position.y = 0.34;
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.07, 14), matWhite);
    collar.position.y = 0.6;
    upperBody.add(shirt, vest, stripeLow, stripeMid, collar);

    // Head + facial profile + Hard Hat with ridge & visor
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.76, 0);
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.12, 12), matSkin);
    neck.position.y = -0.1;
    const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.175, 22, 22), matSkin);
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.032, 0.07, 8), matSkin);
    nose.rotation.x = Math.PI / 2;
    nose.position.set(0, -0.01, 0.17);
    const hair = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.55),
      matHair
    );
    hair.rotation.x = -0.35;
    hair.position.set(0, 0.01, -0.03);
    const hatShell = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 22, 16, 0, Math.PI * 2, 0, Math.PI * 0.52),
      matRed
    );
    hatShell.position.y = 0.05;
    const hatRidge = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.04, 0.34), matBrightRed);
    hatRidge.position.set(0, 0.23, -0.01);
    const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.022, 24, 1, false, -1.1, 2.2), matRed);
    hatBrim.position.set(0, 0.05, 0.05);
    headGroup.add(neck, cranium, nose, hair, hatShell, hatRidge, hatBrim);
    upperBody.add(headGroup);

    // Left arm holding survey tablet
    const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.048, 0.44, 12), matWhite);
    armL.position.set(-0.28, 0.34, 0.13);
    armL.rotation.set(-0.78, 0, 0.24);
    const handL = new THREE.Mesh(new THREE.SphereGeometry(0.052, 12, 12), matSkin);
    handL.position.set(-0.22, 0.2, 0.32);
    const tablet = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.028, 0.34), matSteel);
    tablet.position.set(-0.18, 0.24, 0.38);
    tablet.rotation.x = 0.38;
    const tabletScreen = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.031, 0.27), matWhite);
    tabletScreen.position.copy(tablet.position);
    tabletScreen.rotation.copy(tablet.rotation);
    upperBody.add(armL, handL, tablet, tabletScreen);

    // Right arm holding ground locator wand
    const armR = new THREE.Group();
    armR.position.set(0.28, 0.48, 0);
    const upperArmR = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.05, 0.46, 12), matWhite);
    upperArmR.rotation.set(-0.75, 0, -0.28);
    upperArmR.position.set(0.06, -0.16, 0.16);
    const handR = new THREE.Mesh(new THREE.SphereGeometry(0.052, 12, 12), matSkin);
    handR.position.set(0.12, -0.32, 0.32);
    const wandShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.018, 0.96, 10), matChrome);
    wandShaft.rotation.x = 0.48;
    wandShaft.position.set(0.14, -0.58, 0.52);
    const sensorCoil = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.095, 0.04, 18), matRed);
    sensorCoil.position.set(0.14, -0.96, 0.72);
    armR.add(upperArmR, handR, wandShaft, sensorCoil);
    upperBody.add(armR);

    person.add(upperBody);
    root.add(person);
    enableShadows(root);

    return {
      root,
      update: (t) => {
        upperBody.rotation.y = Math.sin(t * 1.1) * 0.28 + 0.32;
        headGroup.rotation.x = 0.2 + Math.sin(t * 2.2) * 0.05;
        const p1 = (t * 0.85) % 1;
        ring1.scale.setScalar(0.8 + p1 * 1.45);
        ring1.material.opacity = (1 - p1) * 0.65;
        const p2 = (t * 0.85 + 0.5) % 1;
        ring2.scale.setScalar(0.8 + p2 * 1.45);
        ring2.material.opacity = (1 - p2) * 0.55;
      },
    };
  }

  if (stepIndex === 1) {
    /* STEP 2: Realistic M&J Well-Drilling Truck Arrival */
    const grassPad = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.22, 2.55), matTurf);
    grassPad.position.y = -0.96;
    const gravelDrive = new THREE.Mesh(new THREE.BoxGeometry(4.1, 0.06, 1.35), matStoneLight);
    gravelDrive.position.y = -0.83;
    const subSoil = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.38, 2.55), matSoil);
    subSoil.position.y = -1.26;
    root.add(grassPad, gravelDrive, subSoil);

    // Safety traffic cone near drill target
    const coneBase = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.03, 0.22), matRubber);
    coneBase.position.set(1.68, -0.78, 0.56);
    const coneBody = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.3, 14), matAmber);
    coneBody.position.set(1.68, -0.62, 0.56);
    const coneRing = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.07, 0.07, 14), matWhite);
    coneRing.position.set(1.68, -0.64, 0.56);
    root.add(coneBase, coneBody, coneRing);

    const truck = new THREE.Group();
    truck.position.set(-0.22, -0.78, 0);

    // Dual chassis rails & bumpers
    for (const rz of [-0.26, 0.26]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(2.95, 0.14, 0.1), matIron);
      rail.position.set(0.05, 0.28, rz);
      truck.add(rail);
    }
    const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 0.96), matChrome);
    frontBumper.position.set(1.65, 0.28, 0);
    truck.add(frontBumper);

    // 6 realistic tires with sidewalls & lug hubs
    const wheels = [];
    for (const wx of [-0.95, -0.44, 0.96]) {
      for (const wz of [-0.45, 0.45]) {
        const wg = new THREE.Group();
        wg.position.set(wx, 0.22, wz);
        const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.16, 24), matRubber);
        tire.rotation.x = Math.PI / 2;
        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.17, 16), matChrome);
        rim.rotation.x = Math.PI / 2;
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.18, 12), matIron);
        cap.rotation.x = Math.PI / 2;
        wg.add(tire, rim, cap);
        truck.add(wg);
        wheels.push(wg);
      }
    }

    // Vocational Red Cab + Hood + Chrome Grille + Mirrors + Stacks
    const cab = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.78, 0.9), matRed);
    cab.position.set(0.92, 0.74, 0);
    const cabRoof = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.08, 0.86), matBrightRed);
    cabRoof.position.set(0.92, 1.15, 0);
    const hood = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.48, 0.84), matBrightRed);
    hood.position.set(1.42, 0.58, 0);
    const windshield = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.34, 0.76), matGlass);
    windshield.position.set(1.34, 0.9, 0);
    const sideWindowL = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.28, 0.91), matGlass);
    sideWindowL.position.set(0.94, 0.9, 0);
    const grille = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.38, 0.62), matChrome);
    grille.position.set(1.67, 0.56, 0);
    truck.add(cab, cabRoof, hood, windshield, sideWindowL, grille);

    // Side mirrors & chrome exhaust stack
    for (const mz of [-0.52, 0.52]) {
      const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.08), matChrome);
      mirror.position.set(1.22, 0.88, mz);
      truck.add(mirror);
    }
    const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.95, 12), matChrome);
    stack.position.set(0.46, 1.05, -0.4);
    const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.12, 16), matAmber);
    beacon.position.set(0.96, 1.24, 0);
    truck.add(stack, beacon);

    // Service deck + white water tank + toolboxes + outriggers
    const deck = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.14, 0.92), matIron);
    deck.position.set(-0.36, 0.4, 0);
    const waterTank = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.15, 20), matWhite);
    waterTank.rotation.z = Math.PI / 2;
    waterTank.position.set(-0.22, 0.76, 0);
    const tankBand = new THREE.Mesh(new THREE.CylinderGeometry(0.326, 0.326, 0.12, 20), matRed);
    tankBand.rotation.z = Math.PI / 2;
    tankBand.position.set(-0.22, 0.76, 0);
    const toolbox = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.26, 0.94), matSteel);
    toolbox.position.set(-0.25, 0.26, 0);
    truck.add(deck, waterTank, tankBand, toolbox);

    // Hydraulic rear stabilizers
    for (const sz of [-0.48, 0.48]) {
      const jack = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.45, 10), matChrome);
      jack.position.set(-1.26, 0.18, sz);
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.18), matSteel);
      foot.position.set(-1.26, -0.02, sz);
      truck.add(jack, foot);
    }

    // Steel truss drilling mast at rear
    const mast = new THREE.Group();
    mast.position.set(-1.14, 0.48, 0);
    for (const mz of [-0.18, 0.18]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.78, 0.08), matSteel);
      post.position.set(0, 0.88, mz);
      mast.add(post);
    }
    for (let cy = 0.25; cy <= 1.55; cy += 0.32) {
      const brace = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.42), matSteel);
      brace.position.set(0, cy, 0);
      mast.add(brace);
    }
    const crown = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.48), matAmber);
    crown.position.set(0, 1.78, 0);
    const rotaryHead = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.26, 0.26), matRed);
    rotaryHead.position.set(-0.12, 1.15, 0);
    const drillRod = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.55, 14), matChrome);
    drillRod.position.set(-0.12, 0.9, 0);
    mast.add(crown, rotaryHead, drillRod);
    mast.rotation.z = 0.26;
    truck.add(mast);

    root.add(truck);
    enableShadows(root);

    return {
      root,
      update: (t) => {
        const arrival = Math.sin(t * 0.85) * 0.28;
        truck.position.x = -0.2 + arrival;
        truck.position.y = -0.78 + Math.sin(t * 16) * 0.005;
        wheels.forEach((w) => {
          w.rotation.z = -arrival * 4.2;
        });
        mast.rotation.z = 0.24 - Math.max(0, Math.sin(t * 0.85)) * 0.24;
        beacon.scale.setScalar(1 + Math.sin(t * 9) * 0.14);
      },
    };
  }

  if (stepIndex === 2) {
    /* STEP 3: Realistic Drilling Rig Boring Deep Inside Earth Strata */
    const earth = new THREE.Group();
    earth.position.set(0, -0.58, 0);

    const layers = [
      { h: 0.18, y: 0.68, mat: matTurf },
      { h: 0.34, y: 0.42, mat: matSoil },
      { h: 0.34, y: 0.08, mat: matSand },
      { h: 0.38, y: -0.28, mat: matClay },
      { h: 0.36, y: -0.65, mat: matWater },
      { h: 0.24, y: -0.95, mat: matStone },
    ];
    for (const l of layers) {
      const box = new THREE.Mesh(new THREE.BoxGeometry(3.15, l.h, 2.2), l.mat);
      box.position.y = l.y;
      earth.add(box);
    }

    // Embedded geological rocks on front cutaway face
    const strataRocks = [[-0.85, 0.06], [0.78, -0.25], [-0.6, -0.35], [0.95, 0.35]];
    for (const [sx, sy] of strataRocks) {
      const pebble = new THREE.Mesh(new THREE.DodecahedronGeometry(0.11, 1), matStoneLight);
      pebble.position.set(sx, sy, 1.06);
      earth.add(pebble);
    }
    root.add(earth);

    // Steel well rig table & hydraulic rams
    const rigTable = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.18, 0.88), matRed);
    rigTable.position.set(0, 0.26, 0);
    for (const tx of [-0.28, 0.28]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.42, 0.12), matSteel);
      leg.position.set(tx, 0.96, 0);
      const ram = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.85, 12), matChrome);
      ram.position.set(tx * 1.45, 0.68, 0.22);
      root.add(leg, ram);
    }
    const crownBox = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.14, 0.32), matAmber);
    crownBox.position.set(0, 1.66, 0);
    const rotaryDrive = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.26, 18), matIron);
    rotaryDrive.position.set(0, 1.05, 0.62);
    root.add(rigTable, crownBox, rotaryDrive);

    // Borehole casing collar & recessed borehole channel
    const casingCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.26, 22), matChrome);
    casingCollar.position.set(0, 0.22, 0.72);
    const boreChannel = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.72, 18), matIron);
    boreChannel.position.set(0, -0.62, 0.98);
    root.add(casingCollar, boreChannel);

    // True continuous helical auger using TubeGeometry spiral curve
    const drillGroup = new THREE.Group();
    drillGroup.position.set(0, 0.22, 0.72);
    const centralPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 2.35, 16), matSteel);
    centralPipe.position.y = -0.35;
    drillGroup.add(centralPipe);

    const helixPts = [];
    const turns = 6.5;
    const ptsCount = 90;
    for (let i = 0; i <= ptsCount; i++) {
      const frac = i / ptsCount;
      const theta = frac * turns * Math.PI * 2;
      const y = -1.42 + frac * 1.55;
      helixPts.push(new THREE.Vector3(Math.cos(theta) * 0.145, y, Math.sin(theta) * 0.145));
    }
    const helixCurve = new THREE.CatmullRomCurve3(helixPts);
    const helixGeom = new THREE.TubeGeometry(helixCurve, 100, 0.028, 8, false);
    const helixMesh = new THREE.Mesh(helixGeom, matAmber);
    drillGroup.add(helixMesh);

    const triConeBit = new THREE.Mesh(new THREE.ConeGeometry(0.165, 0.26, 14), matChrome);
    triConeBit.rotation.x = Math.PI;
    triConeBit.position.y = -1.52;
    drillGroup.add(triConeBit);
    root.add(drillGroup);

    enableShadows(root);

    return {
      root,
      update: (t) => {
        drillGroup.rotation.y = t * 5.2;
        const plunge = Math.sin(t * 1.35) * 0.2;
        drillGroup.position.y = 0.24 + plunge;
        rotaryDrive.position.y = 1.05 + plunge;
        rigTable.position.y = 0.26 + Math.sin(t * 26) * 0.004;
      },
    };
  }

  /* STEP 4: Realistic Finished Wellhead, Brass Hydrant & Stone Water Basin */
  const lawn = new THREE.Mesh(new THREE.CylinderGeometry(2.25, 2.32, 0.24, 42), matTurf);
  lawn.position.y = -0.96;
  const earthSub = new THREE.Mesh(new THREE.CylinderGeometry(2.28, 2.1, 0.44, 42), matSoil);
  earthSub.position.y = -1.3;
  root.add(lawn, earthSub);

  // Steel well casing + bolted sanitary cap + conduit + dial gauge
  const casing = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 1.08, 26), matChrome);
  casing.position.set(-0.76, -0.34, 0);
  const capFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.28, 0.08, 26), matRed);
  capFlange.position.set(-0.76, 0.2, 0);
  const capTop = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.29, 0.1, 26), matBrightRed);
  capTop.position.set(-0.76, 0.28, 0);
  const conduit = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.72, 10), matSteel);
  conduit.position.set(-0.98, -0.45, -0.14);
  const gaugeBody = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.055, 20), matBrass);
  gaugeBody.rotation.x = Math.PI / 2;
  gaugeBody.position.set(-0.76, 0.34, 0.2);
  const gaugeDial = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.06, 20), matWhite);
  gaugeDial.rotation.x = Math.PI / 2;
  gaugeDial.position.copy(gaugeBody.position);
  root.add(casing, capFlange, capTop, conduit, gaugeBody, gaugeDial);

  // Brass / steel yard hydrant standpipe & curved spout
  const hydrantVert = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.075, 1.05, 16), matRed);
  hydrantVert.position.set(-0.18, -0.34, 0);
  const crossPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.58, 14), matSteel);
  crossPipe.rotation.z = Math.PI / 2;
  crossPipe.position.set(-0.46, -0.32, 0);
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.04, 0.06), matBrass);
  handle.position.set(-0.22, 0.22, 0);
  const spoutCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.18, 0.08, 0),
    new THREE.Vector3(0.06, 0.18, 0),
    new THREE.Vector3(0.24, 0.08, 0),
  ]);
  const spout = new THREE.Mesh(new THREE.TubeGeometry(spoutCurve, 18, 0.048, 12, false), matBrass);
  root.add(hydrantVert, crossPipe, handle, spout);

  // Natural flagstone water basin
  const basinFloor = new THREE.Mesh(new THREE.CylinderGeometry(0.98, 1.02, 0.12, 28), matStone);
  basinFloor.position.set(0.56, -0.8, 0);
  const waterPool = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.88, 0.34, 32), matWater);
  waterPool.position.set(0.56, -0.57, 0);
  root.add(basinFloor, waterPool);

  // Ring of natural stones forming the basin wall
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.22, 1), i % 2 === 0 ? matStone : matStoneLight);
    stone.scale.set(1.25, 0.95, 1);
    stone.position.set(0.56 + Math.cos(a) * 0.92, -0.62, Math.sin(a) * 0.92);
    stone.rotation.y = a;
    root.add(stone);
  }

  // Parabolic arched pouring water stream into the pool
  const streamCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.24, 0.07, 0),
    new THREE.Vector3(0.36, -0.1, 0),
    new THREE.Vector3(0.42, -0.4, 0),
  ]);
  const waterStream = new THREE.Mesh(new THREE.TubeGeometry(streamCurve, 20, 0.036, 10, false), matWaterFoam);
  root.add(waterStream);

  const rippleA = new THREE.Mesh(new THREE.RingGeometry(0.14, 0.19, 32), matWaterFoam);
  rippleA.rotation.x = -Math.PI / 2;
  rippleA.position.set(0.42, -0.39, 0);
  const rippleB = rippleA.clone();
  root.add(rippleA, rippleB);

  const droplets = [];
  for (let i = 0; i < 4; i++) {
    const drop = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), matWaterFoam);
    root.add(drop);
    droplets.push(drop);
  }

  enableShadows(root);

  return {
    root,
    update: (t) => {
      const r1 = (t * 0.95) % 1;
      rippleA.scale.setScalar(0.65 + r1 * 2.1);
      rippleA.material.opacity = (1 - r1) * 0.78;
      const r2 = (t * 0.95 + 0.5) % 1;
      rippleB.scale.setScalar(0.65 + r2 * 2.1);
      rippleB.material.opacity = (1 - r2) * 0.78;
      waterStream.scale.setScalar(0.96 + Math.sin(t * 14) * 0.04);
      droplets.forEach((d, idx) => {
        const dt = (t * 1.6 + idx * 0.25) % 1;
        d.position.set(
          0.42 + Math.cos(idx * 1.7) * (0.06 + dt * 0.12),
          -0.38 + Math.sin(dt * Math.PI) * 0.16,
          Math.sin(idx * 1.7) * (0.06 + dt * 0.12)
        );
        d.scale.setScalar(1 - dt * 0.45);
      });
    },
  };
}

export default function Step3DScene({ stepIndex, fallbackIcon, label }) {
  const hostRef = useRef(null);
  const [fallbackMode, setFallbackMode] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    if (!supportsWebGL()) {
      setFallbackMode(true);
      return undefined;
    }

    let cancelled = false;
    let renderer = null;
    let rafId = 0;
    let scene = null;
    let camera = null;
    let isVisible = true;
    let pointerX = 0;
    let pointerY = 0;
    let resizeObserver = null;
    let visibilityObserver = null;
    let loadObserver = null;
    let cleanupListeners = null;

    const startThree = () => {
      import("three")
        .then((THREE) => {
          if (cancelled || !host) return;
          const width = Math.max(220, host.clientWidth);
          const height = Math.max(180, host.clientHeight);

          renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
          renderer.setSize(width, height);
          renderer.outputColorSpace = THREE.SRGBColorSpace;
          renderer.shadowMap.enabled = true;
          renderer.shadowMap.type = THREE.PCFSoftShadowMap;
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1.08;
          host.innerHTML = "";
          host.appendChild(renderer.domElement);

          scene = new THREE.Scene();
          camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 40);
          camera.position.set(0, 1.55, 5.25);
          camera.lookAt(0, -0.3, 0);

          const hemi = new THREE.HemisphereLight(0xfff9f0, 0x6b5c4d, 1.05);
          const sun = new THREE.DirectionalLight(0xffffff, 1.85);
          sun.position.set(3.6, 5.6, 4.4);
          sun.castShadow = true;
          sun.shadow.mapSize.set(1024, 1024);
          sun.shadow.camera.near = 1;
          sun.shadow.camera.far = 16;
          sun.shadow.camera.left = -3;
          sun.shadow.camera.right = 3;
          sun.shadow.camera.top = 3;
          sun.shadow.camera.bottom = -3;
          sun.shadow.bias = -0.001;
          const rim = new THREE.DirectionalLight(0xf3ca82, 0.72);
          rim.position.set(-4.2, 2.6, -3.2);
          scene.add(hemi, sun, rim);

          const { root, update } = buildStepModel(THREE, stepIndex);
          scene.add(root);

          const reduced = prefersReducedMotion();
          update(0.35);
          renderer.render(scene, camera);

          const onPointerMove = (e) => {
            const rect = host.getBoundingClientRect();
            pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          };
          const onPointerLeave = () => {
            pointerX = 0;
            pointerY = 0;
          };
          host.addEventListener("pointermove", onPointerMove, { passive: true });
          host.addEventListener("pointerleave", onPointerLeave, { passive: true });
          cleanupListeners = () => {
            host.removeEventListener("pointermove", onPointerMove);
            host.removeEventListener("pointerleave", onPointerLeave);
          };

          const startTime = performance.now();
          const renderFrame = (now) => {
            if (cancelled) return;
            if (isVisible && !document.hidden) {
              const t = (now - startTime) / 1000;
              if (!reduced) {
                update(t);
                const targetRotY = pointerX * 0.45 + Math.sin(t * 0.42) * 0.22;
                const targetRotX = pointerY * 0.14;
                root.rotation.y += (targetRotY - root.rotation.y) * 0.08;
                root.rotation.x += (targetRotX - root.rotation.x) * 0.08;
              }
              renderer.render(scene, camera);
            }
            if (!reduced) {
              rafId = window.requestAnimationFrame(renderFrame);
            }
          };

          visibilityObserver = new IntersectionObserver(
            ([entry]) => {
              isVisible = entry.isIntersecting;
            },
            { threshold: 0.05 }
          );
          visibilityObserver.observe(host);

          resizeObserver = new ResizeObserver(() => {
            if (!renderer || !camera || !host) return;
            const w = Math.max(220, host.clientWidth);
            const h = Math.max(180, host.clientHeight);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            renderer.render(scene, camera);
          });
          resizeObserver.observe(host);

          if (!reduced) {
            rafId = window.requestAnimationFrame(renderFrame);
          }
        })
        .catch(() => {
          if (!cancelled) setFallbackMode(true);
        });
    };

    loadObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          loadObserver?.disconnect();
          startThree();
        }
      },
      { rootMargin: "320px" }
    );
    loadObserver.observe(host);

    return () => {
      cancelled = true;
      cleanupListeners?.();
      loadObserver?.disconnect();
      visibilityObserver?.disconnect();
      resizeObserver?.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
      if (scene) {
        scene.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            mats.forEach((m) => m.dispose());
          }
        });
      }
      if (renderer) {
        renderer.dispose();
        renderer.domElement?.remove();
      }
    };
  }, [stepIndex]);

  if (fallbackMode) {
    return (
      <div className="step-3d-fallback" aria-hidden="true">
        <span className="step-3d-fallback-icon">
          <Icon name={fallbackIcon} size={32} />
        </span>
        <small>{label}</small>
      </div>
    );
  }

  return <div ref={hostRef} className="step-3d-canvas-host" aria-hidden="true" />;
}
