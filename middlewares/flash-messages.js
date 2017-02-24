module.exports = function(req, resp, next) {

    if (req.session.flash) {
        resp.locals.flash = req.session.flash;
        req.session.flash = undefined;
    }

    req.flash = function(type, msg) {

        if (req.session.flash === undefined) {
            req.session.flash = {
                errors: [],
                infos: []
            };

        }
        if (type == "error") {
            req.session.flash.errors.push(msg);
        }
        if (type == "info") {
            console.log("hello");
            req.session.flash.infos.push(msg);
        }

    };

    req.hasError = function() {
        if (req.session.flash == undefined) return false
        else
            return true;
    }
    next();
};
