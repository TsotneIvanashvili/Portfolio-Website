import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  originalText = 'Loading...';
  displayText = '';
  scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  ngOnInit() {
    this.startDecryption();
  }

  startDecryption() {
    let progress = 0;
    const interval = setInterval(() => {
      this.displayText = this.originalText
        .split('')
        .map((char, i) => {
          if (i < progress) return char;
          if (char === ' ') return ' ';
          return this.scrambleChars[Math.floor(Math.random() * this.scrambleChars.length)];
        })
        .join('');
      progress++;

      if (progress > this.originalText.length) {
        clearInterval(interval);
      }
    }, 50);
  }
}
