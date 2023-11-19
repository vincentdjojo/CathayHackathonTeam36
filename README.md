# Cathay-Hackathon
This web-application was developed to keep track of the live location of staff on-site at Cathay Pacific. The application helps each staff be aware of the other staff around and also be able to plan ahead and communicate with other staff effectively.

Within the triangulation folder, it consists of several indoor positiioning implemenatations using WiFi to detect the location of the current user within Cathay Pacific. In main.py and draw2.py, we have implemented a triangulation equation that uses 3 different WiFi sources to detect the position of the user's phone. We have succesfully detected the position of the user's phone via planar coordinates. We have attempted to visualize it using a a venn diagram showing the intersection of the three WiFi sources using Singal Strength to triangulate, but we did not have enough time to get the visuals to work.
Reference: https://www.101computing.net/cell-phone-trilateration-algorithm/

We have also made a bar chart when the WiFi device, like a phone, is approaching a WiFi source. A list of different WiFi sources can indicate different locations on-site. The bar increases when the WiFi device lke a phone, gets closer to the WiFi source. 

The backend folder contains the backend which is used to open up the endpoints to connect the different services we have added to the application. Wie have Node-Red nd MQTT to gather sensor data from our WiFi emitters to get the signal strength from the WiFi device, such as a phone, to the WiFi source, like a router.

The frontend we used to convey the information gathered in the triangulation folder, the backend and the sensor data from the routers on-site to get signal strength from the WiFi device to the WiFi source for triangulation.
