const Hapi = require('hapi');
const csvtojsonV2 = require("csvtojson");
var elasticsearch = require('elasticsearch');

const server = Hapi.server({
	port: 4000, routes: { cors: { origin: ['http://*'] } }
});

server.route({
	method: 'POST',
	path: '/search',
	handler: (request, h) => {

		return searchGlacier(request, h);
	}
});

const searchGlacier = async (request, response) => {
	var client = new elasticsearch.Client({
		host: 'localhost:9200',
		log: 'trace'
	});
	try {
		return await client.search({
			index: 'glaciers',
			body: {
				"from": 0, "size": request.payload.size || 1000,
				"query": {
					"bool": {
						"must": {
							"match_all": {}
						},
						"filter": {
							"geo_distance": {
								"distance": request.payload.distance,
								"location": {
									"lat": request.payload.latitude,
									"lon": request.payload.longitude
								}
							}
						}
					}
				},
				"sort": [
					{
						"_geo_distance": {
							"location": {
								"lat": request.payload.latitude,
								"lon": request.payload.longitude
							},
							"order": "asc",
							"unit": "km",
							"distance_type": "plane"
						}
					}
				]
			}
		});
	} catch (error) {
		return error;
	}
}

const init = async () => {
	await server.start();
	const csvFilePath = '/home/davide/SpaceApp/cryoinsight-project/backend/wgi_feb2012.csv';
	const csv = require('csvtojson');
	const jsonObj = await csv().fromFile(csvFilePath);
	var client = new elasticsearch.Client({
		host: 'localhost:9200',
		log: 'trace'
	});
	client.ping({
		// ping usually has a 3000ms timeout
		requestTimeout: 1000
	}, async (error) => {
		if (error) {
			console.trace('elasticsearch cluster is down!');
		} else {
			console.log('Elasticsearch is well, recreating the glacier index');
			try {
				await client.indices.delete({ index: '_all' });
				var body = {
					glacier: {
						properties: {
							location: { "type": "geo_point", "index": true },
							mean_elev: { "type": "short", "index": true },
							min_elev: { "type": "short", "index": true },
							max_elev: { "type": "short", "index": true },
							name: { "type": "text", "index": true },
							wgi_glacier_id: { "type": "text", "index": true },
						}
					}
				}
				await client.indices.create({ index: "glaciers" });
				await client.indices.putMapping({ index: "glaciers", type: "glacier", body: body });
				var elementNumberForBatchOperation = 200;
				var numberofTransactions = Math.floor(jsonObj.length / elementNumberForBatchOperation) + 1;
				var insertions = 0;
				console.log(jsonObj[12]);
				for (var i = 0; i < numberofTransactions; i++) {
					var bulkInsertObj = [];
					for (var z = 0; z < elementNumberForBatchOperation && (i * elementNumberForBatchOperation + z < jsonObj.length); z++) {
						insertions++;
						bulkInsertObj = bulkInsertObj.concat([
							{ index: { _index: 'glaciers', _type: 'glacier' } },
							{
								location: {
									lat: jsonObj[i * elementNumberForBatchOperation + z].lat,
									lon: jsonObj[i * elementNumberForBatchOperation + z].lon
								},
								mean_elev: jsonObj[i * elementNumberForBatchOperation + z].mean_elev,
								min_elev: jsonObj[i * elementNumberForBatchOperation + z].min_elev,
								max_elev: jsonObj[i * elementNumberForBatchOperation + z].max_elev,
								name: jsonObj[i * elementNumberForBatchOperation + z].glacier_name,
								wgi_glacier_id: jsonObj[i * elementNumberForBatchOperation + z].wgi_glacier_id
							}
						]);
					}
					//concurrent inserts are desiderable in this case
					await client.bulk({ body: bulkInsertObj });
				}
				console.log('Index recreated succesfuly, inserted ' + insertions + ' elements');
			} catch (error) {
				return error
			}
		}
	});
	console.log(`Server running at: ${server.info.uri}`);
	return (jsonObj);

};

process.on('unhandledRejection', (err) => {

	console.log(err);
	process.exit(1);
});

init();