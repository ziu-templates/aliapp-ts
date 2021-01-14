/**
 * 将元数据渲染到package.json
 */
let pkgData = require('./meta.js'),
    pipe = require('./pipe.js');
module.exports = function ({promptsData = {}, handlebars = {}, metalsmith = {}, match = {}, render = {}} = {}) {
    // register handlebars helper
    handlebars.registerHelper('if_or', function (a, b, opts) {
        if (a || b) {
            return opts.fn(this)
        }

        return opts.inverse(this);
    });

    handlebars.registerHelper('if_eq', function (a, b, opts) {
        return a === b ? opts.fn(this) : opts.inverse(this);
    });

    handlebars.registerHelper('unless_eq', function (a, b, opts) {
        return a === b ? opts.inverse(this) : opts.fn(this);
    });
    
    metalsmith.use((files, metalsmith, next) => {
        filter(files, pkgData.filters, promptsData, match, next);
    });
    
    metalsmith.use((files, metalsmith, next) => {
        renderFn(files, promptsData, render, next);
    });
}

function renderFn (files, promptsData, render, next) {
    let filePaths = Object.keys(files),
        pipeObj = pipe();
    filePaths.forEach((filePath) => {
        pipeObj.next(function () {
            let content = files[filePath].contents.toString();
            if (!/{{([^{}]+)}}/g.test(content)) {
                return this.next();
            }
            render(content, promptsData, (err, res) => {
                if (err) {
                    err.message = `[${filePath}] ${err.message}`
                    return this.next(err)
                }
                files[filePath].contents = new Buffer(res)
                this.next()
            });
        });
    });
    pipeObj
        .start()
        .end(function () {
            next();
        })
        .catch(function (err) {
            console.log(`   template - Error: ${err.message}`);
        });
}

function filter (files, filters, promptsData, match, next) {
    if (!filters) {
        return next();
    }
    let fileNames = Object.keys(files);
    Object.keys(filters).forEach((filter) => {
        fileNames.forEach((file) => {
            if (match(file, filter, {dot: true })) {
                !evaluate(filters[filter], promptsData) && (() => {
                    delete files[file];
                })();
            }
        });
    });
    next();
}

function evaluate (exp, data) {
    var fn = new Function('data', 'with (data) { return ' + exp + '}');
    try {
        return fn(data);
    } catch (e) {
        return false;
        // console.log(e);
        // console.error('Error when evaluating filter condition: ' + exp);
    }
}

