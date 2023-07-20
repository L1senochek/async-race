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
      classNames: ['btn', 'garage'],
      innerText: 'TO GARAGE',
      callback: () => {
        window.location.href = './';
        // this.toGarage.
        // либо добавить переотрисовку Garage на WINNERS
      },
    });

    this.toWinners = new ToWinners({
      tag: 'button',
      classNames: ['btn', 'winners'],
      innerText: 'TO WINNERS',
      callback: () => {
        window.location.href = './';
        // либо добавить переотрисовку WINNERS на Garage
      },
      // attributes: {
      //   type: 'submit',
      // },
    });

    this.view.getElement().prepend(this.toGarage.getHTMLElement(), this.toWinners.getHTMLElement());
  }
}
