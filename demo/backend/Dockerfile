FROM php:8.3-cli-alpine

WORKDIR /app

# Instalando extensões
RUN docker-php-ext-install pdo pdo_mysql

# Instalando depdendências
COPY ["composer.json", "composer.lock", "./"]
COPY --from=composer /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --no-interaction

EXPOSE 8000
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
