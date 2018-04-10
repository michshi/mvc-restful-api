const model = require('../models/snacks')

function getAll (req, res, next) {
  const data = model.getAll()

  res.status(200).json({ data })
}


function find (req, res, next) {
  const result = model.find(req.params.id)

  if(result === undefined) {
    return next({status: 404, message: `Could not find that snack`})
  }

  if(result.errors) {
    return next({status: 400, message: `The ID is required`})
  }

  res.status(200).json({ data: result })
}


function create (req, res, next) {
  const result = model.create(req.body)

  if (result.errors) {
    return next({ status: 400, message: `Could not create new snack`, errors: result.errors })
  }

  res.status(201).json({ data: result })
}


function update (req, res, next) {
  let result = model.find(req.params.id)

  if (result === undefined) {
    return next({ status: 404, message: `Could not find snack with ID of ${req.params.id}` })
  }

  if (result.errors) {
    return next({ status: 400, message: `The ID is required` })
  }

  result = model.update(result, req.body)

  if (result.errors) {
    return next({ status: 400, message: `Fields name and brand are required` })
  }

  res.status(200).json({ data: result })
}


function remove (req, res, next) {
  let result = model.find(req.params.id)

  if (result === undefined) {
    return next({ status: 404, message: `Could not find snack with ID of ${req.params.id}` })
  }

  if (result.errors) {
    return next({ status: 400, message: `The ID is required` })
  }

  model.remove(result)

  res.status(204).json()
}


module.exports = { getAll, find, create, update, remove }
