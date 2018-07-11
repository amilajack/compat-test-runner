import path from 'path';
import fs from 'fs';
import TestRunner from '../';

describe('Comapt', () => {
  it('should return basic results', async () => {
    const result = await TestRunner();
    const filePath = path.join(__dirname, '..', 'meta.json');
    const file = await fs.promises.readFile(filePath);
    expect(file.toString()).toMatchSnapshot();
  });
});
