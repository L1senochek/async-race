import { View } from '../../../../creator/view';

export class WinnersTitle extends View {
  countWinners!: number;
  constructor() {
    super({ classNames: ['winners__title'] });
    this.countWinners = 0;
    this.setCount(this.countWinners);
  }

  setCount(countWinners: number): void {
    this.countWinners = countWinners;
    this.view.getElement().innerHTML = `Winners (<span class="winners__count-items">${this.countWinners}</span>)`;
  }
}
