import { ElementParam } from '../../../../types/creator/creator';
import CreatorElement from '../../../creator/creator';
import { View } from '../../../creator/view';

export class LogoView extends View {
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    const logoTitle = new CreatorElement({ tag: 'h1', classNames: ['logo__title'], innerText: 'ASYNC RACE' });
    const logoImg = new CreatorElement({ classNames: ['logo__img'] });
    this.view.getElement()?.prepend(logoTitle.getElement(), logoImg.getElement());
  }
}
