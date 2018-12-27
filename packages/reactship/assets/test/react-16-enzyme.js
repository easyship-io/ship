import jasmineEnzyme from '${JASMINE_ENZYME}';
import { configure } from '${ENZYME}';
import Adapter from '${REACT_16_ENZYME_ADAPTER}';

configure({ adapter: new Adapter() });

beforeEach(() => jasmineEnzyme());

export * from '${ENZYME}';
