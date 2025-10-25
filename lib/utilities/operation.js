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
var _necessary = require("necessary");
var forEach = _necessary.asynchronousUtilities.forEach, whilst = _necessary.asynchronousUtilities.whilst;
function executeOperation(array, operation, proceed, abort, context) {
    var completed = true;
    forEach(array, function(element, next, done, context) {
        var proceed = next, abort = function() {
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
    var completed = true;
    var operationsLength = operations.length, lastIndex = operationsLength - 1;
    whilst(function(next, done, context, index) {
        if (index > lastIndex) {
            done();
            return;
        }
        var operation = operations[index], proceed = next, abort = function() {
            completed = false;
            done();
        };
        operation(proceed, abort, context);
    }, done, context);
    function done() {
        callback(completed);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvb3BlcmF0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhc3luY2hyb25vdXNVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmNvbnN0IHsgZm9yRWFjaCwgd2hpbHN0IH0gPSBhc3luY2hyb25vdXNVdGlsaXRpZXM7XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlT3BlcmF0aW9uKGFycmF5LCBvcGVyYXRpb24sIHByb2NlZWQsIGFib3J0LCBjb250ZXh0KSB7XG4gIGxldCBjb21wbGV0ZWQgPSB0cnVlO1xuXG4gIGZvckVhY2goYXJyYXksIChlbGVtZW50LCBuZXh0LCBkb25lLCBjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgcHJvY2VlZCA9IG5leHQsIC8vL1xuICAgICAgICAgIGFib3J0ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29tcGxldGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9XG5cbiAgICBvcGVyYXRpb24oZWxlbWVudCwgcHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpO1xuICB9LCBkb25lLCBjb250ZXh0KTtcblxuICBmdW5jdGlvbiBkb25lKCkge1xuICAgIGNvbXBsZXRlZCA/XG4gICAgICBwcm9jZWVkKCkgOlxuICAgICAgICBhYm9ydCgpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlT3BlcmF0aW9ucyhvcGVyYXRpb25zLCBjYWxsYmFjaywgY29udGV4dCkge1xuICBsZXQgY29tcGxldGVkID0gdHJ1ZTtcblxuICBjb25zdCBvcGVyYXRpb25zTGVuZ3RoID0gb3BlcmF0aW9ucy5sZW5ndGgsXG4gICAgICAgIGxhc3RJbmRleCA9IG9wZXJhdGlvbnNMZW5ndGggLSAxO1xuXG4gIHdoaWxzdCgobmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpID0+IHtcbiAgICBpZiAoaW5kZXggPiBsYXN0SW5kZXgpIHtcbiAgICAgIGRvbmUoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9wZXJhdGlvbiA9IG9wZXJhdGlvbnNbaW5kZXhdLFxuICAgICAgICAgIHByb2NlZWQgPSBuZXh0LCAvLy9cbiAgICAgICAgICBhYm9ydCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbXBsZXRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgfTtcblxuICAgIG9wZXJhdGlvbihwcm9jZWVkLCBhYm9ydCwgY29udGV4dCk7XG4gIH0sIGRvbmUsIGNvbnRleHQpO1xuXG4gIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgY2FsbGJhY2soY29tcGxldGVkKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImV4ZWN1dGVPcGVyYXRpb24iLCJleGVjdXRlT3BlcmF0aW9ucyIsImZvckVhY2giLCJhc3luY2hyb25vdXNVdGlsaXRpZXMiLCJ3aGlsc3QiLCJhcnJheSIsIm9wZXJhdGlvbiIsInByb2NlZWQiLCJhYm9ydCIsImNvbnRleHQiLCJjb21wbGV0ZWQiLCJlbGVtZW50IiwibmV4dCIsImRvbmUiLCJvcGVyYXRpb25zIiwiY2FsbGJhY2siLCJvcGVyYXRpb25zTGVuZ3RoIiwibGVuZ3RoIiwibGFzdEluZGV4IiwiaW5kZXgiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztRQU1nQkE7ZUFBQUE7O1FBcUJBQztlQUFBQTs7O3lCQXpCc0I7QUFFdEMsSUFBUUMsVUFBb0JDLGdDQUFxQixDQUF6Q0QsU0FBU0UsU0FBV0QsZ0NBQXFCLENBQWhDQztBQUVWLFNBQVNKLGlCQUFpQkssS0FBSyxFQUFFQyxTQUFTLEVBQUVDLE9BQU8sRUFBRUMsS0FBSyxFQUFFQyxPQUFPO0lBQ3hFLElBQUlDLFlBQVk7SUFFaEJSLFFBQVFHLE9BQU8sU0FBQ00sU0FBU0MsTUFBTUMsTUFBTUo7UUFDbkMsSUFBTUYsVUFBVUssTUFDVkosUUFBUTtZQUNORSxZQUFZO1lBRVpHO1FBQ0Y7UUFFTlAsVUFBVUssU0FBU0osU0FBU0MsT0FBT0M7SUFDckMsR0FBR0ksTUFBTUo7SUFFVCxTQUFTSTtRQUNQSCxZQUNFSCxZQUNFQztJQUNOO0FBQ0Y7QUFFTyxTQUFTUCxrQkFBa0JhLFVBQVUsRUFBRUMsUUFBUSxFQUFFTixPQUFPO0lBQzdELElBQUlDLFlBQVk7SUFFaEIsSUFBTU0sbUJBQW1CRixXQUFXRyxNQUFNLEVBQ3BDQyxZQUFZRixtQkFBbUI7SUFFckNaLE9BQU8sU0FBQ1EsTUFBTUMsTUFBTUosU0FBU1U7UUFDM0IsSUFBSUEsUUFBUUQsV0FBVztZQUNyQkw7WUFFQTtRQUNGO1FBRUEsSUFBTVAsWUFBWVEsVUFBVSxDQUFDSyxNQUFNLEVBQzdCWixVQUFVSyxNQUNWSixRQUFRO1lBQ05FLFlBQVk7WUFFWkc7UUFDRjtRQUVOUCxVQUFVQyxTQUFTQyxPQUFPQztJQUM1QixHQUFHSSxNQUFNSjtJQUVULFNBQVNJO1FBQ1BFLFNBQVNMO0lBQ1g7QUFDRiJ9