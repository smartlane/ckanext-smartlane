=============
ckanext-smartlane
=============

.. This is the SMARTLANE extension for CKAN

------------
Requirements
------------

For example, you might want to mention here which versions of CKAN this
extension works with.


------------
Installation
------------

.. Add any additional install steps to the list below.
   For example installing any non-Python dependencies or adding any required
   config settings.

To install ckanext-smartlane:

1. Activate your CKAN virtual environment, for example::

     . /usr/lib/ckan/default/bin/activate

2. Install the ckanext-smartlane Python package into your virtual environment::

     pip install ckanext-smartlane

3. The extension includes angularjs components. Make sure nodejs/npm is installed. Run::

     npm install

4. Add ``smartlane`` to the ``ckan.plugins`` setting in your CKAN
   config file (by default the config file is located at
   ``/etc/ckan/default/production.ini``).

5. Restart CKAN. For example if you've deployed CKAN with Apache on Ubuntu::

     sudo service apache2 reload


---------------
Config Settings
---------------

Document any optional config settings here. For example::

    # The minimum number of hours to wait before re-checking a resource
    # (optional, default: 24).
    ckanext.smartlane.some_setting = some_default_value


------------------------
Development Installation
------------------------

To install ckanext-smartlane for development, activate your CKAN virtualenv and
do::

    git clone https://github.com//ckanext-smartlane.git
    cd ckanext-smartlane
    python setup.py develop
    pip install -r dev-requirements.txt


-----------------
Running the Tests
-----------------

To run the tests, do::

    nosetests --nologcapture --with-pylons=test.ini

To run the tests and produce a coverage report, first make sure you have
coverage installed in your virtualenv (``pip install coverage``) then run::

    nosetests --nologcapture --with-pylons=test.ini --with-coverage --cover-package=ckanext.smartlane --cover-inclusive --cover-erase --cover-tests

TODO: document angularjs testing
