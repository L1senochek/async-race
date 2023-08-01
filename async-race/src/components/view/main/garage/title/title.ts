import { ElementParam } from '../../../../../types/creator/creator';
import { View } from '../../../../creator/view';

export class GarageTitleView extends View {
  countItems!: number;
  constructor(param: ElementParam) {
    super(param);
    this.countItems = 0;
    this.changeView();
  }

  private changeView(): void {
    this.setCount(this.countItems);
  }

  setCount(countItems: number): void {
    this.countItems = countItems;
    this.view.getElement().innerHTML = `GARAGE (<span class="count-items">${this.countItems}</span>)`;
  }
}
