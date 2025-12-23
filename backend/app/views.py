from rest_framework import viewsets
from .models import Transacao, Investimento
from .serializers import TransacaoSerializer, InvestimentoSerializer

class TransacaoViewSet(viewsets.ModelViewSet):
    queryset = Transacao.objects.all().order_by('data', 'criado_em')
    serializer_class = TransacaoSerializer

class InvestimentoViewSet(viewsets.ModelViewSet):
    queryset = Investimento.objects.all().order_by('-data', '-criado_em')
    serializer_class = InvestimentoSerializer
