# Commands

Just a place for me to store the commands for the stuff to run.

```bash
cd .. && venv\Scripts\activate && cd vmun
venv\Scripts\activate && cd vmun

webpack site_static/site/js/core/handle/400.js -o static/site/core/handle/400.js
webpack site_static/site/js/core/handle/404.js -o static/site/core/handle/404.js
webpack site_static/site/js/core/handle/403.js -o static/site/core/handle/403.js
webpack site_static/site/js/core/handle/500.js -o static/site/core/handle/500.js

webpack site_static/site/js/core/index.js -o static/site/core/index.js
webpack site_static/site/js/accounts/auth/auth_login.js -o static/site/accounts/auth/auth_login.js
webpack site_static/site/js/accounts/auth/auth_signup.js -o static/site/accounts/auth/auth_signup.js


python manage.py runserver
```