FROM ubuntu:16.04
MAINTAINER Eyevinn Technology <info@eyevinn.se>
RUN apt-get update && apt-get install -y --force-yes nodejs npm curl
RUN npm install -g n
RUN n lts
RUN mkdir /opt/player
ADD server.js /opt/player/
ADD package.json /opt/player/
ADD public /opt/player/public
ADD views /opt/player/views
RUN cd /opt/player/ && npm install
COPY entrypoint.sh /root/entrypoint.sh
RUN chmod 755 /root/entrypoint.sh
EXPOSE 80
CMD /root/entrypoint.sh
