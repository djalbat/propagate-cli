"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return main;
    }
});
const _help = /*#__PURE__*/ _interop_require_default(require("./action/help"));
const _version = /*#__PURE__*/ _interop_require_default(require("./action/version"));
const _propagate = /*#__PURE__*/ _interop_require_default(require("./action/propagate"));
const _initialise = /*#__PURE__*/ _interop_require_default(require("./action/initialise"));
const _addDirectory = /*#__PURE__*/ _interop_require_default(require("./action/addDirectory"));
const _removeDirectory = /*#__PURE__*/ _interop_require_default(require("./action/removeDirectory"));
const _listDirectories = /*#__PURE__*/ _interop_require_default(require("./action/listDirectories"));
const _setShellCommands = /*#__PURE__*/ _interop_require_default(require("./action/setShellCommands"));
const _addIgnoredDependency = /*#__PURE__*/ _interop_require_default(require("./action/addIgnoredDependency"));
const _listIgnoredDependencies = /*#__PURE__*/ _interop_require_default(require("./action/listIgnoredDependencies"));
const _removeIgnoredDependency = /*#__PURE__*/ _interop_require_default(require("./action/removeIgnoredDependency"));
const _addForcedDependencyRelation = /*#__PURE__*/ _interop_require_default(require("./action/addForcedDependencyRelation"));
const _listForcedDependencyRelations = /*#__PURE__*/ _interop_require_default(require("./action/listForcedDependencyRelations"));
const _removeForcedDependencyRelation = /*#__PURE__*/ _interop_require_default(require("./action/removeForcedDependencyRelation"));
const _messages = require("./messages");
const _defaults = require("./defaults");
const _commands = require("./commands");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function main(command, argument, options) {
    const { yes = _defaults.DEFAULT_YES, delay = _defaults.DEFAULT_DELAY, dryRun = _defaults.DEFAULT_DRY_RUN, quietly = _defaults.DEFAULT_QUIETLY, attempts = _defaults.DEFAULT_ATTEMPTS } = options;
    switch(command){
        case _commands.HELP_COMMAND:
            {
                (0, _help.default)();
                break;
            }
        case _commands.VERSION_COMMAND:
            {
                (0, _version.default)();
                break;
            }
        case _commands.INITIALISE_COMMAND:
            {
                (0, _initialise.default)();
                break;
            }
        case _commands.PROPAGATE_COMMAND:
            {
                if (argument === null) {
                    console.log(_messages.NO_ARGUMENT_GIVEN_MESSAGE);
                } else {
                    const subDirectoryName = argument; ///
                    (0, _propagate.default)(subDirectoryName, quietly, delay, attempts, dryRun, yes);
                }
                break;
            }
        case _commands.ADD_DIRECTORY_COMMAND:
            {
                (0, _addDirectory.default)();
                break;
            }
        case _commands.REMOVE_DIRECTORY_COMMAND:
            {
                (0, _removeDirectory.default)();
                break;
            }
        case _commands.LIST_DIRECTORIES_COMMAND:
            {
                (0, _listDirectories.default)();
                break;
            }
        case _commands.SET_SHELL_COMMANDS_COMMAND:
            {
                (0, _setShellCommands.default)();
                break;
            }
        case _commands.ADD_IGNORED_DEPENDENCY_COMMAND:
            {
                (0, _addIgnoredDependency.default)();
                break;
            }
        case _commands.LIST_IGNORED_DEPENDENCIES_COMMAND:
            {
                (0, _listIgnoredDependencies.default)();
                break;
            }
        case _commands.REMOVE_IGNORED_DEPENDENCY_COMMAND:
            {
                (0, _removeIgnoredDependency.default)();
                break;
            }
        case _commands.ADD_FORCED_DEPENDENCY_RELATION_COMMAND:
            {
                (0, _addForcedDependencyRelation.default)();
                break;
            }
        case _commands.LIST_FORCED_DEPENDENCY_RELATIONS_COMMAND:
            {
                (0, _listForcedDependencyRelations.default)();
                break;
            }
        case _commands.REMOVE_FORCED_DEPENDENCY_RELATION_COMMAND:
            {
                (0, _removeForcedDependencyRelation.default)();
                break;
            }
        default:
            {
                console.log(_messages.COMMAND_NOT_RECOGNISED_MESSAGE);
                break;
            }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgaGVscEFjdGlvbiBmcm9tIFwiLi9hY3Rpb24vaGVscFwiO1xuaW1wb3J0IHZlcnNpb25BY3Rpb24gZnJvbSBcIi4vYWN0aW9uL3ZlcnNpb25cIjtcbmltcG9ydCBwcm9wYWdhdGVBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL3Byb3BhZ2F0ZVwiO1xuaW1wb3J0IGluaXRpYWxpc2VBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL2luaXRpYWxpc2VcIjtcbmltcG9ydCBhZGREaXJlY3RvcnlBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL2FkZERpcmVjdG9yeVwiO1xuaW1wb3J0IHJlbW92ZURpcmVjdG9yeUFjdGlvbiBmcm9tIFwiLi9hY3Rpb24vcmVtb3ZlRGlyZWN0b3J5XCI7XG5pbXBvcnQgbGlzdERpcmVjdG9yaWVzQWN0aW9uIGZyb20gXCIuL2FjdGlvbi9saXN0RGlyZWN0b3JpZXNcIjtcbmltcG9ydCBzZXRTaGVsbENvbW1hbmRzQWN0aW9uIGZyb20gXCIuL2FjdGlvbi9zZXRTaGVsbENvbW1hbmRzXCI7XG5pbXBvcnQgYWRkSWdub3JlZERlcGVuZGVuY3lBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL2FkZElnbm9yZWREZXBlbmRlbmN5XCI7XG5pbXBvcnQgbGlzdElnbm9yZWREZXBlbmRlbmNpZXNBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL2xpc3RJZ25vcmVkRGVwZW5kZW5jaWVzXCI7XG5pbXBvcnQgcmVtb3ZlSWdub3JlZERlcGVuZGVuY3lBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL3JlbW92ZUlnbm9yZWREZXBlbmRlbmN5XCI7XG5pbXBvcnQgYWRkRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uQWN0aW9uIGZyb20gXCIuL2FjdGlvbi9hZGRGb3JjZWREZXBlbmRlbmN5UmVsYXRpb25cIjtcbmltcG9ydCBsaXN0Rm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uc0FjdGlvbiBmcm9tIFwiLi9hY3Rpb24vbGlzdEZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnNcIjtcbmltcG9ydCByZW1vdmVGb3JjZWREZXBlbmRlbmN5UmVsYXRpb25BY3Rpb24gZnJvbSBcIi4vYWN0aW9uL3JlbW92ZUZvcmNlZERlcGVuZGVuY3lSZWxhdGlvblwiO1xuXG5pbXBvcnQgeyBOT19BUkdVTUVOVF9HSVZFTl9NRVNTQUdFLCBDT01NQU5EX05PVF9SRUNPR05JU0VEX01FU1NBR0UgfSBmcm9tIFwiLi9tZXNzYWdlc1wiO1xuaW1wb3J0IHsgREVGQVVMVF9ZRVMsIERFRkFVTFRfREVMQVksIERFRkFVTFRfUVVJRVRMWSwgREVGQVVMVF9BVFRFTVBUUywgREVGQVVMVF9EUllfUlVOIH0gZnJvbSBcIi4vZGVmYXVsdHNcIjtcbmltcG9ydCB7IEhFTFBfQ09NTUFORCxcbiAgICAgICAgVkVSU0lPTl9DT01NQU5ELFxuICAgICAgICBQUk9QQUdBVEVfQ09NTUFORCxcbiAgICAgICAgSU5JVElBTElTRV9DT01NQU5ELFxuICAgICAgICBBRERfRElSRUNUT1JZX0NPTU1BTkQsXG4gICAgICAgIFJFTU9WRV9ESVJFQ1RPUllfQ09NTUFORCxcbiAgICAgICAgTElTVF9ESVJFQ1RPUklFU19DT01NQU5ELFxuICAgICAgICBTRVRfU0hFTExfQ09NTUFORFNfQ09NTUFORCxcbiAgICAgICAgQUREX0lHTk9SRURfREVQRU5ERU5DWV9DT01NQU5ELFxuICAgICAgICBMSVNUX0lHTk9SRURfREVQRU5ERU5DSUVTX0NPTU1BTkQsXG4gICAgICAgIFJFTU9WRV9JR05PUkVEX0RFUEVOREVOQ1lfQ09NTUFORCxcbiAgICAgICAgQUREX0ZPUkNFRF9ERVBFTkRFTkNZX1JFTEFUSU9OX0NPTU1BTkQsXG4gICAgICAgIExJU1RfRk9SQ0VEX0RFUEVOREVOQ1lfUkVMQVRJT05TX0NPTU1BTkQsXG4gICAgICAgIFJFTU9WRV9GT1JDRURfREVQRU5ERU5DWV9SRUxBVElPTl9DT01NQU5EIH0gZnJvbSBcIi4vY29tbWFuZHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFpbihjb21tYW5kLCBhcmd1bWVudCwgb3B0aW9ucykge1xuICBjb25zdCB7IHllcyA9IERFRkFVTFRfWUVTLFxuICAgICAgICAgIGRlbGF5ID0gREVGQVVMVF9ERUxBWSxcbiAgICAgICAgICBkcnlSdW4gPSBERUZBVUxUX0RSWV9SVU4sXG4gICAgICAgICAgcXVpZXRseSA9IERFRkFVTFRfUVVJRVRMWSxcbiAgICAgICAgICBhdHRlbXB0cyA9IERFRkFVTFRfQVRURU1QVFMgfSA9IG9wdGlvbnM7XG5cbiAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgY2FzZSBIRUxQX0NPTU1BTkQ6IHtcbiAgICAgIGhlbHBBY3Rpb24oKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2FzZSBWRVJTSU9OX0NPTU1BTkQ6IHtcbiAgICAgIHZlcnNpb25BY3Rpb24oKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2FzZSBJTklUSUFMSVNFX0NPTU1BTkQ6IHtcbiAgICAgIGluaXRpYWxpc2VBY3Rpb24oKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2FzZSBQUk9QQUdBVEVfQ09NTUFORDoge1xuICAgICAgaWYgKGFyZ3VtZW50ID09PSBudWxsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKE5PX0FSR1VNRU5UX0dJVkVOX01FU1NBR0UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc3ViRGlyZWN0b3J5TmFtZSA9IGFyZ3VtZW50OyAgLy8vXG5cbiAgICAgICAgcHJvcGFnYXRlQWN0aW9uKHN1YkRpcmVjdG9yeU5hbWUsIHF1aWV0bHksIGRlbGF5LCBhdHRlbXB0cywgZHJ5UnVuLCB5ZXMpO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjYXNlIEFERF9ESVJFQ1RPUllfQ09NTUFORDoge1xuICAgICAgYWRkRGlyZWN0b3J5QWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgUkVNT1ZFX0RJUkVDVE9SWV9DT01NQU5EOiB7XG4gICAgICByZW1vdmVEaXJlY3RvcnlBY3Rpb24oKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2FzZSBMSVNUX0RJUkVDVE9SSUVTX0NPTU1BTkQ6IHtcbiAgICAgIGxpc3REaXJlY3Rvcmllc0FjdGlvbigpO1xuXG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjYXNlIFNFVF9TSEVMTF9DT01NQU5EU19DT01NQU5EOiB7XG4gICAgICBzZXRTaGVsbENvbW1hbmRzQWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgQUREX0lHTk9SRURfREVQRU5ERU5DWV9DT01NQU5EOiB7XG4gICAgICBhZGRJZ25vcmVkRGVwZW5kZW5jeUFjdGlvbigpO1xuXG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjYXNlIExJU1RfSUdOT1JFRF9ERVBFTkRFTkNJRVNfQ09NTUFORDoge1xuICAgICAgbGlzdElnbm9yZWREZXBlbmRlbmNpZXNBY3Rpb24oKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2FzZSBSRU1PVkVfSUdOT1JFRF9ERVBFTkRFTkNZX0NPTU1BTkQ6IHtcbiAgICAgIHJlbW92ZUlnbm9yZWREZXBlbmRlbmN5QWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgQUREX0ZPUkNFRF9ERVBFTkRFTkNZX1JFTEFUSU9OX0NPTU1BTkQ6IHtcbiAgICAgIGFkZEZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbkFjdGlvbigpO1xuXG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjYXNlIExJU1RfRk9SQ0VEX0RFUEVOREVOQ1lfUkVMQVRJT05TX0NPTU1BTkQ6IHtcbiAgICAgIGxpc3RGb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zQWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgUkVNT1ZFX0ZPUkNFRF9ERVBFTkRFTkNZX1JFTEFUSU9OX0NPTU1BTkQ6IHtcbiAgICAgIHJlbW92ZUZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbkFjdGlvbigpO1xuXG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBkZWZhdWx0OiB7XG4gICAgICBjb25zb2xlLmxvZyhDT01NQU5EX05PVF9SRUNPR05JU0VEX01FU1NBR0UpO1xuXG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJtYWluIiwiY29tbWFuZCIsImFyZ3VtZW50Iiwib3B0aW9ucyIsInllcyIsIkRFRkFVTFRfWUVTIiwiZGVsYXkiLCJERUZBVUxUX0RFTEFZIiwiZHJ5UnVuIiwiREVGQVVMVF9EUllfUlVOIiwicXVpZXRseSIsIkRFRkFVTFRfUVVJRVRMWSIsImF0dGVtcHRzIiwiREVGQVVMVF9BVFRFTVBUUyIsIkhFTFBfQ09NTUFORCIsImhlbHBBY3Rpb24iLCJWRVJTSU9OX0NPTU1BTkQiLCJ2ZXJzaW9uQWN0aW9uIiwiSU5JVElBTElTRV9DT01NQU5EIiwiaW5pdGlhbGlzZUFjdGlvbiIsIlBST1BBR0FURV9DT01NQU5EIiwiY29uc29sZSIsImxvZyIsIk5PX0FSR1VNRU5UX0dJVkVOX01FU1NBR0UiLCJzdWJEaXJlY3RvcnlOYW1lIiwicHJvcGFnYXRlQWN0aW9uIiwiQUREX0RJUkVDVE9SWV9DT01NQU5EIiwiYWRkRGlyZWN0b3J5QWN0aW9uIiwiUkVNT1ZFX0RJUkVDVE9SWV9DT01NQU5EIiwicmVtb3ZlRGlyZWN0b3J5QWN0aW9uIiwiTElTVF9ESVJFQ1RPUklFU19DT01NQU5EIiwibGlzdERpcmVjdG9yaWVzQWN0aW9uIiwiU0VUX1NIRUxMX0NPTU1BTkRTX0NPTU1BTkQiLCJzZXRTaGVsbENvbW1hbmRzQWN0aW9uIiwiQUREX0lHTk9SRURfREVQRU5ERU5DWV9DT01NQU5EIiwiYWRkSWdub3JlZERlcGVuZGVuY3lBY3Rpb24iLCJMSVNUX0lHTk9SRURfREVQRU5ERU5DSUVTX0NPTU1BTkQiLCJsaXN0SWdub3JlZERlcGVuZGVuY2llc0FjdGlvbiIsIlJFTU9WRV9JR05PUkVEX0RFUEVOREVOQ1lfQ09NTUFORCIsInJlbW92ZUlnbm9yZWREZXBlbmRlbmN5QWN0aW9uIiwiQUREX0ZPUkNFRF9ERVBFTkRFTkNZX1JFTEFUSU9OX0NPTU1BTkQiLCJhZGRGb3JjZWREZXBlbmRlbmN5UmVsYXRpb25BY3Rpb24iLCJMSVNUX0ZPUkNFRF9ERVBFTkRFTkNZX1JFTEFUSU9OU19DT01NQU5EIiwibGlzdEZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnNBY3Rpb24iLCJSRU1PVkVfRk9SQ0VEX0RFUEVOREVOQ1lfUkVMQVRJT05fQ09NTUFORCIsInJlbW92ZUZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbkFjdGlvbiIsIkNPTU1BTkRfTk9UX1JFQ09HTklTRURfTUVTU0FHRSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBa0NBOzs7ZUFBd0JBOzs7NkRBaENEO2dFQUNHO2tFQUNFO21FQUNDO3FFQUNFO3dFQUNHO3dFQUNBO3lFQUNDOzZFQUNJO2dGQUNHO2dGQUNBO29GQUNJO3NGQUNFO3VGQUNDOzBCQUV5QjswQkFDcUI7MEJBY3RDOzs7Ozs7QUFFMUMsU0FBU0EsS0FBS0MsT0FBTyxFQUFFQyxRQUFRLEVBQUVDLE9BQU87SUFDckQsTUFBTSxFQUFFQyxNQUFNQyxxQkFBVyxFQUNqQkMsUUFBUUMsdUJBQWEsRUFDckJDLFNBQVNDLHlCQUFlLEVBQ3hCQyxVQUFVQyx5QkFBZSxFQUN6QkMsV0FBV0MsMEJBQWdCLEVBQUUsR0FBR1Y7SUFFeEMsT0FBUUY7UUFDTixLQUFLYSxzQkFBWTtZQUFFO2dCQUNqQkMsSUFBQUEsYUFBVTtnQkFFVjtZQUNGO1FBRUEsS0FBS0MseUJBQWU7WUFBRTtnQkFDcEJDLElBQUFBLGdCQUFhO2dCQUViO1lBQ0Y7UUFFQSxLQUFLQyw0QkFBa0I7WUFBRTtnQkFDdkJDLElBQUFBLG1CQUFnQjtnQkFFaEI7WUFDRjtRQUVBLEtBQUtDLDJCQUFpQjtZQUFFO2dCQUN0QixJQUFJbEIsYUFBYSxNQUFNO29CQUNyQm1CLFFBQVFDLEdBQUcsQ0FBQ0MsbUNBQXlCO2dCQUN2QyxPQUFPO29CQUNMLE1BQU1DLG1CQUFtQnRCLFVBQVcsR0FBRztvQkFFdkN1QixJQUFBQSxrQkFBZSxFQUFDRCxrQkFBa0JkLFNBQVNKLE9BQU9NLFVBQVVKLFFBQVFKO2dCQUN0RTtnQkFFQTtZQUNGO1FBRUEsS0FBS3NCLCtCQUFxQjtZQUFFO2dCQUMxQkMsSUFBQUEscUJBQWtCO2dCQUVsQjtZQUNGO1FBRUEsS0FBS0Msa0NBQXdCO1lBQUU7Z0JBQzdCQyxJQUFBQSx3QkFBcUI7Z0JBRXJCO1lBQ0Y7UUFFQSxLQUFLQyxrQ0FBd0I7WUFBRTtnQkFDN0JDLElBQUFBLHdCQUFxQjtnQkFFckI7WUFDRjtRQUVBLEtBQUtDLG9DQUEwQjtZQUFFO2dCQUMvQkMsSUFBQUEseUJBQXNCO2dCQUV0QjtZQUNGO1FBRUEsS0FBS0Msd0NBQThCO1lBQUU7Z0JBQ25DQyxJQUFBQSw2QkFBMEI7Z0JBRTFCO1lBQ0Y7UUFFQSxLQUFLQywyQ0FBaUM7WUFBRTtnQkFDdENDLElBQUFBLGdDQUE2QjtnQkFFN0I7WUFDRjtRQUVBLEtBQUtDLDJDQUFpQztZQUFFO2dCQUN0Q0MsSUFBQUEsZ0NBQTZCO2dCQUU3QjtZQUNGO1FBRUEsS0FBS0MsZ0RBQXNDO1lBQUU7Z0JBQzNDQyxJQUFBQSxvQ0FBaUM7Z0JBRWpDO1lBQ0Y7UUFFQSxLQUFLQyxrREFBd0M7WUFBRTtnQkFDN0NDLElBQUFBLHNDQUFtQztnQkFFbkM7WUFDRjtRQUVBLEtBQUtDLG1EQUF5QztZQUFFO2dCQUM5Q0MsSUFBQUEsdUNBQW9DO2dCQUVwQztZQUNGO1FBRUE7WUFBUztnQkFDUHhCLFFBQVFDLEdBQUcsQ0FBQ3dCLHdDQUE4QjtnQkFFMUM7WUFDRjtJQUNGO0FBQ0YifQ==