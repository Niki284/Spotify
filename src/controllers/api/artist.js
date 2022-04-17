/**
 *  POST	/api/artist	Aanmaken van een artiest	X		
    PUT	/api/artist	Aanpassen van een artiest	X	X	
    DELETE	/api/artist	Verwijderen van een artiest	X		
    GET	/api/artists	Ophalen van alle artiesten
 */


import { getConnection } from 'typeorm';

export const postArtist = async (req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.name) throw new Error('Please provide a name for an artist.');

    // get the repository from
    const artistReposity = getConnection().getRepository('ArtistItem');

    // get artist (if this one exists)
    const artist = await artistReposity.findOne({
      where: { name: req.body.name },
    });
    // if ineterest already exists
    if (artist) {
      res.status(200).json({ status: `Posted artist with id${artist.id}` });
      return;
    }

    // save the artist in the repository
    const insertedArtist = await artistReposity.save(req.body);

    res.status(200).json({ status: `posted artist with id:${insertedArtist.id}` });

    res.status(200).json({ status: 'Posted artist.' });
  } catch (error) {
    next(error.message);
  }
};

export const getArtist = async (req, res, next) => {
  try {
    // get the artist repository
    const artistReposity = getConnection().getRepository('ArtistItem');

    // send back to client
    res.status(200).json(await artistReposity.find());
  } catch (error) {
    next(error.message);
  }
};

export const deleteArtist = async (req, res, next) => {
  console.log(req.body);
  try {
    const { id } = req.body;

    if (!id) throw new Error('del');

    const artistReposity = getConnection().getRepository('ArtistItem');

    const artist = await artistReposity.findOne({ id });

    if (!artist) throw new Error(`del de artist op id : ${id}`);
    await artistReposity.remove({ id });

    res.status(200).json({ status: `delete artist. ${id}` });
  } catch (error) {
    next(error.message);
  }
};

export const updateArtist = async (req, res, next) => {
  try {
    if (!req.body.id) throw new Error('nnjhiu');

    const artistReposity = getConnection().getRepository('ArtistItem');

    const artist = await artistReposity.findOne({
      where: { id: req.body.id },
    });
    if (!artist) throw new Error('give');
    const updateartist = { ...artist, ...req.body };

    // save
    await artistReposity.save(updateartist);

    res.status(200).json({ status: `update artist. ${req.body.id}` });
  } catch (error) {
    next(error.message);
  }
};



