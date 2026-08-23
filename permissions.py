from rest_framework.permissions import BasePermission


class IsAdminRole(BasePermission):
    """
    Autorise uniquement les utilisateurs avec role=ADMIN.
    À utiliser sur les endpoints de gestion du catalogue
    (création/édition produits, services, marques...).
    """

    message = "Accès réservé aux administrateurs HightTeQ."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.is_admin_role
        )


class IsClientRole(BasePermission):
    """Autorise uniquement les utilisateurs avec role=CLIENT (ex: historique de panier)."""

    message = "Accès réservé aux comptes clients."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.is_client
        )
