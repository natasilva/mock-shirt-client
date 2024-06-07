import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../core/utils/navigation.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { EstimateItensComponent } from '../../components/estimate-itens/estimate-itens.component';
import { MatDialog } from '@angular/material/dialog';
import { FileService } from '../../core/utils/file.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit{

  isPrinting: boolean = false;
  data: any[] = []

  estimateData = {
    quantity: 8,
    total_value: 251.50,
    material: 'Dry Fit',
    color: 'Azul',
    shirts: [
      { quantity: 3, unit_value: 30.50, size: 'M', collar: 'V', sleeve: 'Curta', img_blob: '' },
      { quantity: 3, unit_value: 30, size: 'P', collar: 'Redonda', sleeve: 'Longa', img_blob: '' },
      { quantity: 2, unit_value: 35, size: 'GG', collar: 'V', sleeve: 'Longa', img_blob: '' }
    ]
  };

  constructor(
    private navigationService: NavigationService,
    public dialog: MatDialog,
    private fileService: FileService,
  ) {}

  ngOnInit(): void {
    if (history.state && history.state.data) {
      this.data = history.state.data;

      for (let shirt of this.estimateData.shirts) {
        shirt.img_blob = this.fileService.base64ToUrl(this.data[0].front, 'image/png')
      }
    }
  }

  goToForm () {
    this.navigationService.navigate(["/form"])
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

  openlist() {
    this.dialog.open(EstimateItensComponent, {
      width: '1500px',
      data: this.estimateData
    })
  }
}
