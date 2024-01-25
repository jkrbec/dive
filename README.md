# Movie Rating App

Tato aplikace je jednoduchý systém pro hodnocení filmů s backendem v Django a frontendem v Angular.

## Backend - Django

Backend aplikace je postaven na Django frameworku a je spravován pomocí nástroje Poetry pro závislosti a virtuální prostředí.

### Požadavky

- Python 3
- Poetry

### Nastavení a spuštění

1. **Instalace závislostí**:
   Přejděte do složky backendu a nainstalujte závislosti pomocí Poetry:

```
cd .\movie_backend\
poetry install
```

2. **Spouštění lokálního serveru**:
Spusťte Django server:

```
poetry run python manage.py runserver
```

Server by měl být nyní spuštěn na `http://localhost:8000/`.

## Frontend - Angular

Frontend aplikace je vytvořen pomocí Angular frameworku.

### Požadavky

- Node.js
- NPM

### Nastavení a spuštění

1. **Instalace závislostí**:
Přejděte do složky frontendu a nainstalujte závislosti:

```
cd .\movie-frontend\
npm install
```

2. **Spouštění aplikace**:
Spusťte Angular aplikaci:

```
ng serve
```

Frontend by měl být dostupný na `http://localhost:4200/`.

## Použití aplikace

Po spuštění jak backendu, tak frontendu, otevřete webový prohlížeč a přejděte na `http://localhost:4200/` pro přístup k aplikaci pro hodnocení filmů.
