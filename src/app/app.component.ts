import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
  OnDestroy,
  Input,
  OnInit
} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoadingComponent } from "./loading/loading.component";

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'TestProject';

  // 💡 Loader flag
  appLoaded = false;

  @Input() sparkColor: string = '#fff';
  @Input() sparkSize: number = 10;
  @Input() sparkRadius: number = 15;
  @Input() sparkCount: number = 8;
  @Input() duration: number = 400;
  @Input() easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' = 'ease-out';
  @Input() extraScale: number = 1.0;

  @ViewChild('sparkCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private sparks: Spark[] = [];
  private animationId: number = 0;
  private resizeObserver!: ResizeObserver;

  // ✅ Show loading screen on init
  ngOnInit() {
    setTimeout(() => {
      this.appLoaded = true;
    }, 2700); // Simulated loading delay
  }

  ngAfterViewInit() {
    this.resizeCanvas();
    this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    this.resizeObserver.observe(this.canvasRef.nativeElement.parentElement!);
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private ease(t: number): number {
    switch (this.easing) {
      case 'linear': return t;
      case 'ease-in': return t * t;
      case 'ease-in-out': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      case 'ease-out':
      default: return t * (2 - t);
    }
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement;
    if (!parent) return;

    const { width, height } = parent.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
  }

  private animate = () => {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = performance.now();
    this.sparks = this.sparks.filter((spark: Spark) => {
      const elapsed = now - spark.startTime;
      if (elapsed >= this.duration) return false;

      const progress = elapsed / this.duration;
      const eased = this.ease(progress);

      const distance = eased * this.sparkRadius * this.extraScale;
      const lineLength = this.sparkSize * (1 - eased);

      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      ctx.strokeStyle = this.sparkColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      return true;
    });

    this.animationId = requestAnimationFrame(this.animate);
  };

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent) {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const now = performance.now();
    const newSparks: Spark[] = Array.from({ length: this.sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / this.sparkCount,
      startTime: now,
    }));

    this.sparks.push(...newSparks);
  }
}
