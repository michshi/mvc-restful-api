const uuid = require('uuid/v4')
const snacks = []

function getAll () {
  return snacks
}


function find(id) {
  const errors = []
  let response

  if (!id) {
    errors.push(`ID is required`)
    response = { errors }
  } else {
    const snack = snacks.find(snack => snack.id === id)
    response = snack
  }
  return response
}


function create (body) {
  const errors = []
  const { name, brand } = body
  let response

  if (!name) {
    errors.push(`name is required`)
    response = { errors }
  } else if (!brand) {
    errors.push(`brand is required`)
    response = { errors }
  } else {
    const snack = { id: uuid(), name, brand }
    snacks.push(snack)
    response = snack
  }

  return response
}


function update(snack, body) {
  const errors = []
  const { name, brand } = body
  let response

  if (!name) {
    errors.push(`name is required`)
    response = { errors }
  } else if (!brand) {
    errors.push(`brand is required`)
    response = { errors }
  } else {
    snack.name = name
    snack.brand = brand
    response = snack
  }

  return response
}


function remove(snack) {
  const index = snacks.indexOf(snack)
  snacks.splice(index, 1)
}

module.exports = { getAll, find, create, update, remove }
