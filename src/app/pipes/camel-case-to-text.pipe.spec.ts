import { CamelCaseToTextPipe } from './camel-case-to-text.pipe';

describe('CamelCaseToTextPipe', () => {
  it('create an instance', () => {
    const pipe = new CamelCaseToTextPipe();
    expect(pipe).toBeTruthy();
  });
});
