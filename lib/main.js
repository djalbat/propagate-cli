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
var _help = /*#__PURE__*/ _interop_require_default(require("./action/help"));
var _version = /*#__PURE__*/ _interop_require_default(require("./action/version"));
var _propagate = /*#__PURE__*/ _interop_require_default(require("./action/propagate"));
var _initialise = /*#__PURE__*/ _interop_require_default(require("./action/initialise"));
var _addDirectory = /*#__PURE__*/ _interop_require_default(require("./action/addDirectory"));
var _removeDirectory = /*#__PURE__*/ _interop_require_default(require("./action/removeDirectory"));
var _listDirectories = /*#__PURE__*/ _interop_require_default(require("./action/listDirectories"));
var _setShellCommands = /*#__PURE__*/ _interop_require_default(require("./action/setShellCommands"));
var _addIgnoredDependency = /*#__PURE__*/ _interop_require_default(require("./action/addIgnoredDependency"));
var _listIgnoredDependencies = /*#__PURE__*/ _interop_require_default(require("./action/listIgnoredDependencies"));
var _removeIgnoredDependency = /*#__PURE__*/ _interop_require_default(require("./action/removeIgnoredDependency"));
var _addForcedDependencyRelation = /*#__PURE__*/ _interop_require_default(require("./action/addForcedDependencyRelation"));
var _listForcedDependencyRelations = /*#__PURE__*/ _interop_require_default(require("./action/listForcedDependencyRelations"));
var _removeForcedDependencyRelation = /*#__PURE__*/ _interop_require_default(require("./action/removeForcedDependencyRelation"));
var _messages = require("./messages");
var _defaults = require("./defaults");
var _commands = require("./commands");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function main(command, argument, options) {
    var _options_yes = options.yes, yes = _options_yes === void 0 ? _defaults.DEFAULT_YES : _options_yes, _options_dryRun = options.dryRun, dryRun = _options_dryRun === void 0 ? _defaults.DEFAULT_DRY_RUN : _options_dryRun, _options_quietly = options.quietly, quietly = _options_quietly === void 0 ? _defaults.DEFAULT_QUIETLY : _options_quietly;
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
                    var subDirectoryName = argument; ///
                    (0, _propagate.default)(subDirectoryName, quietly, dryRun, yes);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgaGVscEFjdGlvbiBmcm9tIFwiLi9hY3Rpb24vaGVscFwiO1xuaW1wb3J0IHZlcnNpb25BY3Rpb24gZnJvbSBcIi4vYWN0aW9uL3ZlcnNpb25cIjtcbmltcG9ydCBwcm9wYWdhdGVBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL3Byb3BhZ2F0ZVwiO1xuaW1wb3J0IGluaXRpYWxpc2VBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL2luaXRpYWxpc2VcIjtcbmltcG9ydCBhZGREaXJlY3RvcnlBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL2FkZERpcmVjdG9yeVwiO1xuaW1wb3J0IHJlbW92ZURpcmVjdG9yeUFjdGlvbiBmcm9tIFwiLi9hY3Rpb24vcmVtb3ZlRGlyZWN0b3J5XCI7XG5pbXBvcnQgbGlzdERpcmVjdG9yaWVzQWN0aW9uIGZyb20gXCIuL2FjdGlvbi9saXN0RGlyZWN0b3JpZXNcIjtcbmltcG9ydCBzZXRTaGVsbENvbW1hbmRzQWN0aW9uIGZyb20gXCIuL2FjdGlvbi9zZXRTaGVsbENvbW1hbmRzXCI7XG5pbXBvcnQgYWRkSWdub3JlZERlcGVuZGVuY3lBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL2FkZElnbm9yZWREZXBlbmRlbmN5XCI7XG5pbXBvcnQgbGlzdElnbm9yZWREZXBlbmRlbmNpZXNBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL2xpc3RJZ25vcmVkRGVwZW5kZW5jaWVzXCI7XG5pbXBvcnQgcmVtb3ZlSWdub3JlZERlcGVuZGVuY3lBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL3JlbW92ZUlnbm9yZWREZXBlbmRlbmN5XCI7XG5pbXBvcnQgYWRkRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uQWN0aW9uIGZyb20gXCIuL2FjdGlvbi9hZGRGb3JjZWREZXBlbmRlbmN5UmVsYXRpb25cIjtcbmltcG9ydCBsaXN0Rm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uc0FjdGlvbiBmcm9tIFwiLi9hY3Rpb24vbGlzdEZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnNcIjtcbmltcG9ydCByZW1vdmVGb3JjZWREZXBlbmRlbmN5UmVsYXRpb25BY3Rpb24gZnJvbSBcIi4vYWN0aW9uL3JlbW92ZUZvcmNlZERlcGVuZGVuY3lSZWxhdGlvblwiO1xuXG5pbXBvcnQgeyBOT19BUkdVTUVOVF9HSVZFTl9NRVNTQUdFLCBDT01NQU5EX05PVF9SRUNPR05JU0VEX01FU1NBR0UgfSBmcm9tIFwiLi9tZXNzYWdlc1wiO1xuaW1wb3J0IHsgREVGQVVMVF9ZRVMsIERFRkFVTFRfUVVJRVRMWSwgREVGQVVMVF9EUllfUlVOIH0gZnJvbSBcIi4vZGVmYXVsdHNcIjtcbmltcG9ydCB7IEhFTFBfQ09NTUFORCxcbiAgICAgICAgVkVSU0lPTl9DT01NQU5ELFxuICAgICAgICBQUk9QQUdBVEVfQ09NTUFORCxcbiAgICAgICAgSU5JVElBTElTRV9DT01NQU5ELFxuICAgICAgICBBRERfRElSRUNUT1JZX0NPTU1BTkQsXG4gICAgICAgIFJFTU9WRV9ESVJFQ1RPUllfQ09NTUFORCxcbiAgICAgICAgTElTVF9ESVJFQ1RPUklFU19DT01NQU5ELFxuICAgICAgICBTRVRfU0hFTExfQ09NTUFORFNfQ09NTUFORCxcbiAgICAgICAgQUREX0lHTk9SRURfREVQRU5ERU5DWV9DT01NQU5ELFxuICAgICAgICBMSVNUX0lHTk9SRURfREVQRU5ERU5DSUVTX0NPTU1BTkQsXG4gICAgICAgIFJFTU9WRV9JR05PUkVEX0RFUEVOREVOQ1lfQ09NTUFORCxcbiAgICAgICAgQUREX0ZPUkNFRF9ERVBFTkRFTkNZX1JFTEFUSU9OX0NPTU1BTkQsXG4gICAgICAgIExJU1RfRk9SQ0VEX0RFUEVOREVOQ1lfUkVMQVRJT05TX0NPTU1BTkQsXG4gICAgICAgIFJFTU9WRV9GT1JDRURfREVQRU5ERU5DWV9SRUxBVElPTl9DT01NQU5EIH0gZnJvbSBcIi4vY29tbWFuZHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFpbihjb21tYW5kLCBhcmd1bWVudCwgb3B0aW9ucykge1xuICBjb25zdCB7IHllcyA9IERFRkFVTFRfWUVTLFxuICAgICAgICAgIGRyeVJ1biA9IERFRkFVTFRfRFJZX1JVTixcbiAgICAgICAgICBxdWlldGx5ID0gREVGQVVMVF9RVUlFVExZIH0gPSBvcHRpb25zO1xuXG4gIHN3aXRjaCAoY29tbWFuZCkge1xuICAgIGNhc2UgSEVMUF9DT01NQU5EOiB7XG4gICAgICBoZWxwQWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgVkVSU0lPTl9DT01NQU5EOiB7XG4gICAgICB2ZXJzaW9uQWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgSU5JVElBTElTRV9DT01NQU5EOiB7XG4gICAgICBpbml0aWFsaXNlQWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgUFJPUEFHQVRFX0NPTU1BTkQ6IHtcbiAgICAgIGlmIChhcmd1bWVudCA9PT0gbnVsbCkge1xuICAgICAgICBjb25zb2xlLmxvZyhOT19BUkdVTUVOVF9HSVZFTl9NRVNTQUdFKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHN1YkRpcmVjdG9yeU5hbWUgPSBhcmd1bWVudDsgIC8vL1xuXG4gICAgICAgIHByb3BhZ2F0ZUFjdGlvbihzdWJEaXJlY3RvcnlOYW1lLCBxdWlldGx5LCBkcnlSdW4sIHllcyk7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgQUREX0RJUkVDVE9SWV9DT01NQU5EOiB7XG4gICAgICBhZGREaXJlY3RvcnlBY3Rpb24oKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2FzZSBSRU1PVkVfRElSRUNUT1JZX0NPTU1BTkQ6IHtcbiAgICAgIHJlbW92ZURpcmVjdG9yeUFjdGlvbigpO1xuXG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjYXNlIExJU1RfRElSRUNUT1JJRVNfQ09NTUFORDoge1xuICAgICAgbGlzdERpcmVjdG9yaWVzQWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgU0VUX1NIRUxMX0NPTU1BTkRTX0NPTU1BTkQ6IHtcbiAgICAgIHNldFNoZWxsQ29tbWFuZHNBY3Rpb24oKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2FzZSBBRERfSUdOT1JFRF9ERVBFTkRFTkNZX0NPTU1BTkQ6IHtcbiAgICAgIGFkZElnbm9yZWREZXBlbmRlbmN5QWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgTElTVF9JR05PUkVEX0RFUEVOREVOQ0lFU19DT01NQU5EOiB7XG4gICAgICBsaXN0SWdub3JlZERlcGVuZGVuY2llc0FjdGlvbigpO1xuXG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjYXNlIFJFTU9WRV9JR05PUkVEX0RFUEVOREVOQ1lfQ09NTUFORDoge1xuICAgICAgcmVtb3ZlSWdub3JlZERlcGVuZGVuY3lBY3Rpb24oKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2FzZSBBRERfRk9SQ0VEX0RFUEVOREVOQ1lfUkVMQVRJT05fQ09NTUFORDoge1xuICAgICAgYWRkRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uQWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgTElTVF9GT1JDRURfREVQRU5ERU5DWV9SRUxBVElPTlNfQ09NTUFORDoge1xuICAgICAgbGlzdEZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnNBY3Rpb24oKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2FzZSBSRU1PVkVfRk9SQ0VEX0RFUEVOREVOQ1lfUkVMQVRJT05fQ09NTUFORDoge1xuICAgICAgcmVtb3ZlRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uQWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIGNvbnNvbGUubG9nKENPTU1BTkRfTk9UX1JFQ09HTklTRURfTUVTU0FHRSk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbIm1haW4iLCJjb21tYW5kIiwiYXJndW1lbnQiLCJvcHRpb25zIiwieWVzIiwiREVGQVVMVF9ZRVMiLCJkcnlSdW4iLCJERUZBVUxUX0RSWV9SVU4iLCJxdWlldGx5IiwiREVGQVVMVF9RVUlFVExZIiwiSEVMUF9DT01NQU5EIiwiaGVscEFjdGlvbiIsIlZFUlNJT05fQ09NTUFORCIsInZlcnNpb25BY3Rpb24iLCJJTklUSUFMSVNFX0NPTU1BTkQiLCJpbml0aWFsaXNlQWN0aW9uIiwiUFJPUEFHQVRFX0NPTU1BTkQiLCJjb25zb2xlIiwibG9nIiwiTk9fQVJHVU1FTlRfR0lWRU5fTUVTU0FHRSIsInN1YkRpcmVjdG9yeU5hbWUiLCJwcm9wYWdhdGVBY3Rpb24iLCJBRERfRElSRUNUT1JZX0NPTU1BTkQiLCJhZGREaXJlY3RvcnlBY3Rpb24iLCJSRU1PVkVfRElSRUNUT1JZX0NPTU1BTkQiLCJyZW1vdmVEaXJlY3RvcnlBY3Rpb24iLCJMSVNUX0RJUkVDVE9SSUVTX0NPTU1BTkQiLCJsaXN0RGlyZWN0b3JpZXNBY3Rpb24iLCJTRVRfU0hFTExfQ09NTUFORFNfQ09NTUFORCIsInNldFNoZWxsQ29tbWFuZHNBY3Rpb24iLCJBRERfSUdOT1JFRF9ERVBFTkRFTkNZX0NPTU1BTkQiLCJhZGRJZ25vcmVkRGVwZW5kZW5jeUFjdGlvbiIsIkxJU1RfSUdOT1JFRF9ERVBFTkRFTkNJRVNfQ09NTUFORCIsImxpc3RJZ25vcmVkRGVwZW5kZW5jaWVzQWN0aW9uIiwiUkVNT1ZFX0lHTk9SRURfREVQRU5ERU5DWV9DT01NQU5EIiwicmVtb3ZlSWdub3JlZERlcGVuZGVuY3lBY3Rpb24iLCJBRERfRk9SQ0VEX0RFUEVOREVOQ1lfUkVMQVRJT05fQ09NTUFORCIsImFkZEZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbkFjdGlvbiIsIkxJU1RfRk9SQ0VEX0RFUEVOREVOQ1lfUkVMQVRJT05TX0NPTU1BTkQiLCJsaXN0Rm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uc0FjdGlvbiIsIlJFTU9WRV9GT1JDRURfREVQRU5ERU5DWV9SRUxBVElPTl9DT01NQU5EIiwicmVtb3ZlRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uQWN0aW9uIiwiQ09NTUFORF9OT1RfUkVDT0dOSVNFRF9NRVNTQUdFIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFrQ0E7OztlQUF3QkE7OzsyREFoQ0Q7OERBQ0c7Z0VBQ0U7aUVBQ0M7bUVBQ0U7c0VBQ0c7c0VBQ0E7dUVBQ0M7MkVBQ0k7OEVBQ0c7OEVBQ0E7a0ZBQ0k7b0ZBQ0U7cUZBQ0M7d0JBRXlCO3dCQUNaO3dCQWNMOzs7Ozs7QUFFMUMsU0FBU0EsS0FBS0MsT0FBTyxFQUFFQyxRQUFRLEVBQUVDLE9BQU87SUFDckQsbUJBRXNDQSxRQUY5QkMsS0FBQUEsZ0NBQU1DLHFCQUFXLG1DQUVhRixRQUQ5QkcsUUFBQUEsc0NBQVNDLHlCQUFlLHVDQUNNSixRQUE5QkssU0FBQUEsd0NBQVVDLHlCQUFlO0lBRWpDLE9BQVFSO1FBQ04sS0FBS1Msc0JBQVk7WUFBRTtnQkFDakJDLElBQUFBLGFBQVU7Z0JBRVY7WUFDRjtRQUVBLEtBQUtDLHlCQUFlO1lBQUU7Z0JBQ3BCQyxJQUFBQSxnQkFBYTtnQkFFYjtZQUNGO1FBRUEsS0FBS0MsNEJBQWtCO1lBQUU7Z0JBQ3ZCQyxJQUFBQSxtQkFBZ0I7Z0JBRWhCO1lBQ0Y7UUFFQSxLQUFLQywyQkFBaUI7WUFBRTtnQkFDdEIsSUFBSWQsYUFBYSxNQUFNO29CQUNyQmUsUUFBUUMsR0FBRyxDQUFDQyxtQ0FBeUI7Z0JBQ3ZDLE9BQU87b0JBQ0wsSUFBTUMsbUJBQW1CbEIsVUFBVyxHQUFHO29CQUV2Q21CLElBQUFBLGtCQUFlLEVBQUNELGtCQUFrQlosU0FBU0YsUUFBUUY7Z0JBQ3JEO2dCQUVBO1lBQ0Y7UUFFQSxLQUFLa0IsK0JBQXFCO1lBQUU7Z0JBQzFCQyxJQUFBQSxxQkFBa0I7Z0JBRWxCO1lBQ0Y7UUFFQSxLQUFLQyxrQ0FBd0I7WUFBRTtnQkFDN0JDLElBQUFBLHdCQUFxQjtnQkFFckI7WUFDRjtRQUVBLEtBQUtDLGtDQUF3QjtZQUFFO2dCQUM3QkMsSUFBQUEsd0JBQXFCO2dCQUVyQjtZQUNGO1FBRUEsS0FBS0Msb0NBQTBCO1lBQUU7Z0JBQy9CQyxJQUFBQSx5QkFBc0I7Z0JBRXRCO1lBQ0Y7UUFFQSxLQUFLQyx3Q0FBOEI7WUFBRTtnQkFDbkNDLElBQUFBLDZCQUEwQjtnQkFFMUI7WUFDRjtRQUVBLEtBQUtDLDJDQUFpQztZQUFFO2dCQUN0Q0MsSUFBQUEsZ0NBQTZCO2dCQUU3QjtZQUNGO1FBRUEsS0FBS0MsMkNBQWlDO1lBQUU7Z0JBQ3RDQyxJQUFBQSxnQ0FBNkI7Z0JBRTdCO1lBQ0Y7UUFFQSxLQUFLQyxnREFBc0M7WUFBRTtnQkFDM0NDLElBQUFBLG9DQUFpQztnQkFFakM7WUFDRjtRQUVBLEtBQUtDLGtEQUF3QztZQUFFO2dCQUM3Q0MsSUFBQUEsc0NBQW1DO2dCQUVuQztZQUNGO1FBRUEsS0FBS0MsbURBQXlDO1lBQUU7Z0JBQzlDQyxJQUFBQSx1Q0FBb0M7Z0JBRXBDO1lBQ0Y7UUFFQTtZQUFTO2dCQUNQeEIsUUFBUUMsR0FBRyxDQUFDd0Isd0NBQThCO2dCQUUxQztZQUNGO0lBQ0Y7QUFDRiJ9