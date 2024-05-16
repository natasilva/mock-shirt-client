import { Component } from '@angular/core';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  constructor(
    private navigationService: NavigationService
  ) {}

  goToView () {
    this.navigationService.navigate("/view")
  }
}
