let vUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=395&date=06-05-2021";

let axios = require('axios');
let fetch = require('node-fetch');

const notifier = require('node-notifier');

var config = {
  headers: {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.51'}
};

let vUrl2 = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=392&date=06-05-2021";

async function main() {
	console.log(`Status Update:${vUrl + "&t=" + new Date().getTime()}`);

	let manifest = await axios.get(vUrl + "&t=" + new Date().getTime(), config);
	let manifest2 = await axios.get(vUrl2 + "&t=" + new Date().getTime(), config);

	 let centres = manifest.data.centers.concat(manifest2.data.centers);
	let aged18 = centres.filter(_ => _.sessions.filter(_x => _x.min_age_limit == 18 && _x.available_capacity > 0).length > 0).map(x => `${x.pincode} ${x.name}, ${x.address}`)


	if (aged18.length > 0)
	{
	console.log(`Status Update: ${new Date()} `);
	console.log(`${JSON.stringify(aged18)}`)

		notifier.notify({
	  'title': 'VACCINE AVAILABLE',
	  'subtitle': `AVAILABLE at ${aged18.length} locations!`,
	  'message': `${aged18[0]}`,
	  'icon': 'dwb-logo.png',
	  'contentImage': 'blog.png',
	  'sound': 'ding.mp3',
	  'wait': true
	});
	} else {
		let for18 = centres.filter(_ => _.sessions.filter(_x => _x.min_age_limit == 18) > 0).length
		let for45 = centres.filter(_ => _.sessions.filter(_x => _x.min_age_limit != 18) > 0).length
		let for45Ava = centres.filter(_ => _.sessions.filter(_x =>  _x.available_capacity > 0) > 0).length


		console.log(`Status Update: ${new Date()} ${for18} ${for45} ${for45Ava}`);

	}

}

main();
setInterval(main, 1000 * 5);