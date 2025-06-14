import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterModule } from '@angular/router';
import { BannerComponent } from "../banner/banner.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, RouterModule, BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
