import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Convoia';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // this.authService.loadUserProfile().subscribe(user => {
    //   console.log('User loaded:', user);
    //   if (user) {
    //     console.log('User is logged in:', user);
    //   } else {
    //     console.log('User is not logged in');
    //   }
    // });
  }
}
