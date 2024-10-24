import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export type BuildImageResponse = {
  url: string;
};

export type RandomImageOptions = {
  eye: string;
  hasHammer: boolean;
  mouth: string;
  rightHand: string;
  hasTail: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class BuildService {
  private httpClient = inject(HttpClient);

  createImgUrl(
    eye: string,
    hasHammer: boolean,
    mouth: string,
    rightHand: string,
    hasTail: boolean
  ): Promise<BuildImageResponse> {
    return firstValueFrom(
      this.httpClient.post<BuildImageResponse>(
        'http://localhost:5110/build-image-url',
        {
          eye: eye,
          hasHammer: hasHammer,
          mouth: mouth,
          rightHand: rightHand,
          hasTail: hasTail,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
    );
  }

  async getRandomImageOptions() {
    return firstValueFrom(
      this.httpClient.get<RandomImageOptions>(
        'http://localhost:5110/get-random-image-options',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
    );
  }
}
