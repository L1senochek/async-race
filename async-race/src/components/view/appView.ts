// import { ElementParam } from '../../types/creator/creator';
import CreatorElement from '../creator/creator';
// import { View } from '../creator/view';
import { HeaderView } from './header/header';

export class AppView {
  wrapper!: HTMLElement;
  header!: HeaderView;

  constructor() {
    this.changeView();
  }

  private changeView(): void {
    this.header = new HeaderView({ tag: 'header', classNames: ['header'] });

    this.wrapper = new CreatorElement({ classNames: ['wrapper'] }).getElement();
    this.wrapper.prepend(this.header.getHTMLElement());
    document.body.prepend(this.wrapper);
  }
}
