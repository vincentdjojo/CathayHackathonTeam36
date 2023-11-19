import subprocess
from time import *
global result1
def getWiFiSignal():
    # Define your command
    cmd = "access_points wlp2s0"

    # Run the command and capture the output
    result1 = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, shell=True)

    # Access the output and error
    output = result1.stdout
    error = result1.stderr

    # Check if there was an error
    if result1.returncode != 0:
        print("Error:", error)
    else:
        print("Output:", output)
    return result1

# python 3.6

import random
import time

from paho.mqtt import client as mqtt_client


broker = '54.235.51.246'
port = 1883
topic = "location/1"
# Generate a Client ID with the publish prefix.
client_id = f'publish-{random.randint(0, 1000)}'
# username = 'emqx'
# password = 'public'

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    # client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def publish(result1, client):
    msg_count = 1
    while True:
        time.sleep(1)
        msg = result1
        result = client.publish(topic, msg)
        # result: [0, 1]
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
        msg_count += 1
        if msg_count > 5:
            break


def run():
    result1 = getWiFiSignal()
    print (result1.stdout)
    

    client = connect_mqtt()
    client.loop_start()

    
    publish(str(result1.stdout), client)
    client.loop_stop()

while (True): 
    run()
    sleep(2)


