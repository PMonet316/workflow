'use strict'

const express = require('express')
const router = express.Router()
const { Company, User, Project } = require('../db/models');
const db = require('../db')

const userRoute = require('./userRoute');
const projectRoute = require('./projectRoute');
// const companyRoute = require('./companyRoute')



router.post('/', (req, res, next) => {
  return Company.bulkCreate(req.body)
    .then(company => res.json(company))
    .catch(next);
});

  //GET company by company ID
  router.get('/:companyId', (req, res, next) => {
		Company.findOne({where: {companyId: req.params.companyId}})
		.then(company => res.json(company))
		.catch(next);
  });

  //GET all companies
	router.get('/', (req, res, next) => {
		Company.findAll()
		.then(companies => res.json(companies))
		.catch(next);
	});

  //DELETE a company
  router.delete('/:companyId', (req, res, next) => {
    return Company.destroy({
      where: {
        companyId: req.params.companyId
      }
    })
    .then(affectedRows => res.status(200).json(affectedRows))
    .catch(next);
  });




module.exports = router;
