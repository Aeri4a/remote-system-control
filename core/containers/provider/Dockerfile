FROM python:3.12-alpine3.19

# Docker socket
RUN apk add docker

# Flask app

WORKDIR /app

COPY ./requirements.txt .
RUN pip install -r requirements.txt
COPY . .

ENV FLASK_APP=app.py

CMD ["python", "-u", "-m", "flask", "run", "--host=0.0.0.0"]
