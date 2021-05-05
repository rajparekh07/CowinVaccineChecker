let vUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=395&date=05-05-2021";

let axios = require('axios');

const notifier = require('node-notifier');

async function main() {
	console.log(`Status Update: ${new Date()} REQUESTING API`);

	let manifest = await axios.get(vUrl + "&t" + new Date().getTime());

	let centres = manifest.data.centers;

	console.log(centres);

	let aged18 = centres.filter(_ => _.sessions.filter(_x => _x.available_capacity > 0).length > 0).map(x => `${x.name}, ${x.address}`)


	if (aged18.length > 0)
	{
	console.log(`Status Update: ${new Date()}`);
	console.log(aged18);

	} else {
	console.log(`Status Update: ${new Date()} No Vaccine for _x.min_age_limit == 18 && _x.available_capacity > 0`);

	}

}

main();
