import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../core/utils/navigation.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ColorService } from '../../core/services/color.service';
import { Observable } from 'rxjs';
import { MaterialService } from '../../core/services/material.service';
import { Router } from '@angular/router';
import { ShirtService } from '../../core/services/shirt.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit { 
  quantidadeLogos = 1;

  colors$ = new Observable<any[]>()
  materials$ = new Observable<any[]>()
  form: any;

  constructor(
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private colorService: ColorService,
    private materialService: MaterialService,
    private shirtService: ShirtService,
    private router: Router
  ) {
  }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      material: [null, Validators.required],
      color: [null, Validators.required],
      file: ['', [Validators.required, this.logoFileValidator.bind(this)]],
      sleeveLogo: [false, Validators.required],
      logoColorsQuantity: [1, [Validators.required, Validators.min(1), Validators.max(3)]]
    });

    this.listColors();
    this.listMaterials();
  }

  listColors() {
    this.colors$ = this.colorService.list()
  }

  listMaterials(){
    this.materials$ = this.materialService.list()
  }
   
  increaseQuantity() {
    if (this.quantidadeLogos < 3) {
      this.quantidadeLogos++;
      this.form.get('logoColorsQuantity').setValue(this.quantidadeLogos);
    }
  }

  decreaseQuantity() {
    if (this.quantidadeLogos > 1) {
      this.quantidadeLogos--;
      this.form.get('logoColorsQuantity').setValue(this.quantidadeLogos);
    }
  }

  logoFileValidator(control: { value: any; }): { [key: string]: any } | null {
    const file = control.value;

    if (file) {
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        return { invalidFileType: true };
      }
    }

    return null;
  }
  
  selectedFile: File | null = null;

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const fileList: FileList | null = inputElement.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const validTypes = ['image/jpeg', 'image/png'];
  
      if (validTypes.includes(file.type)) {
        this.selectedFile = file;
        this.form.get('file')!.setValue(file);
      } else {
        this.selectedFile = null;
        this.form.get('file')!.setValue(null);
      }
    }
  }

  goToView(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('material', this.form.get('material').value.key);
    formData.append('color', this.form.get('color').value.key);
    formData.append('file', this.form.get('file').value);
    formData.append('sleeveLogo', this.form.get('sleeveLogo').value);
    formData.append('logoColorsQuantity', this.form.get('logoColorsQuantity').value);

    this.shirtService.processShirt(formData).subscribe({
      next: (response) => {
        const data = {
          color: this.form.get('color').value.name,
          material: this.form.get('material').value.name,
          logoColorsQuantity: this.form.get('logoColorsQuantity').value
        }

        this.navigationService.navigate(['/view'], { state: { data: { shirts: [...response], ...data  } } })
      },
      error: (error) => {
        console.error('Erro ao processar a camiseta:', error);
      }
    });
  }
  
}


  