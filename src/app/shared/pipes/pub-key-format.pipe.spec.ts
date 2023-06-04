import { PubKeyFormatPipe } from './pub-key-format.pipe';

describe('PubKeyFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new PubKeyFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
