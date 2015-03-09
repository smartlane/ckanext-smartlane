from ckan.lib.base import BaseController, render

import ckan.logic as logic
import ckan.model as model
from ckan.common import c

import urllib2, json

NotFound = logic.NotFound
NotAuthorized = logic.NotAuthorized
get_action = logic.get_action

class AnalysesController(BaseController):
    def show(self, id):
        context = {'model': model, 'session': model.Session,
                   'user': c.user or c.author, 'for_view': True,
                   'auth_user_obj': c.userobj}
        data_dict = {'id': id}
        try:
            c.pkg_dict = get_action('package_update')(context, data_dict)
            c.pkg = context['package']
        except NotFound:
            abort(404, _('Dataset not found'))
        except NotAuthorized:
            abort(401, _('Unauthorized to read dataset %s') % id)    
        return render('package/analyses.html')

class ViewsController(BaseController):
    def show(self, id, view_id):
        context = {'model': model, 'session': model.Session,
                   'user': c.user or c.author, 'for_view': True,
                   'auth_user_obj': c.userobj}
        data_dict = {'id': id}
        try:
            c.pkg_dict = get_action('package_update')(context, data_dict)
            c.pkg = context['package']
        except NotFound:
            abort(404, _('Dataset not found'))
        except NotAuthorized:
            abort(401, _('Unauthorized to read dataset %s') % id)
        return render('package/views/' + view_id + '.html')
