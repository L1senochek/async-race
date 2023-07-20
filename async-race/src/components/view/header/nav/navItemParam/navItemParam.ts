import { ElementParam } from '../../../../../types/creator/creator';
import { View } from '../../../../creator/view';
import { FormCreate } from './formCreate/formCreate';
import { FormUpdate } from './formUpdate/formUpdate';

export class NavItemParam extends View {
  formCreate!: FormCreate;
  formUpdate!: FormUpdate;
  constructor(param: ElementParam) {
    super(param);
    this.changeView();
  }

  private changeView(): void {
    this.formCreate = new FormCreate({
      tag: 'form',
      classNames: ['wrapper-param-item', 'form-create'],
    });
    this.formUpdate = new FormUpdate({
      tag: 'form',
      classNames: ['wrapper-param-item', 'form-update'],
    });

    this.view.getElement().prepend(this.formCreate.getHTMLElement(), this.formUpdate.getHTMLElement());
  }
}
