import jasmineEnzyme from '${JASMINE_ENZYME}';
import { configure } from '@easyship/enzyme';
import Adapter from '${REACT_ENZYME_ADAPTER}';

configure({ adapter: new Adapter() });

beforeEach(() => jasmineEnzyme());
