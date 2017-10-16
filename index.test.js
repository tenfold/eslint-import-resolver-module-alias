const mockNodeResolver = {
  resolve: jest.fn((path) => ({ found: true, path })),
};

jest.mock('eslint-import-resolver-node', () => mockNodeResolver);
jest.mock('find-root', (file) => () => '../');
jest.mock('../package.json', () => ({
  _moduleAliases: {
    "testLibs": "test/lib"
  },
}))

const resolver = require('./index');

beforeEach(() => {
  mockNodeResolver.resolve.mockClear();
});

test('it works for aliased module', () => {
  const result = resolver.resolve('testLibs/helpers', '/just/mock/file/path', 'example-config');
  expect(result).toEqual({ found: true, path: '../test/lib/helpers' });
  expect(mockNodeResolver.resolve.mock.calls[0]).toEqual([ '../test/lib/helpers', '/just/mock/file/path', 'example-config']);
});

test('it works for regular global module', () => {
  const result = resolver.resolve('some-global-module', '/just/mock/file/path', 'example-config');
  expect(result).toEqual({ found: true, path: 'some-global-module' });
  expect(mockNodeResolver.resolve.mock.calls[0]).toEqual([ 'some-global-module', '/just/mock/file/path', 'example-config']);
});

test('it works for regular module with relative path', () => {
  const result = resolver.resolve('./some/local/module', '/just/mock/file/path', 'example-config');
  expect(result).toEqual({ found: true, path: './some/local/module' });
  expect(mockNodeResolver.resolve.mock.calls[0]).toEqual([ './some/local/module', '/just/mock/file/path', 'example-config']);
});

