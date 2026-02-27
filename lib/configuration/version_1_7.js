"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "migrateConfigurationToVersion_1_7", {
    enumerable: true,
    get: function() {
        return migrateConfigurationToVersion_1_7;
    }
});
const _versions = require("../versions");
function migrateConfigurationToVersion_1_7(configuration) {
    const version = _versions.VERSION_1_7, forcedDependencyRelations = [];
    configuration = Object.assign(configuration, {
        version,
        forcedDependencyRelations
    });
    return configuration;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWd1cmF0aW9uL3ZlcnNpb25fMV83LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBWRVJTSU9OXzFfNyB9IGZyb20gXCIuLi92ZXJzaW9uc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWlncmF0ZUNvbmZpZ3VyYXRpb25Ub1ZlcnNpb25fMV83KGNvbmZpZ3VyYXRpb24pIHtcbiAgY29uc3QgdmVyc2lvbiA9IFZFUlNJT05fMV83LFxuICAgICAgICBmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zID0gW107XG5cbiAgY29uZmlndXJhdGlvbiA9IE9iamVjdC5hc3NpZ24oY29uZmlndXJhdGlvbiwge1xuICAgIHZlcnNpb24sXG4gICAgZm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uc1xuICB9KTtcblxuICByZXR1cm4gY29uZmlndXJhdGlvbjtcbn1cbiJdLCJuYW1lcyI6WyJtaWdyYXRlQ29uZmlndXJhdGlvblRvVmVyc2lvbl8xXzciLCJjb25maWd1cmF0aW9uIiwidmVyc2lvbiIsIlZFUlNJT05fMV83IiwiZm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucyIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBSWdCQTs7O2VBQUFBOzs7MEJBRlk7QUFFckIsU0FBU0Esa0NBQWtDQyxhQUFhO0lBQzdELE1BQU1DLFVBQVVDLHFCQUFXLEVBQ3JCQyw0QkFBNEIsRUFBRTtJQUVwQ0gsZ0JBQWdCSSxPQUFPQyxNQUFNLENBQUNMLGVBQWU7UUFDM0NDO1FBQ0FFO0lBQ0Y7SUFFQSxPQUFPSDtBQUNUIn0=