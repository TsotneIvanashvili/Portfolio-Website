import { Component, ElementRef, ViewChild } from '@angular/core';
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

 @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  scrollCards(direction: 'left' | 'right') {
    const container = this.scrollContainer.nativeElement;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }


  public email = 'Tsotneivanashvili@gmail.com'
 @ViewChild('cardContainer', { static: true }) cardContainer!: ElementRef<HTMLDivElement>;

  scrollLeft() {
    this.cardContainer.nativeElement.scrollBy({ left: -350, behavior: 'smooth' });
  }

  scrollRight() {
    this.cardContainer.nativeElement.scrollBy({ left: 350, behavior: 'smooth' });
  }



@ViewChild('cardContainer2', { static: true }) cardContainer2!: ElementRef;

scrollCards2(direction: 'left' | 'right') {
  const container: HTMLElement = this.cardContainer2.nativeElement;
  const card: HTMLElement | null = container.querySelector('.card');

  if (!card) return;

  const style = window.getComputedStyle(card);
  const marginRight = parseInt(style.marginRight || '0');
  const scrollAmount = card.offsetWidth + marginRight;

  container.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  });
}



}
