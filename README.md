# task-tracker
## Requirements:
* Docker
* Docker compose

---
or, if you want to play with it locally:

* Node.js 16.14.2
* npm

## How to:
### Prerequisites
* Get a running instance of [the backend server](https://github.com/smthngslv/task-tracker-backend).
  The URL of backend is used as the value of `API_ROOT` below.
### Docker (production mode)
1. Uncomment and set proper `API_ROOT` in [docker-compose.yml](docker-compose.yml)
2. Run `docker compose up -d` to launch the project
3. Open ![http://localhost:8080](http://localhost:8080) in your browser

### Local installation (development mode only)
1. Install dependencies with `npm install`
2. Set the `API_ROOT` environment variable to a desired value
3. Run the project in development mode with `npm start`
4. Open ![http://localhost:8080](http://localhost:8080) in your browser
