#!/bin/bash
/wait-for-postgres.sh flyway -url=jdbc:postgresql://db:5432/${PGDATABASE} -schemas=${DB_SCHEMA} -user=${PGUSER} -password=${PGPASSWORD} migrate
