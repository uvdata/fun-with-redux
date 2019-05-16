# Fun with redux!
## Getting started
`yarn install`

`yarn start-next`

Then open http://localhost:3008/ in your browser

(* npm also works, but yarn is faster)

## Background
This application was created to show how strong the force is in React and Redux. Use it as example, training, 
learning, or just break it down in pieces and tell us what we did wrong. It uses the Star Wars API, which can be found on http://swapi.co/, to have some data to show.

To use as little boilerplate as possible, the app uses the Next framework (https://github.com/zeit/next.js).

## Challenges
The first two challenges can be solved without having to touch anything in Redux-land. 

1. Make `ItemDisplay` detect what kind of object it has received, and change display based on that
2. Sort the list of items alphabetically
3. The `ItemDisplay` component contains a button that expands or collapses a JSON dump. It does so by holding it's own state.
Rewrite this to use redux. 
4. Rewrite the existing `onChooseEndpoint` action creator to cache data, instead of fetching it every one changes endpoint
5. Make more changes - use your imagination!
