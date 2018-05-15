"use strict";
var CommandState;
(function (CommandState) {
    CommandState[CommandState["RequestSent"] = 1] = "RequestSent";
    CommandState[CommandState["RequestConfirmed"] = 2] = "RequestConfirmed";
    CommandState[CommandState["SessionStarted"] = 3] = "SessionStarted";
})(CommandState || (CommandState = {}));
class RequestTracker {
    constructor() {
        this.requests = new Map();
    }
}
module.exports.CommandState = CommandState;
module.exports.RequestTracker = new RequestTracker();
//# sourceMappingURL=RequestTracker.js.map