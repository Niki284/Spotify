
/**
 *  POST	/api/song	Aanmaken van een song	X		
    PUT	/api/song	Aanpassen van een song	X	X	
    DELETE	/api/song	Verwijderen van een song	X		
    GET	/api/songs	Ophalen van alle songen
 */


    import { getConnection } from 'typeorm';

    export const postSong = async (req, res, next) => {
      try {
        // validate incoming body
        if (!req.body.name) throw new Error('Please provide a name for an song.');
    
        // get the repository from
        const songReposity = getConnection().getRepository('SongItem');
    
        // get song (if this one exists)
        const song = await songReposity.findOne({
          where: { name: req.body.name },
        });
        // if ineterest already exists
        if (song) {
          res.status(200).json({ status: `Posted song with id${song.id}` });
          return;
        }
    
        // save the song in the repository
        const insertedSong = await songReposity.save(req.body);
    
        res.status(200).json({ status: `posted song with id:${insertedSong.id}` });
    
        res.status(200).json({ status: 'Posted song.' });
      } catch (error) {
        next(error.message);
      }
    };
    
    export const getSong = async (req, res, next) => {
      try {
        // get the song repository
        const songReposity = getConnection().getRepository('SongItem');
    
        // send back to client
        res.status(200).json(await songReposity.find());
      } catch (error) {
        next(error.message);
      }
    };
    
    export const deleteSong = async (req, res, next) => {
      console.log(req.body);
      try {
        const { id } = req.body;
    
        if (!id) throw new Error('del');
    
        const songReposity = getConnection().getRepository('SongItem');
    
        const song = await songReposity.findOne({ id });
    
        if (!song) throw new Error(`del de song op id : ${id}`);
        await songReposity.remove({ id });
    
        res.status(200).json({ status: `delete song. ${id}` });
      } catch (error) {
        next(error.message);
      }
    };
    
    export const updateSong = async (req, res, next) => {
      try {
        if (!req.body.id) throw new Error('nnjhiu');
    
        const songReposity = getConnection().getRepository('SongItem');
    
        const song = await songReposity.findOne({
          where: { id: req.body.id },
        });
        if (!song) throw new Error('give');
        const updatesong = { ...song, ...req.body };
    
        // save
        await songReposity.save(updatesong);
    
        res.status(200).json({ status: `update song. ${req.body.id}` });
      } catch (error) {
        next(error.message);
      }
    };
    