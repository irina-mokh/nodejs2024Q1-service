# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Usage

1. Clone Repo  
```git clone https://github.com/irina-mokh/nodejs2024Q1-service.git```

2. Installing NPM modules:  
```npm install```

3. Rename `.env.example` file to `.env`. 
You can change port value in it.
4. Run Docker containers with network:   
```docker compose up```

5. Test application:  
After application running open new terminal and enter:  
To run all tests without authorization  
```npm run test```  
To run only one of all test suites  
```npm run test -- <path to suite>```  
To run all test with authorization  
```npm run test:auth```  
To run only specific test suite with authorization  
```npm run test:auth -- <path to suite>```


6. Run Docker containers with network:  
```docker compose up```

7. Run script for vulnerabilities scanning  
```npm run docker-scan:app ```  
```npm run docker-scan:db ```

8. [Docker hub repo for app](https://hub.docker.com/repository/docker/irinamokh/hls-app/general)

## Run locally  
To run app locally, set POSTGRES_HOST="localhost".
After starting the app locally on port (4000 as default) you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/ (or your custom port value)


## Auto-fix and format

```npm run lint```

```npm run format```

## Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
