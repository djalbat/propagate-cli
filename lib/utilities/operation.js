"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get executeOperation () {
        return executeOperation;
    },
    get executeOperations () {
        return executeOperations;
    }
});
const _necessary = require("necessary");
const { forEach, whilst } = _necessary.asynchronousUtilities;
function executeOperation(array, operation, proceed, abort, context) {
    let completed = true;
    forEach(array, (element, next, done, context)=>{
        const proceed = next, abort = ()=>{
            completed = false;
            done();
        };
        operation(element, proceed, abort, context);
    }, done, context);
    function done() {
        completed ? proceed() : abort();
    }
}
function executeOperations(operations, callback, context) {
    let completed = true;
    const operationsLength = operations.length, lastIndex = operationsLength - 1;
    whilst((next, done, context, index)=>{
        if (index > lastIndex) {
            done();
            return;
        }
        const operation = operations[index], proceed = next, abort = ()=>{
            completed = false;
            done();
        };
        operation(proceed, abort, context);
    }, done, context);
    function done() {
        callback(completed);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvb3BlcmF0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhc3luY2hyb25vdXNVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmNvbnN0IHsgZm9yRWFjaCwgd2hpbHN0IH0gPSBhc3luY2hyb25vdXNVdGlsaXRpZXM7XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlT3BlcmF0aW9uKGFycmF5LCBvcGVyYXRpb24sIHByb2NlZWQsIGFib3J0LCBjb250ZXh0KSB7XG4gIGxldCBjb21wbGV0ZWQgPSB0cnVlO1xuXG4gIGZvckVhY2goYXJyYXksIChlbGVtZW50LCBuZXh0LCBkb25lLCBjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgcHJvY2VlZCA9IG5leHQsIC8vL1xuICAgICAgICAgIGFib3J0ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29tcGxldGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9XG5cbiAgICBvcGVyYXRpb24oZWxlbWVudCwgcHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpO1xuICB9LCBkb25lLCBjb250ZXh0KTtcblxuICBmdW5jdGlvbiBkb25lKCkge1xuICAgIGNvbXBsZXRlZCA/XG4gICAgICBwcm9jZWVkKCkgOlxuICAgICAgICBhYm9ydCgpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlT3BlcmF0aW9ucyhvcGVyYXRpb25zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICBsZXQgY29tcGxldGVkID0gdHJ1ZTtcblxuICBjb25zdCBvcGVyYXRpb25zTGVuZ3RoID0gb3BlcmF0aW9ucy5sZW5ndGgsXG4gICAgICAgIGxhc3RJbmRleCA9IG9wZXJhdGlvbnNMZW5ndGggLSAxO1xuXG4gIHdoaWxzdCgobmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpID0+IHtcbiAgICBpZiAoaW5kZXggPiBsYXN0SW5kZXgpIHtcbiAgICAgIGRvbmUoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9wZXJhdGlvbiA9IG9wZXJhdGlvbnNbaW5kZXhdLFxuICAgICAgICAgIHByb2NlZWQgPSBuZXh0LCAvLy9cbiAgICAgICAgICBhYm9ydCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbXBsZXRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgfTtcblxuICAgIG9wZXJhdGlvbihwcm9jZWVkLCBhYm9ydCwgY29udGV4dCk7XG4gIH0sIGRvbmUsIGNvbnRleHQpO1xuXG4gIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgY2FsbGJhY2soY29tcGxldGVkKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImV4ZWN1dGVPcGVyYXRpb24iLCJleGVjdXRlT3BlcmF0aW9ucyIsImZvckVhY2giLCJ3aGlsc3QiLCJhc3luY2hyb25vdXNVdGlsaXRpZXMiLCJhcnJheSIsIm9wZXJhdGlvbiIsInByb2NlZWQiLCJhYm9ydCIsImNvbnRleHQiLCJjb21wbGV0ZWQiLCJlbGVtZW50IiwibmV4dCIsImRvbmUiLCJvcGVyYXRpb25zIiwiY2FsbGJhY2siLCJvcGVyYXRpb25zTGVuZ3RoIiwibGVuZ3RoIiwibGFzdEluZGV4IiwiaW5kZXgiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztRQU1nQkE7ZUFBQUE7O1FBcUJBQztlQUFBQTs7OzJCQXpCc0I7QUFFdEMsTUFBTSxFQUFFQyxPQUFPLEVBQUVDLE1BQU0sRUFBRSxHQUFHQyxnQ0FBcUI7QUFFMUMsU0FBU0osaUJBQWlCSyxLQUFLLEVBQUVDLFNBQVMsRUFBRUMsT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE9BQU87SUFDeEUsSUFBSUMsWUFBWTtJQUVoQlIsUUFBUUcsT0FBTyxDQUFDTSxTQUFTQyxNQUFNQyxNQUFNSjtRQUNuQyxNQUFNRixVQUFVSyxNQUNWSixRQUFRO1lBQ05FLFlBQVk7WUFFWkc7UUFDRjtRQUVOUCxVQUFVSyxTQUFTSixTQUFTQyxPQUFPQztJQUNyQyxHQUFHSSxNQUFNSjtJQUVULFNBQVNJO1FBQ1BILFlBQ0VILFlBQ0VDO0lBQ047QUFDRjtBQUVPLFNBQVNQLGtCQUFrQmEsVUFBVSxFQUFFQyxRQUFRLEVBQUVOLE9BQU87SUFDN0QsSUFBSUMsWUFBWTtJQUVoQixNQUFNTSxtQkFBbUJGLFdBQVdHLE1BQU0sRUFDcENDLFlBQVlGLG1CQUFtQjtJQUVyQ2IsT0FBTyxDQUFDUyxNQUFNQyxNQUFNSixTQUFTVTtRQUMzQixJQUFJQSxRQUFRRCxXQUFXO1lBQ3JCTDtZQUVBO1FBQ0Y7UUFFQSxNQUFNUCxZQUFZUSxVQUFVLENBQUNLLE1BQU0sRUFDN0JaLFVBQVVLLE1BQ1ZKLFFBQVE7WUFDTkUsWUFBWTtZQUVaRztRQUNGO1FBRU5QLFVBQVVDLFNBQVNDLE9BQU9DO0lBQzVCLEdBQUdJLE1BQU1KO0lBRVQsU0FBU0k7UUFDUEUsU0FBU0w7SUFDWDtBQUNGIn0=