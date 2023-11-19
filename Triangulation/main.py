#Cell Phone Trilateration Algorithm - www.101computing.net/cell-phone-trilateration-algorithm/
import draw2

from flask import Flask, jsonify

app = Flask(__name__)

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
    x1, y1, r1, x2, y2, r2, x3, y3, r3 = draw2.drawCellTowers()
    x, y = trackPhone(x1, y1, r1, x2, y2, r2, x3, y3, r3)

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

