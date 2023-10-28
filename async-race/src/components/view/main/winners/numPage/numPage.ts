import { View } from '../../../../creator/view';

export class WinnersNumPage extends View {
  countPageWinners!: number;
  constructor() {
    super({ classNames: ['winners__num-page'] });
    this.countPageWinners = 1;
    this.setCount(this.countPageWinners);
  }

  setCount(countPageWinners: number): void {
    this.countPageWinners = countPageWinners;
    this.view.getElement().innerHTML = `Page #<span class="winners__count-page">${this.countPageWinners}</span>`;
  }
}
