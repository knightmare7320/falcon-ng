import Geo from "../models/geo.js";
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
  const longitudeDegrees = (xTile / n) * 360.0 - 180.0

  return longitudeDegrees;
}
const yToLatitude = (zoom, yTile) => {
  const n = Math.pow(2, zoom);
  const latitudeRadians = Math.atan(Math.sinh(Math.PI * (1 - 2 * yTile / n)));
  const latitudeDegrees = latitudeRadians * 180.0 / Math.PI;

  return latitudeDegrees;
}

export function getSiteBounds(req, res) {
  const params = {
    minLatitude: +req.query.minLat,
    maxLatitude: +req.query.maxLat,
    minLongitude: +req.query.minLng,
    maxLongitude: +req.query.maxLng,
  };

  if (isNaN(params.minLatitude) || isNaN(params.maxLatitude) || isNaN(params.minLongitude) || isNaN(params.maxLongitude)) {
    res.status(500).json({message: 'Invalid geo bounds.'});
    return;
  }

  Geo.getSites(
    req.app.locals.db,
    params,
    (err, result) => {
      if (err)
        res.status(500).json({ message: err });
      else
        res.status(200).json(result);
    }
  );
}

export function getSectorBounds(req, res) {
  const params = {
    minLatitude: +req.query.minLat,
    maxLatitude: +req.query.maxLat,
    minLongitude: +req.query.minLng,
    maxLongitude: +req.query.maxLng,
  };

  if (isNaN(params.minLatitude) || isNaN(params.maxLatitude) || isNaN(params.minLongitude) || isNaN(params.maxLongitude)) {
    res.status(500).json({message: 'Invalid geo bounds.'});
    return;
  }

  Geo.getSectors(
    req.app.locals.db,
    params,
    (err, result) => {
      if (err)
        res.status(500).json({ message: err });
      else
        res.status(200).json(result);
    }
  );
}



export function getSiteTiles(req, res) {
  const xTile = +req.params.X;
  const yTile = +req.params.Y;
  const zoom = +req.params.Z;

  if (isNaN(xTile) || isNaN(yTile) || isNaN(zoom)) {
    res.status(500).json({message: 'Invalid tile selection.'});
    return;
  }

  const params = {
    min_latitude: yToLatitude(zoom, yTile+1),
    max_latitude: yToLatitude(zoom, yTile),
    min_longitude: xToLongitude(zoom, xTile),
    max_longitude: xToLongitude(zoom, xTile+1)
  };
  Geo.getSites(
    req.app.locals.db,
    params,
    (err, result) => {
      if (err)
        res.status(500).json({ message: err });
      else
        res.status(200).json(result);
    }
  );
}

export function getSectorTiles(req, res) {
  const xTile = +req.params.X;
  const yTile = +req.params.Y;
  const zoom = +req.params.Z;

  if (isNaN(xTile) || isNaN(yTile) || isNaN(zoom)) {
    res.status(500).json({message: 'Invalid tile selection.'});
    return;
  }

  const params = {
    min_latitude: yToLatitude(zoom, yTile+1),
    max_latitude: yToLatitude(zoom, yTile),
    min_longitude: xToLongitude(zoom, xTile),
    max_longitude: xToLongitude(zoom, xTile+1)
  };
  Geo.getSectors(
    req.app.locals.db,
    params,
    (err, result) => {
      if (err)
        res.status(500).json({ message: err });
      else {
        // TODO: improve/optimize this mess
        let out_array = [];
        result.map(element => {
          siteIdx = out_array.findIndex(out_element => element.cascade_code === out_element.cascade_code);
          if (siteIdx >= 0) {
            out_array[siteIdx].sectors.push({
              sector_number: +element.sector_number,
              azimuth: +element.azimuth,
              horizontal_bw: + element.horizontal_bw,
            })
          } else {
            out_array.push({
              cascade_code: element.cascade_code,
              latitude: +element.latitude,
              longitude: +element.longitude,
              sectors: [{
                sector_number: +element.sector_number,
                azimuth: +element.azimuth,
                horizontal_bw: + element.horizontal_bw,
              }]
            })
          }
        });

        res.status(200).json(out_array);
      }
    }
  );
}



export function getSiteJson(req, res) {
  const xTile = +req.params.X;
  const yTile = +req.params.Y;
  const zoom = +req.params.Z;

  if (isNaN(xTile) || isNaN(yTile) || isNaN(zoom)) {
    res.status(400).json({message: 'Invalid tile selection.'});
    return;
  }

  const params = {
    min_latitude: yToLatitude(zoom, yTile+1),
    max_latitude: yToLatitude(zoom, yTile),
    min_longitude: xToLongitude(zoom, xTile),
    max_longitude: xToLongitude(zoom, xTile+1)
  };
  Geo.getSites(
    req.app.locals.db,
    params,
    (err, result) => {
      if (err)
        res.status(500).json({ message: err });
      else
        res.status(200).json(formatSiteJson(result));
    }
  );
}

function formatSiteJson(sites) {
  let json = {
    "type": "FeatureCollection",
    "features": [],
  };

  sites.map(site => {
    json["features"].push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [+site.longitude, +site.latitude],
      },
      "properties": {
        "cascade_code": site.cascade_code,
      },
    })
  });

  return json;
}