from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    RegisterSerializer,
    UserProfileSerializer,
    HightTeQTokenObtainPairSerializer,
)


class RegisterView(generics.CreateAPIView):
    """
    POST /api/auth/register/
    Création d'un compte CLIENT. Retourne le profil créé (pas de token,
    l'utilisateur doit ensuite se connecter via /api/auth/login/).
    """

    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            UserProfileSerializer(user).data,
            status=status.HTTP_201_CREATED,
        )


class LoginView(TokenObtainPairView):
    """
    POST /api/auth/login/
    Point d'entrée unique client + admin. Body attendu : {username, password}.
    Réponse : {access, refresh, role, username}.
    Le front redirige vers l'espace client ou le back-office selon `role`.
    """

    serializer_class = HightTeQTokenObtainPairSerializer


class LogoutView(APIView):
    """
    POST /api/auth/logout/
    Body : {"refresh": "<refresh_token>"}
    Met le refresh token en liste noire (nécessite
    rest_framework_simplejwt.token_blacklist dans INSTALLED_APPS).
    """

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response(
                {"detail": "Le champ 'refresh' est requis."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception:
            return Response(
                {"detail": "Token invalide ou déjà expiré."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(status=status.HTTP_205_RESET_CONTENT)


class MeView(generics.RetrieveUpdateAPIView):
    """
    GET/PATCH /api/auth/me/
    Profil de l'utilisateur connecté (client ou admin).
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user
