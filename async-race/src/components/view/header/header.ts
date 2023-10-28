import { ElementParam } from '../../../types/creator/creator';
import { View } from '../../creator/view';
import { LogoView } from './logo/logo';
import { NavView } from './nav/nav';

export class HeaderView extends View {
  nav!: NavView;
  logo!: LogoView;

  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.nav = new NavView({ classNames: ['nav'] });
    this.logo = new LogoView({ classNames: ['logo'] });
    this.view.getElement().prepend(this.nav.getHTMLElement(), this.logo.getHTMLElement());
  }
}
