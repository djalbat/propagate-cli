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

  --quietly|-q                             Execute shell commands without printing to the console
  
  --yes|-y                                 Initially answer yes to prompts

Further information:

Please see the readme file on GitHub:

  https://github.com/djalbat/propagate-cli
`);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb24vaGVscC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGVscEFjdGlvbigpIHtcbiAgY29uc29sZS5sb2coYFVzYWdlOiBcbiAgXG4gIHByb3BhZ2F0ZSBbPG9wdGlvbnM+XSBbPGNvbW1hbmQ+XSBbPGFyZ3VtZW50Pl1cblxuQ29tbWFuZHM6XG5cbiAgaGVscCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaG93IHRoaXMgaGVscFxuIFxuICB2ZXJzaW9uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNob3cgdGhlIHZlcnNpb25cblxuICBpbml0aWFsaXNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENyZWF0ZSBhIGNvbmZpZ3VyYXRpb24gZmlsZVxuXG4gIGFkZC1kaXJlY3RvcnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWRkIGFuIGFkZGl0aW9uYWwgZGlyZWN0b3J5XG4gIFxuICByZW1vdmUtZGlyZWN0b3J5ICAgICAgICAgICAgICAgICAgICAgICAgIFJlbW92ZSBhbiBhZGRpdGlvbmFsIGRpcmVjdG9yeVxuICBcbiAgbGlzdC1kaXJlY3RvcmllcyAgICAgICAgICAgICAgICAgICAgICAgICBMaXN0IGRpcmVjdG9yaWVzLCBpbmNsdWRpbmcgdGhlIGRlZmF1bHQgZGlyZWN0b3J5XG4gIFxuICBzZXQtc2hlbGwtY29tbWFuZHMgICAgICAgICAgICAgICAgICAgICAgIFNldCB0aGUgR2l0LCBwb2xsLCBidWlsZCwgaW5zdGFsbCBhbmQgcHVibGlzaCBzaGVsbCBjb21tYW5kc1xuICBcbiAgYWRkLWlnbm9yZWQtZGVwZW5kZW5jeSAgICAgICAgICAgICAgICAgICBBZGQgYW4gaWdub3JlZCBkZXBlbmRlbmN5XG4gIFxuICBsaXN0LWlnbm9yZWQtZGVwZW5kZW5jaWVzICAgICAgICAgICAgICAgIExpc3QgdGhlIGlnbm9yZWQgZGVwZW5kZW5jaWVzXG4gIFxuICByZW1vdmUtaWdub3JlZC1kZXBlbmRlbmN5ICAgICAgICAgICAgICAgIFJlbW92ZSBhbiBpZ25vcmVkIGRlcGVuZGVuY3lcbiAgXG4gIGFkZC1mb3JjZWQtZGVwZW5kZW5jeS1yZWxhdGlvbiAgICAgICAgICAgQWRkIGEgZm9yY2VkIGRlcGVuZGVuY3kgcmVsYXRpb25cbiAgXG4gIGxpc3QtZm9yY2VkLWRlcGVuZGVuY3ktcmVsYXRpb25zICAgICAgICAgTGlzdCB0aGUgZm9yY2VkIGRlcGVuZGVuY3kgcmVsYXRpb25zXG4gIFxuICByZW1vdmUtZm9yY2VkLWRlcGVuZGVuY3ktcmVsYXRpb24gICAgICAgIFJlbW92ZSBhIGZvcmNlZCBkZXBlbmRlbmN5IHJlbGF0aW9uXG4gIFxuT3B0aW9uczpcblxuICAtLWhlbHB8LWggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNob3cgdGhpcyBoZWxwXG5cbiAgLS12ZXJzaW9ufC12ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaG93IHRoZSB2ZXJzaW9uXG5cbiAgLS1kcnktcnVufC1kICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaG93IHVwZGF0ZXMgYnV0IGRvIG5vdCBhcHBseSB0aGVtXG5cbiAgLS1xdWlldGx5fC1xICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFeGVjdXRlIHNoZWxsIGNvbW1hbmRzIHdpdGhvdXQgcHJpbnRpbmcgdG8gdGhlIGNvbnNvbGVcbiAgXG4gIC0teWVzfC15ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW5pdGlhbGx5IGFuc3dlciB5ZXMgdG8gcHJvbXB0c1xuXG5GdXJ0aGVyIGluZm9ybWF0aW9uOlxuXG5QbGVhc2Ugc2VlIHRoZSByZWFkbWUgZmlsZSBvbiBHaXRIdWI6XG5cbiAgaHR0cHM6Ly9naXRodWIuY29tL2RqYWxiYXQvcHJvcGFnYXRlLWNsaVxuYCk7XG59XG4iXSwibmFtZXMiOlsiaGVscEFjdGlvbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQUVBOzs7ZUFBd0JBOzs7QUFBVCxTQUFTQTtJQUN0QkMsUUFBUUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpRGYsQ0FBQztBQUNEIn0=