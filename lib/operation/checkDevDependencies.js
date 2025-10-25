"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return checkDevDependenciesOperation;
    }
});
function checkDevDependenciesOperation(proceed, abort, context) {
    var diffs = context.diffs, names = [], devDependencyMissing = diffs.some(function(diff) {
        var name = diff.getName();
        if (name !== null) {
            names.push(name);
        }
        var devDependencyMissing = diff.someDevDependencySemverDiff(function(devDependencySemverDiff) {
            var devDependencySemverDiffName = devDependencySemverDiff.getName(), devDependencyName = devDependencySemverDiffName, namesIncludesDevDependencyName = names.includes(devDependencyName), devDependencyMissing = !namesIncludesDevDependencyName;
            if (devDependencyMissing) {
                var subDirectoryPath = diff.getSubDirectoryPath();
                console.log("The '".concat(subDirectoryPath, "' release expects the '").concat(devDependencyName, "' developer dependency to have already been published."));
                console.log("This is not the case, however, and therefore the propagation will almost certainly fail.");
                console.log("To fix this, try adding a forced dependency relation between the two.");
                return true;
            }
        });
        if (devDependencyMissing) {
            return true;
        }
    });
    devDependencyMissing ? abort() : proceed();
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vY2hlY2tEZXZEZXBlbmRlbmNpZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrRGV2RGVwZW5kZW5jaWVzT3BlcmF0aW9uKHByb2NlZWQsIGFib3J0LCBjb250ZXh0KSB7XG4gIGNvbnN0IHsgZGlmZnMgfSA9IGNvbnRleHQsXG4gICAgICAgIG5hbWVzID0gW10sXG4gICAgICAgIGRldkRlcGVuZGVuY3lNaXNzaW5nID0gZGlmZnMuc29tZSgoZGlmZikgPT4ge1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBkaWZmLmdldE5hbWUoKTtcblxuICAgICAgICAgIGlmIChuYW1lICE9PSBudWxsKSB7XG4gICAgICAgICAgICBuYW1lcy5wdXNoKG5hbWUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZGV2RGVwZW5kZW5jeU1pc3NpbmcgPSBkaWZmLnNvbWVEZXZEZXBlbmRlbmN5U2VtdmVyRGlmZigoZGV2RGVwZW5kZW5jeVNlbXZlckRpZmYpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRldkRlcGVuZGVuY3lTZW12ZXJEaWZmTmFtZSA9IGRldkRlcGVuZGVuY3lTZW12ZXJEaWZmLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgICAgIGRldkRlcGVuZGVuY3lOYW1lID0gZGV2RGVwZW5kZW5jeVNlbXZlckRpZmZOYW1lLCAgLy8vXG4gICAgICAgICAgICAgICAgICBuYW1lc0luY2x1ZGVzRGV2RGVwZW5kZW5jeU5hbWUgPSBuYW1lcy5pbmNsdWRlcyhkZXZEZXBlbmRlbmN5TmFtZSksXG4gICAgICAgICAgICAgICAgICBkZXZEZXBlbmRlbmN5TWlzc2luZyA9ICFuYW1lc0luY2x1ZGVzRGV2RGVwZW5kZW5jeU5hbWU7XG5cbiAgICAgICAgICAgIGlmIChkZXZEZXBlbmRlbmN5TWlzc2luZykge1xuICAgICAgICAgICAgICBjb25zdCBzdWJEaXJlY3RvcnlQYXRoID0gZGlmZi5nZXRTdWJEaXJlY3RvcnlQYXRoKCk7XG5cbiAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRoZSAnJHtzdWJEaXJlY3RvcnlQYXRofScgcmVsZWFzZSBleHBlY3RzIHRoZSAnJHtkZXZEZXBlbmRlbmN5TmFtZX0nIGRldmVsb3BlciBkZXBlbmRlbmN5IHRvIGhhdmUgYWxyZWFkeSBiZWVuIHB1Ymxpc2hlZC5gKTtcblxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhpcyBpcyBub3QgdGhlIGNhc2UsIGhvd2V2ZXIsIGFuZCB0aGVyZWZvcmUgdGhlIHByb3BhZ2F0aW9uIHdpbGwgYWxtb3N0IGNlcnRhaW5seSBmYWlsLmApO1xuXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUbyBmaXggdGhpcywgdHJ5IGFkZGluZyBhIGZvcmNlZCBkZXBlbmRlbmN5IHJlbGF0aW9uIGJldHdlZW4gdGhlIHR3by5gKVxuXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKGRldkRlcGVuZGVuY3lNaXNzaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gIGRldkRlcGVuZGVuY3lNaXNzaW5nID9cbiAgICBhYm9ydCgpIDpcbiAgICAgIHByb2NlZWQoKTtcbn1cbiJdLCJuYW1lcyI6WyJjaGVja0RldkRlcGVuZGVuY2llc09wZXJhdGlvbiIsInByb2NlZWQiLCJhYm9ydCIsImNvbnRleHQiLCJkaWZmcyIsIm5hbWVzIiwiZGV2RGVwZW5kZW5jeU1pc3NpbmciLCJzb21lIiwiZGlmZiIsIm5hbWUiLCJnZXROYW1lIiwicHVzaCIsInNvbWVEZXZEZXBlbmRlbmN5U2VtdmVyRGlmZiIsImRldkRlcGVuZGVuY3lTZW12ZXJEaWZmIiwiZGV2RGVwZW5kZW5jeVNlbXZlckRpZmZOYW1lIiwiZGV2RGVwZW5kZW5jeU5hbWUiLCJuYW1lc0luY2x1ZGVzRGV2RGVwZW5kZW5jeU5hbWUiLCJpbmNsdWRlcyIsInN1YkRpcmVjdG9yeVBhdGgiLCJnZXRTdWJEaXJlY3RvcnlQYXRoIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBRUE7OztlQUF3QkE7OztBQUFULFNBQVNBLDhCQUE4QkMsT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE9BQU87SUFDM0UsSUFBTSxBQUFFQyxRQUFVRCxRQUFWQyxPQUNGQyxRQUFRLEVBQUUsRUFDVkMsdUJBQXVCRixNQUFNRyxJQUFJLENBQUMsU0FBQ0M7UUFDakMsSUFBTUMsT0FBT0QsS0FBS0UsT0FBTztRQUV6QixJQUFJRCxTQUFTLE1BQU07WUFDakJKLE1BQU1NLElBQUksQ0FBQ0Y7UUFDYjtRQUVBLElBQU1ILHVCQUF1QkUsS0FBS0ksMkJBQTJCLENBQUMsU0FBQ0M7WUFDN0QsSUFBTUMsOEJBQThCRCx3QkFBd0JILE9BQU8sSUFDN0RLLG9CQUFvQkQsNkJBQ3BCRSxpQ0FBaUNYLE1BQU1ZLFFBQVEsQ0FBQ0Ysb0JBQ2hEVCx1QkFBdUIsQ0FBQ1U7WUFFOUIsSUFBSVYsc0JBQXNCO2dCQUN4QixJQUFNWSxtQkFBbUJWLEtBQUtXLG1CQUFtQjtnQkFFakRDLFFBQVFDLEdBQUcsQ0FBQyxBQUFDLFFBQWlETixPQUExQ0csa0JBQWlCLDJCQUEyQyxPQUFsQkgsbUJBQWtCO2dCQUVoRkssUUFBUUMsR0FBRyxDQUFFO2dCQUViRCxRQUFRQyxHQUFHLENBQUU7Z0JBRWIsT0FBTztZQUNUO1FBQ0Y7UUFFQSxJQUFJZixzQkFBc0I7WUFDeEIsT0FBTztRQUNUO0lBQ0Y7SUFFTkEsdUJBQ0VKLFVBQ0VEO0FBQ04ifQ==