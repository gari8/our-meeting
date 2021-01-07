# our-meeting

## migration
```bash
    # local PC
    heroku login
    heroku pg:psql -a our-meeting
    # postgres in heroku
    our-meeting::DATABASE=> \i ./omserver/database/postgres/init/1_init.sql
```