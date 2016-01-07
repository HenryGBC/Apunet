from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers
from personal.views import PersonalViewSet
from personal import views
router = routers.DefaultRouter()

router.register(r'personal', PersonalViewSet)
#router.register(r'datos-academicos', DatosAcademicosViewSet)
urlpatterns = [
    # Examples:
    url(r'^$', 'personal.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^api/', include(router.urls)),
    url(r'^api/datos-academicos/$', views.DatosAcademicosCreate.as_view()),
    url(r'^api/datos-academicos/(?P<pk>[0-9]+)/$', views.DatosAcademicosDetail.as_view()),
    url(r'^api/familiar/$', views.FamiliarCreate.as_view()),
    url(r'^api/familiar-list/(?P<pk>[0-9]+)/$', views.FamiliarList.as_view()),
    url(r'^api/familiar-detail/(?P<pk>[0-9]+)/$', views.FamiliarDetail.as_view()),
    url(r'^api/cuotas/$', views.CuotasCreate.as_view()),
    url(r'^api/cuotas/(?P<pk>[0-9]+)/$', views.CuotasDetail.as_view()),
    url(r'^api/cargo/$', views.CargoCreate.as_view()),
    url(r'^api/cargo-list/(?P<pk>[0-9]+)/$', views.CargoList.as_view()),
    url(r'^api/cargo-detail/(?P<pk>[0-9]+)/$', views.CargoDetail.as_view()),
    url(r'^api/deporte/$', views.DeporteCreate.as_view()),
    url(r'^api/deporte-list/(?P<pk>[0-9]+)/$', views.DeporteList.as_view()),
    url(r'^api/deporte-detail/(?P<pk>[0-9]+)/$', views.DeporteDetail.as_view()),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^api/noticias/(?P<username>\w+)/$', views.profile_page,),
]
