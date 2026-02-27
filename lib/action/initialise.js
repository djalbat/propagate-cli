"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return initialiseAction;
    }
});
const _configuration = require("../configuration");
const _messages = require("../messages");
function initialiseAction() {
    const configurationFileExists = (0, _configuration.checkConfigurationFileExists)();
    if (configurationFileExists) {
        console.log(_messages.FAILED_INITIALISE_MESSAGE);
    } else {
        (0, _configuration.createConfigurationFile)();
        console.log(_messages.SUCCESSFUL_INITIALISE_MESSAGE);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb24vaW5pdGlhbGlzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgY3JlYXRlQ29uZmlndXJhdGlvbkZpbGUsIGNoZWNrQ29uZmlndXJhdGlvbkZpbGVFeGlzdHMgfSBmcm9tIFwiLi4vY29uZmlndXJhdGlvblwiO1xuaW1wb3J0IHsgRkFJTEVEX0lOSVRJQUxJU0VfTUVTU0FHRSwgU1VDQ0VTU0ZVTF9JTklUSUFMSVNFX01FU1NBR0UgfSBmcm9tIFwiLi4vbWVzc2FnZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdGlhbGlzZUFjdGlvbigpIHtcbiAgY29uc3QgY29uZmlndXJhdGlvbkZpbGVFeGlzdHMgPSBjaGVja0NvbmZpZ3VyYXRpb25GaWxlRXhpc3RzKCk7XG5cbiAgaWYgKGNvbmZpZ3VyYXRpb25GaWxlRXhpc3RzKSB7XG4gICAgY29uc29sZS5sb2coRkFJTEVEX0lOSVRJQUxJU0VfTUVTU0FHRSk7XG4gIH0gZWxzZSB7XG4gICAgY3JlYXRlQ29uZmlndXJhdGlvbkZpbGUoKTtcblxuICAgIGNvbnNvbGUubG9nKFNVQ0NFU1NGVUxfSU5JVElBTElTRV9NRVNTQUdFKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImluaXRpYWxpc2VBY3Rpb24iLCJjb25maWd1cmF0aW9uRmlsZUV4aXN0cyIsImNoZWNrQ29uZmlndXJhdGlvbkZpbGVFeGlzdHMiLCJjb25zb2xlIiwibG9nIiwiRkFJTEVEX0lOSVRJQUxJU0VfTUVTU0FHRSIsImNyZWF0ZUNvbmZpZ3VyYXRpb25GaWxlIiwiU1VDQ0VTU0ZVTF9JTklUSUFMSVNFX01FU1NBR0UiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQUtBOzs7ZUFBd0JBOzs7K0JBSDhDOzBCQUNHO0FBRTFELFNBQVNBO0lBQ3RCLE1BQU1DLDBCQUEwQkMsSUFBQUEsMkNBQTRCO0lBRTVELElBQUlELHlCQUF5QjtRQUMzQkUsUUFBUUMsR0FBRyxDQUFDQyxtQ0FBeUI7SUFDdkMsT0FBTztRQUNMQyxJQUFBQSxzQ0FBdUI7UUFFdkJILFFBQVFDLEdBQUcsQ0FBQ0csdUNBQTZCO0lBQzNDO0FBQ0YifQ==