## Giant list of caveats/shortcuts/things-not-done-properly/etc.
- Solution/projects were created with VS2013. Should work with later versions no problem but you know...
- There's no cache busting on any files so you'll need to hard refresh the browser if you make changes and nothing seems to have changed.
- No authentication or authorization on the API.
- No persistence in the API, everything is stored in-memory as long as the application is running.
- No PATCH method on the API to change partial fields for an item or list, use PUT with full definition.
- CORS for the API is set to allow all origins, defeating the porpoise of CORS, it needs a custom policy provider factory or just a domain if your case is simple.
- It's functional but ugly.
- The checkbox in TodoItem should probably be pulled out into its own thing like EditableField.
- You may notice a notes field on an item but nothing is done with the field. I thought it'd be useful for demonstration purposes but it was going to end up being just another level of text. I'll probably take some time to do something nicer with it in the future (pop up a pane to edit rich text with a non-React plugin or something).
- Automated tests.
- Data retrieval is done using a [root component](https://www.javascriptstuff.com/react-ajax-best-practices/#1-root-component) and pushing the data down in props. Seems good enough for small applications but if I were going to get more complex I'd use flux/reflux/alt/redux.
- The React code is ES6. If you need to support older browsers change .bablerc in ReactJumpstart.UI to contain the browsers you need to support and babel will auto-transpile to ES5 if necessary.
- Currently TodoApp makes calls to the server and on success updates the internal state of the lists/items. It's complicated and this should probably be switched around. TodoApp should change the state of the lists/items and then in `componentDidUpdate()` detect changes and communicate the changes to the server.

## Next steps
- CreateTodoListForm and CreateTodoItemForm could probably just be an EditableField.
- Checkbox in TodoItem could be it's own thing.
- Make it look nice.
- Notes.

## Getting running
- Open solution with Visual Studio and start API and UI projects.
- Browser: http://localhost:56093

## Changing React things
- Node.js is needed. I have v8.9.4.
- `cd` to ReactJumpstart.UI directory.
- `npm install`
- Make changes to files in _src, then run `npm run build` to update the files that are served by the UI project, then hard refresh the browser.
- Debug using browser developer tools.

