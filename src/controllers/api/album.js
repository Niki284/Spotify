
/**
 *  POST	/api/album	Aanmaken van een album	X		
    PUT	/api/album	Aanpassen van een album	X	X	
    DELETE	/api/album	Verwijderen van een album	X		
    GET	/api/albums	Ophalen van alle albumen
 */


    import { getConnection } from 'typeorm';

    export const postAlbum = async (req, res, next) => {
      try {
        // validate incoming body
        if (!req.body.name) throw new Error('Please provide a name for an album.');
    
        // get the repository from
        const albumReposity = getConnection().getRepository('AlbumItem');
    
        // get album (if this one exists)
        const album = await albumReposity.findOne({
          where: { name: req.body.name },
        });
        // if ineterest already exists
        if (album) {
          res.status(200).json({ status: `Posted album with id${album.id}` });
          return;
        }
    
        // save the album in the repository
        const insertedAlbum = await albumReposity.save(req.body);
    
        res.status(200).json({ status: `posted album with id:${insertedAlbum.id}` });
    
        res.status(200).json({ status: 'Posted album.' });
      } catch (error) {
        next(error.message);
      }
    };
    
    export const getAlbum = async (req, res, next) => {
      try {
        // get the album repository
        const albumReposity = getConnection().getRepository('AlbumItem');
    
        // send back to client
        res.status(200).json(await albumReposity.find());
      } catch (error) {
        next(error.message);
      }
    };
    
    export const deleteAlbum = async (req, res, next) => {
      console.log(req.body);
      try {
        const { id } = req.body;
    
        if (!id) throw new Error('del');
    
        const albumReposity = getConnection().getRepository('AlbumItem');
    
        const album = await albumReposity.findOne({ id });
    
        if (!album) throw new Error(`del de album op id : ${id}`);
        await albumReposity.remove({ id });
    
        res.status(200).json({ status: `delete album. ${id}` });
      } catch (error) {
        next(error.message);
      }
    };
    
    export const updateAlbum = async (req, res, next) => {
      try {
        if (!req.body.id) throw new Error('nnjhiu');
    
        const albumReposity = getConnection().getRepository('AlbumItem');
    
        const album = await albumReposity.findOne({
          where: { id: req.body.id },
        });
        if (!album) throw new Error('give');
        const updatealbum = { ...album, ...req.body };
    
        // save
        await albumReposity.save(updatealbum);
    
        res.status(200).json({ status: `update album. ${req.body.id}` });
      } catch (error) {
        next(error.message);
      }
    };
    