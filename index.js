let vUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=395&date=05-05-2021";

let axios = require('axios');

const notifier = require('node-notifier');

async function main() {
	console.log(`Status Update: ${new Date()} REQUESTING API`);

	let manifest = await axios.get(vUrl);

	let centres = manifest.data.centers;

	let aged18 = centres.filter(_ => _.sessions.filter(_x => _x.min_age_limit == 18 && _x.available_capacity > 0).length > 0).map(x => `${x.name}, ${x.address}`)


	if (aged18.length > 0)
	{
	console.log(`Status Update: ${new Date()} ${aged18}`);

		notifier.notify({
	  'title': 'VACCINE AVAILABLE',
	  'subtitle': `AVAILABLE at ${aged18.length} locations!`,
	  'message': `${aged18[0]}`,
	  'icon': 'dwb-logo.png',
	  'contentImage': 'blog.png',
	  'sound': 'ding.mp3',
	  'wait': true
	});
	notifier.on('click', (obj, options) => {
	  const spawn = require('child_process').spawn;
	  const cmd = spawn('open', ['https://www.cowin.gov.in/home']);
	});
	} else {
	console.log(`Status Update: ${new Date()} No Vaccine for _x.min_age_limit == 18 && _x.available_capacity > 0`);

	}

}

main();
setInterval(main, 1000 * 60 * 2);