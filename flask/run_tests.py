#!/usr/bin/env python
# filepath: /Users/arikbidny/Documents/Projects/personal-projects/github-copilot-sport-app/flask/run_tests.py

import unittest
import sys

def run_tests():
    """
    Discover and run all tests in the current directory
    """
    # Auto-discover tests in the current directory
    test_suite = unittest.defaultTestLoader.discover('.', pattern='test_*.py')
    test_runner = unittest.TextTestRunner(verbosity=2)
    result = test_runner.run(test_suite)
    
    # Return appropriate exit code: 0 for success, 1 for failure
    return 0 if result.wasSuccessful() else 1

if __name__ == '__main__':
    sys.exit(run_tests())
