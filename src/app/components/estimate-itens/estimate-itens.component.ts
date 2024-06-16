import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-estimate-itens',
  templateUrl: './estimate-itens.component.html',
  styleUrls: ['./estimate-itens.component.scss']
})
export class EstimateItensComponent {

  isPrinting: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public estimateForm: FormGroup) {}

  onDeleteItem(index: number) {
    this.shirts.removeAt(index);
  }

  generatePdf() {
    this.isPrinting = true;

    setTimeout(() => {
      const element = document.getElementById('print-section-1');

      if (element) {
        const opt = {
          margin: [0.3, 0, 0, 0],
          filename: 'document.pdf',
          image: { type: 'png', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        html2pdf().from(element).set(opt).output('blob').then((blob: any) => {
          const url = URL.createObjectURL(blob);

          window.open(url, '_blank');
          this.isPrinting = false;
        }).catch((err: any) => {
          console.error('Error generating PDF:', err);
          this.isPrinting = false;
        });
      } else {
        console.error('Element not found');
        this.isPrinting = false;
      }
    }, 0);
  }

  get shirts(): FormArray {
    return this.estimateForm.get('shirts') as FormArray;
  }
}
