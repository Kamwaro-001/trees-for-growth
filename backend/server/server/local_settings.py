
AUTHENTICATION_BACKENDS = [
    # allauth specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
    # Needed to login by username in Django admin, regardless of allauth
    'django.contrib.auth.backends.ModelBackend',
]

AUTH_USER_MODEL = 'users.RegisterUser'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'treesforgrowth',
        'USER': 'job',
        'PASSWORD': 'protection101',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
