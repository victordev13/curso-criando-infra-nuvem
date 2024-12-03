# Criando uma infraestrutura na nuvem

Material do curso "Criando uma infraestrutura na nuvem" (aplicação, banco, testes, e deploy em ambientes de sandbox e produção).

## Preparação

### Pré-requisitos

Certifique-se que você tenha instalados:

1. [Docker](https://docs.docker.com/get-docker) e [Docker Compose](https://docs.docker.com/compose)
2. [AWS CLI](https://aws.amazon.com/pt/cli/)

### Imagens Docker

Para facilitar no dia do curso, baixe as imagens Docker necessárias para nossa aplicação de demonstração:

```shell
docker pull php:8.3-cli-alpine
docker pull node:23-alpine
docker pull mariadb:11
```

## Slides

Clone este repositório com a _flag_ `--recursive`:

```shell
git clone --recursive git@github.com:vcampitelli/curso-criando-infra-nuvem.git
```

Acesse o arquivo [`docs/index.html`](./docs/index.html) em seu navegador.

## Código da demonstração

Estão na pasta [`demo`](./demo).
