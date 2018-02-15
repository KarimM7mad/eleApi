from django.test import TestCase

# Create your tests here.
from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class Account(APITestCase):
    def test_create_account(self):
        """
        Ensure we can create a new account object.
        """
        url = '/data/'
        data = {'speed': 222,'avSpeed':2}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, data)