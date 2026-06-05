# Lab 14: RESTful API Deployment and Testing Report

This report presents the implementation, UI client portal design, and testing evidence (Unit, Integration, and System) for **Task 1 (Weather Forecast API)** and **Task 2 (News Headlines API)**.

---

## 📸 Client UI Screenshots

Below are mockup representations of the premium user interfaces built as front-end testbeds for the REST APIs:

### 1. AeroWeather Forecast Dashboard UI
![Weather Forecast Client UI](file:///c:/Users/Super/Downloads/lab03/lab_14_api_restful_deployment_and_testing_lab/report/weather_dashboard.png)

### 2. GlobalNews headlines Grid UI
![News Headlines Client UI](file:///c:/Users/Super/Downloads/lab03/lab_14_api_restful_deployment_and_testing_lab/report/news_dashboard.png)

---

## 🛠️ Folder Structure & Architecture

Each task is implemented inside its own isolated subdirectory to support clean deployment:

```
lab_14_api_restful_deployment_and_testing_lab/
├── weather-api/                # Task 1: Weather API Project
│   ├── public/                 # Static web client assets (index.html, style.css)
│   ├── src/                    # Backend source files (app.js, server.js)
│   │   ├── controllers/        # Request controller (weatherController.js)
│   │   └── services/           # OpenWeather Map API service (weatherService.js)
│   ├── tests/                  # Jest test directories
│   │   ├── unit/               # Service logic & Mock tests
│   │   ├── integration/        # Route parameter & Endpoint tests
│   │   └── system/             # Programmatic socket listening system tests
│   └── package.json
│
├── news-api/                   # Task 2: News API Project
│   ├── public/                 # Static web client assets (index.html, style.css)
│   ├── src/                    # Backend source files (app.js, server.js)
│   │   ├── controllers/        # Request controller (newsController.js)
│   │   └── services/           # NewsAPI.org service (newsService.js)
│   ├── tests/                  # Jest test directories
│   │   ├── unit/               # Service logic & Mock tests
│   │   ├── integration/        # Route parameter & Endpoint tests
│   │   └── system/             # Programmatic socket listening system tests
│   └── package.json
│
└── report/                     # Verification and Submission Assets
    ├── README.md               # Main report details (this file)
    ├── test_results.txt        # Jest stdout captured logs
    ├── weather_dashboard.png   # Dashboard UI preview screenshot
    └── news_dashboard.png      # headlines UI preview screenshot
```

---

## 🧪 Testing Strategies (Jest Framework)

To thoroughly validate the systems, three layers of testing were implemented:

### 1. Unit Testing (`tests/unit/`)
* **Objective:** Test internal functions, data structures, formatting logic, validation, and error mapping in isolation.
* **Mechanism:** Mocked `axios` responses using Jest spy capabilities (`jest.mock('axios')`) to block actual network requests.
* **Scenarios Covered:**
  * Success cases (correctly mapping external API structures into standard format).
  * Error scenarios (mapping HTTP 404/500 code exceptions into client-friendly messages).
  * Internal fallbacks (testing local database resolution when no external API key is set).

### 2. Integration Testing (`tests/integration/`)
* **Objective:** Test the HTTP request/response pipeline, controller route mappings, middleware, and query validation.
* **Mechanism:** Uses `supertest` to query the Express `app` module without binding to a local port (preventing port conflicts).
* **Scenarios Covered:**
  * Endpoint parameters validation (e.g. invalid city names, missing query parameter, short country codes).
  * HTTP Status returns (e.g. 200 OK, 400 Bad Request, 404 Not Found).
  * Static file delivery and wildcard fallbacks.

### 3. System Testing (`tests/system/`)
* **Objective:** Verify that the completely compiled system operates correctly under standard network scenarios.
* **Mechanism:** Spins up the Express app inside a real programmatical Node HTTP Server on a dynamic, randomly assigned port, executes requests using `axios` over loopback address (`http://localhost:{port}`), and tears down the listener afterwards.
* **Scenarios Covered:**
  * End-to-end lookup of known records.
  * Validation rules on full server instances.
  * Route matching on real network requests.

---

## 🚀 Execution Instructions

### Prerequisites
Make sure you have Node.js and NPM installed.

### Setup and Running the Applications
To spin up the REST servers and access the premium web client portals:

1. **Weather Forecast API (runs on Port 3001):**
   ```bash
   cd weather-api
   npm install
   # (Optional) Rename .env.example to .env and add your OpenWeather API key
   npm start
   ```
   Open [http://localhost:3001](http://localhost:3001) in your browser.

2. **News Headlines API (runs on Port 3002):**
   ```bash
   cd ../news-api
   npm install
   # (Optional) Rename .env.example to .env and add your NewsAPI key
   npm start
   ```
   Open [http://localhost:3002](http://localhost:3002) in your browser.

### Running Jest Test Suites
To run all tests (Unit, Integration, System) inside their respective directories:
```bash
# Weather API
cd weather-api
npm test

# News API
cd news-api
npm test
```

---

## 📈 Jest Test Execution Results Evidence

The entire testing suites successfully executed and passed all assertions:

```text
=================== WEATHER FORECAST API JEST RESULTS ===================

PASS tests/system/weatherSystem.test.js
  Weather REST API - End-to-End System Tests
    ✓ System should resolve end-to-end request for a known city (Tokyo) (120 ms)
    ✓ System should handle end-to-end validation failure for invalid input parameters (74 ms)
    ✓ System should handle end-to-end API failure mapping for missing entries (11 ms)

PASS tests/integration/weatherApi.test.js
  Weather API - Integration Tests
    GET /api/weather
      ✓ should return 200 OK and weather data for a valid city (39 ms)
      ✓ should return 400 Bad Request if city query param is missing (27 ms)
      ✓ should return 400 Bad Request if city query is empty spaces (14 ms)
      ✓ should return 404 Not Found for non-existing city in database (13 ms)
    Static Site Serving & Fallback Router
      ✓ should serve index.html on root path GET / (20 ms)
      ✓ should return 404 for unhandled API routes (14 ms)

PASS tests/unit/weatherService.test.js
  Weather Service - Unit Tests
    When API key is NOT configured (Local Mock Database Mode)
      ✓ should fetch weather from local mock DB for valid cities (3 ms)
      ✓ should be case-insensitive when fetching from local mock DB (2 ms)
      ✓ should throw a 404 error if city is not in mock DB (2 ms)
      ✓ should throw an error for empty city string (10 ms)
    When API key IS configured (External API Mode)
      ✓ should fetch and format data successfully from external API (3 ms)
      ✓ should handle external API 404 errors (3 ms)
      ✓ should handle generic API connection errors (2 ms)

Test Suites: 3 passed, 3 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        1.604 s
Ran all test suites.


=================== NEWS HEADLINES API JEST RESULTS ===================

PASS tests/unit/newsService.test.js
  News Service - Unit Tests
    When API key is NOT configured (Local Mock Database Mode)
      ✓ should fetch news headlines from mock database for valid codes (13 ms)
      ✓ should handle inputs with spaces and mixed case correctly (3 ms)
      ✓ should reject codes that are not 2 characters in length (3 ms)
      ✓ should throw error for empty country codes (18 ms)
    When API key IS configured (External API Mode)
      ✓ should fetch, filter, and limit to 10 articles successfully from external API (5 ms)
      ✓ should handle external API error states (3 ms)
      ✓ should handle service connection failure gracefully (3 ms)

PASS tests/integration/newsApi.test.js
  News API - Integration Tests
    GET /api/news/:countryCode
      ✓ should return 200 OK and articles array for valid country code (80 ms)
      ✓ should return 400 Bad Request for dynamic param with invalid country code size (16 ms)
      ✓ should return 400 Bad Request for country code shorter than 2 characters (14 ms)
    Static Site Serving & Router Fallback
      ✓ should serve index.html on root endpoint GET / (20 ms)
      ✓ should return 404 for undefined routes (15 ms)

PASS tests/system/newsSystem.test.js
  News REST API - End-to-End System Tests
    ✓ System should resolve end-to-end headline queries for dynamic route (GB) (86 ms)
    ✓ System should reject dynamic param that does not match size validation (e.g. longer than 2 characters) (92 ms)
    ✓ System should yield 404 for unsupported route formats (12 ms)

Test Suites: 3 passed, 3 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        1.655 s
Ran all test suites.
```
