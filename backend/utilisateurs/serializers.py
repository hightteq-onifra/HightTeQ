from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Utilisateur

class InscriptionSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=Utilisateur.ROLE, required=False)

    class Meta:
        model = Utilisateur
        fields = ['id', 'username', 'password', 'telephone', 'email', 'role']

    def create(self, validated_data):
        role = validated_data.get('role', 'client')
        is_admin = role == 'admin'

        return Utilisateur.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            telephone=validated_data['telephone'],
            email=validated_data.get('email', ''),
            role=role,
            is_staff=is_admin,
            is_superuser=False
        )

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['role'] = user.role
        token['telephone'] = user.telephone
        return token

class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = ['id', 'username', 'telephone', 'email', 'role']