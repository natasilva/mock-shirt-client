import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  navigate(url: string[], params: any = {}): Promise<boolean> {
    // let parameters = {
    //   relativeTo: this.route
    // }

    return this.router.navigate(url, params);
  }
}