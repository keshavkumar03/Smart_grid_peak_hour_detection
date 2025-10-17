#include <SoftwareSerial.h>
#include <ArduinoJson.h>

// ESP8266 connection
SoftwareSerial espSerial(2, 3); // RX, TX

// Relay Pins
#define RELAY_GRID 4
#define RELAY_SOLAR 5

// Sensor Pins
#define VOLTAGE_SENSOR A0
#define CURRENT_SENSOR A1

void setup() {
    Serial.begin(115200);
    espSerial.begin(115200);
    
    pinMode(RELAY_GRID, OUTPUT);
    pinMode(RELAY_SOLAR, OUTPUT);

    digitalWrite(RELAY_GRID, HIGH); // Default to Grid
    digitalWrite(RELAY_SOLAR, LOW);
}

void loop() {
  
    // Read power consumption (mocked, replace with actual calculation)
    float powerConsumption = analogRead(CURRENT_SENSOR) * 0.1; 

    // Read solar availability (mocked, replace with actual threshold)
    bool solarAvailable = analogRead(VOLTAGE_SENSOR) > 500;

    // Get timestamp (Arduino doesn't have RTC, so set manually for now)
    String timestamp = "2025-04-06 12:15:00";

    Serial.println(powerConsumption);

    // Send data to ESP8266
    sendToESP8266(timestamp, powerConsumption);

    // Wait for response from ESP8266
    String response = receiveFromESP8266();
    Serial.println(response);
    
    // Parse JSON
    DynamicJsonDocument doc(200);
    DeserializationError error = deserializeJson(doc, response);
    if (error) {
        Serial.println("Failed to parse JSON");
        return;
    }

    int peak_hour = doc["peak_hour"];

    // Decision Logic
    if (peak_hour == 1 && solarAvailable) {
        digitalWrite(RELAY_GRID, LOW);
        digitalWrite(RELAY_SOLAR, HIGH);
        Serial.println("Switching to Solar");
    } else {
        digitalWrite(RELAY_GRID, HIGH);
        digitalWrite(RELAY_SOLAR, LOW);
        Serial.println("Using Grid");
    }

    delay(60000); // Wait 1 minute before next check
}

// Send data to ESP8266 for API request
void sendToESP8266(String timestamp, float power) {
    String json = "{\"timestamp\":\"" + timestamp + "\", \"power_consumption\":" + String(power) + "}";
    espSerial.println(json);
}

// Receive data from ESP8266
String receiveFromESP8266() {
    String response = "";
    while (espSerial.available()) {
        response += char(espSerial.read());
    }
    return response;
}
