
/**
 *  POST	/api/playlist	Aanmaken van een playlist	X		
    PUT	/api/playlist	Aanpassen van een playlist	X	X	
    DELETE	/api/playlist	Verwijderen van een playlist	X		
    GET	/api/playlists	Ophalen van alle playlisten
 */


    import { getConnection } from 'typeorm';

    export const postPlaylist = async (req, res, next) => {
      try {
        // validate incoming body
        if (!req.body.name) throw new Error('Please provide a name for an playlist.');
    
        // get the repository from
        const playlistReposity = getConnection().getRepository('PlaylistItem');
    
        // get playlist (if this one exists)
        const playlist = await playlistReposity.findOne({
          where: { name: req.body.name },
        });
        // if ineterest already exists
        if (playlist) {
          res.status(200).json({ status: `Posted playlist with id${playlist.id}` });
          return;
        }
    
        // save the playlist in the repository
        const insertedPlaylist = await playlistReposity.save(req.body);
    
        res.status(200).json({ status: `posted playlist with id:${insertedPlaylist.id}` });
    
        res.status(200).json({ status: 'Posted playlist.' });
      } catch (error) {
        next(error.message);
      }
    };
    
    export const getPlaylist = async (req, res, next) => {
      try {
        // get the playlist repository
        const playlistReposity = getConnection().getRepository('PlaylistItem');
    
        // send back to client
        res.status(200).json(await playlistReposity.find());
      } catch (error) {
        next(error.message);
      }
    };
    
    export const deletePlaylist = async (req, res, next) => {
      console.log(req.body);
      try {
        const { id } = req.body;
    
        if (!id) throw new Error('del');
    
        const playlistReposity = getConnection().getRepository('PlaylistItem');
    
        const playlist = await playlistReposity.findOne({ id });
    
        if (!playlist) throw new Error(`del de playlist op id : ${id}`);
        await playlistReposity.remove({ id });
    
        res.status(200).json({ status: `delete playlist. ${id}` });
      } catch (error) {
        next(error.message);
      }
    };
    
    export const updatePlaylist = async (req, res, next) => {
      try {
        if (!req.body.id) throw new Error('nnjhiu');
    
        const playlistReposity = getConnection().getRepository('PlaylistItem');
    
        const playlist = await playlistReposity.findOne({
          where: { id: req.body.id },
        });
        if (!playlist) throw new Error('give');
        const updateplaylist = { ...playlist, ...req.body };
    
        // save
        await playlistReposity.save(updateplaylist);
    
        res.status(200).json({ status: `update playlist. ${req.body.id}` });
      } catch (error) {
        next(error.message);
      }
    };
    