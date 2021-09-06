from pathlib import Path

from .local_settings import *
import os

BASE_DIR = Path(__file__).resolve(strict=True).parent.parent
SECRET_KEY = '!wzd+ws1+apy$n6bby-2s)==s@aj6-xf-(a1&f3a%vt)fhl&bb'
DEBUG = True
ALLOWED_HOSTS = ['*', '127.0.0.1']


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Install apps
    'crispy_forms',  # crispy forms
    'rest_framework',  # DRF
    'rest_framework.authtoken',  # DRF
    'django_rest_passwordreset',  # DRF Password Reset
    'knox',  # DRF Token verification
    'coverage',  # DRF Token verification
    'ckeditor',  # Rich text editor
    'django_filters',  # Filters

    # Django Apps
    'home',
    'menu',
    'users',
    'order',
    'room',
    'analytics',
]

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
)

# DRF
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.s
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'knox.auth.TokenAuthentication',  # Knox DRF
        'rest_framework.authentication.SessionAuthentication',  # DRF Authentication
        'rest_framework.authentication.TokenAuthentication',  # DRF Authentication
    ),
    # 'DEFAULT_PERMISSION_CLASSES': [
    #     'rest_framework.permissions.IsAuthenticated',
    #     'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'  # Basic DRF
    # ]
}


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'golden_nest.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'order.context_processors.cart_details',  # show cart in all page
                'home.context_processors.get_reservation_data',  # show cart in all page
                'home.context_processors.get_current_year_to_context',  # current year
            ],
        },
    },
]

WSGI_APPLICATION = 'golden_nest.wsgi.application'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


AUTH_PASSWORD_VALIDATORS = [
    # {
    #     'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    # },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# For indian currency commas
USE_THOUSAND_SEPARATOR = True
FORMAT_MODULE_PATH = [
    'golden_nest.formats',
]



SITE_ID = 1
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Calcutta'  # Indian time
USE_I18N = True
USE_L10N = True
# USE_TZ = True

# User Model
AUTH_USER_MODEL = 'users.User'  # Custom User Model

# BootStrap
CRISPY_TEMPLATE_PACK = 'bootstrap4'  # To use Bootstrap

# Basic Static and Media Files settings
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

LOGIN_REDIRECT_URL = '/'  # Redirect after login
LOGIN_URL = 'login'  # Login URL

# Basic Email sending settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'Email'
EMAIL_HOST_PASSWORD = 'Email_Pass'
FAST_SMS_API = 'UcHqYglQVhfF37nmeZxs0uOXGSDJ2dEKoMAwT69tWBzRyvpC4iRmbtlX5zwvKJ0UYianhP3s87eExDg2'
