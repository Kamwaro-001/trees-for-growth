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
ACCOUNT_EMAIL_VERIFICATION = 'none'
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
