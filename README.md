Kebab-Case Kaamelott Videoboard
===============================

Awesome **Kebab-Case Kaamelott Videoboard** is an awesome videoboard for Kaamelott fans.

Current development version accessible here: https://kaamelott-videoboard.dvpt-laz.fr

Features
--------

**Kebab-Case Kaamelott Videoboard** provides the following features:

- Fulltext search (characters, episodes, script and keywords)
- Large Kaamelott video memes database
- Sharing (link / embed code)
- Feature 4

Installation
------------

### Step 1: Simply enter following command in your terminal

```bash
$ make [command]
```

Dependencies
------------

**Kebab-Case Kaamelott Videoboard** requires the following dependencies:

- Docker
- Docker-compose
- Make
- Node.js
- Sass
- Yarn

### Node.js

#### Install Node.js (Linux)

On linux machine install node globally with the following commands (requires curl):

```bash
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ sudo apt-get install --assume-yes nodejs
```

#### Install Node.js (Windows)

Download and install recommended LTS version from here: [Node.js](https://nodejs.org/en)

### Yarn

#### Install Yarn (Linux)

On linux machine install yarn globally with the following commands (requires curl):

```bash
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
$ sudo apt-get update
$ sudo apt-get install --assume-yes yarn
```

#### Install Yarn (Windows)

Download and install latest version from here: [yarnpkg.com](https://classic.yarnpkg.com/en/docs/install/#windows-stable)

### Make

#### Install Make (Linux)

On linux machine enter following command

```bash
$ sudo apt-get install --assume-yes make
```

#### Install Make (Windows)

On windows machine you will need to install [cygwin](http://www.cygwin.com/) or [GnuWin make](http://gnuwin32.sourceforge.net/packages/make.htm) first to execute make script.

### Docker

#### Install Docker (Linux)

On linux machine enter following command

```bash
$ sudo apt-get install --assume-yes docker.io
```

#### Configure Docker (Linux)

Add current user to docker group

```bash
$ sudo usermod -a -G docker ${USER}
```
> You will need to log out and log back in current user to use docker

#### Install Docker (Windows)

Download docker installer

- [https://download.docker.com/win/static/stable/x86_64/docker-17.09.0-ce.zip](https://download.docker.com/win/static/stable/x86_64/docker-17.09.0-ce.zip)

#### Install Docker (OSX)

Download docker installer

- [https://download.docker.com/mac/static/stable/x86_64/docker-19.03.5.tgz](https://download.docker.com/mac/static/stable/x86_64/docker-19.03.5.tgz)
- [https://download.docker.com/mac/beta/Docker.dmg](https://download.docker.com/mac/beta/Docker.dmg)

### Docker Compose

#### Install Docker Compose (Linux)

On linux machine you will need curl to install docker-compose with the following commands

```bash
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m`" -o /usr/bin/docker-compose
$ sudo chmod uga+x /usr/bin/docker-compose
$ sync
```

Usage
-----

Run `make` to print help

```bash
$ make [command] port=[port] 
```

Valid commands are: help up install serve tests lint build deploy uninstall yarn-install vue-cli-install

Commands
--------

#### help:
```
$ make help:
```
Print this help

### Vue
#### up:
```
$ make up:
```
Install and serve locally

#### install:
```
$ make install:
```
Install dependencies

#### serve:
```
$ make serve:
```
Serve with hot reload at localhost

#### tests:
```
$ make tests:
```
Run unit tests

#### lint:
```
$ make lint:
```
Lint and fix files

#### build:
```
$ make build:
```
Build for production with minification

#### deploy:
```
$ make deploy:
```
Deploy to gh-pages

#### uninstall:
```
$ make uninstall:
```
Uninstall app

### Yarn Install Local Env
#### yarn-install:
```
$ make yarn-install:
```
Install yarn

#### vue-cli-install:
```
$ make vue-cli-install:
```
Install vue-cli

Continuous Integration
----------------------

[![Build Status](https://travis-ci.org/flazzarotto/kaamelott-videoboard.svg?branch=master)](https://travis-ci.org/flazzarotto/kaamelott-videoboard) 
If you find any bug please report here : [Issues](https://github.com/flazzarotto/kaamelott-videoboard/issues/new)

License
-------

Copyrights (c) 2020 &quot;Fabrice Lazzarotto&quot; &lt;fabrice.lazzarotto@gmail.com&gt;

[![License](https://img.shields.io/badge/Licence-MIT-green.svg)](LICENSE)
Distributed under the MIT license.

If you like **Kebab-Case Kaamelott Videoboard** please star, follow or tweet:

[![GitHub stars](https://img.shields.io/github/stars/flazzarotto/kaamelott-videoboard?style=social)](https://github.com/flazzarotto/kaamelott-videoboard/stargazers)
[![GitHub followers](https://img.shields.io/github/followers/Flazzarotto?style=social)](https://github.com/Flazzarotto)
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2FFlazzarotto%2Fkaamelott-videoboard)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2FFlazzarotto%2Fkaamelott-videoboard)

... And check my other cool projects.

[![LinkedIn](https://img.shields.io/static/v1?style=social&logo=linkedin&label=LinkedIn&message=morinmatthias)](https://www.linkedin.com/in/morinmatthias)
