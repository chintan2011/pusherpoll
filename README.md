# pusherpoll
real time polling app for team building activities

Follow the steps to configure this app to run your machine with your own mongoDB and list of team building activities
1. Under config/db.js, on line 7 in mongoose.connect('') add your mongoDB cluster url with username and password
2. Delete node_modules folder from the dir
3. Now from the pusherpoll dir run 'npm install', a new node_modules dir will be created for your system

To Run
1. run 'npm run dev | start' to run dev or start module defined in package.json