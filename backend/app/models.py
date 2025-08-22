from django.db import models

class Transacao(models.Model):
    TIPO_CHOICES = [
        ('despesa', 'Despesa'),
        ('ganho', 'Ganho (Receita)'),
    ]

    METODO_PAGAMENTO_CHOICES = [
        ('Dinheiro', 'Dinheiro'),
        ('Cartão de Crédito', 'Cartão de Crédito'),
        ('Cartão de Débito', 'Cartão de Débito'),
        ('Pix', 'Pix'),
        ('Boleto', 'Boleto'),
        ('Transferência Bancária', 'Transferência Bancária'),
        ('Outro', 'Outro'),
    ]

    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data = models.DateField()
    descricao = models.CharField(max_length=255, blank=True, null=True)
    categoria = models.CharField(max_length=100)
    metodoPagamento = models.CharField(max_length=50)
    criado_em = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-data', '-criado_em']
