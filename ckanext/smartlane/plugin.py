import uuid

import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit

from logging import getLogger

import urllib2, json

#from pyutilib.component.core import PluginGlobals

get_action = toolkit.get_action
log = getLogger(__name__)

class SmartlanePlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IResourceController, inherit=True)
    plugins.implements(plugins.IRoutes, inherit=True)
    
    try:
        response = urllib2.urlopen("http://smartlane.io:8088/smartlaneweb/analyses/available", None, 5)
        analyses = json.loads(response.read())
    except:
        analyses = {}

    def before_map(self, route_map):
        analyses_controller = 'ckanext.smartlane.controllers:AnalysesController'
        route_map.connect('analyses', '/dataset/{id}/analyses', controller=analyses_controller, action='show')
        return route_map

    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('fanstatic', 'smartlane')

    def before_create(self, context, pkg_dict):
        if 'parent' in pkg_dict:
            #If this is the created 'child' resource, prevent it being processed
            pkg_dict['url'] = 'http://www.smartlane.de/theme/img/logo.png'
            pkg_dict['format'] = 'EMPTY'

    def after_create(self, context, pkg_dict):
        if 'parent' not in pkg_dict:
            #Create a child resource for the optimisation
            data = pkg_dict.copy()
            #Change the ID to something else
            #Set parent to just created resource
            data['id'] = uuid.uuid4()
            data['parent'] = pkg_dict['id']
            #Change format to make sure datapusher doesn't process it
            data['name'] = 'SMARTLANE Optimized - ' + pkg_dict['name']
            get_action('resource_create')(context, data)

    def after_show(self, pkg_dict):
        if 'type_id' in pkg_dict and pkg_dict['type_id'] in self.analyses:
            pkg_dict['available_analyses'] = self.analyses[pkg_dict['type_id']]
        else:
            pkg_dict['available_analyses'] = []

    #Can we also override package methods that are similarly named? Like this...?
    #PluginGlobals.push_env('package')
    #plugins.implements(plugins.IPackageController, namespace='package', inherit=True) 
    
    #def package.before_show(    
