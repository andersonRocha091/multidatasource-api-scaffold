docker run \
 --name postgres \
 -e POSTGRES_USER=anderson \
 -e POSTGRES_PASSORD=anderson \
 -e POSTGRES_DB=heroes \
 -e 5433:5433 \
 -d \
 postgres
