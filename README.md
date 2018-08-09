## WDI 34 Project 3 - Tall Man Records
### A MEAN Stack App
##### by Richard Tzanov and Martin Koeoep
---

<p align="left"><img src="https://i.imgur.com/yBMRRRS.png" width="1000"></p>

#### Overview
Tall Man Records is an app for users to trade records with each other. Users can upload their own collections, views other users' collections and comment on and review records. The main function allows users to make offers on other records by offering their own. Users can send messages to each other and track the status of each of their trades. Once the trade has been completed, the the owners of the records are swapped in the database.   

The app is deployed on [Heroku ](https://tallman-records.herokuapp.com/)

#### Technologies used

||||
|--- |--- |--- |
|AngularJS|JavaScript(ECMAScript6)|SCSS|
|GitHub|Bulma|MongoDB|
|Node.js|Express.js|Webpack|
|Mocha|Yarn|filestack-js|
|satellizer|bluebird|
|body-parser|file-loader|bcrypt|

#### Build process

We began the project by using draw.io to create wireframes that would map out all the basic views for the website and also give an outline of the user journey - this included a user registering and going from the records index page to a specific record, making an offer on that record and tracking the status of it on their own profile page.

We then set up a Trello board, listing out all the tasks we could think of and assigning them colours depending on whether they were front-end or back-end, and also whether they were essential to the core functionality of the app, or extra features we wanted to add in later if there was time. Once that had been created, it was easy to assign tasks and see what each of us was working on, even when we were not working in the same location.

<p align="left"><img src="https://i.imgur.com/mTUW8lT.png" width="1000"></p>

Once we had planned things out as much as we could, we began coding the back end, testing as we went along. Initially, our models and controllers were relatively simple, but grew in complexity as we added functions such as user requests for records. Having the record model, user model and request model all interact required a lot of work on the back end and led to some challenges, which are discussed below. One example of this can be seen here, where we had to pull a lot of information together on the user model to make the core functionality of the app work.

<p align="left"><img src="https://i.imgur.com/bPQByZL.png" width="1000"></p>

With the back end foundations in place, we were able to start on the front end, where we were working with AngularJS for the first time. The process for registering a user, adding a record to the collection, showing that record and editing its information was all relatively simple. The things we spent the most time on were making the request system work, which involved users being able to add their own records to an offer array, send that offer to the database, have it associated with the user, then for the other user to see that offer, respond to it, etc. For the majority of this work, we pair-programmed, which helped significantly both for problem-solving and for making sure that we both knew what was going on.

<p align="left"><img src="https://i.imgur.com/KKVbnl5.png" width="700"></p>
<p align="left"><img src="https://i.imgur.com/M872tAH.png" width="1000"></p>

This is some of the code for when a user wants to edit the offer they've made on the record, and demonstrates the kind of work we were doing in terms of populating arrays and then displaying that information to the user. Probably the most complicated part of the build was working out how to exchange the records in the database once an exchange had been made. This required doing a lot of work on the records controller, finding users and records in the database, iterating through them and swapping the owner IDs. It resulted in some quite convoluted code that isn't particularly pretty to look at, and was similar to some of our other approaches to the build, which was to find a round the problem, even if sometimes that meant overengineering it.

<p align="left"><img src="https://i.imgur.com/b7ObCgH.png" width="1000"></p>

Overall, the build process was relatively smooth and we were happy with what we achieved in a short space of time, and we learnt a lot about planning, what's essential to a project, the benefits of pair-programming and making sure in future that our models are well thought-out. We were also very happy to have a back-end test suite that covered more than 91% of lines of code.

#### The user experience

Once a user is registered they can start adding records to their collection, view their profile, view all the records in the database, search that database, view a specific record, comment on and rate that record, view other users' profiles, comment on and rate the user, view the user's records and make an offer on another user's records.

<p align="left"><img src="https://i.imgur.com/Hs1O4fQ.gif" width="1000"></p>

**Making an offer** The core part of Tall Man Records is being able to make an offer on another user's records and trading records. Once a user clicks on Make an Offer, they are taken to a page where they can see the album details, along with details of the user offering it. They can search their own records and add them to the offer simply by clicking on the record. They can then remove the record from the offer if they change their mind by clicking on it again. They can also write a message as part of the offer. Once they have decided on what records they want to offer, they make a request and are redirected to their profile page. There they can see all the offers that they've made, edit the offer or delete it.

<p align="left"><img src="https://i.imgur.com/hlSRw9y.gif" width="1000"></p>

**Accepting an offer** When the user who has had an offer made on their record goes to their profile, they can see the offers that they have received. They can then either accept or decline the offer. Once they have accepted the offer, the status of the trade changes and the users can let each other know when they have sent and received their records.

<p align="left"><img src="https://i.imgur.com/m2vakjQ.gif" width="1000"></p>

**Making the trade** Once a user has sent their record(s), the button for the other user changes to say `Records received`. Once both users have confirmed that they have received their records, the user who has accepted the initial offer is able to select `Swap records`. This swaps the users' records in the database and the trade is complete.  

<p align="left"><img src="https://i.imgur.com/qxTgN9x.gif" width="1000"></p>

**Messaging** Users are also able to message each other to exchange addresses and other details.


#### Challenges

The biggest problem we faced was in making the separate models work and communicate with each other. If we were to do the project again, this is something we would fundamentally rethink and redesign because things became exponentially more complicated and convoluted the more we tried to add in terms of functionality. It led to code such as this:

<p align="left"><img src="https://i.imgur.com/RNcUrXU.png" width="700"></p>

as well as some of the overly complex code documented above. Our approach throughout was to pair-program, which helped a lot with getting the work done and finding solutions, but also led to a tendency for us to find the solution to a problem and then move on immediately to the next task, rather than asking ourselves whether we had really found the best solution and refactored as much as we could.

Also, this was the first project that either of us had attempted of this kind of scope, so there was an initial challenge of planning through all the steps that were required, how best to use our time, and which parts were absolutely necessary for getting the apps to function, and which were distractions that we didn't need to focus on.

Working with AngularJS was enjoyable, but also presented some problems in terms of learning how to display the data correctly once it a request had been made. It meant becoming familiar with a lot of `ng-repeat` statements in a short period of time!

In terms of the front-end build, the two biggest challenges were the offers array and making certain buttons appear depending on the status of the trade. Both of these tasks took up a relatively large amount of time, but we were quite happy with the solutions we came up with in the end.

This code shows the heavily refactored function that handles all the different statuses and buttons that appear during the trade:

<p align="left"><img src="https://i.imgur.com/aZ7VzpO.png" width="700"></p>

#### What's next
There were various features we would like to add to the project if we go back to it. Foremost would be to use the Discogs API to autocomplete the artist names and album titles to avoid user errors and to formalise the data entering the database. We would also like to make every part of the trading system update automatically - at the moment, users have to refresh the page in order to be notified that another user has sent their records. Finally, we would like to add a proper live messaging system between users, as the current setup is, in reality, more like forum messaging. 
