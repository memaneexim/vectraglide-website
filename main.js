// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {
    initScrollEngine();
});

function initScrollEngine() {
    // Timeline linked entirely to view scroll state
    const masterTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#landing-gateway",
            start: "top top",
            end: "bottom top",
            scrub: 1.2, // Adds professional mechanical weight to scroll adjustments
            pin: true,  // Locks the title layer in place during calculation
            invalidateOnRefresh: true
        }
    });

    // Fade out hero elements cleanly
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

    // Transform and manipulate the 3D placeholder layout state on scroll
    masterTl.to("#lift-mesh", {
        rotation: 45,
        scale: 0.5,
        y: -40,
        opacity: 0.3,
        duration: 1.2
    }, 0);

    // Pull the solid dashboard layer smoothly up from below the fold
    masterTl.to("#main-website", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out"
    }, 0.2);
}
