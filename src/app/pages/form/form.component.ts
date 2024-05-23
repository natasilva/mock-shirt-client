import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../core/services/navigation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorService } from '../../core/services/color.service';
import { Observable } from 'rxjs';
import { MaterialService } from '../../core/services/material.service';

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
    private materialService: MaterialService
  ) {
  }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      malha: ['', Validators.required],
      cor: ['', Validators.required],
      logo: ['', [Validators.required, this.logoFileValidator.bind(this)]],  // Garantir uso do bind se necessário
      logoManga: [false, Validators.required],
      quantidadeLogos: [1, [Validators.required, Validators.min(1), Validators.max(3)]]
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
  
  goToView () {
    if (this.form.valid) {
      this.navigationService.navigate('/view');
    } else {
      this.form.markAllAsTouched();
    }
  }
  
  increaseQuantity() {
    if (this.quantidadeLogos < 3) {
      this.quantidadeLogos++;
      this.form.get('quantidadeLogos').setValue(this.quantidadeLogos);
    }
  }

  decreaseQuantity() {
    if (this.quantidadeLogos > 1) {
      this.quantidadeLogos--;
      this.form.get('quantidadeLogos').setValue(this.quantidadeLogos);
    }
  }

  
  logoFileValidator(control: { value: any; }): { [key: string]: any } | null {
    const file = control.value;
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
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
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (validTypes.includes(file.type)) {
        this.selectedFile = file;
        this.form.get('logo')!.setValue(file);
      } else {
        this.selectedFile = null;
        this.form.get('logo')!.setValue(null);
        // Aqui você pode adicionar uma mensagem de erro ou fazer o que preferir para lidar com o tipo de arquivo inválido
      }
    }
  }
  
}


  