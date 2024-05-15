import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  //standalone: true,
  //imports: [MatButtonModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }
  title = 'mock-shirt-client';
  
  goToView () {
    this.navigate("/view")
  }
  goToForm () {
    this.navigate("/form")
  }
  navigate(url: string): Promise<boolean> {
    //let url = args.filter(v => typeof v == string);
    let parameters = {
      relativeTo: this.route
    } //url.length < args.length ? args[args.length - 1] : null;
    return this.router.navigate([url], parameters);
  }
}