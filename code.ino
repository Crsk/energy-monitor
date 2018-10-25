#include <Ethernet.h>
#include <SPI.h>
#include <ArduinoJson.h>
#include "RestClient.h"

#define IP "18.228.99.247"
#define PORT 3000
RestClient client = RestClient(IP, PORT);
//byte mac[] = { 0x90, 0xAD, 0xDA, 0x0D, 0x96, 0xFE };

void setup() {
Serial.begin(9600);
client.dhcp();
//analogReference(INTERNAL);
//if (Ethernet.begin(mac) == 0) {
//  Serial.println("Failed to configure Ethernet using DHCP");
//}
//Serial.print("My IP address: ");
//for (byte thisByte = 0; thisByte < 4; thisByte++) {
//  Serial.print(Ethernet.localIP()[thisByte], DEC);
//  Serial.print(".");
//}
//Serial.println();
}

String response;
void loop() {

    float value = get_corriente(); //Corriente eficaz (A)
    float wats = value * 220;  // wats= value * voltaje AC
    //float V = P/(Irms);
    value = value;
    if(value < 0) {
        value = 0;
        wats = 0;
    }

    response = "";
    client.setHeader("Content-Type: application/json");
    StaticJsonBuffer<200> jsonBuffer;
    char json[256];
    JsonObject& root = jsonBuffer.createObject();
    root["value"] = value;
    root.printTo(json, sizeof(json));
    Serial.println(json);
    int statusCode = client.post("/api/data", json, &response);
    Serial.print("Status code from server: ");
    Serial.println(statusCode);
    Serial.print("Response body from server: ");
    Serial.println(response);

    Serial.print("Irms: ");
    Serial.print(value,3);
    Serial.print("A, Potencia: ");
    Serial.print(wats,3);
    Serial.print("W");
    //Posible Calculo para Voltaje
    //Serial.print("VCA, Voltaje: ");
    //Serial.print(V,4);
    Serial.println();
    delay(1);
}

float get_corriente() {
    float voltajeSensor;
    float corriente = 0;
    float Sumatoria = 0;
    long tiempo = millis();
    int N = 0;

    while(millis() - tiempo < 5000) { //Duración 0.5 segundos(Aprox. 30 ciclos de 60Hz)
        voltajeSensor = analogRead(A0) * (1.1 / 666.0); //voltaje del sensor
        corriente = voltajeSensor * 20.0; //corriente = VoltajeSensor * (20A/1V)
        delay(1);
    }

    return(corriente);
}