import { appendQuery } from './append-query';
import { buildUrl } from './build-url';

describe('append query', () => {
    const baseUrl = 'http://domain.com/version';

    it('as object', () => {
        const query = {
            a: 1,
            b: 2,
            c: 3,
            d: 'e'
        };
        const expectedResult = `${baseUrl}?a=1&b=2&c=3&d=e`;

        expect(appendQuery(baseUrl, query)).toBe(expectedResult);
    });

    it('as string', () => {
        const query = 'a=1&b=2&c=3&d=e';
        const expectedResult = `${baseUrl}?a=1&b=2&c=3&d=e`;

        expect(appendQuery(baseUrl, query)).toBe(expectedResult);
    });

    it('on existing query', () => {
        const url = `${baseUrl}?x=y&w=z`;
        const query = 'a=1&b=2&c=3&d=e';
        const expectedResult = `${baseUrl}?x=y&w=z&a=1&b=2&c=3&d=e`;

        expect(appendQuery(url, query)).toBe(expectedResult);
    });

    it('with hash', () => {
        const url = `${baseUrl}#h1=v1&h2=v2`;
        const query = 'a=1&b=2&c=3&d=e';
        const expectedResult = `${baseUrl}?a=1&b=2&c=3&d=e#h1=v1&h2=v2`;

        expect(appendQuery(url, query)).toBe(expectedResult);
    });

    it('with hash on existing query', () => {
        const url = `${baseUrl}?x=y&w=z#h1=v1&h2=v2`;
        const query = 'a=1&b=2&c=3&d=e';
        const expectedResult = `${baseUrl}?x=y&w=z&a=1&b=2&c=3&d=e#h1=v1&h2=v2`;

        expect(appendQuery(url, query)).toBe(expectedResult);
    });

    it('on built endpoint', () => {
        const part1 = '/someMethod/argument1';
        const part2 = '/argument2/';
        const query = 'a=1&b=2&c=3&d=e';
        const expectedResult = `${baseUrl}/someMethod/argument1/argument2/?a=1&b=2&c=3&d=e`;

        expect(
            appendQuery(
                buildUrl(baseUrl, part1, part2),
                query
            )
        ).toBe(expectedResult);
    });
});
