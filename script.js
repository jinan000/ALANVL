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
        { src: 'images/harvard.png',    alt: 'Harvard Medical School' },
        { src: 'images/yale.png',       alt: 'Yale University' },
        { src: 'images/hopkins.png',    alt: 'Johns Hopkins University' },
        { src: 'images/stanford.png',   alt: 'Stanford University' },
        { src: 'images/who.png',        alt: 'World Health Organization' },
        { src: 'images/iarc.png',       alt: 'IARC' }
    ], 60);

    // --- EMPIRE NEURAL NETWORK INTERFACE ---
    const empireSection = document.querySelector('.empire');
    const empireNetwork = document.querySelector('.empire-network');

    if (empireSection && empireNetwork) {
        const nodes = gsap.utils.toArray('.empire-network .network-node');
        const lines = gsap.utils.toArray('.empire-network .network-line');

        // Create Particle Container
        const particleContainer = document.createElement('div');
        particleContainer.className = 'empire-particles';
        particleContainer.style.cssText = 'position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; perspective: 1000px;';
        empireNetwork.prepend(particleContainer);

        const particles = [];
        for(let i=0; i<40; i++) {
            // Randomly select an outer edge band to preserve center focus
            let px, py;
            const edge = Math.floor(Math.random() * 4);
            if (edge === 0) { px = Math.random() * 100; py = Math.random() * 20; }       // Top edge
            else if (edge === 1) { px = Math.random() * 100; py = 80 + Math.random() * 20; } // Bottom edge
            else if (edge === 2) { px = Math.random() * 20; py = Math.random() * 100; }  // Left edge
            else { px = 80 + Math.random() * 20; py = Math.random() * 100; }             // Right edge

            const p = document.createElement('div');
            p.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(197, 160, 89, ${Math.random() * 0.4});
                border-radius: 50%;
                left: ${px}%;
                top: ${py}%;
                transform: translateZ(${Math.random() * 200 - 100}px);
            `;
            particleContainer.appendChild(p);
            particles.push({ el: p });
        }

        // Idle Floating
        nodes.forEach((node, i) => {
            gsap.to(node, {
                y: "+=12",
                x: "+=8",
                rotationZ: Math.random() * 2 - 1,
                duration: 3 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.2
            });
        });

        particles.forEach((p, i) => {
            gsap.to(p.el, {
                y: "+=20",
                x: "+=15",
                duration: 4 + Math.random() * 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });

        let hoverTimer = null;
        let isHoveringNode = false;

        // Throttle for performance
        let lastMouseMove = 0;
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastMouseMove < 16) return; // ~60fps Limit
            lastMouseMove = now;

            const rect = empireSection.getBoundingClientRect();
            // Expand the interaction area slightly beyond the section bounds
            const isInside = (e.clientY >= rect.top - 100 && e.clientY <= rect.bottom + 100 && e.clientX >= rect.left && e.clientX <= rect.right);

            if (!isInside) return;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Disabled background particle directional drift on cursor move 
            // to maintain focus strictly on node network and keep motion stable.

            let closestNode = null;
            let minDistance = Infinity;

            // Neural Magnetic Attraction (Stability Mode)
            nodes.forEach(node => {
                const nRect = node.getBoundingClientRect();
                const nX = nRect.left + nRect.width / 2;
                const nY = nRect.top + nRect.height / 2;
                const dist = Math.hypot(mouseX - nX, mouseY - nY);

                if (dist < minDistance) {
                    minDistance = dist;
                    closestNode = node;
                }

                if (dist < 300) {
                    const angle = Math.atan2(mouseY - nY, mouseX - nX);
                    const force = (300 - dist) / 300;
                    
                    // Reduced magnetic cursor influence intensity to 30% (max 3-4px shift)
                    const magnetX = Math.cos(angle) * force * 4;
                    const magnetY = Math.sin(angle) * force * 4;
                    
                    gsap.to(node, {
                        x: magnetX,
                        y: magnetY,
                        scale: 1 + (force * 0.04), // Gentle scale 1.04 max
                        opacity: 1, 
                        duration: 1.2,
                        ease: "power2.out", // Soft ease-out interpolation
                        overwrite: "auto"
                    });
                } else {
                    gsap.to(node, {
                        x: 0,
                        y: 0,
                        scale: 1,
                        opacity: 0.4, 
                        duration: 1.5,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                }
            });

            // Connector Lines Synapse Illumination
            lines.forEach(line => {
                const lRect = line.getBoundingClientRect();
                const lX = lRect.left + lRect.width/2;
                const lY = lRect.top + lRect.height/2;
                const dist = Math.hypot(mouseX - lX, mouseY - lY);
                if (dist < 350) {
                    const force = (350 - dist) / 350;
                    gsap.to(line, {
                        backgroundColor: `rgba(197, 160, 89, ${0.3 + force * 0.7})`,
                        boxShadow: `0 0 ${force * 20}px rgba(197, 160, 89, ${force})`,
                        duration: 0.4,
                        overwrite: "auto"
                    });
                } else {
                    gsap.to(line, {
                        backgroundColor: "rgba(197, 160, 89, 0.3)",
                        boxShadow: "none",
                        duration: 0.8,
                        overwrite: "auto"
                    });
                }
            });

            // Neural Signal Ripple Logic
            if (minDistance < 70) {
                if (!isHoveringNode) {
                    isHoveringNode = true;
                    clearTimeout(hoverTimer);
                    hoverTimer = setTimeout(() => {
                        triggerNetworkRipple(closestNode);
                    }, 800);
                }
            } else {
                isHoveringNode = false;
                clearTimeout(hoverTimer);
            }
        });

        // Reset interaction bounds
        empireSection.addEventListener('mouseleave', () => {
            nodes.forEach(node => {
                gsap.to(node, { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.5, ease: "power2.out", overwrite: "auto" });
            });
            lines.forEach(line => {
                gsap.to(line, { backgroundColor: "rgba(197, 160, 89, 0.3)", boxShadow: "none", duration: 1, overwrite: "auto" });
            });
            particles.forEach(p => {
                gsap.to(p.el, { x: 0, y: 0, duration: 1.5, ease: "power2.out", overwrite: "auto" });
            });
            clearTimeout(hoverTimer);
            isHoveringNode = false;
        });

        // Ripple and Pulse
        function triggerNetworkRipple(sourceNode) {
            // Visual Ripple ring
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border: 1px solid rgba(197, 160, 89, 0.8);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10;
                transform: translate(-50%, -50%);
            `;
            const sRect = sourceNode.getBoundingClientRect();
            const contRect = empireNetwork.getBoundingClientRect();
            const x = sRect.left - contRect.left + sRect.width/2;
            const y = sRect.top - contRect.top + sRect.height/2;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            empireNetwork.appendChild(ripple);
            
            gsap.fromTo(ripple, 
                { width: 0, height: 0, opacity: 1 }, 
                { width: 900, height: 900, opacity: 0, duration: 1.8, ease: "power2.out", onComplete: () => ripple.remove() }
            );

            // Synapse Pulse towards main
            lines.forEach(line => {
                const isHorizontal = line.classList.contains('horizontal');
                const pulse = document.createElement('div');
                pulse.style.cssText = `
                    position: absolute;
                    background: #fff;
                    box-shadow: 0 0 15px #fff, 0 0 30px var(--gold);
                    pointer-events: none;
                    z-index: 5;
                `;
                if (isHorizontal) {
                    pulse.style.width = '30px';
                    pulse.style.height = '100%';
                    pulse.style.top = '0';
                    pulse.style.left = '0';
                } else {
                    pulse.style.width = '100%';
                    pulse.style.height = '30px';
                    pulse.style.top = '0';
                    pulse.style.left = '0';
                }
                line.appendChild(pulse);
                
                const prop = isHorizontal ? 'x' : 'y';
                const dist = isHorizontal ? line.offsetWidth : line.offsetHeight;
                
                gsap.fromTo(pulse, 
                    { [prop]: 0, opacity: 1 }, 
                    { [prop]: dist, opacity: 0, duration: 0.8 + Math.random() * 0.4, ease: "power1.inOut", onComplete: () => pulse.remove() }
                );
            });
        }
    }

});
