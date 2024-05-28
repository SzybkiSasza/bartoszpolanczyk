# Bartosz Polanczyk

My personal website code!

## Background

Around 2012 I bought my own domain to create my own website - for showing both my programming skills. Immediately after, 

I released the first version - lacking both skills and initiative - that consisted mostly of dancing banana that was perfectly responsive:

![Banana](https://media.giphy.com/media/IB9foBA4PVkKA/giphy.gif)

## Technologies

As I am a Full Stack JS/NodeJS developer, I wanted to use technologies that I know the best. Hence, this repository is both base for Web Server, written in NodeJS 8.x + ExpressJS and ReactJS (I use both Angular 5/6 and React on a daily basis, but prefer React for small projects).

#### Landing Page

As I love retrogaming and own more than 15 retrosystems (Including a lot of Sega, Nintendo and Sony consoles), I decided to create it in the way that resembles Arcade machine welcome screen.

All of the code is written without using any external libraries of helpers - not because I'm strongly against using them, but because I wanted to make it a challenge (as long as they make your tasks simpler - use them!).

In order to achieve `retro` feeling, I used a lot of `setTimeout`s - simple to use and get their job done. Most of them are random, in order to achieve "random" look - all the events on the screen are following specific rules, but occur at random points in time.

In order to achieve washed-out "electron cannon" look, I overlayed welcome screen with two layers - one simulating scanlines and another one simulating light bleed on the edges.

The header itself is randomly moved (with three accompanying shadows - `red`, `blue` and `green`) and transformed (`skew` + `scaleX` + `scaleY`).


