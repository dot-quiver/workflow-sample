// [START app]
import express from 'express'
import { createRequire } from "module";

import parseBlueprintToGraph from 'dot-quiver/utils/workflow/parsers.js'

const require = createRequire(import.meta.url);
const app = express();

// [START enable_parser]
// This middleware is available in Express v4.16.0 onwards
app.use(express.json({extended: true}));
// [END enable_parser]

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

app.get('/', (req, res) => {
  // Driver program
  // Create a sample graph
  
  let bps_root = './samples/blueprints/';
  let blueprints_fnames = fs.readdirSync(bps_root);
  
  // Change to true  VVVVV to describe all blueprints on path samples/blueprints/
  let READ_ALL_BPS = false;
  let blueprint_fname = 'DemandasEspontaneas.json'

  let graphs = []
  let descriptions = []

  if(READ_ALL_BPS){
      for(let i=0; i<blueprints_fnames.length; i++){
          let fname = bps_root+blueprints_fnames[i];
          let blueprint_i = require(fname);
          
          let graph_i = parseBlueprintToGraph(blueprint_i);
          
          graphs.push(graph_i);
          descriptions.push(graph_i.describe());
      }

      res.send(descriptions);

  } else {
      let fname = bps_root+blueprint_fname;
      let blueprint_i = require(fname);
      
      let graph = parseBlueprintToGraph(blueprint_i);
    
      res.send(graph.describe());
  }
});
// [END app]
