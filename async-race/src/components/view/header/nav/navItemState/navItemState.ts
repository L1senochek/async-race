import { ElementParam } from '../../../../../types/creator/creator';
import { View } from '../../../../creator/view';

class ToGarage extends View {
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {}
}

class ToWinners extends View {
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {}
}

export class NavItemState extends View {
  toGarage!: ToGarage;
  toWinners!: ToWinners;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.toGarage = new ToGarage({
      tag: 'button',
      classNames: ['btn', 'to-garage'],
      innerText: 'TO GARAGE',
    });

    this.toWinners = new ToWinners({
      tag: 'button',
      classNames: ['btn', 'to-winners'],
      innerText: 'TO WINNERS',
    });

    this.view.getElement().prepend(this.toGarage.getHTMLElement(), this.toWinners.getHTMLElement());
  }
}
