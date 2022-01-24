## [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

### The basic approach for implementing a web component:
1. Create a class in which you specify your web component functionality
2. Register your new custom element using the `CustomElementRegistry.define()` method, passing it the element name to be defined
3. Attach a shadow DOM to the custom element using `Element.attachShadow()` method. Add child elements, event listeners, etc, to the shadow DOM using regular DOM methods
4. If required, define an HTML template using `<template>` and `<slot>`. Again use regular DOM methods to clone the template and attach it to your shadow DOM
5. Use your custom element whereever you like on your page, just like you would any regular HTML element



### Life cycle callbacks
- `connectedCallback`: Invoked when the custom element is first connected to the document's DOM
- `disconnectedCallback`: Invoke when the custom element is disconnected from the document's DOM
- `adoptedCallback`: Involked when the custom element is moved to a new document
- `attributeChangedCallback`: Involked when one of the custom element's attributes is added, removed or changed
