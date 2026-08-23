from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    """
    Inscription côté client uniquement.
    Le rôle ADMIN n'est jamais attribuable via cette API publique :
    un compte admin se crée via `createsuperuser` ou depuis le back-office
    par un admin déjà existant.
    """

    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "id", "username", "email", "password", "password_confirm",
            "first_name", "last_name", "phone_number", "company_name",
        ]

    def validate(self, attrs):
        if attrs["password"] != attrs.pop("password_confirm"):
            raise serializers.ValidationError({"password_confirm": "Les mots de passe ne correspondent pas."})
        return attrs

    def create(self, validated_data):
        validated_data["role"] = User.Role.CLIENT
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    """Profil renvoyé par /me/ — utilisé par le front pour afficher le compte connecté."""

    class Meta:
        model = User
        fields = [
            "id", "username", "email", "first_name", "last_name",
            "phone_number", "company_name", "role",
        ]
        read_only_fields = ["role"]


class HightTeQTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Login unique (client ET admin) : le rôle est injecté dans le payload du
    token JWT pour que le front adapte l'interface (espace client vs back-office)
    sans appel supplémentaire.
    """

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["role"] = user.role
        token["username"] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["role"] = self.user.role
        data["username"] = self.user.username
        return data
