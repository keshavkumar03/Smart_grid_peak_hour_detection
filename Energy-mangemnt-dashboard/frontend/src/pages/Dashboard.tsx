import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Battery, Cloud, Sun, Zap } from 'lucide-react';
import { EnergyData } from '../types';

const Dashboard = () => {
  const [energyData, setEnergyData] = useState<EnergyData[]>([]);
  const [currentSource, setCurrentSource] = useState<string>('Grid');
  const [batteryLevel, setBatteryLevel] = useState<number>(80);

  useEffect(() => {
    // Fetch initial data
    fetchEnergyData();

    // Set up WebSocket connection for real-time updates
    const ws = new WebSocket('ws://localhost:7071');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      updateRealTimeData(data);
    };

    return () => {
      ws.close();
    };
  }, []);

  const fetchEnergyData = async () => {
    try {
      const response = await fetch('http://localhost:7071/api/energy-data');
      const data = await response.json();
      setEnergyData(data);
    } catch (error) {
      console.error('Error fetching energy data:', error);
    }
  };

  const updateRealTimeData = (newData: EnergyData) => {
    setEnergyData(prev => [...prev, newData]);
    setCurrentSource(newData.powerSource);
    if (newData.batteryLevel) {
      setBatteryLevel(newData.batteryLevel);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Energy Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Battery className="h-6 w-6 text-green-500" />
              <span>{batteryLevel}%</span>
            </div>
            <div className="flex items-center space-x-2">
              {currentSource === 'Grid' && <Cloud className="h-6 w-6 text-blue-500" />}
              {currentSource === 'Solar' && <Sun className="h-6 w-6 text-yellow-500" />}
              {currentSource === 'Battery' && <Zap className="h-6 w-6 text-purple-500" />}
              <span>{currentSource}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Power Consumption vs Generation</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="powerConsumption"
                    stroke="#ef4444"
                    name="Consumption"
                  />
                  <Line
                    type="monotone"
                    dataKey="powerGeneration"
                    stroke="#22c55e"
                    name="Generation"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Current Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Voltage</p>
                <p className="text-2xl font-semibold">
                  {energyData[energyData.length - 1]?.voltage || 0} V
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Current</p>
                <p className="text-2xl font-semibold">
                  {energyData[energyData.length - 1]?.current || 0} A
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Power Source</p>
                <p className="text-2xl font-semibold">{currentSource}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Battery Level</p>
                <p className="text-2xl font-semibold">{batteryLevel}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;