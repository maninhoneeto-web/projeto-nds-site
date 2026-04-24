# Security Spec - NDS Service Manager

## Data Invariants
- A Customer must have a name and phone.
- An Installation must be linked to a valid Customer ID.
- Maintenance reminders must have a future or past due date and a boolean completion status.
- Only authenticated users can access the dashboard. For now, since it's a private tool, we'll restrict it to the owner.

## The Dirty Dozen (Test Cases)
1. Unauthenticated user trying to read customers.
2. Unauthenticated user trying to create an installation.
3. Authenticated user trying to delete a customer they don't own (if it were multi-tenant).
4. Update a customer name with a 1MB string (DDoS).
5. Injecting a script into the customer address field.
6. Creating a maintenance reminder for a non-existent customer.
7. Deleting the entire installations collection via batch.
8. Changing the `createdAt` timestamp of an installation.
9. Creating an installation without a `type`.
10. Updating a completed maintenance task to another type by a non-admin.
11. Reading the private phone numbers of all customers globally.
12. Creating a customer with a spoofed UID.

## Proposed Rules Logic
- `isSignedIn()` helper.
- `isValidId()` for path variables.
- `isValidCustomer()`, `isValidInstallation()`, `isValidMaintenance()` schema helpers.
- `isOwner()` or `isAdmin()` check. Since it's for the user alone, I'll restrict based on `request.auth.token.email == "maninhoneeto@gmail.com"`.

---
*Proceeding to generate draft rules...*
