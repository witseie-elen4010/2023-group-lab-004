# Architecture Decision Record (ADR)

## Title: Website Path Design for User Login and Dashboard

**Status:** Proposed

## Context

We are designing the website path for user login and dashboard navigation. The website flow includes a landing page, login page, signup page, and different dashboards based on user roles: student, lecturer, and admin. The goal is to provide a clear and intuitive path for users to log in, access their respective dashboards, and navigate through the website.

## Decision

To implement the website path for user login and dashboard navigation, the following decisions have been made:

1. Landing Page:
   - The landing page serves as the entry point to the website.
   - It provides information about the platform, its features, and the benefits of using it.
   - The landing page includes clear navigation options for login and signup.

2. Login Page:
   - The login page is accessible from the landing page and allows users to authenticate themselves.
   - It provides input fields for email/username and password.
   - After successful login, users will be redirected to their respective dashboards based on their roles.

3. Signup Page:
   - The signup page is accessible from the landing page and allows new users to create an account.
   - It includes input fields for necessary information such as name, email, password, etc.
   - After successful signup, users will be redirected to the login page to authenticate themselves.

4. Student Dashboard:
   - After logging in as a student, users will be directed to the student dashboard.
   - The student dashboard provides access to features and functionalities relevant to students.
   - It will include options for managing bookings, viewing schedules

5. Lecturer Dashboard:
   - After logging in as a lecturer, users will be directed to the lecturer dashboard.
   - The lecturer dashboard provides access to features and functionalities relevant to lecturers.
   - It may include options for managing consultations, scheduling appointments

6. Admin Dashboard:
   - After logging in as an admin, users will be directed to the admin dashboard.
   - The admin dashboard provides access to all the logs of the web application
7. Navigation:
   - Users can navigate between the login page, signup page, and their respective dashboards using clear and visible navigation elements such as menus or buttons.
   - The website should provide a consistent and intuitive navigation experience across different pages.

## Consequences

The proposed website path design for user login and dashboard navigation will provide a clear and structured flow for users to access the platform, authenticate themselves, and access their respective dashboards. The landing page will serve as an introduction to the platform, while the login and signup pages will handle user authentication and account creation. The student, lecturer, and admin dashboards will cater to the specific needs of each user role, providing relevant features and functionalities. This design should enhance the user experience and improve usability by guiding users through the website's core functionalities.
