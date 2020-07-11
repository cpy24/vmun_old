# Conventions
This file is a reminder of how things are done in this repository. As an end user, you won't be required to follow the guideline, but it's strongly recommended for your fork to stay inline with this repository.

## Respecting the Import Order
```python
# System libraries
import os
import re
from datetime import datetime

# Third-party libraries
import boto
from PIL import Image

# Django modules
from django.db import models
from django.conf import settings

# Django apps
from cms.models import Page

# Current-app modules
from . import app_settings
```

## Creating App Configuration
```python
# magazine/apps.py
from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class MagazineAppConfig(AppConfig):
    name = "magazine"
    verbose_name = _("Magazine")

    def ready(self):
        from . import signals
```
```python
# magazine/__init__.py
default_app_config = "magazine.apps.MagazineAppConfig"

```
```python
# magazine/signals.py
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.conf import settings

from .models import NewsArticle


@receiver(post_save, sender=NewsArticle)
def news_save_handler(sender, **kwargs):
    if settings.DEBUG:
        print(f"{kwargs['instance']} saved.")


@receiver(post_delete, sender=NewsArticle)
def news_delete_handler(sender, **kwargs):
    if settings.DEBUG:
        print(f"{kwargs['instance']} deleted.")
```