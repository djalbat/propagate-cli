"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return listForcedDependencyRelationsAction;
    }
});
const _constants = require("../constants");
const _configuration = require("../configuration");
const _messages = require("../messages");
function listForcedDependencyRelationsAction() {
    const ignoredDependencyNumbers = [], ignoredDependencies = (0, _configuration.retrieveIgnoredDependencies)(), ignoredDependenciesLength = ignoredDependencies.length;
    if (ignoredDependenciesLength === 0) {
        console.log(_messages.NO_IGNORED_DEPENDENCIES_MESSAGE);
    } else {
        const ignoredDependencyNames = [
            ...ignoredDependencies
        ];
        console.log(_constants.EMPTY_STRING);
        ignoredDependencyNames.forEach((ignoredDependencyName, index)=>{
            const ignoredDependencyNumber = index + 1; ///
            console.log(` ${ignoredDependencyNumber}: "${ignoredDependencyName}"`);
            ignoredDependencyNumbers.push(ignoredDependencyNumber);
        });
        console.log(_constants.EMPTY_STRING);
    }
    return ignoredDependencyNumbers;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb24vbGlzdElnbm9yZWREZXBlbmRlbmNpZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IEVNUFRZX1NUUklORyB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IHJldHJpZXZlSWdub3JlZERlcGVuZGVuY2llcyB9IGZyb20gXCIuLi9jb25maWd1cmF0aW9uXCI7XG5cbmltcG9ydCB7IE5PX0lHTk9SRURfREVQRU5ERU5DSUVTX01FU1NBR0UgfSBmcm9tIFwiLi4vbWVzc2FnZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGlzdEZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnNBY3Rpb24oKSB7XG4gIGNvbnN0IGlnbm9yZWREZXBlbmRlbmN5TnVtYmVycyA9IFtdLFxuICAgICAgICBpZ25vcmVkRGVwZW5kZW5jaWVzID0gcmV0cmlldmVJZ25vcmVkRGVwZW5kZW5jaWVzKCksXG4gICAgICAgIGlnbm9yZWREZXBlbmRlbmNpZXNMZW5ndGggPSBpZ25vcmVkRGVwZW5kZW5jaWVzLmxlbmd0aDtcblxuICBpZiAoaWdub3JlZERlcGVuZGVuY2llc0xlbmd0aCA9PT0gMCkge1xuICAgIGNvbnNvbGUubG9nKE5PX0lHTk9SRURfREVQRU5ERU5DSUVTX01FU1NBR0UpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGlnbm9yZWREZXBlbmRlbmN5TmFtZXMgPSBbXG4gICAgICAuLi5pZ25vcmVkRGVwZW5kZW5jaWVzXG4gICAgXTtcblxuICAgIGNvbnNvbGUubG9nKEVNUFRZX1NUUklORyk7XG5cbiAgICBpZ25vcmVkRGVwZW5kZW5jeU5hbWVzLmZvckVhY2goKGlnbm9yZWREZXBlbmRlbmN5TmFtZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGlnbm9yZWREZXBlbmRlbmN5TnVtYmVyID0gaW5kZXggKyAxOyAgLy8vXG5cbiAgICAgIGNvbnNvbGUubG9nKGAgJHtpZ25vcmVkRGVwZW5kZW5jeU51bWJlcn06IFwiJHtpZ25vcmVkRGVwZW5kZW5jeU5hbWV9XCJgKTtcblxuICAgICAgaWdub3JlZERlcGVuZGVuY3lOdW1iZXJzLnB1c2goaWdub3JlZERlcGVuZGVuY3lOdW1iZXIpO1xuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coRU1QVFlfU1RSSU5HKTtcbiAgfVxuXG4gIHJldHVybiBpZ25vcmVkRGVwZW5kZW5jeU51bWJlcnM7XG59XG4iXSwibmFtZXMiOlsibGlzdEZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnNBY3Rpb24iLCJpZ25vcmVkRGVwZW5kZW5jeU51bWJlcnMiLCJpZ25vcmVkRGVwZW5kZW5jaWVzIiwicmV0cmlldmVJZ25vcmVkRGVwZW5kZW5jaWVzIiwiaWdub3JlZERlcGVuZGVuY2llc0xlbmd0aCIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJOT19JR05PUkVEX0RFUEVOREVOQ0lFU19NRVNTQUdFIiwiaWdub3JlZERlcGVuZGVuY3lOYW1lcyIsIkVNUFRZX1NUUklORyIsImZvckVhY2giLCJpZ25vcmVkRGVwZW5kZW5jeU5hbWUiLCJpbmRleCIsImlnbm9yZWREZXBlbmRlbmN5TnVtYmVyIiwicHVzaCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBT0E7OztlQUF3QkE7OzsyQkFMSzsrQkFDZTswQkFFSTtBQUVqQyxTQUFTQTtJQUN0QixNQUFNQywyQkFBMkIsRUFBRSxFQUM3QkMsc0JBQXNCQyxJQUFBQSwwQ0FBMkIsS0FDakRDLDRCQUE0QkYsb0JBQW9CRyxNQUFNO0lBRTVELElBQUlELDhCQUE4QixHQUFHO1FBQ25DRSxRQUFRQyxHQUFHLENBQUNDLHlDQUErQjtJQUM3QyxPQUFPO1FBQ0wsTUFBTUMseUJBQXlCO2VBQzFCUDtTQUNKO1FBRURJLFFBQVFDLEdBQUcsQ0FBQ0csdUJBQVk7UUFFeEJELHVCQUF1QkUsT0FBTyxDQUFDLENBQUNDLHVCQUF1QkM7WUFDckQsTUFBTUMsMEJBQTBCRCxRQUFRLEdBQUksR0FBRztZQUUvQ1AsUUFBUUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFTyx3QkFBd0IsR0FBRyxFQUFFRixzQkFBc0IsQ0FBQyxDQUFDO1lBRXJFWCx5QkFBeUJjLElBQUksQ0FBQ0Q7UUFDaEM7UUFFQVIsUUFBUUMsR0FBRyxDQUFDRyx1QkFBWTtJQUMxQjtJQUVBLE9BQU9UO0FBQ1QifQ==