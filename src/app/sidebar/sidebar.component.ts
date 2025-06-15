import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public email = "Tsotneivanashvili@gmail.com";
  private isMobile = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 1030;
    if (!this.isMobile) {
      const info = document.querySelector('.info') as HTMLElement;
      if (info) info.classList.add('visible');
      const button = document.querySelector('.show-info-btn') as HTMLElement;
      if (button) button.style.display = 'none';
    } else {
      const info = document.querySelector('.info') as HTMLElement;
      if (info) info.classList.remove('visible');
      const button = document.querySelector('.show-info-btn') as HTMLElement;
      if (button) button.style.display = 'block';
    }
  }

  toggleInfo() {
    const info = document.querySelector('.info') as HTMLElement;
    const button = document.querySelector('.show-info-btn') as HTMLElement;
    if (info && button) {
      if (info.classList.contains('visible')) {
        info.classList.remove('visible');
        button.textContent = 'Show Contacts';
      } else {
        info.classList.add('visible');
        button.textContent = 'Hide Contacts';
      }
    }
  }
}