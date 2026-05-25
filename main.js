gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("elevator-canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 96;
const currentFrame = index => (
    `assets/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.webp`
);

const images = [];
const elevatorState = { frame: 0 };
let imagesLoaded = 0;

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
    // Master sequential timeline with expansive scrolling depth (650vh style)
    const masterTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#landing-gateway",
            start: "top top",
            end: "+=550%", 
            scrub: 1.0,    
            pin: true,     
            invalidateOnRefresh: true,
            onUpdate: render 
        }
    });

    // 1. Play out the complete 96-frame layout setup
    masterTl.to(elevatorState, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: 4
    }, 0);

    // 2. TIMING SEQUENCE: Phase 1 Out (0% to 15% range)
    masterTl.to("#phase-intro", {
        opacity: 0,
        y: -40,
        duration: 0.6
    }, 0.6);

    // 3. TIMING SEQUENCE: Phase 2 In & Out (22% to 58% range)
    masterTl.to("#phase-punch", {
        opacity: 1,
        scale: 1,
        duration: 0.6
    }, 1.2)
    .to("#phase-punch", {
        opacity: 0,
        y: -30,
        duration: 0.6
    }, 2.4);

    // 4. TIMING SEQUENCE: Phase 3 In (70% arrival point)
    masterTl.to("#phase-arrival", {
        opacity: 1,
        scale: 1,
        duration: 0.6
    }, 3.0);

    // 5. TIMING SEQUENCE: Dashboard curtain slides up completely (75% to 85% window setup)
    masterTl.to("#main-website", {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out"
    }, 3.4);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
});
