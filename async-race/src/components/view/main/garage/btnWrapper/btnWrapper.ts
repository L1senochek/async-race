import { View } from '../../../../creator/view';

export class PrevButton extends View {}
export class NextButton extends View {}
export class BtnWrapper extends View {
  prevBtn!: PrevButton;
  nextBtn!: NextButton;
  constructor() {
    super({ classNames: ['btn-garage__wrapper'] });
    this.changeView();
  }

  private changeView(): void {
    this.prevBtn = new PrevButton({ tag: 'button', classNames: ['btn', 'btn-garage__prev'], innerText: 'PREV' });
    this.nextBtn = new NextButton({ tag: 'button', classNames: ['btn', 'btn-garage__next'], innerText: 'NEXT' });
    this.view.getElement().append(this.prevBtn.getHTMLElement(), this.nextBtn.getHTMLElement());
  }
}
