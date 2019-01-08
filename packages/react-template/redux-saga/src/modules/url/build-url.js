import {
    endsWith,
    findLast,
    reduce
} from 'lodash';

const normalize = str => str.replace(/^\/|\/$/g, '');

export const buildUrl = (...parts) => {
    const normalizedUrl = normalize(
        reduce(
            parts,
            (result, part) => `${result}/${normalize(part)}`,
            ''
        )
    );
    return `${normalizedUrl}${endsWith(findLast(parts, part => part), '/') ? '/' : ''}`;
};
