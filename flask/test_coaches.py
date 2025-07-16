#!/usr/bin/env python
# filepath: /Users/arikbidny/Documents/Projects/personal-projects/github-copilot-sport-app/flask/test_coaches.py

import unittest
import json
from coaches import app, nba_coaches, find_coach

class TestCoachesAPI(unittest.TestCase):
    """
    Test cases for the coaches API endpoints
    """
    
    def setUp(self):
        """
        Set up test client and initial data before each test
        """
        self.app = app.test_client()
        self.app.testing = True
        
        # Keep a copy of the original data to restore after tests
        self.original_coaches = nba_coaches.copy()
    
    def tearDown(self):
        """
        Restore original data after each test
        """
        # Reset the nba_coaches list to its original state
        nba_coaches.clear()
        nba_coaches.extend(self.original_coaches)
    
    def test_get_all_coaches(self):
        """Test getting all coaches"""
        response = self.app.get('/api/coaches')
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(data, list)
        self.assertEqual(len(data), len(self.original_coaches))
    
    def test_get_coach_by_id(self):
        """Test getting a specific coach by ID"""
        # Test with a valid ID
        response = self.app.get('/api/coaches/1')
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['id'], 1)
        self.assertEqual(data['name'], 'Steve Kerr')
        
        # Test with an invalid ID
        response = self.app.get('/api/coaches/999')
        self.assertEqual(response.status_code, 404)
    
    def test_create_coach(self):
        """Test creating a new coach"""
        new_coach = {
            "name": "Gregg Popovich",
            "age": 74,
            "team": "San Antonio Spurs",
            "history": [
                {"year": 1999, "achievement": "NBA Champion"},
                {"year": 2003, "achievement": "NBA Champion"}
            ]
        }
        
        response = self.app.post(
            '/api/coaches',
            data=json.dumps(new_coach),
            content_type='application/json'
        )
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 201)
        self.assertEqual(data['name'], new_coach['name'])
        self.assertEqual(data['age'], new_coach['age'])
        self.assertEqual(data['team'], new_coach['team'])
        self.assertEqual(data['history'], new_coach['history'])
        
        # Verify the coach was actually added
        response = self.app.get('/api/coaches')
        data = json.loads(response.data)
        self.assertEqual(len(data), len(self.original_coaches) + 1)
    
    def test_create_coach_invalid_data(self):
        """Test creating a coach with invalid data"""
        # Missing name
        invalid_coach = {
            "age": 60,
            "team": "Test Team"
        }
        
        response = self.app.post(
            '/api/coaches',
            data=json.dumps(invalid_coach),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
    
    def test_update_coach(self):
        """Test updating an existing coach"""
        updated_info = {
            "name": "Steve Kerr",
            "age": 58,  # Updated age
            "team": "Golden State Warriors",
            "history": [
                {"year": 2015, "achievement": "NBA Champion"},
                {"year": 2017, "achievement": "NBA Champion"},
                {"year": 2018, "achievement": "NBA Champion"},
                {"year": 2022, "achievement": "NBA Champion"}  # Added new achievement
            ]
        }
        
        response = self.app.put(
            '/api/coaches/1',
            data=json.dumps(updated_info),
            content_type='application/json'
        )
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['age'], updated_info['age'])
        self.assertEqual(len(data['history']), len(updated_info['history']))
        
        # Test updating non-existent coach
        response = self.app.put(
            '/api/coaches/999',
            data=json.dumps(updated_info),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 404)
    
    def test_delete_coach(self):
        """Test deleting a coach"""
        # First verify the coach exists
        response = self.app.get('/api/coaches/2')
        self.assertEqual(response.status_code, 200)
        
        # Delete the coach
        response = self.app.delete('/api/coaches/2')
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 200)
        self.assertTrue(data['result'])
        
        # Verify the coach was deleted
        response = self.app.get('/api/coaches/2')
        self.assertEqual(response.status_code, 404)
        
        # Test deleting a non-existent coach
        response = self.app.delete('/api/coaches/999')
        self.assertEqual(response.status_code, 404)
    
    def test_find_coach_helper(self):
        """Test the find_coach helper function"""
        # Test finding an existing coach
        coach = find_coach(1)
        self.assertIsNotNone(coach)
        self.assertEqual(coach['name'], 'Steve Kerr')
        
        # Test finding a non-existent coach
        coach = find_coach(999)
        self.assertIsNone(coach)


if __name__ == '__main__':
    unittest.main()
