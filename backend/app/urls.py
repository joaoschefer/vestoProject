from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransacaoViewSet, InvestimentoViewSet

router = DefaultRouter()
router.register(r'transacoes', TransacaoViewSet, basename="transacoes")
router.register(r"investimentos", InvestimentoViewSet, basename="investimentos")

urlpatterns = [
    path('', include(router.urls)),
]
