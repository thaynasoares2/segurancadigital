#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input

python manage.py migrate

python manage.py importar_matriz docs/MATRIZ_CONTROLES_v0.csv --versao v0.1

python manage.py seed_alpha --versao v0.1
