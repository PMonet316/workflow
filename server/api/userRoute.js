'user strict'

const express = require('express')
const router = express.Router()
const { Company, User, Project } = require('../db/models');
const db = require('../db')

// const userRoute = require('./userRoute');
const projectRoute = require('./projectRoute');
const companyRoute = require('./companyRoute')


//POST a new user
router.post('/', (req, res, next) => {
  return User.create(req.body)
    .then(user => res.json(user))
    .catch(next);
});

	// //GET all users
	router.get('/', (req, res, next) => {
		User.findAll()
		.then(users => res.json(users))
		.catch(next);
	});


  //GET all users with an officer title
  router.get('/officer', (req, res, next) => {
    User.findAll({where: {title: "Treasury Solutions Officer"}})
    .then(user => res.json(user))
    .catch(next);
  });

	//GET a user by Officer title and personId
	router.get('/officer/:personId', (req, res, next) => {
		User.findOne({where: {personId: req.params.personId}})
		.then(user => res.json(user))
		.catch(next);
  });



  //GET a all users by with an Analyst title
  router.get('/analyst', (req, res, next) => {
		User.findAll({where: {title: "Treasury Solutions Analyst"}})
		.then(user => res.json(user))
		.catch(next);
  });

  //GET a user by Analyst title and personId
	router.get('/analyst/:personId', (req, res, next) => {
		User.findOne({where: {personId: req.params.personId}})
		.then(user => res.json(user))
		.catch(next);
  });

  //GET a all users by with an Manager title
  router.get('/manager', (req, res, next) => {
    User.findAll({where: {title: "Treasury Manager"}})
    .then(user => res.json(user))
    .catch(next);
  });

  //GET a user by Manager title and personId
  router.get('/manager/:personId', (req, res, next) => {
    User.findOne({where: {personId: req.params.personId}})
    .then(user => res.json(user))
    .catch(next);
  });


  //PUT (update) user with Analyst Title
  router.put('/manager/:personId', (req, res, next) => {
    return User.update(req.body, {
      where: { personId: req.params.personId },
      returning: true,
      plain: true
    })
    .then(([numRows, updatedRows]) => {
      res.json(updatedRows[0]);
    })
    .catch(next);
  });



  router.delete('/:userId', (req, res, next) => {
    return User.destroy({
      where: {
        id: req.params.userId
      }
    })
    .then(affectedRows => res.status(200).json(affectedRows))
    .catch(next);
  });



module.exports = router;
