import { View } from '../../../../creator/view';

export class PrevButtonWinners extends View {}
export class NextButtonWinners extends View {}

export class ButtonWinners extends View {
  prevBtnWinners!: PrevButtonWinners;
  nextBtnWinners!: NextButtonWinners;
  constructor() {
    super({ classNames: ['winners__btns'] });
    this.changeView();
  }

  private changeView(): void {
    this.prevBtnWinners = new PrevButtonWinners({
      tag: 'button',
      classNames: ['btn', 'winner__prev'],
      innerText: 'PREV',
    });
    this.nextBtnWinners = new NextButtonWinners({
      tag: 'button',
      classNames: ['btn', 'winner__next'],
      innerText: 'NEXT',
    });
    this.view.getElement().append(this.prevBtnWinners.getHTMLElement(), this.nextBtnWinners.getHTMLElement());
  }
}
