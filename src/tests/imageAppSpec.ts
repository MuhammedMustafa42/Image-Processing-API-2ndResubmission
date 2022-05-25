import processImg from '../imageApp';

it('Processing the image', async () => {
  const imageName = 'fjord';
  const process = await processImg(imageName, 200, 200);
  expect(process).toBe('processed');
});
