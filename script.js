// Initialize Lenis for smooth luxury scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

// Update GSAP ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    





    // --- GENERIC ANIMATE UP ---
    const animateUps = gsap.utils.toArray(".animate-up");
    animateUps.forEach(element => {
        gsap.from(element, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });



    // --- JOURNEY SCROLL CANVAS & TEXT ---
    const canvas = document.getElementById("journey-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        const frameCount = 400;
        const currentFrame = index => `frames/storytelling_scroll_${(index).toString().padStart(4, '0')}.webp`;

        const images = [];
        const journeyScrollObj = { frame: 0 };

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        function renderCanvas() {
            if (!images[journeyScrollObj.frame]) return;
            const img = images[journeyScrollObj.frame];
            if (!img.complete) return;
            
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            canvas.width = windowWidth;
            canvas.height = windowHeight;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const imgRatio = img.width / img.height;
            const canvasRatio = windowWidth / windowHeight;
            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                drawWidth = windowWidth;
                drawHeight = windowWidth / imgRatio;
                offsetX = 0;
                offsetY = (windowHeight - drawHeight) / 2;
            } else {
                drawWidth = windowHeight * imgRatio;
                drawHeight = windowHeight;
                offsetX = (windowWidth - drawWidth) / 2;
                offsetY = 0;
            }
            
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
        
        images[0].onload = renderCanvas;
        window.addEventListener("resize", renderCanvas);

        gsap.to(journeyScrollObj, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: ".journey-scroll",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.2
            },
            onUpdate: renderCanvas
        });

        const tlJourney = gsap.timeline({
            scrollTrigger: {
                trigger: ".journey-scroll",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.2
            }
        });

        // 0% - 18% -> Text 0
        tlJourney.to(".text-0", { opacity: 0, y: -50, duration: 0.18 }, 0);
        
        // 22% - 52% -> Text 30
        tlJourney.fromTo(".text-30", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.08 }, 0.22)
                 .to(".text-30", { opacity: 0, y: -40, duration: 0.07 }, 0.45);

        // 58% - 82% -> Text 60
        tlJourney.fromTo(".text-60", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.07 }, 0.58)
                 .to(".text-60", { opacity: 0, y: -40, duration: 0.07 }, 0.75);

        // 88% - 100% -> Text 90
        tlJourney.fromTo(".text-90", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.07 }, 0.88);
    }

    // ---- LOGO LOOP ----
    (function initLogoLoop() {
        const LOGOS = [1,2,3,4,5,6,7,8,9,11,12,13,15,16].map(n => ({
            src: `images/logo${n}.png`,
            alt: `Partner logo ${n}`
        }));

        const SPEED      = 80;
        const SMOOTH_TAU = 0.25;
        const MIN_COPIES = 2;
        const COPY_HEAD  = 2;

        const container = document.getElementById('logo-loop');
        const track     = document.getElementById('logo-loop-track');
        if (!container || !track) return;

        function buildList(ariaHidden) {
            const ul = document.createElement('ul');
            ul.className = 'logoloop__list';
            ul.setAttribute('role', 'list');
            if (ariaHidden) ul.setAttribute('aria-hidden', 'true');
            LOGOS.forEach(({ src, alt }) => {
                const li  = document.createElement('li');
                li.className = 'logoloop__item';
                li.setAttribute('role', 'listitem');
                const img = document.createElement('img');
                img.src       = src;
                img.alt       = alt;
                img.loading   = 'lazy';
                img.decoding  = 'async';
                img.draggable = false;
                li.appendChild(img);
                ul.appendChild(li);
            });
            return ul;
        }

        const firstList = buildList(false);
        track.appendChild(firstList);

        let seqWidth  = 0;
        let copyCount = MIN_COPIES;
        let offsetPx  = 0;
        let velocity  = SPEED;
        let rafId     = null;
        let lastTime  = null;

        function fillCopies() {
            while (track.children.length > 1) track.removeChild(track.lastChild);
            for (let c = 1; c < copyCount; c++) {
                track.appendChild(buildList(true));
            }
        }

        function measure() {
            const rect = firstList.getBoundingClientRect();
            const sw   = Math.ceil(rect.width);
            if (sw === 0) return;
            seqWidth = sw;
            const cw  = container.clientWidth;
            const needed = Math.ceil(cw / sw) + COPY_HEAD;
            copyCount = Math.max(MIN_COPIES, needed);
            fillCopies();
        }

        function animate(timestamp) {
            if (lastTime === null) lastTime = timestamp;
            const dt = Math.max(0, timestamp - lastTime) / 1000;
            lastTime = timestamp;

            const easeFactor = 1 - Math.exp(-dt / SMOOTH_TAU);
            velocity += (SPEED - velocity) * easeFactor;

            if (seqWidth > 0) {
                offsetPx = ((offsetPx + velocity * dt) % seqWidth + seqWidth) % seqWidth;
                track.style.transform = `translate3d(${-offsetPx}px, 0, 0)`;
            }
            rafId = requestAnimationFrame(animate);
        }

        function start() {
            measure();
            if (rafId === null) rafId = requestAnimationFrame(animate);
        }

        const firstImg = firstList.querySelector('img');
        if (firstImg && !firstImg.complete) {
            firstImg.addEventListener('load',  start, { once: true });
            firstImg.addEventListener('error', start, { once: true });
        } else {
            start();
        }

        window.addEventListener('resize', measure);
    })();

});
