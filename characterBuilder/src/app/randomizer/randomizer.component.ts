import { Component, computed, inject, signal } from '@angular/core';
import { BuildComponent } from '../build/build.component';
import { CommonModule } from '@angular/common';
import { BuildService } from '../build.service';

@Component({
  selector: 'app-randomizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './randomizer.component.html',
  styleUrl: './randomizer.component.css'
})
export class RandomizerComponent {
  buildComponent = inject(BuildComponent);
  imageUrl = signal('');
  scale = signal(0.5);
  public imageUrlWithScale = computed(() => `${this.imageUrl()}?scale=${this.scale()}`);

  nextImg() {
    this.buildComponent.rndmImg();
    this.imageUrl.set(this.buildComponent.imageSrc());
  }

  bigger() {
    this.scale.update(scale => Math.min(1, scale + 0.1));
  }

  smaller() {
    this.scale.update(scale => Math.min(1, scale - 0.1));
  }
}
