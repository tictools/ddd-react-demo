---
marp: true
---

# **Integrating the DDD Pattern with the React Paradigm :: DEMO CONTENT**

## **1. What is DDD?**

- Domain-Driven Design (DDD) is a **software design approach** focused on deeply understanding the business domain and modeling software accordingly.
- It ensures that the software reflects **real-world business rules** rather than just being a technical implementation.

## **2. Ubiquitous Language**

- A **shared language** between developers, designers, and domain experts.
- Eliminates misunderstandings and ensures consistency across the system.
- Example: Instead of "note," use "Task" if that’s how the business defines it.

## **3. Strategic and Tactical Phases**

### **Strategic Design (High-Level Decisions)**

- **Bounded Contexts:** Clear boundaries defining where a term or rule is valid.
- **Context Mapping:** How different parts of the system interact.

### **Tactical Design (Code-Level Implementation)**

- **Entities:** Objects with a unique identity (e.g., `Task`).
- **Value Objects:** Immutable objects defining attributes (e.g., `DueDate`).
  - VOs encapsulate business rules and validation.
  - They protect the integrity of the domain.
  - They have no identity and are immutable.
  - Entities use them to ensure correct values.
- **Aggregates:** A cluster of domain objects treated as a unit.
- **Repositories:** Abstraction for data persistence.
- **Domain Events:** Notify when something important happens (e.g., `TaskCreated`).

## **4. Layers in DDD**

### **Domain Layer (Business Rules)**

- Contains the core business logic.
- Defines **Entities, Value Objects, and Domain Events**.
- No external dependencies (e.g., database, UI).

### **Application Layer (Use Cases)**

≤

- Orchestrates business logic but doesn’t implement it.
- Calls domain logic and interacts with infrastructure.
- Example: `CreateTaskUseCase` validates and creates a `Task`.

### **Infrastructure Layer (External Communication)**

- Handles **persistence (DB), HTTP requests, and WebSockets**.
- Implements repositories, APIs, and frameworks like `tanstack-query`.

---

# **Integrating with React**

## **1. Folder Structure**

```plaintext
/src
  ├── core (Domain + Application + Infrastructure)
  ├── app  (React UI + State Management)
  ├── shared (Common Utilities)
```

## **2. /core Structure**

```plaintext
/core
  ├── domain (Entities, Value Objects)
  ├── application (Use Cases)
  ├── infrastructure (Repositories, API, DB)
```

- This separation **decouples business logic from the UI**, making it reusable.

## **3. /app Structure**

```plaintext
/app
  ├── components (UI)
  ├── hooks (Custom Hooks)
  ├── state (zustand)
  ├── queries (tanstack-query)
```

- **State and API calls are in `app`, not `core`,** keeping the domain pure.

---

## **4. Screaming Architecture**

- Code should **“scream” its purpose**, not its framework.
- Example:  
  ❌ `src/services/notesService.js`  
  ✅ `src/core/domain/note.ts`

## **5. Atomic Design**

- Organizes UI components into:
  - **Atoms:** Smallest components (buttons, inputs).
  - **Molecules:** Groups of atoms (form fields).
  - **Organisms:** Complex UI elements (modals).
  - **Templates & Pages:** Full UI structures.

---

# **Conclusion & Q&A**

- DDD provides a structured way to build maintainable React apps.
- It **improves business logic reusability** and **separates concerns**.
- **Q&A session: 15 minutes.**
