import * as _ from 'lodash';

type InputValue = string | boolean | number | undefined | null;
type EnumInput = Record<string, { text: string, value?: InputValue }>;

type InputItem<T> = T extends Record<string, infer U> ? U : never;

type EnumItem<T> = InputItem<T> & { value: EnumItemValue<T> };

type EnumItemValue<T> = T extends Record<string, { value?: infer U }> ? U : string;

interface EnumType<T> {
  values: EnumItem<T>[];

  getTextByValue(value: string): string;

  get(key: keyof T): EnumItem<T>;

  getByValue(value: EnumItemValue<T>): EnumItem<T>;
}

export type Enum<T> = Record<keyof T, EnumItem<T>> & EnumType<T>;

export const toEnum = <T extends EnumInput>(map: T): Enum<T> => {
  const enumMap: any = Object.keys(map)
    .reduce((result, key) => ({ ...result, [key]: { value: key, ...map[key] } }), {});
  enumMap.values = Object.keys(map).map(key => enumMap[key]);
  enumMap.getTextByValue = (value: string) => _.get(_.find(enumMap, { value }), 'text', '');
  enumMap.get = (key: keyof T) => enumMap[key];
  enumMap.getByValue = (value: EnumItemValue<T>) => _.find(enumMap, { value });
  return enumMap as Enum<T>;
};
