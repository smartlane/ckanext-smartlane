import uuid

import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
import ckan.lib.navl.dictization_functions as df

from ckan.lib.helpers import OrderedDict
from logging import getLogger

import urllib2, json

#from pyutilib.component.core import PluginGlobals

get_action = toolkit.get_action
log = getLogger(__name__)

Missing = df.Missing

def if_empty_and_geojson_set_geojson(key, data, errors, context):
    value = data[key]
    resource_id = data.get(key[:-1] + ('id',))
    #if resource_id then an update
    if (not value or value is Missing) and not resource_id:
        url = data.get(key[:-1] + ('url',), '')
        if url.split('.')[-1].lower() in ['geojson', 'gjson']:
            data[key] = 'geojson'

class SmartlanePlugin(plugins.SingletonPlugin, toolkit.DefaultDatasetForm):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IResourceController, inherit=True)
    plugins.implements(plugins.IRoutes, inherit=True)
    plugins.implements(plugins.IDatasetForm)
 
    try:
        response = urllib2.urlopen("http://smartlane.io:8088/smartlaneweb/analyses/available", None, 5)
        analyses = json.loads(response.read())
    except:
        analyses = {}

    #We are interested in validating resources. The dataset always exists
    #when we add a resource, so we need to intervene at the update_package
    #stage.
    def update_package_schema(self):
        # default schema in our plugin
        schema = super(SmartlanePlugin, self).update_package_schema()
        # take the existing resources format schema and change it
        resources_schema = schema['resources']
        format_schema = resources_schema['format']
        format_schema.insert(0, if_empty_and_geojson_set_geojson)
        resources_schema['format'] = format_schema
        schema.update({
            'resources': resources_schema
        })
        return schema

    def is_fallback(self):
        # Do this with any kind of package
        return True;

    def package_types(self):
        # This plugin doesn't handle any special package types, it just
        # registers itself as the default (above).
        return []

    def before_map(self, route_map):
        analyses_controller = 'ckanext.smartlane.controllers:AnalysesController'
        route_map.connect('analyses', '/dataset/{id}/analyses', controller=analyses_controller, action='show', ckan_icon='bar-chart')
        analyses_partials_controller = 'ckanext.smartlane.controllers:AnalysesPartialsController'
        route_map.connect('partials', '/dataset/{id}/partials/{partial_id}.html', controller=analyses_partials_controller, action='show')
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
