# Bartosz Polanczyk

My personal website code!

## Background

Around 2012 I bought my own domain to create my own website - for showing both my passions and programming skills. Immediately after, 

I released the first version - lacking both skills and initiavite - that consisted mostly of dancing banana that was perfectly responsive:

![Banana](https://media.giphy.com/media/IB9foBA4PVkKA/giphy.gif)

As I'm finally feeling confident enough to create something of my own, I'm releasing this website :smiley:

## Technologies

As I am a Full Stack JS/NodeJS developer, I wanted to use technologies that I know the best. Hence, this repository is both base for Web Server, written in NodeJS 8.x + ExpressJS and ReactJS (I use both Angular 5/6 and React on a daily basis, but prefer React for small projects).

### Challenges

I tried to keep this website as configurable and robust as possible, maintaing compatibility at the same time. In order to achieve that, I used [Create React App](https://github.com/facebook/create-react-app) as the base for front end and NodeJs + Express for the back end.

In order to guarantee that my code is consistent, I introduced Typescript to both Front End and Back End - I personally didn't like it for many years, but after using it professionally for more than a year, I am convinced that it adds more benefits than disdvantages to almost any project :smiley:

In order to have full control over FE app I had to `eject` Create React App project and adjust all the paths (so it resides where `I` want, not where it was `designed` to reside). In order to restore build/dev pipelines, I had to modify the code in a few ways. (Unluckily, I ejected one week before Create React App released Webpack 4-compatible version!)

Keeping both Server and Website/Front End configurations in one project occured to be more challenging that I expected. I wanted to keep pipelines in sync, but still have flexibility of having Dev/Production builds. In order to achieve that, I have to maintain two separate sets of Webpack and Typescript configs (check out `config` directory!).

### Web Server - ExpressJS

Code of the server is organized in a conventional structure:

- Controllers
- Models
- Main router/Express bootstrap file
- Helpers

### Website - React

Based on Create React App, I started from scratch using all the technologies, polyfills and helpers provided by the platform.

I decided to use pure CSS and ES2017 in the code (as I **LOVE** `async/await` and its simplicity).

#### Landing Page

As I love retrogaming and own more than 15 retrosystems (Including a lot of Sega, Nintendo and Sony consoles), I decided to create it in the way that resembles Arcade machine welcome screen.

All of the code is written without using any external libraries of helpers - not because I'm strongly against using them, but because I wanted to make it a challenge (as long as they make your tasks simpler - use them!).

In order to achieve `retro` feeling, I used a lot of `setTimeout`s - simple to use and get their job done. Most of them are random, in order to achieve "random" look - all the events on the screen are following specific rules, but occur at random points in time.

In order to achieve washed-out "electron cannon" look, I overlayed welcome screen with two layers - one simulating scanlines and another one simulating light bleed on the edges.

The header itself is randomly moved (with three accompanying shadows - `red`, `blue` and `green`) and transformed (`skew` + `scaleX` + `scaleY`).

## Tests

(TODO :star2:)


