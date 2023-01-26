# RepairShop
  A simple application to track customers and device repairs for small device repair shops.

## Assumptions
  *	Services are broken into Manufacturer, Make, Model, and Service
  *	Services don’t get taxed.
  *	No discounts or specials.

## MVP
  *	Add/Edit Services
    -	For now Services serve as a basic autocomplete for the invoice form
  *	Create/Edit/View Invoice
    -	Invoices will have a customer name and phone number and a list of services to be performed.
    -	Each line item will capture the device/equipment identifier and the technician that performed the service
    -	Invoices duplicate the service that was selected, this is so if a service changes the invoice retains the actual service at the time of repair
    

## API
```
  GET   /api/Invoice
  POST  /api/Invoice
  GET   /api/Invoice/{id}
  PUT   /api/Invoice/{id}
  DEL   /api/Invoice/{id}
  GET   /api/Service
  POST  /api/Service
  GET   /api/Service/{id}
  PUT   /api/Service/{id}
  DEL   /api/Service/{id}  
```

## DATA
  ```
  { 
    "Invoice": {
      "id": 1,
      "customerName": "John Smith",
      "customerPhone": "555-555-5555",
      "paid": false,
      "service": "New Screen Replacement",
      "description": "Replace the screen on your device",
      "price": 299.99,
      "manufacturer": "Apple",
      "make": "iPhone",
      "model": "14 Pro Max",
      "identifier": "1234567890",
      "technician": "John Doe"
    }
  }

  {
    "Service": {
      "id": 1,
      "name": "New Screen Replacement",
      "description": "Replace the screen on your device",
      "price": 299.99,
      "manufacturer": "Apple",
      "make": "iPhone",
      "model": "14 Pro Max"
    }
  }
```
 
# TODO (If this project was to move forward)
  *	Data validation
  *	Database normalization
    -	It was normalized but the API and controllers got too complex for this exercise.
  *	DataTables
    -	Sort
    -	Search
    -	Filter
  *	Create UI/UX for adding more than 1 service per invoice (database already supports this).
  *	CI/CD

# Afterthoughts
*	Could have used Typescript.


# Running application locally

* Start a postgres database server with an admin password.
  ```
  docker run -e POSTGRES_PASSWORD=password -p 5432 postgres:latest
  ```

* Run the following SQL to create the database.
  ```
  CREATE DATABASE repair_shop;
  CREATE USER mainapp WITH ENCRYPTED PASSWORD 'mainapp';
  GRANT ALL PRIVILEGES ON DATABASE repair_shop TO mainapp;
  GRANT ALL ON SCHEMA public TO mainapp;
  ```

* Clone the RepairShop repo.
  ```
  git clone git@github.com:kadwen812/RepairShop.git
  ```

* Install the node modules.
  ```
  cd RepairShop
  cd ClientApp
  npm install
  cd ..
  ```

* Start the application
  ```
  dotnet run
  ```

* Visit the application in a browser, note you will need to ignore the certificate errors.
  ```
  https://localhost:44417/invoices
  ```


