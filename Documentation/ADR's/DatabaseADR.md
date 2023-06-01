# Architecture Decision Record (ADR)

## Title: Database Design for Booking and Consultation Management System

**Status:** Approved

## Context

We are designing a database for a Booking and Consultation Management System. The system consists of four tables: `bookings`, `consultations`, `log`, and `users`. The `bookings` table stores information about bookings made by students, the `consultations` table stores information about consultations scheduled by lecturers, the `log` table tracks system activities, and the `users` table stores user information. The `bookings`, `consultations`, and `users` tables are relational and need to establish links between records.

## Decision

To implement the database design for the Booking and Consultation Management System, the following decisions have been made:

1. Database Management System (DBMS): We will use MySQL as the DBMS for this system due to its widespread adoption, ease of use, and compatibility with relational database design.

2. Table Design:
   - `bookings` table:
     - Columns: `id` (primary key), `student_email`, `meeting_id`
     - The `student_email` column will serve as a foreign key linking to the `email` column in the `users` table.
     - The `meeting_id` column will serve as a foreign key linking to the `id` column in the `consultations` table.
     
   - `consultations` table:
     - Columns: `id` (primary key), `meeting_title`, `email`, `date`, `time`, `number_of_students`, `active`, `duration`
     - The `email` column will serve as a foreign key linking to the `email` column in the `users` table.
     
   - `log` table:
     - Columns: `id` (primary key), `date`, `time`, `nature`, `email`

   - `users` table:
     - Columns: `email` (primary key), `name`, `surname`, `password`, `role`

3. Relationships:
   - `bookings` table:
     - One-to-one relationship with `users` table based on `student_email`.
     - One-to-one relationship with `consultations` table based on `meeting_id`.
     
   - `consultations` table:
     - One-to-one relationship with `users` table based on `email`.
     
   - `users` table:
     - No relationships with other tables as it is the main table storing user information.
     
4. Indexing: Primary keys will be indexed for efficient data retrieval and to ensure data integrity.

## Consequences

The proposed database design will provide a structured and efficient approach to manage bookings, consultations, user information, and system logs for the Booking and Consultation Management System. The use of relational tables and foreign key relationships will allow for data integrity and enforce referential integrity. The design can be implemented using a MySQL database and should support the required functionality of the system.
