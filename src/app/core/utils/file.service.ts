import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  base64ToUrl(base64: string, contentType: string): string {
    const byteCharacters = atob(base64);
    const byteArrays: Uint8Array[] = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray: Uint8Array = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return this.blobToUrl(new Blob(byteArrays, { type: contentType }));
  }

  blobToUrl(blob: Blob): string {
    return URL.createObjectURL(blob);
  }
}
