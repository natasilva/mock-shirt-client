import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrl: './estimate.component.scss'
})
export class EstimateComponent {
  @Input() data: any;

  blobToUrl(blob: Blob) {
    return URL.createObjectURL(blob);
  }
}
