import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  imports: [RouterModule, NavbarComponent, SidebarComponent,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public email = 'Tsotneivanashvili@gmail.com'


}
