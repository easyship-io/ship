import { buildUrl } from './build-url';

describe('buildUrl', () => {
    it('without leading and trailing slash', () => {
        const baseUrl = 'http://domain.com/version';
        const part = 'someMethod/argument1';
        const expectedResult = 'http://domain.com/version/someMethod/argument1';

        expect(buildUrl(baseUrl, part)).toEqual(expectedResult);
    });

    it('with leading and without trailing slash', () => {
        const baseUrl = 'http://domain.com/version';
        const part = '/someMethod/argument1';
        const expectedResult = 'http://domain.com/version/someMethod/argument1';

        expect(buildUrl(baseUrl, part)).toEqual(expectedResult);
    });

    it('with leading and trailing slash', () => {
        const baseUrl = 'http://domain.com/version/';
        const part = '/someMethod/argument1';
        const expectedResult = 'http://domain.com/version/someMethod/argument1';

        expect(buildUrl(baseUrl, part)).toEqual(expectedResult);
    });

    it('complex, with more parts', () => {
        const baseUrl = 'http://domain.com/version/';
        const part1 = '/someMethod/argument1';
        const part2 = 'argument2';
        const expectedResult = 'http://domain.com/version/someMethod/argument1/argument2';

        expect(buildUrl(baseUrl, part1, part2)).toEqual(expectedResult);
    });

    it('leave ending slash', () => {
        const baseUrl = 'http://domain.com/version/';
        const part1 = '/someMethod/argument1';
        const part2 = '/argument2/';
        const expectedResult = 'http://domain.com/version/someMethod/argument1/argument2/';

        expect(buildUrl(baseUrl, part1, part2)).toEqual(expectedResult);
    });
});
