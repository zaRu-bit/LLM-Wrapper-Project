# An LLM wrapper project website
![Login Page](images/LLMRegister.PNG "The Login Page")

This is a project that aims to implement deepseeks API into a wrapper website that functions like OpenAI's chatGPT. It is made to dive into creating frontend and backend from scratch while handling API requests for the LLM models.

This is a way to learn using Flask for backend and connecting it with a React frontend to create an entire project from start to finish while also adhering to security requirements such as hashing passwords and handling payment information.

For Mac/Unix create a virtual environment using venv and then cd into "/backend" then run ```python3 -m pip install -r requirements.txt``` if using windows create the same virtual environment then run ```py -m pip install -r requirements.txt```
To start the backend run ```py app.py``` in windows to start or in Mac/Unix run ```python3 app.py```

For the React/Vite side of things simply cd into /frontend/sight and then run ```npm install``` when first cloning the project.
To start the frontend run ```npm run dev``` to start it.

You'll need to create a ```.env``` file to store your own Deepseek or OpenAI API key. Put this file in "/backend' and place ```DEEPSEEK_API_KEY=Your API Key```
