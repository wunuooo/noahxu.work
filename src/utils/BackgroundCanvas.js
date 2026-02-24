// utils/BackgroundCanvas.js
export function BackgroundCanvas() {
    if (document.getElementById('noise-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'noise-canvas';
    Object.assign(canvas.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100vh',
        imageRendering: 'pixelated',
        background: 'black',
        display: 'block',
        pointerEvents: 'none'
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const wh = 128;
    canvas.width = canvas.height = wh;

    const image = ctx.createImageData(wh, wh);
    const id = image.data;
    let t = 0;
    const inc = 1 / wh;
    const arr = Array.from({ length: wh * wh }, () => Math.random() * 1.5 - 0.5);

    function draw() {
        t += inc;
        for (let x = 0; x < wh; x++) {
            for (let y = 0; y < wh; y++) {
                const idx = (y * wh + x) * 4;
                const nx = x / wh;
                const ny = y / wh;

                const dx = nx;
                const dy = ny;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const ax = oct(nx, ny);
                const ay = oct(nx + 2, ny + t / 3);
                const bx = oct(nx + dist * 0.3 + ax / 22 + 0.7, ny + ay / 5 + 2);
                const by = oct(nx + ax / 3 + 4 * t, ny + ay / 3 + 5);
                const n = oct(nx + bx / 5, ny + by / 2) * 0.7 + 0.15;
                const d = ax * by / 2;
                const e = ay * bx / 2;

                id[idx + 0] = hue(n + d / 5);
                id[idx + 1] = hue(n / 3 + e / 5 + d);
                id[idx + 2] = hue(d + e);
                id[idx + 3] = hue(1 - ease(dist) * (e + d) * 5);
            }
        }

        ctx.putImageData(image, 0, 0);
        requestAnimationFrame(draw);
    }

    function hue(val) {
        return 255 * Math.min(Math.max(val, 0), 1);
    }

    function ease(x) {
        return x > 0.2 ? 0 : interpolate(1, 0, x * 6);
    }

    function interpolate(a, b, t) {
        t = t * t * t * (6 * t * t - 15 * t + 10);
        return a + (b - a) * t;
    }

    function n(x, y) {
        const i = Math.abs(Math.floor(x * wh + y)) % (wh * wh);
        return arr[i];
    }

    function oct(x, y) {
        const o1 = p(x * 3.0, y * 4.0);
        const o2 = p(x * 4.0, y * 5.0);
        return o1 + o2 * 0.5;
    }

    function p(x, y) {
        const nx = Math.floor(x);
        const ny = Math.floor(y);
        return interpolate(
            interpolate(n(nx, ny), n(nx + 1, ny), x - nx),
            interpolate(n(nx, ny + 1), n(nx + 1, ny + 1), x - nx),
            y - ny
        );
    }

    draw();

    setTimeout(() => {
        const canvas = document.getElementById('noise-canvas');

        if (!canvas) {
            console.error('❌ Canvas with id "noise-canvas" was NOT found in DOM.');
        } else {
            console.log('✅ Canvas found!');
            const computedStyle = window.getComputedStyle(canvas);
            console.table({
                width: canvas.width,
                height: canvas.height,
                display: computedStyle.display,
                position: computedStyle.position,
                zIndex: computedStyle.zIndex,
                background: computedStyle.background,
            });

            // 检查是否被遮挡
            const rect = canvas.getBoundingClientRect();
            const isOffScreen =
                rect.bottom < 0 || rect.top > window.innerHeight || rect.right < 0 || rect.left > window.innerWidth;
            console.log(isOffScreen ? '⚠️ Canvas is off-screen.' : '✅ Canvas is visible on screen.');
        }
    }, 1000); // 延迟执行，确保 React 内容加载完

}
