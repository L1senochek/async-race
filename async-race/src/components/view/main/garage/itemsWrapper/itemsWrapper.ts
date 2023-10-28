import { View } from '../../../../creator/view';
import { ItemView } from './item/item';

export class ItemsWrapperView extends View {
  item!: ItemView;
  constructor() {
    super({ classNames: ['items'] });
  }
}
