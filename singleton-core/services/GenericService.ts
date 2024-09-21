import { BaseEntity, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IApplicationService } from './utils';
import { InternalError, NotFound } from './errors';
import Logger from './Logger';

/**
 *
 */
export class GenericService<T extends BaseEntity>
  implements IApplicationService<T> {
  public entity: string;
  constructor(protected entityRepository: Repository<T>) {}

  /**
   *
   * @param {Partial<T>} data
   * @param query
   * @returns {Promise<T>}
   */
  async create(data: Partial<T>, query?: any): Promise<T> {
    try {
      const result = await this.entityRepository.insert(
        data as QueryDeepPartialEntity<T> | any,
      );
      const id = result.identifiers[0] as any;
      return await this.get(id, query);
    } catch (e) {
      Logger.log(
        `service:${this.entity}:create`,
        `An error happened while creating data with:\n
        ${JSON.stringify(data, null, 2)}`,
        e,
      );
      throw new InternalError(e.message);
    }
  }

  /**
   *
   * @param {number | string} id
   * @param query
   * @returns {Promise<any>}
   */
  async delete(id: number | string, query?: any): Promise<any> {
    const entity = await this.get(id, query);
    try {
      await this.entityRepository.remove(entity);
      return entity;
    } catch (e) {
      Logger.log(
        `service:${this.entity}:delete`,
        `An error happened while deleting data with ID: ${id}`,
        e,
      );
      throw new InternalError(e.message);
    }
  }

  /**
   *
   * @param query
   * @returns {Promise<T[]>}
   */
  async find(query: any = {}): Promise<T[]> {
    try {
      return await this.entityRepository.find(query);
    } catch (e) {
      Logger.log(
        `service:${this.entity}:find`,
        `An error happened while fetching data with query:
        ${JSON.stringify(query, null, 2)}`,
        e,
      );
      throw new InternalError(e.message);
    }
  }

  /**
   *
   * @param {number | string} id
   * @param query
   * @returns {Promise<T>}
   */
  async get(id: number | string, query?: any): Promise<T> {
    let entity;
    try {
      entity = await this.entityRepository.findOne(id, query);
    } catch (e) {
      Logger.log(
        `service:${this.entity}:get`,
        `An error happened while getting data with id: ${id}`,
        e,
      );
      throw new InternalError(e.message);
    }

    if (entity) {
      return entity;
    }
    throw new NotFound();
  }

  /**
   *
   * @param {number | string} id
   * @param {Partial<T>} data
   * @param query
   * @returns {Promise<T>}
   */
  async update(id: number | string, data: Partial<T>, query: any): Promise<T> {
    const entity = await this.get(id, query);
    try {
      await this.entityRepository.update(
        this.entityRepository.getId(entity),
        data as QueryDeepPartialEntity<T> | any,
      );
      return await this.get(id, query);
    } catch (e) {
      Logger.log(
        `service:${this.entity}:update`,
        `An error happened while updating data with id: ${id}\n
data: ${JSON.stringify(data, null, 2)}`,
        e,
      );
      throw new InternalError(e.message);
    }
  }
}
