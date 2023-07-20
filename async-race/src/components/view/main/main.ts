import { ElementParam } from '../../../types/creator/creator';
import { View } from '../../creator/view';
import { ItemsWrapperView } from './itemsWrapper/itemsWrapper';
import { MainNumPageView } from './numberPage/numberPage';
import { MainTitleView } from './title/title';

export class MainView extends View {
  mainTitleView!: MainTitleView;
  mainNumPageView!: MainNumPageView;
  ItemsWrapperView!: ItemsWrapperView;

  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.mainTitleView = new MainTitleView({ tag: 'h2', classNames: ['title'] });
    this.mainNumPageView = new MainNumPageView({ tag: 'h3', classNames: ['number-page'] });
    this.ItemsWrapperView = new ItemsWrapperView({ classNames: ['items'] });

    this.view
      .getElement()
      .prepend(
        this.mainTitleView.getHTMLElement(),
        this.mainNumPageView.getHTMLElement(),
        this.ItemsWrapperView.getHTMLElement()
      );
  }
}
