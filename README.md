# DDD + React | tanstack-query | zustand :: Demo

This repository contains a demonstration project for Domain-Driven Design (DDD) principles. It showcases how to structure and implement a software system using DDD concepts, including entities, value objects, aggregates, repositories, and services.

## **Context**

We want to build a frontend project with React to implement an architecture inspired by DDD, following premises:

- **UI Framework:** React
- **Global state management:** `zustand`
- **Asynchronous request management:** `tanstack-query`
- **Backend:** Simulated with `json-server` (classic REST only)
- **Typing:** TypeScript (as simple as possible for the demo)

## **Goals**

As developers, we want to:

- Apply **the best DDD practices**, but without extreme rigidity.
- Integrate React, `zustand`, and `tanstack-query` with DDD in the cleanest and most scalable way possible.
- Maintain a **high degree of decoupling** between `core` (business logic) and `app` (UI and state).

## **Architecture**

At the architectural level, the project will be divided into two main modules:

### **1️⃣ `core` (Domain, Application, and Infrastructure)**

- Contains all business logic following **DDD**.
- Organized following **screaming architecture** (each entity contains its own **domain, application, and infrastructure** layer).
- The domain layer includes:
  - **Validation and creation methods** for each entity.
  - Required **Value Objects**.
  - **Repository interfaces**.
- The application layer includes:
  - **All implemented use cases**.
  - Use cases can be **synchronous** (in-memory state) or **asynchronous** (when accessing infrastructure services).
- The infrastructure layer includes:
  - **Repositories** that implement access to `json-server`.

### **2️⃣ `app` (UI, State Management, and Requests)**

- Contains all **React** logic.
- `zustand` handles **in-memory data** management (if required).
  - `zustand` **does not mutate data directly** but always goes through `tanstack-query` to maintain consistency.
- `tanstack-query` handles:
  - **Synchronization with the backend**.
  - **Making asynchronous requests and invalidating the cache**.
- The connection between `app` and `core` is made through **providers**, which encapsulate the use cases and expose them to React.

---

## **Demo Implementation**

The demo will consist of a **task management application**, with the following requirements:

### **Entities**

1. **Task**
   - `uuid | title | description | status | createdAt | userUuid`
2. **User**
   - `uuid | firstName | lastName | userName | email`

### **Use Cases**

1. **Task**
   - Create | Retrieve | Update | Destroy
2. **User**
   - Create | Retrieve | Update

### **Repositories**

1. **Task**
   - Create | Retrieve | Update | Destroy
2. **User**
   - Create | Retrieve | Update

---

## **Expected Output**

- **Functional code** that exemplifies the proposed architecture.
- **Clear separation** between `core` and `app`, with minimal coupling.
- **Clean integration** between `zustand`, `tanstack-query`, and DDD.
- **Proper cache and state management** with `tanstack-query`.

---

## **Instructions**

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the `json-server` to simulate the backend using `npm run dev:server`.
4. Run the React application using `npm run dev`.
5. Explore the codebase to understand the integration of DDD principles with React, `zustand`, and `tanstack-query`.
