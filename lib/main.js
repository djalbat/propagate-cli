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
    const { yes = _defaults.DEFAULT_YES, dryRun = _defaults.DEFAULT_DRY_RUN, quietly = _defaults.DEFAULT_QUIETLY } = options;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgaGVscEFjdGlvbiBmcm9tIFwiLi9hY3Rpb24vaGVscFwiO1xuaW1wb3J0IHZlcnNpb25BY3Rpb24gZnJvbSBcIi4vYWN0aW9uL3ZlcnNpb25cIjtcbmltcG9ydCBwcm9wYWdhdGVBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL3Byb3BhZ2F0ZVwiO1xuaW1wb3J0IGluaXRpYWxpc2VBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL2luaXRpYWxpc2VcIjtcbmltcG9ydCBhZGREaXJlY3RvcnlBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL2FkZERpcmVjdG9yeVwiO1xuaW1wb3J0IHJlbW92ZURpcmVjdG9yeUFjdGlvbiBmcm9tIFwiLi9hY3Rpb24vcmVtb3ZlRGlyZWN0b3J5XCI7XG5pbXBvcnQgbGlzdERpcmVjdG9yaWVzQWN0aW9uIGZyb20gXCIuL2FjdGlvbi9saXN0RGlyZWN0b3JpZXNcIjtcbmltcG9ydCBzZXRTaGVsbENvbW1hbmRzQWN0aW9uIGZyb20gXCIuL2FjdGlvbi9zZXRTaGVsbENvbW1hbmRzXCI7XG5pbXBvcnQgYWRkSWdub3JlZERlcGVuZGVuY3lBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL2FkZElnbm9yZWREZXBlbmRlbmN5XCI7XG5pbXBvcnQgbGlzdElnbm9yZWREZXBlbmRlbmNpZXNBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL2xpc3RJZ25vcmVkRGVwZW5kZW5jaWVzXCI7XG5pbXBvcnQgcmVtb3ZlSWdub3JlZERlcGVuZGVuY3lBY3Rpb24gZnJvbSBcIi4vYWN0aW9uL3JlbW92ZUlnbm9yZWREZXBlbmRlbmN5XCI7XG5pbXBvcnQgYWRkRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uQWN0aW9uIGZyb20gXCIuL2FjdGlvbi9hZGRGb3JjZWREZXBlbmRlbmN5UmVsYXRpb25cIjtcbmltcG9ydCBsaXN0Rm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uc0FjdGlvbiBmcm9tIFwiLi9hY3Rpb24vbGlzdEZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnNcIjtcbmltcG9ydCByZW1vdmVGb3JjZWREZXBlbmRlbmN5UmVsYXRpb25BY3Rpb24gZnJvbSBcIi4vYWN0aW9uL3JlbW92ZUZvcmNlZERlcGVuZGVuY3lSZWxhdGlvblwiO1xuXG5pbXBvcnQgeyBOT19BUkdVTUVOVF9HSVZFTl9NRVNTQUdFLCBDT01NQU5EX05PVF9SRUNPR05JU0VEX01FU1NBR0UgfSBmcm9tIFwiLi9tZXNzYWdlc1wiO1xuaW1wb3J0IHsgREVGQVVMVF9ZRVMsIERFRkFVTFRfUVVJRVRMWSwgREVGQVVMVF9EUllfUlVOIH0gZnJvbSBcIi4vZGVmYXVsdHNcIjtcbmltcG9ydCB7IEhFTFBfQ09NTUFORCxcbiAgICAgICAgVkVSU0lPTl9DT01NQU5ELFxuICAgICAgICBQUk9QQUdBVEVfQ09NTUFORCxcbiAgICAgICAgSU5JVElBTElTRV9DT01NQU5ELFxuICAgICAgICBBRERfRElSRUNUT1JZX0NPTU1BTkQsXG4gICAgICAgIFJFTU9WRV9ESVJFQ1RPUllfQ09NTUFORCxcbiAgICAgICAgTElTVF9ESVJFQ1RPUklFU19DT01NQU5ELFxuICAgICAgICBTRVRfU0hFTExfQ09NTUFORFNfQ09NTUFORCxcbiAgICAgICAgQUREX0lHTk9SRURfREVQRU5ERU5DWV9DT01NQU5ELFxuICAgICAgICBMSVNUX0lHTk9SRURfREVQRU5ERU5DSUVTX0NPTU1BTkQsXG4gICAgICAgIFJFTU9WRV9JR05PUkVEX0RFUEVOREVOQ1lfQ09NTUFORCxcbiAgICAgICAgQUREX0ZPUkNFRF9ERVBFTkRFTkNZX1JFTEFUSU9OX0NPTU1BTkQsXG4gICAgICAgIExJU1RfRk9SQ0VEX0RFUEVOREVOQ1lfUkVMQVRJT05TX0NPTU1BTkQsXG4gICAgICAgIFJFTU9WRV9GT1JDRURfREVQRU5ERU5DWV9SRUxBVElPTl9DT01NQU5EIH0gZnJvbSBcIi4vY29tbWFuZHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFpbihjb21tYW5kLCBhcmd1bWVudCwgb3B0aW9ucykge1xuICBjb25zdCB7IHllcyA9IERFRkFVTFRfWUVTLFxuICAgICAgICAgIGRyeVJ1biA9IERFRkFVTFRfRFJZX1JVTixcbiAgICAgICAgICBxdWlldGx5ID0gREVGQVVMVF9RVUlFVExZIH0gPSBvcHRpb25zO1xuXG4gIHN3aXRjaCAoY29tbWFuZCkge1xuICAgIGNhc2UgSEVMUF9DT01NQU5EOiB7XG4gICAgICBoZWxwQWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgVkVSU0lPTl9DT01NQU5EOiB7XG4gICAgICB2ZXJzaW9uQWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgSU5JVElBTElTRV9DT01NQU5EOiB7XG4gICAgICBpbml0aWFsaXNlQWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgUFJPUEFHQVRFX0NPTU1BTkQ6IHtcbiAgICAgIGlmIChhcmd1bWVudCA9PT0gbnVsbCkge1xuICAgICAgICBjb25zb2xlLmxvZyhOT19BUkdVTUVOVF9HSVZFTl9NRVNTQUdFKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHN1YkRpcmVjdG9yeU5hbWUgPSBhcmd1bWVudDsgIC8vL1xuXG4gICAgICAgIHByb3BhZ2F0ZUFjdGlvbihzdWJEaXJlY3RvcnlOYW1lLCBxdWlldGx5LCBkcnlSdW4sIHllcyk7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgQUREX0RJUkVDVE9SWV9DT01NQU5EOiB7XG4gICAgICBhZGREaXJlY3RvcnlBY3Rpb24oKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2FzZSBSRU1PVkVfRElSRUNUT1JZX0NPTU1BTkQ6IHtcbiAgICAgIHJlbW92ZURpcmVjdG9yeUFjdGlvbigpO1xuXG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjYXNlIExJU1RfRElSRUNUT1JJRVNfQ09NTUFORDoge1xuICAgICAgbGlzdERpcmVjdG9yaWVzQWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgU0VUX1NIRUxMX0NPTU1BTkRTX0NPTU1BTkQ6IHtcbiAgICAgIHNldFNoZWxsQ29tbWFuZHNBY3Rpb24oKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2FzZSBBRERfSUdOT1JFRF9ERVBFTkRFTkNZX0NPTU1BTkQ6IHtcbiAgICAgIGFkZElnbm9yZWREZXBlbmRlbmN5QWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgTElTVF9JR05PUkVEX0RFUEVOREVOQ0lFU19DT01NQU5EOiB7XG4gICAgICBsaXN0SWdub3JlZERlcGVuZGVuY2llc0FjdGlvbigpO1xuXG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjYXNlIFJFTU9WRV9JR05PUkVEX0RFUEVOREVOQ1lfQ09NTUFORDoge1xuICAgICAgcmVtb3ZlSWdub3JlZERlcGVuZGVuY3lBY3Rpb24oKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2FzZSBBRERfRk9SQ0VEX0RFUEVOREVOQ1lfUkVMQVRJT05fQ09NTUFORDoge1xuICAgICAgYWRkRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uQWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgTElTVF9GT1JDRURfREVQRU5ERU5DWV9SRUxBVElPTlNfQ09NTUFORDoge1xuICAgICAgbGlzdEZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnNBY3Rpb24oKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2FzZSBSRU1PVkVfRk9SQ0VEX0RFUEVOREVOQ1lfUkVMQVRJT05fQ09NTUFORDoge1xuICAgICAgcmVtb3ZlRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uQWN0aW9uKCk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIGNvbnNvbGUubG9nKENPTU1BTkRfTk9UX1JFQ09HTklTRURfTUVTU0FHRSk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbIm1haW4iLCJjb21tYW5kIiwiYXJndW1lbnQiLCJvcHRpb25zIiwieWVzIiwiREVGQVVMVF9ZRVMiLCJkcnlSdW4iLCJERUZBVUxUX0RSWV9SVU4iLCJxdWlldGx5IiwiREVGQVVMVF9RVUlFVExZIiwiSEVMUF9DT01NQU5EIiwiaGVscEFjdGlvbiIsIlZFUlNJT05fQ09NTUFORCIsInZlcnNpb25BY3Rpb24iLCJJTklUSUFMSVNFX0NPTU1BTkQiLCJpbml0aWFsaXNlQWN0aW9uIiwiUFJPUEFHQVRFX0NPTU1BTkQiLCJjb25zb2xlIiwibG9nIiwiTk9fQVJHVU1FTlRfR0lWRU5fTUVTU0FHRSIsInN1YkRpcmVjdG9yeU5hbWUiLCJwcm9wYWdhdGVBY3Rpb24iLCJBRERfRElSRUNUT1JZX0NPTU1BTkQiLCJhZGREaXJlY3RvcnlBY3Rpb24iLCJSRU1PVkVfRElSRUNUT1JZX0NPTU1BTkQiLCJyZW1vdmVEaXJlY3RvcnlBY3Rpb24iLCJMSVNUX0RJUkVDVE9SSUVTX0NPTU1BTkQiLCJsaXN0RGlyZWN0b3JpZXNBY3Rpb24iLCJTRVRfU0hFTExfQ09NTUFORFNfQ09NTUFORCIsInNldFNoZWxsQ29tbWFuZHNBY3Rpb24iLCJBRERfSUdOT1JFRF9ERVBFTkRFTkNZX0NPTU1BTkQiLCJhZGRJZ25vcmVkRGVwZW5kZW5jeUFjdGlvbiIsIkxJU1RfSUdOT1JFRF9ERVBFTkRFTkNJRVNfQ09NTUFORCIsImxpc3RJZ25vcmVkRGVwZW5kZW5jaWVzQWN0aW9uIiwiUkVNT1ZFX0lHTk9SRURfREVQRU5ERU5DWV9DT01NQU5EIiwicmVtb3ZlSWdub3JlZERlcGVuZGVuY3lBY3Rpb24iLCJBRERfRk9SQ0VEX0RFUEVOREVOQ1lfUkVMQVRJT05fQ09NTUFORCIsImFkZEZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbkFjdGlvbiIsIkxJU1RfRk9SQ0VEX0RFUEVOREVOQ1lfUkVMQVRJT05TX0NPTU1BTkQiLCJsaXN0Rm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uc0FjdGlvbiIsIlJFTU9WRV9GT1JDRURfREVQRU5ERU5DWV9SRUxBVElPTl9DT01NQU5EIiwicmVtb3ZlRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uQWN0aW9uIiwiQ09NTUFORF9OT1RfUkVDT0dOSVNFRF9NRVNTQUdFIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFrQ0E7OztlQUF3QkE7Ozs2REFoQ0Q7Z0VBQ0c7a0VBQ0U7bUVBQ0M7cUVBQ0U7d0VBQ0c7d0VBQ0E7eUVBQ0M7NkVBQ0k7Z0ZBQ0c7Z0ZBQ0E7b0ZBQ0k7c0ZBQ0U7dUZBQ0M7MEJBRXlCOzBCQUNaOzBCQWNMOzs7Ozs7QUFFMUMsU0FBU0EsS0FBS0MsT0FBTyxFQUFFQyxRQUFRLEVBQUVDLE9BQU87SUFDckQsTUFBTSxFQUFFQyxNQUFNQyxxQkFBVyxFQUNqQkMsU0FBU0MseUJBQWUsRUFDeEJDLFVBQVVDLHlCQUFlLEVBQUUsR0FBR047SUFFdEMsT0FBUUY7UUFDTixLQUFLUyxzQkFBWTtZQUFFO2dCQUNqQkMsSUFBQUEsYUFBVTtnQkFFVjtZQUNGO1FBRUEsS0FBS0MseUJBQWU7WUFBRTtnQkFDcEJDLElBQUFBLGdCQUFhO2dCQUViO1lBQ0Y7UUFFQSxLQUFLQyw0QkFBa0I7WUFBRTtnQkFDdkJDLElBQUFBLG1CQUFnQjtnQkFFaEI7WUFDRjtRQUVBLEtBQUtDLDJCQUFpQjtZQUFFO2dCQUN0QixJQUFJZCxhQUFhLE1BQU07b0JBQ3JCZSxRQUFRQyxHQUFHLENBQUNDLG1DQUF5QjtnQkFDdkMsT0FBTztvQkFDTCxNQUFNQyxtQkFBbUJsQixVQUFXLEdBQUc7b0JBRXZDbUIsSUFBQUEsa0JBQWUsRUFBQ0Qsa0JBQWtCWixTQUFTRixRQUFRRjtnQkFDckQ7Z0JBRUE7WUFDRjtRQUVBLEtBQUtrQiwrQkFBcUI7WUFBRTtnQkFDMUJDLElBQUFBLHFCQUFrQjtnQkFFbEI7WUFDRjtRQUVBLEtBQUtDLGtDQUF3QjtZQUFFO2dCQUM3QkMsSUFBQUEsd0JBQXFCO2dCQUVyQjtZQUNGO1FBRUEsS0FBS0Msa0NBQXdCO1lBQUU7Z0JBQzdCQyxJQUFBQSx3QkFBcUI7Z0JBRXJCO1lBQ0Y7UUFFQSxLQUFLQyxvQ0FBMEI7WUFBRTtnQkFDL0JDLElBQUFBLHlCQUFzQjtnQkFFdEI7WUFDRjtRQUVBLEtBQUtDLHdDQUE4QjtZQUFFO2dCQUNuQ0MsSUFBQUEsNkJBQTBCO2dCQUUxQjtZQUNGO1FBRUEsS0FBS0MsMkNBQWlDO1lBQUU7Z0JBQ3RDQyxJQUFBQSxnQ0FBNkI7Z0JBRTdCO1lBQ0Y7UUFFQSxLQUFLQywyQ0FBaUM7WUFBRTtnQkFDdENDLElBQUFBLGdDQUE2QjtnQkFFN0I7WUFDRjtRQUVBLEtBQUtDLGdEQUFzQztZQUFFO2dCQUMzQ0MsSUFBQUEsb0NBQWlDO2dCQUVqQztZQUNGO1FBRUEsS0FBS0Msa0RBQXdDO1lBQUU7Z0JBQzdDQyxJQUFBQSxzQ0FBbUM7Z0JBRW5DO1lBQ0Y7UUFFQSxLQUFLQyxtREFBeUM7WUFBRTtnQkFDOUNDLElBQUFBLHVDQUFvQztnQkFFcEM7WUFDRjtRQUVBO1lBQVM7Z0JBQ1B4QixRQUFRQyxHQUFHLENBQUN3Qix3Q0FBOEI7Z0JBRTFDO1lBQ0Y7SUFDRjtBQUNGIn0=