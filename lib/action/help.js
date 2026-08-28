"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return helpAction;
    }
});
function helpAction() {
    console.log(`Usage: 
  
  propagate [<options>] [<command>] [<argument>]

Commands:

  help                                     Show this help
 
  version                                  Show the version

  initialise                               Create a configuration file

  add-directory                            Add an additional directory
  
  remove-directory                         Remove an additional directory
  
  list-directories                         List directories, including the default directory
  
  set-shell-commands                       Set the Git, poll, build, install and publish shell commands
  
  add-ignored-dependency                   Add an ignored dependency
  
  list-ignored-dependencies                List the ignored dependencies
  
  remove-ignored-dependency                Remove an ignored dependency
  
  add-forced-dependency-relation           Add a forced dependency relation
  
  list-forced-dependency-relations         List the forced dependency relations
  
  remove-forced-dependency-relation        Remove a forced dependency relation
  
Options:

  --help|-h                                Show this help

  --version|-v                             Show the version

  --dry-run|-d                             Show updates but do not apply them

  --delay|-w                               Polling delay, the default is three seconds

  --attempts|-a                            Polling atempts, the default is ten

  --quietly|-q                             Execute shell commands without printing to the console
  
  --yes|-y                                 Initially answer yes to prompts

Further information:

Please see the readme file on GitHub:

  https://github.com/djalbat/propagate-cli
`);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb24vaGVscC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGVscEFjdGlvbigpIHtcbiAgY29uc29sZS5sb2coYFVzYWdlOiBcbiAgXG4gIHByb3BhZ2F0ZSBbPG9wdGlvbnM+XSBbPGNvbW1hbmQ+XSBbPGFyZ3VtZW50Pl1cblxuQ29tbWFuZHM6XG5cbiAgaGVscCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaG93IHRoaXMgaGVscFxuIFxuICB2ZXJzaW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNob3cgdGhlIHZlcnNpb25cblxuICBpbml0aWFsaXNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENyZWF0ZSBhIGNvbmZpZ3VyYXRpb24gZmlsZVxuXG4gIGFkZC1kaXJlY3RvcnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWRkIGFuIGFkZGl0aW9uYWwgZGlyZWN0b3J5XG4gIFxuICByZW1vdmUtZGlyZWN0b3J5ICAgICAgICAgICAgICAgICAgICAgICAgIFJlbW92ZSBhbiBhZGRpdGlvbmFsIGRpcmVjdG9yeVxuICBcbiAgbGlzdC1kaXJlY3RvcmllcyAgICAgICAgICAgICAgICAgICAgICAgICBMaXN0IGRpcmVjdG9yaWVzLCBpbmNsdWRpbmcgdGhlIGRlZmF1bHQgZGlyZWN0b3J5XG4gIFxuICBzZXQtc2hlbGwtY29tbWFuZHMgICAgICAgICAgICAgICAgICAgICAgIFNldCB0aGUgR2l0LCBwb2xsLCBidWlsZCwgaW5zdGFsbCBhbmQgcHVibGlzaCBzaGVsbCBjb21tYW5kc1xuICBcbiAgYWRkLWlnbm9yZWQtZGVwZW5kZW5jeSAgICAgICAgICAgICAgICAgICBBZGQgYW4gaWdub3JlZCBkZXBlbmRlbmN5XG4gIFxuICBsaXN0LWlnbm9yZWQtZGVwZW5kZW5jaWVzICAgICAgICAgICAgICAgIExpc3QgdGhlIGlnbm9yZWQgZGVwZW5kZW5jaWVzXG4gIFxuICByZW1vdmUtaWdub3JlZC1kZXBlbmRlbmN5ICAgICAgICAgICAgICAgIFJlbW92ZSBhbiBpZ25vcmVkIGRlcGVuZGVuY3lcbiAgXG4gIGFkZC1mb3JjZWQtZGVwZW5kZW5jeS1yZWxhdGlvbiAgICAgICAgICAgQWRkIGEgZm9yY2VkIGRlcGVuZGVuY3kgcmVsYXRpb25cbiAgXG4gIGxpc3QtZm9yY2VkLWRlcGVuZGVuY3ktcmVsYXRpb25zICAgICAgICAgTGlzdCB0aGUgZm9yY2VkIGRlcGVuZGVuY3kgcmVsYXRpb25zXG4gIFxuICByZW1vdmUtZm9yY2VkLWRlcGVuZGVuY3ktcmVsYXRpb24gICAgICAgIFJlbW92ZSBhIGZvcmNlZCBkZXBlbmRlbmN5IHJlbGF0aW9uXG4gIFxuT3B0aW9uczpcblxuICAtLWhlbHB8LWggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNob3cgdGhpcyBoZWxwXG5cbiAgLS12ZXJzaW9ufC12ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaG93IHRoZSB2ZXJzaW9uXG5cbiAgLS1kcnktcnVufC1kICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaG93IHVwZGF0ZXMgYnV0IGRvIG5vdCBhcHBseSB0aGVtXG5cbiAgLS1kZWxheXwtdyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQb2xsaW5nIGRlbGF5LCB0aGUgZGVmYXVsdCBpcyB0aHJlZSBzZWNvbmRzXG5cbiAgLS1hdHRlbXB0c3wtYSAgICAgICAgICAgICAgICAgICAgICAgICAgICBQb2xsaW5nIGF0ZW1wdHMsIHRoZSBkZWZhdWx0IGlzIHRlblxuXG4gIC0tcXVpZXRseXwtcSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXhlY3V0ZSBzaGVsbCBjb21tYW5kcyB3aXRob3V0IHByaW50aW5nIHRvIHRoZSBjb25zb2xlXG4gIFxuICAtLXllc3wteSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluaXRpYWxseSBhbnN3ZXIgeWVzIHRvIHByb21wdHNcblxuRnVydGhlciBpbmZvcm1hdGlvbjpcblxuUGxlYXNlIHNlZSB0aGUgcmVhZG1lIGZpbGUgb24gR2l0SHViOlxuXG4gIGh0dHBzOi8vZ2l0aHViLmNvbS9kamFsYmF0L3Byb3BhZ2F0ZS1jbGlcbmApO1xufVxuIl0sIm5hbWVzIjpbImhlbHBBY3Rpb24iLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFFQTs7O2VBQXdCQTs7O0FBQVQsU0FBU0E7SUFDdEJDLFFBQVFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFEZixDQUFDO0FBQ0QifQ==