import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { Enum } from './enum';

export const isEmptyValue = (value) =>
  typeof value !== 'number'
  && typeof value !== 'boolean'
  && (value === null || value === undefined || value === [] || value === {} || value === '');

@Pipe({ name: 'option' })
export class OptionPipe implements PipeTransform {
  transform<T>(optionValue: any, optionList: Array<{ value: any, text: any }> | Enum<T>): any {
    const textFound = _.isArray(optionList)
      ? _.chain(optionList as Array<{ value: any, text: any }>)
        .find({ value: optionValue })
        .get('text', '')
        .value()
      : (optionList as Enum<T>).getTextByValue(optionValue);
    return isEmptyValue(textFound) && !isEmptyValue(optionValue) ? optionValue : textFound;
  }
}
