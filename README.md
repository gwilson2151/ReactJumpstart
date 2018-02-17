## Giant list of caveats/shortcuts/things-not-done-properly/etc.
- No authentication or authorization.
- No persistence, everything is stored in-memory as long as the application is running.
- No PATCH method to change partial fields for an item or list, use PUT with full definition.
- It's functional but ugly.
- The checkbox in TodoItem should probably be pulled out into its own thing like EditableField.
- CORS for the API is set to allow all origins, defeating the porpoise of CORS, it needs a custom policy provider factory or just a domain if your case is simple.
- You may notice a notes field on an item but nothing is done with the field. I thought it'd be useful for demonstration purposes but it was going to end up being just another level of text. I'll probably take some time to do something nicer with it in the future (pop up a pane to edit rich text or something).
- Automated tests.
- Data retrieval is done using a [root component](https://www.javascriptstuff.com/react-ajax-best-practices/#1-root-component) and pushing the data down in props. Seems good enough for small applications but if I were going to get more complex I'd use flux/reflux/alt/redux.
- React code is ES6. If you need to support older browsers change .bablerc in ReactJumpstart.UI to contain the browsers you need to support and babel will auto-transpile to ES5 if necessary.
- Solution/projects were created with VS2013. Should work with later versions no problem but you know...

## Next steps
- Notes
- Make it look nice
- CreateTodoListForm and CreateTodoItemForm could probably just be an EditableField now.

## Getting running
- Open solution with Visual Studio and start API and UI projects.
- Browser: http://localhost:56093

## Changing things
- nodejs is needed. I have v8.9.4.
- `cd` to ReactJumpstart.UI directory.
- `npm install`
- If you make changes to files in _src you'll need to run `npm run build` to update the files that are served by the UI project.

