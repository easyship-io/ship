import { getSearchParam } from './get-search-param';

describe('getSearchParam', () => {
    const baseUrl = 'http://domain.com/version';

    it('simple', () => {
        const query = '?a=1&b=2&c=3&d=e';
        expect(getSearchParam(`${baseUrl}${query}`, 'b')).toBe('2');
    });

    it('non existing', () => {
        const query = '?a=1&b=2&c=3&d=e';
        expect(getSearchParam(`${baseUrl}${query}`, 'e')).toBeNull();
    });
});
