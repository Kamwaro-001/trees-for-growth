DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'treesforgrowth',
        'USER': 'postgres',
        'PASSWORD': 'kamikaze1',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
)

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ]
}

DJOSER = {
    "USER_ID_FIELD": "username"
}

SITE_ID = 1