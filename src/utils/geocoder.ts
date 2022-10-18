// import NodeGeocoder from 'node-geocoder';

import { Location } from 'src/bootcamps/schemas/location.schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodeGeocoder = require('node-geocoder');

async function geocoder(address: string) {
  const options = {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_KEY,
    formatter: null,
  };

  const nodeGeocoder = NodeGeocoder(options);

  const loc = await nodeGeocoder.geocode(address);

  const location: Location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  return location;
}

export default geocoder;
