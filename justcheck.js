let vUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=395&date=05-05-2021";


const notifier = require('node-notifier');

async function main() {
	console.log(`Status Update: ${vUrl + "&t=" + new Date().getTime()} REQUESTING API`);
	let axios = require('axios');


	let manifest = await axios.get(vUrl + "&t=" + new Date().getTime());

	let centres = manifest.data.centers;

	if (!centres)
	{
		console.log(`invalid ${JSON.stringify(manifest.data)}`)

		return
	}

	let filtered = centres.filter(_ => _.sessions.filter(_x => _x.available_capacity > 0).length > 0)

	console.log(filtered.map(x => x.sessions));

	let aged18 = filtered.map(x => `${x.pincode} ${x.name}, ${x.address} ${x.sessions.map(y => y.min_age_limit)} ${x.sessions.map(y => y.available_capacity)}`)


	if (aged18.length > 0)
	{
	console.log(`Status Update: ${new Date()}`);
	console.log(aged18);

	} else {
	console.log(`Status Update: ${new Date()} No Vaccine for _x.min_age_limit == 18 && _x.available_capacity > 0`);

	}

}

main();
