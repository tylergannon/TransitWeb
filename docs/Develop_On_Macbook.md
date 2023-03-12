Need to manually initiate replica set on dev server:

```
docker compose up -d
docker compose exec mongod bash
> mongosh -u $user -p $password admin
> > rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: 'mongodb' }] })
```
