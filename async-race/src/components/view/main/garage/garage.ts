import { View } from '../../../creator/view';
import { WinnersView } from '../winners/winners';
import { BtnWrapper } from './btnWrapper/btnWrapper';
import { ItemsWrapperView } from './itemsWrapper/itemsWrapper';
import { GarageNumPageView } from './numberPage/numberPage';
import { GarageTitleView } from './title/title';

export class GarageView extends View {
  garageTitleView!: GarageTitleView;
  garageNumPageView!: GarageNumPageView;
  itemsWrapperView!: ItemsWrapperView;
  winnersView!: WinnersView;
  btnWrapper!: BtnWrapper;
  constructor() {
    super({ classNames: ['garage'] });
    this.changeView();
  }

  private changeView(): void {
    this.garageTitleView = new GarageTitleView({ tag: 'h2', classNames: ['title'] });
    this.garageNumPageView = new GarageNumPageView({ tag: 'h3', classNames: ['number-page'] });
    this.itemsWrapperView = new ItemsWrapperView();
    this.btnWrapper = new BtnWrapper();

    this.view
      .getElement()
      .prepend(
        this.garageTitleView.getHTMLElement(),
        this.garageNumPageView.getHTMLElement(),
        this.itemsWrapperView.getHTMLElement(),
        this.btnWrapper.getHTMLElement()
      );
  }
}
