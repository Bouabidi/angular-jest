import { OptionPipe } from './option.pipe';
import { toEnum } from './enum';

describe('OptionPipe', () => {
  it('should return corresponding text when value is null', () => {
    const options = [
      {
        text: '无',
        value: null,
      },
    ];
    expect((new OptionPipe()).transform(null, options)).toEqual('无');
  });

  it('should return 0 as text value', () => {
    const options = [
      {
        text: 0,
        value: null,
      },
    ];
    expect((new OptionPipe()).transform(null, options)).toEqual(0);
  });

  it('should return corresponding text of boolean value', () => {
    const BOOLEAN_OPTIONS = [
      { text: '是', value: true },
      { text: '否', value: false },
    ];
    expect((new OptionPipe()).transform(true, BOOLEAN_OPTIONS)).toEqual('是');
    expect((new OptionPipe()).transform(false, BOOLEAN_OPTIONS)).toEqual('否');
  });

  it('should get text by value from enum', () => {
    const testEnum = toEnum({
      hehehe: { text: 'hehehexxx' },
      hahaha: { text: 'hahahayyyy' },
    });
    expect((new OptionPipe()).transform('hehehe', testEnum)).toEqual('hehehexxx');
    expect((new OptionPipe()).transform('somethingCannotBeFound', testEnum)).toEqual('somethingCannotBeFound');
  });
  it('should get value directly when cannot find input in option array', () => {
    const testArray = [
      { text: 'hehehexxx', value: 'hehehe' },
      { text: 'hahahayyyy', value: 'hahaha' },
    ];
    expect((new OptionPipe()).transform('hehehe', testArray)).toEqual('hehehexxx');
    expect((new OptionPipe()).transform('somethingCannotBeFound', testArray)).toEqual('somethingCannotBeFound');
  });
});
