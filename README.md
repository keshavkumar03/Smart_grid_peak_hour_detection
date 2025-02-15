# Peak Hour Detection

Welcome to the Peak Hour Detection project! This repository contains a deep learning model designed to predict household energy consumption peak hours. The project utilizes Flask for API integration and TensorFlow's TFLite to convert the model into a format that can be easily accessed via the API.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Model Training](#model-training)
- [Contributing](#contributing)
- [License](#license)

## Features

- Predict peak energy consumption hours for households.
- RESTful API for easy integration.
- Lightweight model with TFLite for efficient inference.

## Technologies Used

- **Flask**: A micro web framework for Python, used to create the API.
- **TensorFlow**: A powerful library for building deep learning models.
- **TFLite**: TensorFlow Lite enables the conversion of models to be run on edge devices.
- **NumPy**: For numerical computations.

## Getting Started

To get started with the Peak Hour Detection project, follow these steps:

1. **Clone the repository**:
   ```
   git clone https://github.com/keshavkumar03/peak_hour_detection.git
   cd peak_hour_detection
   ```

2. **Install Requirements**:
   Create a virtual environment and install the required libraries:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

3. **Run the Flask API**:
   Start the Flask application:
   ```
   python app.py
   ```
   You can now access the API at `http://127.0.0.1:5000`.

## API Documentation

The API has the following endpoints:

- **POST /predict**: Send a request to predict peak hours of energy consumption.
  
  **Request Body**:
  ```json
   {
  "Voltage": 235,
  "Current": 10.5,
  "Power": 2.8,
  "Hour": 19
  }
  ```
  
  **Response**:
  ```json
  {
    "predicted_peak_hours": true
  }
  ```

## Model Training

To train the model, follow the instructions below:

1. Prepare your dataset in the specified format.
2. Run the jupyter notebook
  
3. The trained model will be saved in the same directory.


## Contributing

We welcome contributions to the Peak Hour Detection project! If you'd like to contribute, please fork the repository and submit a pull request. Make sure to follow the code of conduct and comply with our contribution guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Special thanks to [TensorFlow](https://www.tensorflow.org/) and [Flask](https://flask.palletsprojects.com/) for making this project possible.
- Acknowledgment to all contributors for their valuable input.

We hope you find this project helpful and informative. Happy coding!
