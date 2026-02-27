"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return addIgnoredDependencyPromptOperation;
    }
});
const _necessary = require("necessary");
const _validate = require("../../utilities/validate");
const _descriptions = require("../../descriptions");
const _messages = require("../../messages");
const { prompt } = _necessary.shellUtilities;
function addIgnoredDependencyPromptOperation(proceed, abort, context) {
    const attempts = Infinity, description = _descriptions.IGNORED_DEPENDENCY_DESCRIPTION, errorMessage = _messages.INVALID_IGNORED_DEPENDENCY_NAME_MESSAGE, validationFunction = _validate.validateIgnoredDependencyName, options = {
        attempts,
        description,
        errorMessage,
        validationFunction
    };
    prompt(options, (answer)=>{
        const ignoredDependencyName = answer, valid = ignoredDependencyName !== null;
        if (valid) {
            const ignoredDependency = ignoredDependencyName; ///
            Object.assign(context, {
                ignoredDependency
            });
            proceed();
            return;
        }
        abort();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L2FkZElnbm9yZWREZXBlbmRlbmN5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBzaGVsbFV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IHsgdmFsaWRhdGVJZ25vcmVkRGVwZW5kZW5jeU5hbWUgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL3ZhbGlkYXRlXCI7XG5pbXBvcnQgeyBJR05PUkVEX0RFUEVOREVOQ1lfREVTQ1JJUFRJT04gfSBmcm9tIFwiLi4vLi4vZGVzY3JpcHRpb25zXCI7XG5pbXBvcnQgeyBJTlZBTElEX0lHTk9SRURfREVQRU5ERU5DWV9OQU1FX01FU1NBR0UgfSBmcm9tIFwiLi4vLi4vbWVzc2FnZXNcIjtcblxuY29uc3QgeyBwcm9tcHQgfSA9IHNoZWxsVXRpbGl0aWVzO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRJZ25vcmVkRGVwZW5kZW5jeVByb21wdE9wZXJhdGlvbihwcm9jZWVkLCBhYm9ydCwgY29udGV4dCkge1xuICBjb25zdCBhdHRlbXB0cyA9IEluZmluaXR5LFxuICAgICAgICBkZXNjcmlwdGlvbiA9IElHTk9SRURfREVQRU5ERU5DWV9ERVNDUklQVElPTixcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gSU5WQUxJRF9JR05PUkVEX0RFUEVOREVOQ1lfTkFNRV9NRVNTQUdFLFxuICAgICAgICB2YWxpZGF0aW9uRnVuY3Rpb24gPSB2YWxpZGF0ZUlnbm9yZWREZXBlbmRlbmN5TmFtZSwgIC8vL1xuICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgIGF0dGVtcHRzLFxuICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgICB2YWxpZGF0aW9uRnVuY3Rpb25cbiAgICAgICAgfTtcblxuICBwcm9tcHQob3B0aW9ucywgKGFuc3dlcikgPT4ge1xuICAgIGNvbnN0IGlnbm9yZWREZXBlbmRlbmN5TmFtZSA9IGFuc3dlciwgLy8vXG4gICAgICAgICAgdmFsaWQgPSAoaWdub3JlZERlcGVuZGVuY3lOYW1lICE9PSBudWxsKTtcblxuICAgIGlmICh2YWxpZCkge1xuICAgICAgY29uc3QgaWdub3JlZERlcGVuZGVuY3kgPSBpZ25vcmVkRGVwZW5kZW5jeU5hbWU7ICAvLy9cblxuICAgICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICAgIGlnbm9yZWREZXBlbmRlbmN5XG4gICAgICB9KTtcblxuICAgICAgcHJvY2VlZCgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYWJvcnQoKTtcbiAgfSk7XG59XG4iXSwibmFtZXMiOlsiYWRkSWdub3JlZERlcGVuZGVuY3lQcm9tcHRPcGVyYXRpb24iLCJwcm9tcHQiLCJzaGVsbFV0aWxpdGllcyIsInByb2NlZWQiLCJhYm9ydCIsImNvbnRleHQiLCJhdHRlbXB0cyIsIkluZmluaXR5IiwiZGVzY3JpcHRpb24iLCJJR05PUkVEX0RFUEVOREVOQ1lfREVTQ1JJUFRJT04iLCJlcnJvck1lc3NhZ2UiLCJJTlZBTElEX0lHTk9SRURfREVQRU5ERU5DWV9OQU1FX01FU1NBR0UiLCJ2YWxpZGF0aW9uRnVuY3Rpb24iLCJ2YWxpZGF0ZUlnbm9yZWREZXBlbmRlbmN5TmFtZSIsIm9wdGlvbnMiLCJhbnN3ZXIiLCJpZ25vcmVkRGVwZW5kZW5jeU5hbWUiLCJ2YWxpZCIsImlnbm9yZWREZXBlbmRlbmN5IiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFVQTs7O2VBQXdCQTs7OzJCQVJPOzBCQUVlOzhCQUNDOzBCQUNTO0FBRXhELE1BQU0sRUFBRUMsTUFBTSxFQUFFLEdBQUdDLHlCQUFjO0FBRWxCLFNBQVNGLG9DQUFvQ0csT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE9BQU87SUFDakYsTUFBTUMsV0FBV0MsVUFDWEMsY0FBY0MsNENBQThCLEVBQzVDQyxlQUFlQyxpREFBdUMsRUFDdERDLHFCQUFxQkMsdUNBQTZCLEVBQ2xEQyxVQUFVO1FBQ1JSO1FBQ0FFO1FBQ0FFO1FBQ0FFO0lBQ0Y7SUFFTlgsT0FBT2EsU0FBUyxDQUFDQztRQUNmLE1BQU1DLHdCQUF3QkQsUUFDeEJFLFFBQVNELDBCQUEwQjtRQUV6QyxJQUFJQyxPQUFPO1lBQ1QsTUFBTUMsb0JBQW9CRix1QkFBd0IsR0FBRztZQUVyREcsT0FBT0MsTUFBTSxDQUFDZixTQUFTO2dCQUNyQmE7WUFDRjtZQUVBZjtZQUVBO1FBQ0Y7UUFFQUM7SUFDRjtBQUNGIn0=