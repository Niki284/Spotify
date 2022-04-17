/**
 * A Register Controller
 */

import { validationResult } from 'express-validator';
import express from "express";
import path from 'path';
import fs from 'fs';

import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';
export const register = async (req, res) => {
  console.log(req.formErrorFields);
  // errors
  const formErrors = req.formErrors? req.formErrors: [];

  // input fields
  const inputs = [{
    name: 'firstname',
    label: 'firstname',
    type: 'firstname',
    value: req.body?.firstname? req.body.firstname: '',
    error: req.formErrorFields?.firstname ? req.formErrorFields.firstname: '',
  },{
    name: 'lastname',
    label: 'lastname',
    type: 'lastname',
    value: req.body?.lastname? req.body.lastname: '',
    error: req.formErrorFields?.lastname ? req.formErrorFields.lastname: '',
  },{
    name: 'email',
    label: 'E-mail',
    type: 'text',
    value: req.body?.email? req.body.email: '',
    error: req.formErrorFields?.email ? req.formErrorFields.email: '',
  },{
    name: 'nickname',
    label: 'Nickname',
    type: 'nickname',
    value: req.body?.nickname? req.body.nickname: '',
    error: req.formErrorFields?.nickname ? req.formErrorFields.nickname: '',
  } ,{
    name: 'password',
    label: 'Password',
    type: 'password',
    value: req.body?.password? req.body.password: '',
    error: req.formErrorFields?.password ? req.formErrorFields.password: '',
  }
];
const option = [{
  name: 'admin',
  label: 'admin',
  type: 'admin',
  value: req.body?.admin? req.body.admin: '',
  error: req.formErrorFields?.admin ? req.formErrorFields.admin: '',
},
{
  name: 'editor',
  label: 'editor',
  type: 'editor',
  value: req.body?.editor? req.body.editor: '',
  error: req.formErrorFields?.editor ? req.formErrorFields.editor: '',
},
{
  name: 'reader',
  label: 'reader',
  type: 'reader',
  value: req.body?.reader? req.body.reader: '',
  error: req.formErrorFields?.reader ? req.formErrorFields.reader: '',
}
];
  // get rolen
  const roleRepository = getConnection().getRepository('Rolen');
  const rolen = await roleRepository.find();


  // render the register page
  res.render('register', {
    layout: 'authentication',
    inputs,
    formErrors,
    rolen,
    option
  });
}

export const postRegister = async (req, res, next) => {
  
  try {
    
    const error = validationResult(req);
    if(!error.isEmpty()) {
      req.formErrorFields = {};
      error.array().forEach(({ msg, param })=>{req.formErrorFields[param] = msg});
      return next()
    }
    else {
      const userRepository = getConnection().getRepository('User');
      const rolenRepository = getConnection().getCustomRepository('Rolen');

      const user = await userRepository.findOne({
        where: { email : req.body.email} 
      });
      //find rolen
      const rolen = await rolenRepository.findOne({
        where: { label: req.body.rolen}
      });
      console.log(rolen);
      if(!rolen) {
        req.formErrors = [{message: "De rolen bestan niet"}]
        return next();
      }
      
      if(user) {
        req.formErrors = [{message: "Gebruiker bestaat"}];
        return next();
      }
      

      const hashedPassword = bcrypt.hashSync(req.body.password , 14);
      await userRepository.save({
        email: req.body.email,
        nickname: req.body.nickname,
        password: hashedPassword,
        rolen: {userId:1}
      });

      res.redirect('/login')
    }
    
  } catch (error) {
    next(error.message)
  }
}

export const postLogin = async (req, res, next) => {
  try {
    const error = validationResult(req);
    console.log(error);
    if(!error.isEmpty()) {
      req.formErrorFields = {};
      error.array().forEach(({ msg, param })=>{req.formErrorFields[param] = msg});
      return next()
    }
    else {
      const userRepository = getConnection().getRepository('User');
      const user= await userRepository.findOne({
        where: { nickname : req.body.nickname}
        
      });
      console.log(user);
      if(!user) {
        req.formErrors = [{message: "Gebruiker is onbekend"}];
        return next();
      }

      const isEqual =  bcrypt.compareSync(req.body.password, user.password);

      if(!isEqual){
        req.formErrors = [{message: "Wachtword is onjuist"}];
        return next();
      }
      
      const token = jwt.sign(
        {userId: user.id , email: user.email},
        process.env.TOKEN_SALT,
        {expiresIn: '1h'}
      )

      res.cookie('token', token, {httpOnly: true});
      res.redirect('/')
    }
    
  } catch (error) {
    next(error.message)
  }
}

export const logout = async (req, res, next) => {
  try {
    res.clearCookie('token');
    return res.redirect('/login')
  } catch (error) {
    next(error.message)
  }
}

export const login = async (req, res) => {
  
  if( req.cookies.token ) {
    res.redirect('/');
    return;
  }
  // errors
  const formErrors = req.formErrors? req.formErrors: [];


  // input fields
  const inputs = [{
    name: 'nickname',
    label: 'Nickname',
    type: 'nickname',
    value: req.body?.nickname? req.body.nickname: '',
    error: req.formErrorFields?.nickname ? req.formErrorFields.nickname: '',
  }, {
    name: 'password',
    label: 'Password',
    type: 'password',
    value: req.body?.password? req.body.password: '',
    error: req.formErrorFields?.password ? req.formErrorFields.password: '',
  }]

  // render the login page
  res.render('login', {
    layout: 'authentication',
    inputs,
    formErrors
  });
}