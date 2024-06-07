import { Component, Input } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-estimate-itens',
  templateUrl: './estimate-itens.component.html',
  styleUrls: ['./estimate-itens.component.scss']
})
export class EstimateItensComponent {

  @Input() estimateData: any;
  isPrinting: boolean = false;

  constructor() {
    this.estimateData = {
      quantity: 8,
      total_value: 251.50,
      material: 'Dry Fit',
      color: 'Azul',
      shirts: [
        { quantity: 3, unit_value: 30.50, size: 'M', collar: 'V', sleeve: 'Curta', img_blob: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { quantity: 3, unit_value: 30, size: 'P', collar: 'Redonda', sleeve: 'Longa', img_blob: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { quantity: 2, unit_value: 35, size: 'GG', collar: 'V', sleeve: 'Longa', img_blob: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { quantity: 20, unit_value: 50, size: 'GG', collar: 'V', sleeve: 'Longa', img_blob: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      ]
    };
  }

  onDeleteItem(index: number) {
    this.estimateData.shirts.splice(index, 1);
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
}
