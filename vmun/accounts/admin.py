from django.contrib import admin
from .models import User, Place, Link, Education

admin.site.register(User)
admin.site.register(Place)
admin.site.register(Link)
admin.site.register(Education)
