# Fun with redux!

## Candidates notes

This fork solves the challenges discussed below, but also includes a cookie-clicker esque game. The rules are as follows:

- Collect credits (click the lightsabers), buy new characters, and load them up into ships to your hearts desire.
- Character value is based on their _mass_, and generate credits based on their _height_.
- Starships with crew members inside, multiply the credits generated by characters by the ships _maximum atmospheric speed_.

The accumulated credits are saved to LocalStorage, however the owned characters and spaceships are not.

Furthermore, Redux Dev Tools is wired up.

Finally, the included Dockerfile runs through [pm2](http://pm2.keymetrics.io/) and exposes to 3008. This is under the assumption that a reverse proxy running on the host or in another container will pick the port up.
PM2 can be inspected using the following commands (from the PM2 documentation):

- **Monitoring CPU/Usage of each process**\
  `docker exec -it <container-id> pm2 monit`
- **Listing managed processes**\
  `docker exec -it <container-id> pm2 list`
- **Get more information about a process**\
  `docker exec -it <container-id> pm2 show`
- **0sec downtime reload all applications**\
  `docker exec -it <container-id> pm2 reload all`

### Building / Deployment

- `git clone <repository-url>` this repository
- `cd fun-with-redux`
- `docker build -t <app name> .`
- `docker run -p <host port>:3000 <app name>`

## Getting started

`yarn install`

`yarn start-next`

Then open http://localhost:3008/ in your browser

(\* npm also works, but yarn is faster)

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
4. Rewrite the existing `onChooseEndpoint` action creator to cache data, instead of fetching it every one changes endpiont
5. Make more changes - use your imagination!
