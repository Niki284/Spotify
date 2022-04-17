/**
 * A Home Controller
 */

import { getConnection } from 'typeorm';

export const home = async (req, res) => {
  // get the user repository
  const userRepository = getConnection().getRepository('User');
  const naviReposity = getConnection().getRepository('NavigationItem');
  const todoReposity = getConnection().getRepository('ArtistItem');
  const albumRepository = getConnection().getRepository('AlbumItem');
  const songRepository = getConnection().getRepository('SongItem');
  const navi = await naviReposity.find();

  // console.log(req.user)

  // for DEMO, return the first user in the users table
  const userData = await userRepository.findOne({
    where: { id: req.user?.userId },
    relations: [ "user_meta" ]
  });

  // render the home page
  res.render('home', {
    userData,
    navi,
  });


}

export const postPlayliste = async (req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.name) throw new Error('Please provide a name for an todo.');
    // get the repository from
    const todoReposity = getConnection().getRepository('TodoItem');
    // get todo (if this one exists)
    let todo = await todoReposity.findOne({
      where: { name: req.body.name },
    });
    // if ineterest already exists
    if (!todo) {
      todo = await todoReposity.save(req.body, {
        status: 0,
      });
    }
    // redirect to home
    res.redirect('/');
  } catch (error) {
    next(error.message);
  }
};
export const homeDeleteTodo = async (req, res, next) => {
  console.log(req.body);
  try {
    const { id } = req.body;
    // get the repository from
    const todoReposity = getConnection().getRepository('TodoItem');
    // get todo (if this one exists)
    const todo = await todoReposity.findOne({ id });
    // if ineterest already exists
    if (!todo) throw new Error(`del de todo op id : ${id}`);
    await todoReposity.remove({ id });
    // redirect to home
    res.redirect('/');
  } catch (error) {
    next(error.message);
  }
};

export const homeUpdateTodo = async (req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.name) throw new Error('Please provide a name for an todo.');
    // get the repository from
    const todoReposity = getConnection().getRepository('TodoItem');
    // get todo (if this one exists)
    let todo = await todoReposity.findOne({
      where: { id: req.body.name },
    });
    // if ineterest already exists
    if (!todo) {
      todo = await todoReposity.save(req.body, {
        status: 0,
      });
    }
    // redirect to home
    res.redirect('/');
  } catch (error) {
    next(error.message);
  }
};


 /*
import { getConnection } from 'typeorm';
import * as path from 'path';

export const home = async (req, res) => {
  const { artist } = req.params;
  const artistconvert = artist.replace('-', ' ');
  // for param albums
  let albums = null;

  // get all repositories
  const artistRepository = getConnection().getRepository('ArtistItem');
  const albumRepository = getConnection().getRepository('AlbumItem');
  const songRepository = getConnection().getRepository('SongItem');
  const userRepository = getConnection().getRepository('User');
  // find the logged in user
  const user = await userRepository.findOne({
    where: { id: req.user?.userId },
    relations: ['user_meta'],
  });
  const { user_meta } = user;

  // read all the avatars from directory

  // check if parameter artist isnt empty
  if (artist) {
    // get all the albums of that artist from the parameter

    const artistfind = await artistRepository.findOne({
      where: { name: artistconvert },
    });
    albums = await albumRepository.find({
      where: { artists: artistfind },
      relations: ['artists'],
    });
  }
  // get all the albums of the first artist
  else
    albums = await albumRepository.find({
      where: { artists: 1 },
      relations: ['artists'],
    });
  const songs = await songRepository.find({
    relations: ['artists'],
    where: {
      artists: {
        name: artistconvert,
      },
    },
  });
  const artists = await artistRepository.find();

  res.render('home', { artists, user, user_meta, albums, songs });
};
 
*/