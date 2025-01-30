# StrudelShop Frontend

## Overview

StrudelShop Frontend is an **Angular** application for an online store selling homemade strudels. It provides authentication, shopping cart functionality, and an admin dashboard for managing products and orders.

Users can:
- Browse the catalog
- Add items to their cart
- Place orders
- View order history

Admins can:
- Manage products, orders, and users
- Access the admin dashboard

---

## **Technologies Used**

- **Angular 16+** (Standalone components)
- **Tailwind CSS** (Modern utility-first styling)
- **TypeScript**
- **RxJS** (Reactive programming with Observables)
- **JWT-based Authentication** (Role-based access)

---

## **Architecture Overview**

### **1. Component & Page Structure**
- **Components**:
  - Catalog, Footer, Header (Home/Standard), Hero, Location, Layout, Reviews, etc.
- **Pages**:
  - Home, Login, Register, Cart, Checkout, Order History, Admin Dashboard
- **Authentication & Routing**:
  - Role-based navigation (Users/Admins)
  - Guards to protect specific routes
- **Services**:
  - Centralized API communication for products, orders, and authentication
- **State Management**:
  - RxJS Observables for handling authentication state

---

## **Home Page View**

![Home Page](https://github.com/xbognar/StrudelShopFrontend/blob/master/StrudelShopFrontend/src/assets/images/HomePageView.png)

---

## **Project Folder Structure**
```
StrudelShopFrontend/
│   .editorconfig
│   angular.json
│   karma.conf.js
│   package-lock.json
│   package.json
│   tailwind.config.js
│   tsconfig.app.json
│   tsconfig.json
│   tsconfig.spec.json
│
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
│   │
│   ├── app/
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   │
│   │   ├── components/
│   │   │   ├── catalog/
│   │   │   ├── catalog-item/
│   │   │   ├── connect/
│   │   │   ├── footer/
│   │   │   ├── header-home/
│   │   │   ├── header-standard/
│   │   │   ├── hero/
│   │   │   ├── layout/
│   │   │   ├── location/
│   │   │   ├── recommended-products/
│   │   │   ├── reviews/
│   │   │
│   │   ├── core/
│   │   │   ├── auth/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   ├── contact-about/
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── order-details/
│   │   │   ├── order-history/
│   │   │   ├── product-detail/
│   │   │   ├── register/
│   │   │
│   ├── assets/
│   │   ├── icons/
│   │   ├── images/
│   │
│   ├── environments/
│   │   ├── environment.prod.ts
│   │   ├── environment.ts
```

