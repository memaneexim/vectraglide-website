gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("elevator-canvas");
const context = canvas.getContext("2d");

// Screen ke full size ke hisab se canvas default dimensions set karein
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 96;

// FIXED PATH: Assets folder aur 3-digit name string template (001, 002...096)
const currentFrame = index => (
    `assets/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.webp`
);

const images = [];
const elevatorState = { frame: 0 };

let imagesLoaded = 0;

// Preloading images to prevent flickering on scroll
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === 1) {
            render();
        }
    };
    images.push(img);
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const img = images[elevatorState.frame];
    
    if (img && img.complete) {
        // Aspect Ratio maintaining responsive cover calculation
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        
        context.drawImage(img, 0, 0, img.width, img.height,
                               centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    initVectraTimeline();
});

function initVectraTimeline() {
    // Master timeline to tie image sequence and layout slide-up together
    const masterTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#landing-gateway",
            start: "top top",
            end: "+=300%", // Scroll depth for full cinematic playback
            scrub: 1.0,    // High response silky smooth sync
            pin: true,     // Pin structural elements
            invalidateOnRefresh: true,
            onUpdate: render // Keeps redrawing frames on scroll updates
        }
    });

    // 1. Scrub through the 96 WebP Elevator Images smoothly
    masterTl.to(elevatorState, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: 2
    }, 0);

    // 2. Stagger and fade away the main VECTRAGLIDE hero texts
    masterTl.to("#hero-title", {
        opacity: 0,
        y: -80,
        scale: 0.95,
        duration: 0.8
    }, 0);

    masterTl.to("#hero-tagline", {
        opacity: 0,
        y: -40,
        duration: 0.6
    }, 0);

    // 3. Smoothly drag up the multi-page framework layer as the lift hits terminal floor
    masterTl.to("#main-website", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out"
    }, 1.1); // Slides up perfectly right in sequence
}

// Keep canvas layout fully responsive across monitors on resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
});
