FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

RUN mkdir /setup
COPY requirements.txt /setup/
RUN pip install -r /setup/requirements.txt