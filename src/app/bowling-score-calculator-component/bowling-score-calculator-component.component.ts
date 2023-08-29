import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bowling-score-calculator-component',
  templateUrl: './bowling-score-calculator-component.component.html',
  styleUrls: ['./bowling-score-calculator-component.component.scss']
})

export class BowlingScoreCalculatorComponentComponent implements OnInit {
  frames: number[][] = []; // Array to store the frames and their scores
  currentFrame: number[] = []; // Array to store the current frame being played
  totalScore: number = 0; // Total score of the game

  constructor() { }

  ngOnInit(): void {
  }

  // Function to add a roll to the current frame
  addRoll(pins: number): void {
    if (this.currentFrame.length < 2) {
      this.currentFrame.push(pins);
    } else if (this.currentFrame.length === 2 && this.currentFrame.reduce((a, b) => a + b) < 10) {
      this.frames.push(this.currentFrame);
      this.currentFrame = [pins];
    } else if (this.currentFrame.length === 2 && this.currentFrame.reduce((a, b) => a + b) === 10) {
      this.currentFrame.push(pins);
    }

    this.calculateScore();
  }

  // Function to calculate the score
  calculateScore(): void {
    this.totalScore = 0;

    for (let i = 0; i < this.frames.length; i++) {
      let frameScore = this.frames[i].reduce((a, b) => a + b);

      // Check for strike or spare
      if (this.frames[i][0] === 10 && this.frames[i].length === 1) {
        if (i < 9) {
          frameScore += this.frames[i + 1][0] + this.frames[i + 1][1];
        } else if (i === 9 && this.frames[i].length === 3) {
          frameScore += this.frames[i][1] + this.frames[i][2];
        }
      } else if (frameScore === 10 && this.frames[i].length === 2) {
        if (i < 9) {
          frameScore += this.frames[i + 1][0];
        } else if (i === 9 && this.frames[i].length === 3) {
          frameScore += this.frames[i][2];
        }
      }

      this.totalScore += frameScore;
    }
  }

  // Function to reset the game
  resetGame(): void {
    this.frames = [[]];
    this.currentFrame = [];
    this.totalScore = 0;
  }
}
