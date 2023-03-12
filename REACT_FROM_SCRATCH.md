# React from Scratch

## Node and NPM

Using the following link, install NPM onto your computer.

* [Node JS](https://nodejs.org/en/download/)

## Make a Project Directory

On your computer, make the following directories in your home folder:

* Projects
* Projects/e2e-web-example-react

### Using your Terminal to do so (on a Mac)

```shell
mkdir -P ~/Projects/e2e-web-example-react
```

## Install Visual Studio Code

* [VS Code](https://code.visualstudio.com/download)

1. Open Visual Studio Code.
2. On the top menu, open the directory you created above.
3. On the left panel, click the 'extensions' icon (a four square box with the upper-right separated).
4. Search for the following extensions and install them:
    * Go
    * React Native Tools
5. Open the terminal
    * Create the following directories
    * `mkdir go`
    * `mkdir react`
6. Initialize the Go project
    * `cd go`
    * `go init e2eweb`
    * `go install github.com/gin-gonic/gin`
7. Initialize the react project
    * `cd ~/Projects/e2e-web-example-react/react`
    * `npx create-react-app .`
8. Add some useful libraries
    * `npm install recoil` - State Management
    * `npm install @mui/material @emotion/react @emotion/styled @mui/icons-material` - UI Components

> Now you're ready to develop, you have a new project ready to go.



