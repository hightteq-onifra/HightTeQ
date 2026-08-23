# --- À ajouter/fusionner dans hightteq_backend/settings.py ---

from datetime import timedelta

INSTALLED_APPS += [
    "rest_framework",
    "rest_framework_simplejwt.token_blacklist",  # nécessaire pour /logout/
    "accounts",
]

AUTH_USER_MODEL = "accounts.User"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
}

# --- À ajouter dans hightteq_backend/urls.py ---
#
# from django.urls import path, include
#
# urlpatterns = [
#     path("admin/", admin.site.urls),                 # login admin (session, back-office)
#     path("api/auth/", include("accounts.urls")),      # login client + admin (JWT, API)
#     ...
# ]
