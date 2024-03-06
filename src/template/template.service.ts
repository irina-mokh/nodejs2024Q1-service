type ItemType = {
  id: string;
};
export class TemplateService<T extends ItemType> {
  items: T[] = [];

  getAll(): T[] {
    console.log(this.items);
    return this.items;
  }

  getById(id: string): T {
    return this.items.find((item) => item.id === id);
  }

  delete(id: string) {
    this.items = this.items.filter((track) => track.id !== id);
  }
}
