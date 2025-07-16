#!/bin/bash

# Run Jest tests for the Stadium components
echo "Running tests for Stadium components..."
npm test -- StadiumCard.test.tsx StadiumsPage.test.tsx

# If you want to run with coverage
# npm test -- StadiumCard.test.tsx StadiumsPage.test.tsx --coverage
