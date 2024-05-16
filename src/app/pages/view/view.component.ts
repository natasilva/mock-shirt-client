import { Component } from '@angular/core';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent  {

  constructor(
    private navigationService: NavigationService
  ) {}

  goToForm () {
    this.navigationService.navigate("/form")
  }
}
