import { Component, inject, Injectable, signal } from '@angular/core';
import { BuildService } from '../build.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-build',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './build.component.html',
  styleUrl: './build.component.css',
})


@Injectable({
  providedIn: 'root'
})

export class BuildComponent {
  eye = signal('');
  hasHammer = signal(false);
  mouth = signal('');
  rightHand = signal('');
  hasTail = signal(false);
  imageSrc = signal('');

  buildService = inject(BuildService);

  async createImgUrl() {
    const response = await this.buildService
      .createImgUrl(
        this.eye(),
        this.hasHammer(),
        this.mouth(),
        this.rightHand(),
        this.hasTail()
      )
      .then((response) => {
        this.imageSrc.set(response.url);
      });
  }
  async rndmImg() {
    const response = await this.buildService
      .getRandomImageOptions()
      .then((response) => {
        this.eye.set(response.eye);
        this.hasHammer.set(response.hasHammer);
        this.mouth.set(response.mouth);
        this.rightHand.set(response.rightHand);
        this.hasTail.set(response.hasTail);
      });
    this.createImgUrl();
  }
}
