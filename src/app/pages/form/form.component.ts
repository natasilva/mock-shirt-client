import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../core/utils/navigation.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ColorService } from '../../core/services/color.service';
import { Observable } from 'rxjs';
import { MaterialService } from '../../core/services/material.service';
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
  ) {
  }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      material: [null, Validators.required],
      color: [null, Validators.required],
      backLogo: ['', [Validators.required, this.logoFileValidator.bind(this)]],
      frontLogo: ['', [Validators.required, this.logoFileValidator.bind(this)]],
      rightSleeveLogo: ['', null],
      leftSleeveLogo: ['', null],
      sleeveLogo: [false, Validators.required],
      logoColorsQuantity: [1, [Validators.required, Validators.min(1), Validators.max(3)]]
    });

    this.form.controls['sleeveLogo'].valueChanges.subscribe((val) => {
      const rightSleeveControl = this.form.get('rightSleeveLogo');
      const leftSleeveControl = this.form.get('leftSleeveLogo');

      if (!val) {
        rightSleeveControl.setValue(null);
        leftSleeveControl.setValue(null);
      
        rightSleeveControl.clearValidators();
        leftSleeveControl.clearValidators();
      } else {
        rightSleeveControl.setValidators([Validators.required, this.logoFileValidator.bind(this)]);
        leftSleeveControl.setValidators([Validators.required, this.logoFileValidator.bind(this)]);
      }

      rightSleeveControl.updateValueAndValidity();
      leftSleeveControl.updateValueAndValidity();
    })

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

  onFileChange(event: Event, control: string) {
    const inputElement = event.target as HTMLInputElement;
    const fileList: FileList | null = inputElement.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const validTypes = ['image/jpeg', 'image/png'];
  
      if (validTypes.includes(file.type)) {
        this.selectedFile = file;
        this.form.get(control)!.setValue(file);
      } else {
        this.selectedFile = null;
        this.form.get(control)!.setValue(null);
      }
    }
  }

  goToView(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('material', this.form.get('material').value.acronym);
    formData.append('color', this.form.get('color').value.acronym);
    formData.append('frontLogo', this.form.get('frontLogo').value);
    formData.append('backLogo', this.form.get('backLogo').value);    
    formData.append('sleeveLogo', this.form.get('sleeveLogo').value);
    formData.append('logoColorsQuantity', this.form.get('logoColorsQuantity').value);

    if (this.form.get('sleeveLogo').value) {
      formData.append('rightSleeveLogo', this.form.get('rightSleeveLogo').value);
      formData.append('leftSleeveLogo', this.form.get('leftSleeveLogo').value);
    }

    this.shirtService.processShirt(formData).subscribe({
      next: (response) => {
        const data = {
          color: this.form.get('color').value.name,
          material: this.form.get('material').value.name,
          logoColorsQuantity: this.form.get('logoColorsQuantity').value,
          sleeveLogo: this.form.get('sleeveLogo').value
        }

        this.navigationService.navigate(['/view'], { state: { data: { shirts: [...response], ...data  }}})
      },
      error: (error) => {
        console.error('Erro ao processar a camiseta:', error);
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
  
    if (control.hasError('required')) {
      return 'Este campo é obrigatório!';
    } else if (control.hasError('requiredFileType')) {
      return 'Preencha todos campos obrigatórios! (jpg/png)';
    }
  
    return '';
  }
  
}


  