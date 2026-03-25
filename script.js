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
        let loadedImages = 0;

        const loader = document.getElementById("cinematic-loader");
        const loaderBar = document.getElementById("loader-bar");
        const loaderPercentage = document.getElementById("loader-percentage");
        const loaderStatus = document.getElementById("loader-status");

        // Stop user from scrolling while loading
        if (lenis) lenis.stop();

        function checkProgress() {
            loadedImages++;
            const progress = (loadedImages / frameCount) * 100;
            
            if (loaderBar) loaderBar.style.width = `${progress}%`;
            if (loaderPercentage) loaderPercentage.innerText = `${Math.floor(progress)}%`;

            if (loaderStatus) {
                if (progress <= 30) {
                    loaderStatus.innerText = "ESTABLISHING SECURE CONNECTION…";
                } else if (progress <= 70) {
                    loaderStatus.innerText = "DECODING CLINICAL DATA…";
                } else if (progress < 100) {
                    loaderStatus.innerText = "BYPASSING THE ILLUSION…";
                } else {
                    loaderStatus.innerText = "WELCOME TO THE EMPIRE.";
                    loaderStatus.style.fontFamily = "'Cinzel', serif";
                    loaderStatus.style.fontSize = "0.9rem";
                    loaderStatus.style.letterSpacing = "0.2em";
                    loaderStatus.style.fontWeight = "600";
                }
            }

            if (loadedImages === frameCount) {
                // All frames loaded
                setTimeout(() => {
                    document.body.classList.add("loader-hidden");
                    if (lenis) lenis.start();
                    
                    // Reveal the first frame
                    renderCanvas();
                }, 500); // half a second delay
            }
        }

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.onload = checkProgress;
            img.onerror = checkProgress; // Fallback so it doesn't hang if an image is missing
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
        
        // Reveal visual: photo becomes brighter gradually for Screen 2
        tlJourney.to(".journey-overlay", { backgroundColor: "rgba(0, 0, 0, 0.1)", duration: 0.30 }, 0);
        
        // 22% - 52% -> Text 30
        tlJourney.fromTo(".text-30", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.08 }, 0.22)
                 .to(".text-30", { opacity: 0, y: -40, duration: 0.07 }, 0.45);

        // 58% - 82% -> Text 60
        tlJourney.fromTo(".text-60", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.07 }, 0.58)
                 .to(".text-60", { opacity: 0, y: -40, duration: 0.07 }, 0.75);
                 
        // ECG Animation (draws while Text 60 is active)
        tlJourney.fromTo(".ecg-line", { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 0.17 }, 0.58);

        // 88% - 100% -> Text 90
        tlJourney.fromTo(".text-90", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.07 }, 0.88);
        
        // Spotlight Effect (fades in and scales slightly with Text 90)
        tlJourney.fromTo(".spotlight-effect", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.12 }, 0.88);
    }

    // --- MAGIC BENTO: DETECTIVE INTELLIGENCE CARDS ---
    const detectiveSection = document.querySelector('.detective');
    const intelCards = document.querySelectorAll('.intel-card');

    if (detectiveSection && intelCards.length > 0) {
        const glowColor = '197, 160, 89'; // Gold Theme
        const spotlightRadius = 400;
        const isMobile = window.innerWidth <= 768;

        if (!isMobile) {
            // Global Spotlight
            const spotlight = document.createElement('div');
            spotlight.className = 'global-spotlight';
            spotlight.style.cssText = `
                position: fixed; width: 800px; height: 800px; border-radius: 50%;
                pointer-events: none; z-index: 200; opacity: 0; transform: translate(-50%, -50%);
                mix-blend-mode: screen;
                background: radial-gradient(circle, rgba(${glowColor}, 0.15) 0%, rgba(${glowColor}, 0.08) 15%, rgba(${glowColor}, 0.04) 25%, rgba(${glowColor}, 0.02) 40%, rgba(${glowColor}, 0.01) 65%, transparent 70%);
            `;
            document.body.appendChild(spotlight);

            let isInsideSection = false;

            document.addEventListener('mousemove', (e) => {
                const rect = detectiveSection.getBoundingClientRect();
                isInsideSection = (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom);

                if (!isInsideSection) {
                    gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' });
                    intelCards.forEach(card => card.style.setProperty('--glow-intensity', '0'));
                    return;
                }

                const proximity = spotlightRadius * 0.5;
                const fadeDistance = spotlightRadius * 0.75;
                let minDistance = Infinity;

                intelCards.forEach(card => {
                    const cardRect = card.getBoundingClientRect();
                    const centerX = cardRect.left + cardRect.width / 2;
                    const centerY = cardRect.top + cardRect.height / 2;
                    const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
                    const effectiveDistance = Math.max(0, distance);
                    minDistance = Math.min(minDistance, effectiveDistance);

                    let glowIntensity = 0;
                    if (effectiveDistance <= proximity) {
                        glowIntensity = 1;
                    } else if (effectiveDistance <= fadeDistance) {
                        glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
                    }

                    const relativeX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
                    const relativeY = ((e.clientY - cardRect.top) / cardRect.height) * 100;
                    card.style.setProperty('--glow-x', `${relativeX}%`);
                    card.style.setProperty('--glow-y', `${relativeY}%`);
                    card.style.setProperty('--glow-intensity', glowIntensity.toString());
                    card.style.setProperty('--glow-radius', `${spotlightRadius}px`);
                });

                gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });

                const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;
                gsap.to(spotlight, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5, ease: 'power2.out' });
            });

            document.addEventListener('mouseleave', () => {
                isInsideSection = false;
                intelCards.forEach(card => card.style.setProperty('--glow-intensity', '0'));
                gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' });
            });

            // Card Specific Effects (Click, Particles)
            intelCards.forEach(card => {
                const particleCount = 12;
                let particles = [];
                let particlesAdded = false;
                let timeouts = [];

                const handleMouseEnter = () => {
                    if (!particlesAdded) {
                        for (let i = 0; i < particleCount; i++) {
                            const p = document.createElement('div');
                            p.className = 'particle';
                            p.style.cssText = `
                                position: absolute; width: 4px; height: 4px; border-radius: 50%;
                                background: rgba(${glowColor}, 1); box-shadow: 0 0 6px rgba(${glowColor}, 0.6);
                                pointer-events: none; z-index: 100;
                                left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
                                opacity: 0; transform: scale(0);
                            `;
                            card.appendChild(p);
                            particles.push(p);
                        }
                        particlesAdded = true;
                    }
                    
                    particles.forEach((p, i) => {
                        const to = setTimeout(() => {
                            gsap.fromTo(p, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
                            gsap.to(p, { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
                            gsap.to(p, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
                        }, i * 100);
                        timeouts.push(to);
                    });
                };

                const handleMouseLeave = () => {
                    timeouts.forEach(clearTimeout);
                    timeouts = [];
                    particles.forEach(p => {
                        gsap.killTweensOf(p);
                        gsap.to(p, { scale: 0, opacity: 0, duration: 0.3 });
                    });
                };

                const handleClick = (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const maxDistance = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));

                    const ripple = document.createElement('div');
                    ripple.style.cssText = `
                        position: absolute; width: ${maxDistance * 2}px; height: ${maxDistance * 2}px;
                        border-radius: 50%; background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                        left: ${x - maxDistance}px; top: ${y - maxDistance}px; pointer-events: none; z-index: 1000;
                    `;
                    card.appendChild(ripple);
                    gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
                };

                card.addEventListener('mouseenter', handleMouseEnter);
                card.addEventListener('mouseleave', handleMouseLeave);
                card.addEventListener('click', handleClick);
            });
        }
    }

    // ---- LOGO LOOP ----
    function createLogoLoop(containerId, trackId, logosArray, speed) {
        const container = document.getElementById(containerId);
        const track     = document.getElementById(trackId);
        if (!container || !track) return;

        const SMOOTH_TAU = 0.25;
        const MIN_COPIES = 2;
        const COPY_HEAD  = 2;

        function buildList(ariaHidden) {
            const ul = document.createElement('ul');
            ul.className = 'logoloop__list';
            ul.setAttribute('role', 'list');
            if (ariaHidden) ul.setAttribute('aria-hidden', 'true');
            logosArray.forEach(({ src, alt }) => {
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
        let velocity  = speed;
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
            velocity += (speed - velocity) * easeFactor;

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
    }

    // Initialize Partners Loop
    createLogoLoop('logo-loop', 'logo-loop-track', [1,2,3,4,5,6,7,8,9,11,12,13,15,16].map(n => ({
        src: `images/logo${n}.png`,
        alt: `Partner logo ${n}`
    })), 80);

    // Initialize Global Credentials Loop
    createLogoLoop('credential-loop', 'credential-loop-track', [
        { src: 'images/harvard.png',  alt: 'Harvard Medical School' },
        { src: 'images/yale.png',     alt: 'Yale University' },
        { src: 'images/johns.png',    alt: 'Johns Hopkins University' },
        { src: 'images/stanford.png', alt: 'Stanford University' },
        { src: 'images/who.png',      alt: 'World Health Organization' },
        { src: 'images/iarc.png',     alt: 'IARC' }
    ], 60);

    // --- EMPIRE NEURAL NETWORK INTERFACE (DEPRECATED) ---
    // Section replaced with native SVG network and standalone Canvas architecture in DOM.
    // --- FILM STRIP STORYTELLING ---
    const filmTrack = document.getElementById('film-track');
    const filmContainer = document.querySelector('.film-strip-container');
    
    if (filmTrack && filmContainer) {
        // Clone frame contents to establish safe seamless scrolling boundaries
        const originalContent = filmTrack.innerHTML;
        filmTrack.innerHTML += originalContent + originalContent; 
        
        let playbackSpeed = 2.4;
        let targetSpeed = playbackSpeed;
        let currentSpeed = playbackSpeed;
        let trackXPos = 0;
        
        const filmFrames = document.querySelectorAll('.film-frame');
        
        filmFrames.forEach(frame => {
            frame.addEventListener('mouseenter', () => {
                targetSpeed = 0;
                filmContainer.classList.add('is-paused');
                frame.classList.add('is-focused');
            });
            frame.addEventListener('mouseleave', () => {
                targetSpeed = playbackSpeed;
                filmContainer.classList.remove('is-paused');
                frame.classList.remove('is-focused');
            });
        });
        
        function renderFilmStrip() {
            // Easing physics simulate projector brakes
            currentSpeed += (targetSpeed - currentSpeed) * 0.06;
            trackXPos -= currentSpeed;
            
            const oneSetWidth = filmTrack.scrollWidth / 3;
            if (Math.abs(trackXPos) >= oneSetWidth) {
                trackXPos += oneSetWidth; // Seamless Loop Jump
            }
            
            // Micro-jitter injection for analog realism
            const jitterActive = currentSpeed > 0.6;
            const jitterY = (jitterActive && Math.random() > 0.3) ? (Math.random() * 1.5 - 0.75) : 0;
            
            filmTrack.style.transform = `translate3d(${trackXPos}px, ${jitterY}px, 0)`;
            requestAnimationFrame(renderFilmStrip);
        }
        
        renderFilmStrip();
    }

});
