const runSequence = require('gulp4-run-sequence');

class Runner {
    constructor() {
        this.tasks = [];
    }

    parallelTasks(...tasks) {
        this.tasks.push([...tasks]);
    }

    startAsync() {
        return new Promise((resolve, reject) => {
            try {
                this.tasks.push(resolve);
                runSequence(this.tasks);
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = Runner;
