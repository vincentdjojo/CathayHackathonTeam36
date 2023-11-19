import turtle
import tkinter
from random import randint

from flask import Flask, jsonify

app = Flask(__name__)


def drawCellTowers():
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

    # Known distances to the points
    r1, r2, r3 = 160,160,160  # example values

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

#A function to apply trilateration formulas to return the (x,y) intersection point of three circles
def trackPhone(x1,y1,r1,x2,y2,r2,x3,y3,r3):
    A = 2*x2 - 2*x1
    B = 2*y2 - 2*y1
    C = r1**2 - r2**2 - x1**2 + x2**2 - y1**2 + y2**2
    D = 2*x3 - 2*x2
    E = 2*y3 - 2*y2
    F = r2**2 - r3**2 - x2**2 + x3**2 - y2**2 + y3**2
    x = (C*E - F*B) / (E*A - B*D)
    y = (C*D - A*F) / (B*D - A*E)
    return x,y

@app.route('/get-coordinates', methods=['GET'])
def get_coordinates():
    # Run your function to get coordinates
    x1, y1, r1, x2, y2, r2, x3, y3, r3 = drawCellTowers()
    x, y = your_script_name.trackPhone(x1, y1, r1, x2, y2, r2, x3, y3, r3)

    #Apply trilateration algorithm to locate phone
    x,y = trackPhone(x1,y1,r1,x2,y2,r2,x3,y3,r3)
    
    # Return the results in JSON format
    return jsonify({
        'cell_phone_location': [x, y],
        'tower_1': [x1, y1, r1],
        'tower_2': [x2, y2, r2],
        'tower_3': [x3, y3, r3]
    })

if __name__ == '__main__':
    app.run(debug=True, port=8080)

main()




