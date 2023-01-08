import express, { Router, Request, Response } from 'express';
// import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {


  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1. validate the image_url query
  app.get('/filteredimage', ( req:Request, res:Response ) => { 
  let { image_url } :{image_url:string} = req.query;

  if (!image_url) {
    return res.status(400).send("Invalid request. image_url is required");
  }

  const filteredResult = filterImageFromURL(image_url)
  .then((filteredResult) => {
    // if(filteredResult)
    // {
    //   console.log("Success : " + filteredResult);
    // }
    res.sendFile(filteredResult, function(){
      deleteLocalFiles([filteredResult]);
    });
  })
  .catch(error => { console.log('Error caught', error.message); }); ;

});
  // app.get("/filteredimage", (req, res)=> {

  //   let { image_url } = req.query

  //   if(!image_url){
  //     return res.status(400).send("Invalid request .image_url is requires")
  //   }else {
  //     filterImageFromURL(image_url).then( function (img_filtered_path){
  //       res.sendFile(img_filtered_path, () => {       
  //         deleteLocalFiles([img_filtered_path]);       
  //       });   
  //     }).catch(function(err){
  //       res.status(400).send('The image can not be filtered - check the link submitted ');
  //     });  

  //   }
  // });

    

  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user

 

  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();