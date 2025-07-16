# NBA Sports App - Technical Context

## Core Technologies

### Frontend
- **Next.js 14**: App Router for routing and server components
- **React**: UI library for component-based development
- **TypeScript**: For type-safe JavaScript code
- **Tailwind CSS**: Utility-first CSS framework for styling
- **ShadcN UI**: Component library based on Radix UI
- **Axios**: HTTP client for API requests

### Backend
- **Next.js API Routes**: For serving API endpoints
- **Flask**: Python microservice for coaches data API
- **JSON**: For data storage in development environment

### Testing
- **Jest**: JavaScript testing framework
- **React Testing Library**: For testing React components
- **unittest**: Python testing framework for Flask components

### DevOps & Deployment
- **Docker**: For containerization
- **Kubernetes**: For orchestration (Azure AKS)
- **GitLab CI/CD**: For continuous integration and deployment
- **Azure Kubernetes Service (AKS)**: Target deployment platform

### Development Tools
- **Bun**: JavaScript runtime and package manager
- **ESLint**: JavaScript and TypeScript linting
- **GitHub Copilot**: AI-assisted development
- **VS Code**: Primary development environment

## Development Setup

### Local Environment
To set up the local development environment:

1. Clone the repository
2. Install dependencies with `bun install`
3. Run the development server with `bun run dev`
4. For Flask components, set up a Python virtual environment and install requirements
5. Run Flask development server with `python flask/coaches.py`

### Environment Variables
- No sensitive environment variables required for local development
- Production deployment requires Azure credentials

### Development Ports
- Next.js app runs on port 3000 (or 3001 if 3000 is in use)
- Flask microservice runs on port 5000

## Code Conventions

### TypeScript/JavaScript
- **Formatting**: Double quotes for strings, tabs for indentation
- **Components**: Functional components with React hooks
- **API Calls**: Axios is the preferred HTTP client
- **Error Handling**: Try/catch blocks for API calls and error boundaries for components

### Python
- **Testing**: unittest framework for all Python tests
- **Formatting**: PEP 8 style guide
- **API**: Flask for RESTful API endpoints

### Styling
- **CSS Framework**: Tailwind CSS for all styling
- **Component Library**: ShadcN UI components
- **Responsiveness**: Mobile-first approach with responsive classes

## Project Structure

### Key Directories
- `/src/app`: Next.js application routes and pages
- `/src/components`: Reusable React components
- `/src/app/api`: API routes for Next.js backend
- `/src/data`: Static data files
- `/src/lib`: Utility functions and helpers
- `/flask`: Python microservice for coaches data
- `/kubernetes`: Kubernetes deployment configurations
- `/memory-bank`: Project context and documentation
- `/__tests__`: Test files for React components

### File Organization
- Feature-based organization within the app directory
- Shared components in the components directory
- API routes organized by resource type

## Technical Constraints

### Performance Requirements
- Initial page load under 2 seconds
- API responses under 500ms
- Optimize for mobile data usage

### Browser Support
- Modern browsers (last 2 versions)
- Progressive enhancement for older browsers

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility

### Security
- Input validation for all form data
- Proper escaping of rendered content
- No hardcoded secrets in codebase

## Dependencies & Third-party Services

### NPM Dependencies
- Key frontend libraries: React, Next.js, Tailwind CSS, ShadcN UI, Axios
- Testing: Jest, React Testing Library
- Development: ESLint, TypeScript

### Python Dependencies
- Flask for API microservice
- unittest for testing

### External Services
- None for development (self-contained)
- Azure services for production deployment

## Build & Deployment

### Build Process
- Next.js build process for frontend and API routes
- Docker build for containerization

### Deployment Pipeline
- GitLab CI/CD pipeline for automated deployments
- Environment-specific deployments (dev, staging, prod)
- Kubernetes manifests for AKS deployment

### Release Strategy
- Feature branch workflow
- Pull request reviews before merge
- Automated testing on CI/CD pipeline
- Environment-based progressive deployment
