const axios=require('axios')
const {Op}=require('sequelize')

const {Dog, Temperament}=require('../../db')

const url='https://api.thedogapi.com/v1/breeds'

