from flask import Flask, request, jsonify
import tensorflow.lite as tflite
import numpy as np
app = Flask(__name__)

# Load TFLite model
interpreter = tflite.Interpreter(model_path='./peak_hour_model.tflite')
interpreter.allocate_tensors()
input_tensor_index = interpreter.get_input_details()[0]['index']
output_tensor_index = interpreter.get_output_details()[0]['index']
@app.route('/', methods=['GET'])
def welcome():
    return jsonify({"message": "this is a Peak hour detection API"})


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_data = np.array([[data["Voltage"], data["Current"], data["Power"], data["Hour"]]], dtype=np.float32)
    
    interpreter.set_tensor(input_tensor_index, input_data)
    interpreter.invoke()
    prediction = interpreter.get_tensor(output_tensor_index)
    
    return jsonify({"Peak_Hour": bool(prediction[0] > 0.5)})

if __name__ == '__main__':
    app.run(debug=True)
