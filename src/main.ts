import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// --- Particles animation code (run after DOM content loaded) ---
function setupParticles() {
  const canvas = document.getElementById('particles-canvas') as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d')!;
  let w = window.innerWidth, h = window.innerHeight;
  canvas.width = w; canvas.height = h;

  type Particle = { x: number; y: number; vx: number; vy: number; size: number };
  const particles: Particle[] = [];
  const count = 100;

  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  for (let i = 0; i < count; i++) {
    particles.push({ x: Math.random() * w, y: Math.random() * h, vx: rand(-0.3,0.3), vy: rand(-0.3,0.3), size: rand(1,3) });
  }

  function animate() {
    ctx.clearRect(0,0,w,h);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx = -p.vx;
      if (p.y < 0 || p.y > h) p.vy = -p.vy;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fill();
    });
    for (let i=0; i<count; i++) {
      for(let j=i+1; j<count; j++) {
        const p1 = particles[i], p2 = particles[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if(dist < 120) {
          ctx.strokeStyle = `rgba(255,255,255,${0.15 * (1 - dist/120)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x,p1.y);
          ctx.lineTo(p2.x,p2.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w; canvas.height = h;
  });

  animate();
}

document.addEventListener('DOMContentLoaded', () => setupParticles());
