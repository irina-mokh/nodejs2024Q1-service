import { DBService } from 'src/db/db.service';

export class CRUDService<T, C, U> {
  constructor(private db: DBService, private key: string) {}

  async getAll(): Promise<T[]> {
    return await this.db[this.key].findMany();
  }

  async getById(id: string): Promise<T> {
    return this.db[this.key].findUnique({
      where: { id },
    });
  }

  async create(dto: C) {
    return await this.db[this.key].create({
      data: dto,
    });
  }

  async update(id: string, dto: U) {
    const updItem = await this.db[this.key].update({
      where: { id },
      data: dto,
    });

    return updItem;
  }

  async delete(id: string) {
    await this.db[this.key].delete({ where: { id } });
  }
}
