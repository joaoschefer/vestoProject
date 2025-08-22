from rest_framework import viewsets
from .models import Transacao
from .serializers import TransacaoSerializer

class TransacaoViewSet(viewsets.ModelViewSet):
    queryset = Transacao.objects.all().order_by('data', 'criado_em')
    serializer_class = TransacaoSerializer
