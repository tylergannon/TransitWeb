FROM alpine:edge
RUN apk add --no-cache unit dumb-init curl \
    && mkdir -p /var/www/html \
    && chgrp -R unit /var/www
ARG update=2
COPY ./init_container.sh  /etc/
COPY ./unit-config.d/ /etc/unit-config.d

EXPOSE 80 443
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/etc/init_container.sh"]
VOLUME [ "/etc/unit-config.d/" ]
VOLUME [ "/var/www/html" ]
# CMD ["/usr/sbin/unitd", "--no-daemon", "--control", "unix:/var/run/control.unit.sock"]
