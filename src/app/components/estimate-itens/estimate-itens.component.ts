import { Component, Inject } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormGroup } from '@angular/forms';
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
      const element = document.getElementById(`print-section-1`);

      html2canvas(element || new HTMLElement(), { scale: 1 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        const blob = pdf.output('blob');
        const url = URL.createObjectURL(blob);

        window.open(url, '_blank');
      });

      this.isPrinting = false;
    });
  }

  get shirts(): FormArray {
    return this.estimateForm.get('shirts') as FormArray;
  }
}
