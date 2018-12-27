try {
    require('${INIT_TESTS}');
} catch (error) {

}

const testsContext = require.context('${SRC}', true, /^.*\.spec\.js$/);
testsContext.keys().forEach(testsContext);
