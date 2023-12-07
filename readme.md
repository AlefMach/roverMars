# Mars Rover Navigation System

![](/static/rover.jpeg)

# Mars Rover Simulator

## Overview

Welcome to the Mars Rover Simulator, a Node.js application built with TypeScript that simulates the movement of a rover on the Martian surface. The rover receives coordinates based on a Cartesian plane and provides real-time updates on its current location.

## Requirements

- Node.js v21.3.0
- npm v8.5.1
- Docker and Docker Compose v3.8

## Getting Started

1. **Installation:**

   Make a file called .env using the file .env-sample as an example.

   ```bash
   cp .env-sample .env
   ```

   If you have make installed on your machine, first you can run:

   ```bash
   make build
   make deps
   ```
   If you don't have it, you can run it manually with Docker Compose:
   ```bash
   docker compose build
   docker compose run --rm rovermars npm install
   ```

   #### Disable ipv6 temporarily

    If your attempt to run docker compose build fails due to timeout problems, try disabling IPv6 temporarily on your computer. If you are using Ubuntu Linux, you can try running this command:

    ```bash
    sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1
    sudo sysctl -w net.ipv6.conf.default.disable_ipv6=1
    ```

    after run command:

    ```bash
    sudo sysctl -p
    ```
    After rebooting, IPv6 will return normally.

2. **Run with Docker Compose or make:**
   ```bash
   make start 
   ## or
   docker-compose up
   ```

3. **Usage:**
   - Create a file anywhere in the project that you think is best (if it is in the root of the project), and then indicate it in the .env in the FILE_PATH variable, if any FILE_PATH is not specified, the path default is './\__tests__\/input_test_data.txt' and then run the command:
    ```bash
   source .env
   ```
    **OBS**: The default search folder will always have the "scripts" folder as a reference, so if you put the file in the root of the project, for example, it should look like this: "../../file_name.txt"


   - The file must contain the following information:
        - The size of the land (from the Cartesian plane), for example: **5 5**
        - The rover's starting point and the side where it should start (N - north, S - south, E - east, W - west), for example: **1 2 E**
        - And finally the rover's movements, it can move just by turning 90 degrees to the right or left, and go forward, symbolized respectively by the letters "RLM", for example: **LMLMLMRLM**
            ```txt
            5 5
            1 2 N
            LMLMLMLMM
            3 3 E
            MMRMMRMRRM
            ```

        - You can also place more than one terrain with several rovers separating it with a dash "-", for example:
            ```txt
                5 5
                1 2 N
                LMLMLMLMM
                3 3 E
                MMRMMRMRRM

                -------------------

                5 7
                1 2 N
                LMLMLMLMM
                3 3 E
                MMRMMRMRRM

                -------------------

                0 0
                1 2 N
                LMLMLMLMM
                3 3 E
                LLLMMLLMR

                -------------------

                0 1
                1 2 N
                LMLMLMLMM
                3 3 E
                MMRMMRMRRM

                -------------------

                0 3
                1 2 N
                LMLMLMLMM
                3 3 E
                MMRMMRMRRM
            ```
   
   - Receive real-time updates on the rover's current location in './response_rover/response.txt'.

4. **Tests**:
    - You can do unit tests by running the command:
    ```bash
   make test
   ## or
   docker compose run --rm rovermars npm test
   ```

5. **Project Structure**:
    The files are separated as follows:

    ```shell
    |-src                      Application source code.
    |---enums                  Folder for searching enumerables.
    |---envs                   Folder for searching environment variables, global variables, etc.
    |---scripts                Folder where the files responsible for the program logic are located, with each file having its own responsibility.
    |---utils                  Responsible for having logic where two or more classes will use the same thing.
    |---index.ts               Where automations is located
    |-__tests__                Application testing source code.
    |-.env-sample              File with environment variables for running the service in the workspace.
    |-docker-compose.yml       Configuration for the containers that run our application and also the tests (for CI), telemetry and database services.
    |-Dockerfile               Configuration for app containers.
    |-Makefile                 Provides the entry point for all the typical commands a developer (or a CI server) might want to run during their normal workflow: make build, make test.
    |-README.md                It is an essential guide that provides other developers with a detailed description of your project.
    |-response_rover           This is where the rover's response will be.
    ```


## Technologies Used

- Node.js
- TypeScript
- Docker
- Docker Compose

## Contributors

- AlefMach

## License

This project is licensed under the [MIT License](LICENSE).

---
