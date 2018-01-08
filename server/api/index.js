'use strict'
const apiRouter = require('express').Router()
const db = require('../db')
const { Company, User, Project } = require('../db/models');

const userRoute = require('./userRoute');
const companyRoute = require('./companyRoute');
const projectRoute = require('./projectRoute')
const authRoute = require('./auth');

apiRouter.use('/projects', projectRoute)
apiRouter.use('/companies', companyRoute)
apiRouter.use('/users', userRoute)
apiRouter.use('/auth', authRoute)



// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!




	apiRouter.get('/hello', (req, res) => res.send({hello: 'world'}))

	apiRouter.use((req, res, next) => {
		res.status(404).send('Not found');
	});

// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the apiRouters you create

module.exports = apiRouter;
