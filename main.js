gsap.registerPlugin(ScrollTrigger);

let scene, camera, renderer, liftMesh;

window.addEventListener('DOMContentLoaded', () => {
    init3DScene();
    initScrollEngine();
});

// 1. Initialize Real Three.js 3D Space
function init3DScene() {
    const canvas = document.querySelector('#flow-lift-canvas');
    scene = new THREE.Scene();

    // Camera setup
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    // Renderer setup with premium antialiasing
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create a Premium Geometric Lift Structure (Aerodynamic Cyber Pillar)
    const geometry = new THREE.CylinderGeometry(0.6, 0.8, 2.5, 4, 1);
    
    // Premium Metallic Material (Gold/Orange Reflective Tint)
    const material = new THREE.MeshStandardMaterial({
        color: 0xea580c, 
        metalness: 0.9,
        roughness: 0.15,
        wireframe: false
    });

    liftMesh = new THREE.Mesh(geometry, material);
    scene.add(liftMesh);

    // Advanced Studio Lighting for Premium Look
    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(2, 4, 5);
    scene.add(mainLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Constant smooth background rotation micro-interaction
    function tick() {
        if (!ScrollTrigger.isInViewport("#landing-gateway")) {
            // Keep subtle rotation when idle
            liftMesh.rotation.y += 0.005;
        }
        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    }
    tick();
}

// 2. Control 3D Asset Transitions via GSAP ScrollTrigger
function initScrollEngine() {
    const masterTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#landing-gateway",
            start: "top top",
            end: "bottom top",
            scrub: 1.2, // Adds cinematic weight to the scroll
            pin: true,
            invalidateOnRefresh: true
        }
    });

    // Fade out text layer beautifully
    masterTl.to("#hero-title", {
        opacity: 0,
        y: -60,
        scale: 0.95,
        duration: 1
    }, 0);

    masterTl.to("#hero-tagline", {
        opacity: 0,
        y: -30,
        duration: 0.8
    }, 0);

    // Dynamic 3D Lift rotation and reposition on Scroll
    if (liftMesh) {
        masterTl.to(liftMesh.rotation, {
            x: 0.5,
            y: 3.14 * 1.5, // 270 degree turn
            z: 0.2,
            duration: 1.5
        }, 0);

        masterTl.to(liftMesh.position, {
            y: 0.5,
            z: -2, // Push it slightly deep into space
            duration: 1.5
        }, 0);
    }

    // Slide up the full dark dashboard layout from the fold
    masterTl.to("#main-website", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out"
    }, 0.2);
}

// Handle Window Resizing smoothly
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});
