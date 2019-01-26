FROM ubuntu:18.10
COPY gateway.bin home/.
COPY config.conf home/.
WORKDIR home/
RUN ["chmod", "+x", "gateway.bin"]
EXPOSE 5000
