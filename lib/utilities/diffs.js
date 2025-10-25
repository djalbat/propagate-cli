"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get nextDiffsFromDiff () {
        return nextDiffsFromDiff;
    },
    get previousDiffsFromDiff () {
        return previousDiffsFromDiff;
    }
});
function nextDiffsFromDiff(diff, diffs) {
    var index = diffs.indexOf(diff), beginIndex = index + 1, nextDiffs = diffs.slice(beginIndex);
    return nextDiffs;
}
function previousDiffsFromDiff(diff, diffs) {
    var index = diffs.indexOf(diff), endIndex = index, beginIndex = 0, previousDiffs = diffs.slice(beginIndex, endIndex);
    return previousDiffs;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvZGlmZnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXh0RGlmZnNGcm9tRGlmZihkaWZmLCBkaWZmcykge1xuICBjb25zdCBpbmRleCA9IGRpZmZzLmluZGV4T2YoZGlmZiksXG4gICAgICAgIGJlZ2luSW5kZXggPSBpbmRleCArIDEsXG4gICAgICAgIG5leHREaWZmcyA9IGRpZmZzLnNsaWNlKGJlZ2luSW5kZXgpO1xuXG4gIHJldHVybiBuZXh0RGlmZnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV2aW91c0RpZmZzRnJvbURpZmYoZGlmZiwgZGlmZnMpIHtcbiAgY29uc3QgaW5kZXggPSBkaWZmcy5pbmRleE9mKGRpZmYpLFxuICAgICAgICBlbmRJbmRleCA9IGluZGV4LCAvLy9cbiAgICAgICAgYmVnaW5JbmRleCA9IDAsXG4gICAgICAgIHByZXZpb3VzRGlmZnMgPSBkaWZmcy5zbGljZShiZWdpbkluZGV4LCBlbmRJbmRleCk7XG5cbiAgcmV0dXJuIHByZXZpb3VzRGlmZnM7XG59XG4iXSwibmFtZXMiOlsibmV4dERpZmZzRnJvbURpZmYiLCJwcmV2aW91c0RpZmZzRnJvbURpZmYiLCJkaWZmIiwiZGlmZnMiLCJpbmRleCIsImluZGV4T2YiLCJiZWdpbkluZGV4IiwibmV4dERpZmZzIiwic2xpY2UiLCJlbmRJbmRleCIsInByZXZpb3VzRGlmZnMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztRQUVnQkE7ZUFBQUE7O1FBUUFDO2VBQUFBOzs7QUFSVCxTQUFTRCxrQkFBa0JFLElBQUksRUFBRUMsS0FBSztJQUMzQyxJQUFNQyxRQUFRRCxNQUFNRSxPQUFPLENBQUNILE9BQ3RCSSxhQUFhRixRQUFRLEdBQ3JCRyxZQUFZSixNQUFNSyxLQUFLLENBQUNGO0lBRTlCLE9BQU9DO0FBQ1Q7QUFFTyxTQUFTTixzQkFBc0JDLElBQUksRUFBRUMsS0FBSztJQUMvQyxJQUFNQyxRQUFRRCxNQUFNRSxPQUFPLENBQUNILE9BQ3RCTyxXQUFXTCxPQUNYRSxhQUFhLEdBQ2JJLGdCQUFnQlAsTUFBTUssS0FBSyxDQUFDRixZQUFZRztJQUU5QyxPQUFPQztBQUNUIn0=