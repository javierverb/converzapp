FROM ubuntu:18.10
RUN apt-get update && apt-get upgrade -y
COPY gateway.bin home/.
COPY config.conf home/.
WORKDIR home/
RUN ["chmod", "+x", "gateway.bin"]
EXPOSE 5000
