const model = require("../models/geo.js");
/*
Pseudocode - Tile numbers to lon./lat.
This returns the NW-corner of the square. Use the function with xtile+1 and/or ytile+1 to get the other corners

n = 2 ^ zoom
lon_deg = xtile / n * 360.0 - 180.0
lat_rad = arctan(sinh(π * (1 - 2 * ytile / n)))
lat_deg = lat_rad * 180.0 / π

example tile:
http:/api/geo/sites/12/1048/1522
*/
const xToLongitude = (zoom, xTile) => {
   const n = Math.pow(2, zoom);
   const longitude_degrees = (xTile / n) * 360.0 - 180.0

   return longitude_degrees;
}
const yToLatitude = (zoom, yTile) => {
   const n = Math.pow(2, zoom);
   const latitude_radians = Math.atan(Math.sinh(Math.PI * (1 - 2 * yTile / n)));
   const latitude_degrees = latitude_radians * 180.0 / Math.PI;

   return latitude_degrees;
}

const geoSites = 

exports.getSites = (req, res, next) => {
   const xTile = +req.params.X;
   const yTile = +req.params.Y;
   const zoom = +req.params.Z;

   const params = {
      min_latitude: yToLatitude(zoom, yTile+1),
      max_latitude: yToLatitude(zoom, yTile),
      min_longitude: xToLongitude(zoom, xTile),
      max_longitude: xToLongitude(zoom, xTile+1)
   };
   model.getSites(
      req.app.locals.db,
      params,
      (err, result) => {
         if (err)
            res.status(500).json({ message: err });
         else
            res.status(200).json({ X: xTile, Y: yTile, Z: zoom, ...result });
      }
   );
};

exports.getSectors = (req, res, next) => {
   const xTile = +req.params.X;
   const yTile = +req.params.Y;
   const zoom = +req.params.Z;

   const params = {
      min_latitude: yToLatitude(zoom, yTile+1),
      max_latitude: yToLatitude(zoom, yTile),
      min_longitude: xToLongitude(zoom, xTile),
      max_longitude: xToLongitude(zoom, xTile+1)
   };
   model.getSectors(
      req.app.locals.db,
      params,
      (err, result) => {
         if (err)
            res.status(500).json({ message: err });
         else
            res.status(200).json({ X: xTile, Y: yTile, Z: zoom, ...result });
      }
   );
};