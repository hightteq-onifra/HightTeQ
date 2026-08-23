from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models import User


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    """
    Back-office HightTeQ, accessible sur /admin/ (login Django standard,
    protégé par is_staff). Seuls les comptes role=ADMIN ont is_staff=True
    (voir User.save()), donc seuls les administrateurs peuvent s'y connecter.
    """

    list_display = ["username", "email", "role", "is_staff", "is_active", "date_joined"]
    list_filter = ["role", "is_staff", "is_active"]
    search_fields = ["username", "email", "phone_number", "company_name"]

    fieldsets = DjangoUserAdmin.fieldsets + (
        ("HightTeQ", {"fields": ("role", "phone_number", "company_name")}),
    )
    add_fieldsets = DjangoUserAdmin.add_fieldsets + (
        ("HightTeQ", {"fields": ("role", "phone_number", "company_name")}),
    )
