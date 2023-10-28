import { ElementParam } from '../../../../../types/creator/creator';
import { View } from '../../../../creator/view';

class BtnRace extends View {}
class BtnReset extends View {}
class BtnGenerate extends View {}

export class NavItemStatus extends View {
  btnRace!: BtnRace;
  btnReset!: BtnReset;
  btnGenerate!: BtnGenerate;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.btnRace = new BtnRace({ tag: 'button', classNames: ['btn', 'race'], innerText: 'RACE' });
    this.btnReset = new BtnReset({ tag: 'button', classNames: ['btn', 'reset'], innerText: 'RESET' });
    this.btnGenerate = new BtnGenerate({
      tag: 'button',
      classNames: ['btn', 'generate-item'],
      innerText: 'GENERATE CATS',
    });

    this.view
      .getElement()
      .prepend(this.btnRace.getHTMLElement(), this.btnReset.getHTMLElement(), this.btnGenerate.getHTMLElement());
  }
}
