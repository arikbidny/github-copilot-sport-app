# Flask API Tests

This directory contains tests for the Flask API using Python's `unittest` framework.

## Running Tests

To run all tests:

```bash
# From the flask directory
python run_tests.py

# Or using unittest directly
python -m unittest discover
```

To run a specific test file:

```bash
python -m unittest test_coaches.py
```

To run a specific test case or method:

```bash
python -m unittest test_coaches.TestCoachesAPI.test_get_all_coaches
```

## Test Structure

- `test_coaches.py` - Contains tests for the coaches API endpoints
- `run_tests.py` - Simple test runner script to run all tests

## Writing New Tests

When adding new tests:

1. Create a new file with the naming pattern `test_*.py`
2. Import the `unittest` module
3. Create a test class that inherits from `unittest.TestCase`
4. Implement test methods with names starting with `test_`
5. Use the various assertion methods provided by `unittest.TestCase` to verify behavior

Example:

```python
import unittest

class TestExample(unittest.TestCase):
    def test_something(self):
        self.assertEqual(1 + 1, 2)
```
