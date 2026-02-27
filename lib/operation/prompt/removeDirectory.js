"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return removeDirectoryPromptOperation;
    }
});
const _necessary = require("necessary");
const _validate = require("../../utilities/validate");
const _messages = require("../../messages");
const _descriptions = require("../../descriptions");
const { prompt } = _necessary.shellUtilities;
function removeDirectoryPromptOperation(proceed, abort, context) {
    const attempts = Infinity, description = _descriptions.SPECIFY_DIRECTORY_TO_REMOVE_DESCRIPTION, errorMessage = _messages.INVALID_DIRECTORY_NUMBER_MESSAGE, { directoryNumbers } = context, validationFunction = (directoryNumber)=>{
        directoryNumber = Number(directoryNumber); ///
        return (0, _validate.validateDirectoryNumber)(directoryNumber, directoryNumbers);
    }, options = {
        attempts,
        description,
        errorMessage,
        validationFunction
    };
    prompt(options, (answer)=>{
        const directoryNumber = answer !== null ? Number(answer) : null, valid = directoryNumber !== null;
        if (valid) {
            Object.assign(context, {
                directoryNumber
            });
            proceed();
            return;
        }
        abort();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L3JlbW92ZURpcmVjdG9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgc2hlbGxVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IHZhbGlkYXRlRGlyZWN0b3J5TnVtYmVyIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy92YWxpZGF0ZVwiO1xuaW1wb3J0IHsgSU5WQUxJRF9ESVJFQ1RPUllfTlVNQkVSX01FU1NBR0UgfSBmcm9tIFwiLi4vLi4vbWVzc2FnZXNcIjtcbmltcG9ydCB7IFNQRUNJRllfRElSRUNUT1JZX1RPX1JFTU9WRV9ERVNDUklQVElPTiB9IGZyb20gXCIuLi8uLi9kZXNjcmlwdGlvbnNcIjtcblxuY29uc3QgeyBwcm9tcHQgfSA9IHNoZWxsVXRpbGl0aWVzO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVEaXJlY3RvcnlQcm9tcHRPcGVyYXRpb24ocHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpIHtcbiAgY29uc3QgYXR0ZW1wdHMgPSBJbmZpbml0eSxcbiAgICAgICAgZGVzY3JpcHRpb24gPSBTUEVDSUZZX0RJUkVDVE9SWV9UT19SRU1PVkVfREVTQ1JJUFRJT04sXG4gICAgICAgIGVycm9yTWVzc2FnZSA9IElOVkFMSURfRElSRUNUT1JZX05VTUJFUl9NRVNTQUdFLFxuICAgICAgICB7IGRpcmVjdG9yeU51bWJlcnMgfSA9IGNvbnRleHQsXG4gICAgICAgIHZhbGlkYXRpb25GdW5jdGlvbiA9IChkaXJlY3RvcnlOdW1iZXIpID0+IHtcbiAgICAgICAgICBkaXJlY3RvcnlOdW1iZXIgPSBOdW1iZXIoZGlyZWN0b3J5TnVtYmVyKTsgIC8vL1xuXG4gICAgICAgICAgcmV0dXJuIHZhbGlkYXRlRGlyZWN0b3J5TnVtYmVyKGRpcmVjdG9yeU51bWJlciwgZGlyZWN0b3J5TnVtYmVycyk7XG4gICAgICAgIH0sICAvLy9cbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBhdHRlbXB0cyxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uXG4gICAgICAgIH07XG5cbiAgcHJvbXB0KG9wdGlvbnMsIChhbnN3ZXIpID0+IHtcbiAgICBjb25zdCBkaXJlY3RvcnlOdW1iZXIgPSAoYW5zd2VyICE9PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIoYW5zd2VyKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgdmFsaWQgPSAoZGlyZWN0b3J5TnVtYmVyICE9PSBudWxsKTtcblxuICAgIGlmICh2YWxpZCkge1xuICAgICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICAgIGRpcmVjdG9yeU51bWJlclxuICAgICAgfSk7XG5cbiAgICAgIHByb2NlZWQoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFib3J0KCk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbInJlbW92ZURpcmVjdG9yeVByb21wdE9wZXJhdGlvbiIsInByb21wdCIsInNoZWxsVXRpbGl0aWVzIiwicHJvY2VlZCIsImFib3J0IiwiY29udGV4dCIsImF0dGVtcHRzIiwiSW5maW5pdHkiLCJkZXNjcmlwdGlvbiIsIlNQRUNJRllfRElSRUNUT1JZX1RPX1JFTU9WRV9ERVNDUklQVElPTiIsImVycm9yTWVzc2FnZSIsIklOVkFMSURfRElSRUNUT1JZX05VTUJFUl9NRVNTQUdFIiwiZGlyZWN0b3J5TnVtYmVycyIsInZhbGlkYXRpb25GdW5jdGlvbiIsImRpcmVjdG9yeU51bWJlciIsIk51bWJlciIsInZhbGlkYXRlRGlyZWN0b3J5TnVtYmVyIiwib3B0aW9ucyIsImFuc3dlciIsInZhbGlkIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFVQTs7O2VBQXdCQTs7OzJCQVJPOzBCQUVTOzBCQUNTOzhCQUNPO0FBRXhELE1BQU0sRUFBRUMsTUFBTSxFQUFFLEdBQUdDLHlCQUFjO0FBRWxCLFNBQVNGLCtCQUErQkcsT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE9BQU87SUFDNUUsTUFBTUMsV0FBV0MsVUFDWEMsY0FBY0MscURBQXVDLEVBQ3JEQyxlQUFlQywwQ0FBZ0MsRUFDL0MsRUFBRUMsZ0JBQWdCLEVBQUUsR0FBR1AsU0FDdkJRLHFCQUFxQixDQUFDQztRQUNwQkEsa0JBQWtCQyxPQUFPRCxrQkFBbUIsR0FBRztRQUUvQyxPQUFPRSxJQUFBQSxpQ0FBdUIsRUFBQ0YsaUJBQWlCRjtJQUNsRCxHQUNBSyxVQUFVO1FBQ1JYO1FBQ0FFO1FBQ0FFO1FBQ0FHO0lBQ0Y7SUFFTlosT0FBT2dCLFNBQVMsQ0FBQ0M7UUFDZixNQUFNSixrQkFBa0IsQUFBQ0ksV0FBVyxPQUNWSCxPQUFPRyxVQUNMLE1BQ3RCQyxRQUFTTCxvQkFBb0I7UUFFbkMsSUFBSUssT0FBTztZQUNUQyxPQUFPQyxNQUFNLENBQUNoQixTQUFTO2dCQUNyQlM7WUFDRjtZQUVBWDtZQUVBO1FBQ0Y7UUFFQUM7SUFDRjtBQUNGIn0=