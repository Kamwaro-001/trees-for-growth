import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

#################################################################
##  Get Django environment set by docker (i.e either development or production), or else set it to local ##
#################################################################
try:
    DJANGO_ENV = os.environ.get("DJANGO_ENV")
except:
    DJANGO_ENV = 'local'

#################################################################
    ##  If Django environement has been set by docker it would be either development or production otherwise it would be undefined or local ##
#################################################################
if DJANGO_ENV == 'development' or DJANGO_ENV == 'production':

    try:
        SECRET_KEY = os.environ.get("SECRET_KEY")
    except:
        SECRET_KEY = 'localsecret'

    try:
        DEBUG = int(os.environ.get("DEBUG", default=0))
    except:
        DEBUG = False

    try:
        ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS").split(" ")
    except:
        ALLOWED_HOSTS = ['127.0.0.1', '0.0.0.0', 'localhost']

    DATABASES = {
        "default": {
            "ENGINE": os.environ.get("DB_ENGINE", "django.db.backends.sqlite3"),
            "NAME": os.environ.get("DB_DATABASE", os.path.join(BASE_DIR, "db.sqlite3")),
            "USER": os.environ.get("DB_USER", "user"),
            "PASSWORD": os.environ.get("DB_PASSWORD", "password"),
            "HOST": os.environ.get("DB_HOST", "localhost"),
            "PORT": os.environ.get("DB_PORT", "5432"),
        }
    }
else:
    SECRET_KEY = 'localsecret'
    DEBUG = True
    ALLOWED_HOSTS = ['127.0.0.1', '0.0.0.0', 'localhost']
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

CORS_ORIGIN_ALLOW_ALL = True

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
    'http://127.0.0.1:8000'
)

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ]
}

DJOSER = {
    "USER_ID_FIELD": "username",
    "LOGIN_FIELD": "email",
    "PASSWORD_RESET_CONFIRM_URL": "reset_password/{uid}/{token}",
}

SITE_ID = 1
