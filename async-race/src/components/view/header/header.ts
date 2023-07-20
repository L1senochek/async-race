import { ElementParam } from '../../../types/creator/creator';
// import CreatorElement from '../../creator/creator';
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
    // this.reloadCreator = new CreatorElement({ classNames: ['reload'] }).getElement();
    // this.helpCreator = new CreatorElement({ classNames: ['help'] }).getElement();
    // const logoCreator = new logoCreatorView({ classNames: ['logo'] });
    // logoCreator.appendElems([{ classNames: ['logo__ico'] }, { classNames: ['logo__title'], innerText: 'CSS Diner' }]);
    // const btnWrapperCreator = new btnWrapperCreatorView({ classNames: ['btn__wrapper'] });
    // btnWrapperCreator.appendElems([this.reloadCreator, this.helpCreator]);
    this.view.getElement().prepend(this.nav.getHTMLElement(), this.logo.getHTMLElement());
  }
}
