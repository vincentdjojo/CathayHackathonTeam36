import turtle
import tkinter
from random import randint
import json
import paho.mqtt.client as mqtt #import the client1

# SSIDs we are interested in
target_ssids = ["GL-AR150-12d-1", "GL-XE300-535", "AndroidAPfool"]

# MQTT Callbacks
def on_connect(client, userdata, flags, rc):
    # This will be called once the client connects
    print(f"Connected with result code {rc}")
    # Subscribe here!
    client.subscribe("location/1")
    
def on_message(client, userdata, msg):
    global tri_devices_global
    networks = json.loads(msg.payload)
    # Extract SSID and quality
    extracted_data = [{"ssid": network["ssid"], "quality": network["quality"]} for network in networks]
    tri_devices = [network for network in extracted_data if network["ssid"] in target_ssids]
    #print(tri_devices)
    tri_devices_global = tri_devices


def drawCellTowers():
    # MQTT Client Setup
    broker_address = "54.235.51.246"
    client = mqtt.Client("mqtt-test") # client ID "mqtt-test"
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(broker_address, 1883)
    client.loop_forever()  # Start networking daemon

    
    main = tkinter.Tk()
    main.withdraw()
    canv = tkinter.Canvas(master = main)
    turt = turtle.RawTurtle(canv)
    #turtle = turtle.Turtle()
    turtle.hideturtle()
    turtle.tracer(0)
    turtle.speed(0)  


    window = turtle.Screen()
    window.bgcolor("#F0F0F0")


    import numpy as np
    from scipy.optimize import minimize

    # Wait for tri_devices to be populated
    while not tri_devices_global:
        pass  # Implement better waiting logic in a production environment

    # Assuming tri_devices_global has at least three elements
    r1 = tri_devices_global[0]['quality']
    r2 = tri_devices_global[1]['quality']
    r3 = tri_devices_global[2]['quality']

    # Known points
    x1, y1 = -140,-140
    x2, y2 = 0, 80
    x3, y3 = 140,-140

    # Function to minimize
    def equations(variables):
        x, y = variables
        return (
            (x - x1)**2 + (y - y1)**2 - r1**2,
            (x - x2)**2 + (y - y2)**2 - r2**2,
            (x - x3)**2 + (y - y3)**2 - r3**2
        )

    # Initial guess
    initial_guess = [0, 0]

    # Minimize the function
    result = minimize(lambda variables: np.sum(np.square(equations(variables))), initial_guess)

    x, y = result.x
    print("The solution is:")
    print("x =", x)
    print("y =", y)

    turtle.color("#ff5744")
    turtle.penup()
    turtle.goto(x1-5,y1)
    turtle.pendown()
    turtle.goto(x1+5,y1)
    turtle.penup()
    turtle.goto(x1,y1-5)
    turtle.pendown()
    turtle.goto(x1,y1+5)
    turtle.penup()

    turtle.goto(x1,y1-r1)
    turtle.pendown()
    turtle.circle(r1)

    turtle.color("#41befc")
    turtle.penup()
    turtle.goto(x2-5,y2)
    turtle.pendown()
    turtle.goto(x2+5,y2)
    turtle.penup()
    turtle.goto(x2,y2-5)
    turtle.pendown()
    turtle.goto(x2,y2+5)
    turtle.penup()

    turtle.goto(x2,y2-r2)
    turtle.pendown()
    turtle.circle(r2)
    turtle.penup()

    turtle.color("#52bf54")
    turtle.goto(x3-5,y3)
    turtle.pendown()
    turtle.goto(x3+5,y3)
    turtle.penup()
    turtle.goto(x3,y3-5)
    turtle.pendown()
    turtle.goto(x3,y3+5)

    turtle.penup()
    turtle.goto(x3,y3-r3)
    turtle.pendown()
    turtle.circle(r3)

    turtle.getscreen().update()

    turtle.getscreen().getcanvas().postscript(file='outputname.ps')
    from PIL import Image

    psimage=Image.open('outputname.ps')
    psimage.save('myImage.png')

  
    return x1,y1,r1,x2,y2,r2,x3,y3,r3
