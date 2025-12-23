from rest_framework import serializers
from .models import Transacao, Investimento

class TransacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transacao
        fields = '__all__' # pega todos os campos do modelo

class InvestimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investimento
        fields = '__all__'
