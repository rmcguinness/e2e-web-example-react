# End2End Web App

## Prerequisites

* Install Git
  * Mac: xcode-select --install
  * Linux: sudo apt-get install build-essentials
  * Windows
* [Install Node JS](https://nodejs.org/en/)
* [Install GoLang](https://go.dev/dl/)

## Using your Terminal

Download this project from GitHub
```shell
cd ~

# Create a projects directory IF YOU DO NOT HAVE ONE.
mkdir Projects

# Go into your Projects directory
cd Projects

# Clone the repository

# If you have an SSH key setup
git clone git@github.com:rmcguinness/e2e-web-example-react.git

# If you're using HTTP
git clone https://github.com/rmcguinness/e2e-web-example-react.git

# Once Downloaded, go the e2e-web-example-react directory
cd e2e-web-example-react/go
```

### Start the web service
```shell

# Verify Go is on your path
go version 

# You should see something similar to:
# go version go1.20.1 darwin/amd64

# Start the service
go run ./...
```

The Following output should appear:
```shell
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:	export GIN_MODE=release
 - using code:	gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET    /search                   --> e2eweb/pkg/service.GetResults (4 handlers)
[GIN-debug] POST   /api/db                   --> e2eweb/pkg/service.AddResult (4 handlers)
[GIN-debug] PATCH  /api/db                   --> e2eweb/pkg/service.AddResult (4 handlers)
[GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
[GIN-debug] Listening and serving HTTP on localhost:8088
```

### Start the webapp
Open a second terminal tab using Cmd+T

```shell
# Change to the project directory
cd ~/Projects/e2e-web-example-react/react

# Install the dependencies
npm install

# Start the server
npm start
```

This will open a web browser. The app is very simple, but will demonstrate the how and what of a modern web application.

## Exiting the servers

In each tab, just hit control+C to exit the servers.

## Useful Links

[Google Material React Components](https://mui.com/material-ui/react-text-field/)