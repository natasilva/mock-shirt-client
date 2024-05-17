import { Component } from '@angular/core';
import { NavigationService } from '../../core/services/navigation.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent  {

  isPrinting: boolean = false;

  estimateData = {
    quantity: 8,
    total_value: 251.50,
    material: 'Dry Fit',
    color: 'Azul',
    shirts: [
      { quantity: 3, unit_value: 30.50, size: 'M', collar: 'V', sleeve: 'Curta', img_blob: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { quantity: 3, unit_value: 30, size: 'P', collar: 'Redonda', sleeve: 'Longa', img_blob: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { quantity: 2, unit_value: 35, size: 'GG', collar: 'V', sleeve: 'Longa', img_blob: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ]
  };

  constructor(
    private navigationService: NavigationService
  ) {}

  goToForm () {
    this.navigationService.navigate("/form")
  }

  generatePdf() {
    this.isPrinting = true;
    
    setTimeout(() => {
      const element = document.getElementById(`print-section-0`);

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