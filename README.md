# Task 2 – List of Users with In-Memory Pagination

A simple responsive frontend implementation using **Tailwind CSS**, **HTML**, and **JavaScript** that fetches user data from a mock API and presents it with features like in-memory pagination, search, sorting, and interactive modal details.

##  Features

- Fetches user data from `https://6874ce63dd06792b9c954fc7.mockapi.io/api/v1/users`.
- Supports **in-memory pagination** (10 users per page).
- **Search** users by **name** or **email** (case-insensitive).
- **Sort** users by **name** (alphabetical) or **date created** (newest first).
- Displays **ID**, **Avatar**, **Name**, **Email**, **Gender**, **Location**, **Age**, and **Created At** in the table.
- Clickable rows open a **modal** displaying detailed user info.
- Fully **responsive** design using **Tailwind CSS** (lightweight, utility-first).
- Graceful fallback (`—`) when fields like gender, location, or age are unavailable in the API.

---

