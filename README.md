## Peak Hour Detection API

This repository contains the code for a Peak Hour Detection API deployed on Azure. The API uses Python and a Long Short-Term Memory (LSTM) model to predict peak hours based on historical data of the energy consuption data from kaggle dataset called "smart-grid dataset".

**Key Components:**

*   `app.py`: The main Flask application file that defines the API endpoints and handles requests.
*   `saved_model`:  Directory containing the trained LSTM model.
*   `scaler.pkl`:  Pickled scaler object used for data preprocessing (scaling).
*   `requirements.txt`:  Lists the Python dependencies required to run the application.
*   `runtime.txt`: Specifies the Python runtime version for Azure deployment.

**Deployment:**

The API is designed to be deployed on Azure. The `requirements.txt` and `runtime.txt` files ensure that the Azure environment has the necessary dependencies and Python version.

**Technology Stack:**

*   Python
*   Flask
*   LSTM (Long Short-Term Memory)
*   Scikit-learn (for data scaling)
*   Azure (Deployment Platform)
