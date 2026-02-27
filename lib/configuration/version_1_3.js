"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "migrateConfigurationToVersion_1_3", {
    enumerable: true,
    get: function() {
        return migrateConfigurationToVersion_1_3;
    }
});
const _versions = require("../versions");
function migrateConfigurationToVersion_1_3(configuration) {
    const version = _versions.VERSION_1_3, ignoredDependencies = [];
    configuration = Object.assign(configuration, {
        version,
        ignoredDependencies
    });
    return configuration;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWd1cmF0aW9uL3ZlcnNpb25fMV8zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBWRVJTSU9OXzFfMyB9IGZyb20gXCIuLi92ZXJzaW9uc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV8zKGNvbmZpZ3VyYXRpb24pIHtcbiAgY29uc3QgdmVyc2lvbiA9IFZFUlNJT05fMV8zLFxuICAgICAgICBpZ25vcmVkRGVwZW5kZW5jaWVzID0gW107XG5cbiAgY29uZmlndXJhdGlvbiA9IE9iamVjdC5hc3NpZ24oY29uZmlndXJhdGlvbiwge1xuICAgIHZlcnNpb24sXG4gICAgaWdub3JlZERlcGVuZGVuY2llc1xuICB9KTtcblxuICByZXR1cm4gY29uZmlndXJhdGlvbjtcbn1cbiJdLCJuYW1lcyI6WyJtaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzMiLCJjb25maWd1cmF0aW9uIiwidmVyc2lvbiIsIlZFUlNJT05fMV8zIiwiaWdub3JlZERlcGVuZGVuY2llcyIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBSWdCQTs7O2VBQUFBOzs7MEJBRlk7QUFFckIsU0FBU0Esa0NBQWtDQyxhQUFhO0lBQzdELE1BQU1DLFVBQVVDLHFCQUFXLEVBQ3JCQyxzQkFBc0IsRUFBRTtJQUU5QkgsZ0JBQWdCSSxPQUFPQyxNQUFNLENBQUNMLGVBQWU7UUFDM0NDO1FBQ0FFO0lBQ0Y7SUFFQSxPQUFPSDtBQUNUIn0=