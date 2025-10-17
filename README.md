# Smart Hybrid Energy Management System

A sensor-driven **Energy Management System** integrating IoT, deep learning, and cloud analytics to optimize energy usage, reduce manual effort, and provide actionable insights.

---

## 🚀 Project Overview

This system combines:

- **Embedded IoT Sensors(current and volatage sensors) and microcontrollers (ESP32/ESP8266 + Arduino)** to collect real-time energy data.
- **Deep Learning Model(LSTM)** to predict energy peak hours using time-series analysis.
- **Web Analytics Dashboard** (React + Node.js) to monitor:
  - Energy consumption
  - Voltage & current
  - Power generation & consumption
  - Peak-hour alerts
- **Cloud Deployment** on Azure:
  - Azure Functions for serverless APIs
  - Azure Cosmos DB for scalable data storage

**Outcome:** Reduced manual monitoring and energy management effort by **60%**.

---

## ⚡ Features

- Real-time energy data collection from multiple sources.
- Automated switching between **Grid** and **Solar power** based on peak-hour predictions.
- Interactive dashboard to visualize energy metrics.
- Data storage and processing in the cloud for easy scalability.
- Lightweight deep learning model deployed using **TensorFlow Lite** for fast predictions.

---

## 🛠 Skills & Technologies

- **Embedded Systems:** Arduino, ESP32, ESP8266, Embedded C
- **Web Development:** React.js, Node.js, REST APIs
- **Cloud & Database:** Azure Functions, Azure Cosmos DB
- **Machine Learning:** TensorFlow, LSTM, Time-Series Prediction
- **Data Handling:** Pandas, NumPy, MinMaxScaler

---

## 📦 Project Structure
.
├── hardware/
│ └── arduino.c # Arduino code for sensor reading & relay control
├── esp/
│ └── esp.ino # ESP8266 code for sending sensor data to Azure
├── dashboard/
│ └── api/
│ └── dashboar.js # Azure Function API for storing & retrieving energy data
├── model/
│ └── model.ipynb # Deep learning model training & TFLite conversion
| └── app.py # loading as flask server for testing
| └── dataset # training data for model
| └── analysis.ipynb # data cleaning and analysis of the dataset
| └── dockerfile # deploying the model as API in azure
└── README.md


---

## ⚙ How It Works

1. **Data Collection:**
   - Arduino reads voltage, current, and power consumption from sensors.
   - Data is sent to ESP8266, which forwards it to the **Azure API**.

2. **Peak Hour Prediction:**
   - The LSTM model predicts whether the current time is a **peak hour**.
   - Model is deployed as a TFLite model and runs inference for real-time decisions.

3. **Decision Logic:**
   - If peak hour and solar energy available → switch to solar.
   - Else → use grid power.
   - Relays are controlled via Arduino pins accordingly.

4. **Dashboard & Analytics:**
   - Web dashboard fetches data from Cosmos DB.
   - Displays voltage, current, power consumption, and peak hour alerts in real-time.

---

## 📝 API Example

**POST /energy-data**  
```json
{
  "deviceId": "ESP01",
  "voltage": 230,
  "current": 5,
  "powerSource": "Grid",
  "batteryLevel": 80,
  "powerConsumption": 1150,
  "powerGeneration": 500
}
```
## Deep Learning Model

**Input Features: Voltage, Current, Power Consumption, Hour
**Output: Binary label → 1 (Peak Hour), 0 (Non-Peak Hour)
**Architecture: Dense layers with Dropout & L2 regularization
**Deployment: Converted to TensorFlow Lite for edge devices

## Result

Automated switching between solar and grid power based on predictions.
Real-time visualization and analytics dashboard.
Manual monitoring effort reduced by 60%.
Scalable cloud architecture.

## References

TensorFlow Lite Documentation(https://www.tensorflow.org/lite)
Azure Functions Documentation(https://learn.microsoft.com/en-us/azure/azure-functions/)
Azure Cosmos DB Documentation(https://learn.microsoft.com/en-us/azure/cosmos-db/)
Arduino & ESP8266 datasheets
