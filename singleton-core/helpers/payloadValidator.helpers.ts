import { Request } from 'express';
import { isUndefined } from 'util';
type Validation = {
  message: string;
  property: string;
};

export default class PayloadValidator {

  /**
   * The search is performed in the request with the parameters to validate
   */
  protected validations: Validation[];
  protected req: Request;
  protected invalidProperties: any[];
  protected messages: any[] = [];

  constructor(req: Request) {
    this.req = req;
    this.validations = [];
  }

  validate(params: String[]) {
    this.validations = params.map((item) => {
      return { property: item, message: `${item} is required` } as Validation;
    });
  }

  /**
   * Validate the objects within a specified key.
   */
  getErrorsArray(key: string): string[] {
    this.req.body[key].forEach((item: any) => {
      this.invalidProperties = this.validations
          .filter(e => isUndefined(item[e.property]));
      this.invalidProperties.forEach(prop => this.messages.push(prop.message));
    });

    // @ts-ignore
    return this.messages.length && [...new Set(this.messages)];
  }

  /**
   * Verify that the parameters to be validated { Validate ()  } are in the request.
   */
  getErrors(isArray?: boolean): string[] {
    if (isArray) {
      for (const data of this.req.body) {
        this.invalidProperties = this.validations
            .filter(e => isUndefined(data[e.property]));
        this.messages = this.invalidProperties.map(prop => prop.message);
      }

    } else {
      this.invalidProperties = this.validations
          .filter(e => isUndefined(this.req.body[e.property])
              || this.req.query[e.property]
              || this.req.params[e.property]);
      this.messages = this.invalidProperties.map(prop => prop.message);
    }

    // @ts-ignore
    return this.messages.length && [...new Set(this.messages)];
  }
}
