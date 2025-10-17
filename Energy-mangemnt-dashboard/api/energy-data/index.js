import { energyDataContainer } from '../shared/cosmosClient.js';

const httpTrigger = async function (context, req) {
  if (req.method === 'POST') {
    // Handle incoming sensor data from ESP8266
    try {
      const sensorData = {
        id: new Date().toISOString(),
        deviceId: req.body.deviceId,
        timestamp: new Date().toISOString(),
        voltage: req.body.voltage,
        current: req.body.current,
        powerSource: req.body.powerSource,
        batteryLevel: req.body.batteryLevel,
        powerConsumption: req.body.powerConsumption,
        powerGeneration: req.body.powerGeneration
      };

      await energyDataContainer.items.create(sensorData);

      
      // // Send the data to all connected clients via SignalR
      // context.bindings.signalRMessages = [{
      //   target: 'newEnergyData',
      //   arguments: [sensorData]
      // }];

      context.res = {
        status: 200,
        body: { message: 'Data received and stored successfully' }
      };
    } catch (error) {
      context.res = {
        status: 500,
        body: { message: 'Error processing sensor data' }
      };
    }
  } else if (req.method === 'GET') {
    // Handle data retrieval requests
    try {
      const { resources: data } = await energyDataContainer.items
        .query({
          query: 'SELECT * FROM c WHERE c.timestamp >= @startTime ORDER BY c.timestamp DESC',
          parameters: [{ 
            name: '@startTime', 
            value: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() 
          }]
        })
        .fetchAll();

      context.res = {
        body: data
      };
    } catch (error) {
      context.res = {
        status: 500,
        body: { message: 'Error retrieving energy data' }
      };
    }
  }
};

export default httpTrigger;
