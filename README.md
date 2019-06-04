

# MindCast-Server [![Build Status](https://travis-ci.org/steniowagner/mindcast-server.svg?branch=master)](https://travis-ci.org/steniowagner/mindcast-server) [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/steniowagner/mindcast-server/blob/master/LICENSE)


This is the back-end of the [MindCast App](https://github.com/steniowagner/mindCast). 

It's a RESTful API built with NodeJS + Express + MongoDB that receive all the data related with authors and podcats and record/provide to the client all this data through a REST API. 

The main purpose of this API is stream audio files, podcasts were selected by me just to give some context to the app. So, you can reuse all this code to upload/stream a audio (just tested with .mp3) file and use inside your own context (music app, your own podcasts or whatever!).

## About this Project

This project is part of my personal portfolio, so, I'll be happy if you could provide me any feedback about the project, code, structure or anything that you can report that could make me a better developer!

  
Email-me: stenio.wagner1@gmail.com

  

Connect with me at [LinkedIn](https://www.linkedin.com/in/steniowagner/)

  

Also, you can use this Project as you wish, be for study, be for make improvements or earn money with it!

  

It's free!

## Getting Started

### Prerequisites

To run this project in the development mode, you'll need to have a basic environment with NodeJS 8+ installed. To use the database, you'll need to have MongoDB installed and running on your machine at the default port (27017).

### Installing

**Cloning the Repository**

```
$ git clone https://github.com/steniowagner/mindcast-server

$ cd mindcast-server
```

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

### Running the Development environment

Now, you'll need to change to development branch:
```
$ git checkout development
```

With all dependencies installed, the Database running and the environment properly configured, you can now run the server:

```
$ yarn dev
```

_or_

```
$ npm run dev
```

### Running the Tests

```
$ yarn test
```

_or_

```
$ npm run test
```

### Running the Tests + Coverage

```
$ yarn test:coverage
```

_or_

```
$ npm run test:coverage
```

## Routes

The base URL is: http://localhost:3001/mind-cast/api/v1/

### Test Route

- **This is the route that you can use to check if the API is running properly.**

> http://localhost:3001/mind-cast/api/v1/

| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| / | `GET`  | - | - |**Code:** 200 - OK<br />**Content:** `{ message:  "UHUL! The API is UP && RUNNING!" }`  |  **Code:** 500 - INTERNAL SERVER ERROR <br />**Content:** `{ error:  <A Message with a description of the Error> }`|

### Home

- **Returns a set of of podcasts and authors based on the categories selected by the user.**

*EX*:

> http://localhost:3001/mind-cast/api/v1/home?categories=all

> http://localhost:3001/mind-cast/api/v1/home?categories=science&categories=history

| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /home| `GET`  |-|`categories:` [Category](#category)|**Code:** 200 - OK<br />**Content:** <br />`{`<br /> `hottestPodcasts:` [[Podcast](#podcast)],<br />`newReleases`: [[Podcast](#podcast)],<br />`trendingAuthors`: [[Author](#author)]<br />`}`|<br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  <A Message with a description of the Error> }`

### Category

- **Returns the podcasts and authors related with the category.**

*EX*:

> http://localhost:3001/mind-cast/api/v1/categories/science

> http://localhost:3001/mind-cast/api/v1/categories/philosofy

| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /categories/:category| `GET`  |`category:` [Category](#category)|-|**Code:** 200 - OK<br />**Content:** <br />`{`<br /> `featured:` [[Podcast](#podcast)],<br />`trending`: [[Podcast](#podcast)],<br />`authors`: [[Author](#author)]<br />`}`|<br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  <A Message with a description of the Error> }`

### Authors

- **Upload a podcast**

> http://localhost:3001/mind-cast/api/v1/authors/:id/podcasts

For this request, you'll need to send the .mp3 file and all the [Podcast](#podcast) data. If you don't know how to send a file using a http client tool, here's an example of how to do it with [Postman](https://www.getpostman.com/).

![Preview-Screens](https://github.com/steniowagner/mindcast-server/blob/master/assets/upload-file-postman.png)

> Don't forget to send the fields of the [Podcast](#podcast) that are described on the image!
<br />

| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /authors/:id/podcasts | `POST`  | id | - |**Code:** 201 - CREATED <br />**Content:** `{` <br /> podcast: [Podcast](#podcast)<br /> `}` |  **Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  <A Message with a description of the Error> }`
<br />

- **Create an author**

> http://localhost:3001/mind-cast/api/v1/authors

| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /authors | `POST`  | [Author](#author) | - |**Code:** 201 - CREATED <br />**Content:** `{ id: <ID of the Author Created> }`  |  **Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  <A Message with a description of the Error> }`
<br />

- **Get all authors**

> http://localhost:3001/mind-cast/api/v1/authors

| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /authors| `GET`  |-|-|**Code:** 200 - OK<br />**Content:** <br />`{`<br /> `authors:` [[Author](#author)],<br />`}`|<br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  <A Message with a description of the Error> }`
<br />

- **Get a single author**

> http://localhost:3001/mind-cast/api/v1/authors/:id

| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /authors/:id| `GET`  |id|-|**Code:** 200 - OK<br />**Content:** <br />`{`<br /> `author:` [Author](#author),<br />`}`|**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Author not found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  <A Message with a description of the Error> }`
<br />

- **Update an Author**

> http://localhost:3001/mind-cast/api/v1/authors/:id

| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /authors/:id | `PATCH`  | **Required:**<br />`Fields that will be updated`<br /><br />|id|**Code:** 200 - OK<br />**Content:** <br />`{`<br /> `author:` [Author](#author)<br />`}`  |**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Restaurant Not Found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  <A Message with a description of the Error> }`
<br />

- **Delete an Author**

> http://localhost:3001/mind-cast/api/v1/authors/:id


| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /author/:id | `DELETE`  | id| - |**Code:** 204 - NO CONTENT<br />|**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Author not found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  <A Message with a description of the Error> }`
<br />

- **Filter by name**

*EX*:

> http://localhost:3001/mind-cast/api/v1/authors/filter?name=stark

| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /authors/:id| `GET`  |id|-|**Code:** 200 - OK<br />**Content:** <br />`{`<br /> `author:` [Author](#author),<br />`}`|**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Author not found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  <A Message with a description of the Error> }`
<br />

### Podcasts

- **Get all podcats**

> http://localhost:3001/mind-cast/api/v1/podcasts

| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /podcasts| `GET`  |-|-|**Code:** 200 - OK<br />**Content:** <br />`{`<br /> `podcasts:` [[Podcast](#podcast)],<br />`}`|<br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  <A Message with a description of the Error> }`
<br />

- **Get a single podcast**

> http://localhost:3001/mind-cast/api/v1/podcasts/:id

| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /podcasts/:id| `GET`  |id|-|**Code:** 200 - OK<br />**Content:** <br />`{`<br /> `podcast:` [Podcast](#podcast),<br />`}`|**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Podcast not Found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  <A Message with a description of the Error> }`
<br />

- **Stream a podcast file**

> http://localhost:3001/mind-cast/api/v1/podcasts/:id/listen

| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /podcasts/:id/listen| `GET`  |id|-|**Code:** 206 - Partial Content<br />**Content:** <br />`Stream of a podcast audio file`|**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Podcast not Found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  <A Message with a description of the Error> }`
<br />

- **Download a podcast file**

> http://localhost:3001/mind-cast/api/v1/podcasts/:id/download

| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /podcasts/:id/download| `GET`  |id|-|**Code:** 200 - OK<br />**Content:** <br />`Stream of a podcast audio file`|**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Podcast not Found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  <A Message with a description of the Error> }`
<br />


### Models

#### Category
```json
 {
  "enum": "science | technology | philosofy | business | pop-culture | history",
 }
```

#### Author

> *podcasts*: Author's podcasts.

> *categories*: Categories of the Author.

> *name*: Author's name.

> *profileImageURL*: An URL of an image to represent the Author (you can use some image with more than 600 x 400)

> *thumbnailProfileImageURL*:  The same image of `imageURL`, but with a smaller scale (less than (90 x 90))

> *podcasts*: This field isn't required for any request from the user, it will always be sent by the server.

> *about*: A description of the Author.

```json
{
  "podcasts": {
    "type": "[MONGOOSE.SCHEMA.TYPES.OBJECT_ID]",
    "required": false,
    "default": [],
  },
  "categories": {
    "type": "[Category]",
    "required": true,
  },
  "name": {
    "type": "String",
    "required": true,
  },
  "profileImageURL": {
    "type": "String",
    "required": true,
  },
  "thumbnailProfileImageURL": {
    "type": "String",
    "required": true,
  },
  "about": {
    "type": "String",
    "required": true,
  },
}
```

#### Podcast

> *author*: ID of the author.

> "title": Title of the podcast.

> "description": Description of the podcast.

> *imageURL*: An image to represent the podcast (you can use some image with more than 600 x 400)

> *thumbnailImageURL*: The same image of `imageURL`, but with a smaller scale (less than (90 x 90).

> *category*: Category of the podcast.

> *stars*: Stars of the podcast.

> *duration*, *durationInSeconds* and *fileName*: These fields are created and sent by the server after to analyze and parse the uploaded audio file, and aren't required for any request.

```json
{
   "author": {
    "type": "MONGOOSE.SCHEMA.TYPES.OBJECT_ID",
    "required": false,
  },
  "title": {
    "type": "String",
    "required": true,
  },
  "description": {
    "type": "String",
    "required": true,
  },
  "imageURL": {
    "type": "String",
    "required": true,
  },
  "thumbnailImageURL": {
    "type": "String",
    "required": true,
  },
  "category": {
    "type": "Category",
    "required": true,
  },
  "stars": {
    "type": "Number",
    "required": true,
  },
  "duration":  {
   "type":  "String",
  },
  "durationInSeconds":  {
   "type":  "Number",
  },
  "fileName":  {
   "type":  "String",
  }
}
```

## Built With

- [NodeJS](https://nodejs.org/en/) - Build the server
- [Heroku](https://www.heroku.com/) - PaaS used in the production
- [TravisCI](http://travis-ci.org) - CI + CD
- [body-Parser](https://github.com/expressjs/body-parser#readme) - Node.js body parsing middleware
- [express](https://expressjs.com/) - Router of the Application
- [MongoDB](https://www.mongodb.com/) - Database
- [mongoose](https://mongoosejs.com/) - Object Modeling + DB Connector
- [nodemon](https://nodemon.io/) - Process Manager used in the development
- [dotenv](https://github.com/motdotla/dotenv) - Environment loader
- [multer](https://github.com/expressjs/multer) - File Upload
- [gridFS-Stream](https://github.com/aheckmann/gridfs-stream) - Store and stream data from Database
- [mp3-Duration](https://github.com/expressjs/multer) - Get the duration of the .mp3 files uploaded
- [eslint](https://eslint.org/) - JS Linter and code style
- [JEST](https://jestjs.io/) - Tests
- [superagent-binary-parser](https://www.npmjs.com/package/superagent-binary-parser) - Parse binary response stream
- [coveralls](https://github.com/nickmerwin/node-coveralls) - Test coverage
- [faker](https://github.com/Marak/Faker.js) - Create fake data for tests
- [prettier](https://github.com/prettier/prettier) - Code formatter
- [super-test](https://github.com/visionmedia/supertest) - Test HTTP requests
- [husky](https://github.com/typicode/husky) - Git hooks
- [lint-staged](https://github.com/okonet/lint-staged) - Run linters on git staged files

## Support tools

- [Image-Resize](https://imageresize.org) - Resize the Images
- [Amazon S3](https://aws.amazon.com/pt/s3/) - Storage Service

## Contributing

You can send how many PR's do you want, I'll be glad to analyse and accept them! And if you have any question about the project...

Email-me: stenio.wagner1@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/steniowagner/)

Thank you!

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/steniowagner/mindcast-server/blob/master/LICENSE) file for details.
