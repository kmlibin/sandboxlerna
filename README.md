# Sandbox project

The frontend of this project is made with React and Redux, and it is a code sandbox.  With the help of Redux, you can add, delete, and edit "code" or "text" cells, the latter being markdown, and you can rearrange those cells anywhere on the screen. Data persists between renders, and you can even save your data to a file on your computer. The project utilizes esbuild to transpile and bundle code, and there is a plugin that intercepts import statements and uses unpkg.com to provide access to the npm javascript library. Localforage is used so that more code can be stored, which then allows for quicker load times (especially when re-using code).

Once you download the code, you can run npm start and run it locally - if you go into packages/cli/dist, you can run node index.js serve, and it will start on localhost:4005 (running with a proxy). This course also showed me how to publish on npm registry, but I didn't want to publish this project.

This project has three distinct folders in "packages": CLI, local-api, and local-client. We set up a cli so that the user can run commands  from the terminal, with arguments of port and place to load/save a file; cli has local-api as a dependency, which in turn has local-client as a dependency (thanks lerna and commander!). You can make FETCH and POST requests to the local-api, therefore persisting your data.

### Languages / Libraries / Other Tools

React, JavaScript, TypeScript BulmaCSS, HTML

localforage, axios, esbuild, unpkg, monaco editor, monacoJSX highligher, jscodeshift, react-resizable, react-md-editor, immer, font awesome, lerna, commander, express
    

### What I learned / Challenges

I was interested to complete course and this project because I thought it sounded interesting and like something I wouldn't normally do. I actually really enjoyed seeing how the developer thought through creating the project, and I learned a lot simply because (as I said), this isn't something that I would have thought to do on my own. This project introduced me to several new libraries; while learning new libraries is always helpful, it's actually just helpful to go through the process of learning about/consuming a new library. I find that it helps me to better consume unfamiliar libraries in the future. 

Understanding esbuild was huge for me. Perhaps sadly, I had never thought about why a code needs to be transpiled and bundled...it was also helpful to understand the plugin for it, and how to intercept import statements to send off to unpkg.com. This entire process is really just something that I had never approached before, so it was cool to learn more about what happens behind the scenes. 

The React/Redux side of the project was fairly straightforward, though it had been a minute since I'd worked with just Redux and not RTK. One of the more interesting parts of the frontend was working with iframes, which also helped me understand more about how parent/child elements work in the DOM. The Monaco Editor was also a cool tool, as was Resizable...though, I think at this point I've mentioned just about all of the components that came from libraries, so...maybe I just think everything is cool. 

This was my first, and unexpected, foray into Lerna and CLI stuff, and it's definitely something to continue practicing so I can better understand it. I've never really gotten into anything even slightly fullstack (excluding headless CMS backends), and it was helpful to see how Lerna goes about connecting everything as dependencies. It did get a bit confusing sometimes trying to remember how everything worked together...which file I needed to reference, where certain entry-points were...and I'm still not entirely clear on Express. This is all something I plan to continue working on, and I've already been reading docs, watching videos, and signing up for more backend focused courses. 