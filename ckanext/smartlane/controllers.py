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
            c.pkg_dict = get_action('package_show')(context, data_dict)
            c.pkg = context['package']
            try:
                response = urllib2.urlopen("http://smartlane.io:8088/smartlaneweb/analyses/available", None, 5)
                analyses_data = json.loads(response.read())
                c.analyses = analyses_data['anpr']
            except:
                c.analyses = []
            dataset_type = c.pkg_dict['type'] or 'dataset'
        except NotFound:
            abort(404, _('Dataset not found'))
        except NotAuthorized:
            abort(401, _('Unauthorized to read dataset %s') % id)    
        return render('package/analyses.html')
