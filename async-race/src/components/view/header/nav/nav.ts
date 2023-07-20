import { ElementParam } from '../../../../types/creator/creator';
// import CreatorElement from '../../../creator/creator';
import { View } from '../../../creator/view';
import { NavItemParam } from './navItemParam/navItemParam';
import { NavItemState } from './navItemState/navItemState';
import { NavItemStatus } from './navItemStatus/navItemStatus';

export class NavView extends View {
  navItemState!: NavItemState;
  navItemParam!: NavItemParam;
  navItemStatus!: NavItemStatus;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.navItemState = new NavItemState({ classNames: ['nav__wrapper', 'item-state'] });
    this.navItemParam = new NavItemParam({ classNames: ['nav__wrapper', 'item-param'] });
    this.navItemStatus = new NavItemStatus({ classNames: ['nav__wrapper', 'item-status'] });
    this.view
      .getElement()
      ?.prepend(
        this.navItemState.getHTMLElement(),
        this.navItemParam.getHTMLElement(),
        this.navItemStatus.getHTMLElement()
      );
  }
}
