// import { ElementParam } from '../../types/creator/creator';
import CreatorElement from '../creator/creator';
// import { View } from '../creator/view';
import { HeaderView } from './header/header';
import { MainView } from './main/main';

export class AppView {
  wrapper!: HTMLElement;
  header!: HeaderView;
  main!: MainView;

  constructor() {
    this.changeView();
  }

  private changeView(): void {
    this.header = new HeaderView({ tag: 'header', classNames: ['header'] });
    this.main = new MainView({ tag: 'main', classNames: ['main'] });

    this.wrapper = new CreatorElement({ classNames: ['wrapper'] }).getElement();
    this.wrapper.prepend(this.header.getHTMLElement(), this.main.getHTMLElement());
    document.body.prepend(this.wrapper);
  }
}
