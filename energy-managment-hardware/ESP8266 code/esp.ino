#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "Keshav";
const char* password = "Keshavkumar";
const char* serverUrl = "https://peak-hour-api.azurewebsites.net/predict";

WiFiClient client;
HTTPClient http;

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nConnected to WiFi");
}

void loop() {
    if (Serial.available()) {
        String jsonData = Serial.readString();
        sendDataToAzure(jsonData);
    }
}

void sendDataToAzure(String jsonData) {
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(jsonData);
    if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.println(response); // Send back to Arduino
    } else {
        Serial.println("Error in HTTP request");
    }
    http.end();
}
