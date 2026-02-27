"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return dryRunOperation;
    }
});
function dryRunOperation(proceed, abort, context) {
    const { diffs, dryRun } = context;
    if (dryRun) {
        diffs.forEach((diff)=>{
            const diffString = diff.asString();
            console.log(diffString);
        });
    }
    proceed();
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vZHJ5UnVuLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkcnlSdW5PcGVyYXRpb24ocHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpIHtcbiAgY29uc3QgeyBkaWZmcywgZHJ5UnVuIH0gPSBjb250ZXh0O1xuXG4gIGlmIChkcnlSdW4pIHtcbiAgICBkaWZmcy5mb3JFYWNoKChkaWZmKSA9PiB7XG4gICAgICBjb25zdCBkaWZmU3RyaW5nID0gZGlmZi5hc1N0cmluZygpO1xuXG4gICAgICBjb25zb2xlLmxvZyhkaWZmU3RyaW5nKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb2NlZWQoKTtcbn1cbiJdLCJuYW1lcyI6WyJkcnlSdW5PcGVyYXRpb24iLCJwcm9jZWVkIiwiYWJvcnQiLCJjb250ZXh0IiwiZGlmZnMiLCJkcnlSdW4iLCJmb3JFYWNoIiwiZGlmZiIsImRpZmZTdHJpbmciLCJhc1N0cmluZyIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQUVBOzs7ZUFBd0JBOzs7QUFBVCxTQUFTQSxnQkFBZ0JDLE9BQU8sRUFBRUMsS0FBSyxFQUFFQyxPQUFPO0lBQzdELE1BQU0sRUFBRUMsS0FBSyxFQUFFQyxNQUFNLEVBQUUsR0FBR0Y7SUFFMUIsSUFBSUUsUUFBUTtRQUNWRCxNQUFNRSxPQUFPLENBQUMsQ0FBQ0M7WUFDYixNQUFNQyxhQUFhRCxLQUFLRSxRQUFRO1lBRWhDQyxRQUFRQyxHQUFHLENBQUNIO1FBQ2Q7SUFDRjtJQUVBUDtBQUNGIn0=