import os

# Secrets come from the environment, never from this file (they were committed
# here once; those values are dead and must not be reused).
Secret_key = os.environ.get('DJANGO_SECRET_KEY', '')
Email = os.environ.get('EMAIL_HOST_USER', '')
Email_Pass = os.environ.get('EMAIL_HOST_PASSWORD', '')
DB_PASS = os.environ.get('DB_PASSWORD', '')
