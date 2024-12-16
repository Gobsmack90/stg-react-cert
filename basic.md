-Class Components: My app does not feature any class components currently, but previous branches do. This is a less commonly used feature of react these days because hooks give you pretty much any functionality you'd need from class components. They were more boilerplate-y and I'm glad to not have to write them anymore.

-This keyword: I don't use this anywhere in my app. arrow functions make it so it's much easier to write code without needing to mess with this. This was also used in class functions to reference the object itself and needed to be passed along for state management.

-Reduce array function: This never came up as a function I needed to implement. Honestly, It's not one I've ever needed to use very often in my programming. Map and Filter are way more common. several use cases for reduce can be found here: https://www.freecodecamp.org/news/reduce-f47a7da511a9/ none of those fit my apps needs.

--Hooks

-useRef: Refs let a component hold some information that isn’t used for rendering, like a DOM node or a timeout ID. Unlike with state, updating a ref does not re-render your component.

-useMemo: lets you cache the result of an expensive calculation.

-useCallback: lets you cache a function definition before passing it down to an optimized component.

-useId: lets a component associate a unique ID with itself. Typically used with accessibility APIs.
