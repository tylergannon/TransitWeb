FROM tylergannon/alpine-fish
RUN apk add --no-cache unit \
    && mkdir -p /var/www/html \
    && chgrp -R unit /var/www
ARG update=2
COPY ./init_container.sh  /etc/
COPY ./unit-config.d/ /etc/unit-config.d

EXPOSE 80 443

ARG CONTAINER_ID="tylergannon/unit"
ARG CONTAINER_HOST_ID="Unknown"
ENV CONTAINER_ID=${CONTAINER_ID} CONTAINER_HOST_ID=${CONTAINER_HOST_ID}
CMD ["/etc/init_container.sh"]
VOLUME [ "/etc/unit-config.d/" ]
VOLUME [ "/var/www/html" ]

