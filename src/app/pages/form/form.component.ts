import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../core/services/navigation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorService } from '../../core/services/color.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit { 
  quantidadeLogos = 1;
  colors$ = new Observable<any[]>()
  
  constructor(
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.listColors()
  }

   listColors() {
      this.colors$ =  this.colorService.list();
      return this.colors$
  }
  

  goToView () {

  }
  
  increaseQuantity() {
    if (this.quantidadeLogos < 3) {
      this.quantidadeLogos++;
    }
  }

  decreaseQuantity() {
    if (this.quantidadeLogos > 1) {
      this.quantidadeLogos--;
    }
  }
  }
