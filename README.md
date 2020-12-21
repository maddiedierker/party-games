## run locally

```javascript
nvm use 11.4
npm install

// start localhost
npm start

// build
npm run build
```

## components

- Player
  - properties: username, position
- Playspace
  - runs its own render cycle
  - renders environment
  - renders all players
  - detects collisions?
  - re-renders itself
- PubSub
  - subscribe to channels
  - publish messages to channels
  - each room has its own channel
- UIElement
  - object prototype for UI elements to extend
- UI
  - renders UIElement children to the DOM and applies styles

## comments

```javascript
/////////////////////////////////////////////////////////////
////// SECTION COMMENTS LOOK LIKE THIS
/////////////////////////////////////////////////////////////
```
