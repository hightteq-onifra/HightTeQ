from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Utilisateur personnalisé HightTeQ.

    Deux profils utilisent ce même modèle :
    - CLIENT  : particulier / entreprise qui consulte le catalogue,
                compose un panier et suit ses demandes envoyées via WhatsApp.
    - ADMIN   : gestionnaire HightTeQ qui administre le catalogue
                (produits, services, marques) depuis le back-office.

    Le champ `role` permet de distinguer les deux côté API (permissions,
    sérialisation, tableaux de bord), en plus des flags standards Django
    `is_staff` / `is_superuser` utilisés pour l'accès à /admin/.
    """

    class Role(models.TextChoices):
        CLIENT = "CLIENT", "Client"
        ADMIN = "ADMIN", "Administrateur"

    role = models.CharField(
        max_length=10,
        choices=Role.choices,
        default=Role.CLIENT,
    )
    phone_number = models.CharField(
        "Numéro de téléphone",
        max_length=20,
        blank=True,
        help_text="Utilisé pour pré-remplir le contact si besoin (hors flux WhatsApp panier).",
    )
    company_name = models.CharField(
        "Entreprise",
        max_length=150,
        blank=True,
        help_text="Renseigné si le client est une entreprise / institution.",
    )

    def save(self, *args, **kwargs):
        # Un utilisateur ADMIN doit systématiquement pouvoir accéder au back-office Django.
        if self.role == self.Role.ADMIN:
            self.is_staff = True
        super().save(*args, **kwargs)

    @property
    def is_client(self):
        return self.role == self.Role.CLIENT

    @property
    def is_admin_role(self):
        return self.role == self.Role.ADMIN

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
