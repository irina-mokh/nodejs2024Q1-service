import { v4 as uuid } from 'uuid';
import { ItemDto, CreateDto, PartialDto } from './template.dto';

export class TemplateService<T extends ItemDto> {
  items: T[];

  constructor(items: T[]) {
    this.items = items;
  }

  getAll(): T[] {
    return this.items;
  }

  getById(id: string): T {
    return this.items.find((item) => item.id === id);
  }

  create(dto: CreateDto) {
    const item: T = {
      ...dto,
      id: uuid(),
    } as T;

    this.items.push(item);
    return item;
  }

  update(id: string, dto: PartialDto) {
    const item: T = this.getById(id);
    const updatedItem = { ...item, ...dto };
    return updatedItem;
  }

  delete(id: string) {
    const i = this.items.findIndex((item) => item.id === id);
    if (i > -1) this.items.splice(i, 1);
  }
}
