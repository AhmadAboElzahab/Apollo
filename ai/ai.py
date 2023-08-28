#!/usr/bin/env python
# coding: utf-8

# In[1]:


from flask import Flask, jsonify, request
import io
import pickle 
import csv
import pandas as pd


# In[2]:


model = pickle.load(open("pricing_model.pkl", "rb"))


# In[3]:


app = Flask(__name__)


# In[4]:



@app.route('/predictions/prices', methods=['POST'])
def predict():

    csv_string = request.get_data().decode("utf-8") # Get input data from the request
    restaurant_data = pd.read_csv(io.StringIO(csv_string))
    initial_data = pd.read_csv("./initial_data.csv")
    print(restaurant_data,initial_data)
    input_data = pd.concat([initial_data, restaurant_data], ignore_index=True)
    print(input_data)
    y = input_data.price
    input_data.info()
    #print(input_data)
    # Perform preprocessing on the input data if required
    input_data.dropna(axis=0, subset=['price'], inplace=True)
    input_data.drop(['price'], axis=1, inplace=True)

    input_data['date'] = pd.to_datetime(input_data['date'])
    
    low_cardinality_cols = [cname for cname in input_data.columns if input_data[cname].nunique() < 10 and 
                        input_data[cname].dtype == "object"]
    
    numeric_cols = [cname for cname in input_data.columns if input_data[cname].dtype in ['int64', 'float64']]

    # Keep selected columns only
    my_cols = low_cardinality_cols + numeric_cols
    input_data1 = input_data[my_cols].copy()

    # One-hot encode the data (to shorten the code, we use pandas)

    input_data1 = pd.get_dummies(input_data1)

    # Make predictions using the loaded model
    predictions = model.predict(input_data1)
    predictions_df = pd.DataFrame({'item_id' : input_data['item_id'],'Actual': y, 'Predicted': predictions})
    aggregated_predictions = predictions_df.groupby(input_data1['item_id']).mean()
    aggregated_predictions['item_id'] = aggregated_predictions['item_id'].astype(int)
    predictions_json = aggregated_predictions.to_json(orient='records')


    return predictions_json


# In[ ]:


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)

