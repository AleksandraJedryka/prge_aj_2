# prge_aj_2
## How to start

``` shell
docker-compose -f ./docker-compose/docker-compose-prge-local.yml --env-file .env -p local-prge up --build -d
```
``` shell
docker system prune -a -f 
```
``` shell
docker system prune --volumes
```

