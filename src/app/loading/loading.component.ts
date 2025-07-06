import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  originalText = 'Loading...';
  subOriginalText = 'Please wait...';
  displayText = '';
  subDisplayText = '';
  scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  ngOnInit(): void {
    this.startDecryption();
  }

  startDecryption(): void {
    let progress = 0;
    const maxLength = Math.max(this.originalText.length, this.subOriginalText.length);

    const interval = setInterval(() => {
      this.displayText = this.scrambleText(this.originalText, progress);
      this.subDisplayText = this.scrambleText(this.subOriginalText, progress);

      progress++;

      if (progress > maxLength) {
        clearInterval(interval);
      }
    }, 50);
  }

  scrambleText(text: string, progress: number): string {
    return text.split('').map((char, i) => {
      if (i < progress) return char;
      if (char === ' ') return ' ';
      return this.scrambleChars[Math.floor(Math.random() * this.scrambleChars.length)];
    }).join('');
  }
}
