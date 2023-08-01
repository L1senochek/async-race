import { ElementParam } from '../../../../../types/creator/creator';
import { View } from '../../../../creator/view';

export class GarageNumPageView extends View {
  countPage!: number;
  constructor(param: ElementParam) {
    super(param);
    this.countPage = 1;
    this.changeView();
  }

  private changeView(): void {
    this.setCount(this.countPage);
  }

  setCount(countPage: number): void {
    this.countPage = countPage;
    this.view.getElement().innerHTML = `Page #<span class="count-page">${this.countPage}</span>`;
  }
}
