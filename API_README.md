# Backend API Documentation

Base URL: `http://localhost:3000`

---

## General

### GET /

- Description: Health check / welcome route
- Response: string

---

## Auth

### POST /auth/signup

- Description: Register new user
- Body (JSON):

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "organizationCode": "string" // optional if you want to specify org by code
}
```

### POST /auth/signup/:organizationCode

- Description: Register user under specific organization via URL path
- Path parameter:
  - `organizationCode` (string)
- Body (JSON):

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

### POST /auth/login

- Description: Login user
- Body (JSON):

```json
{
  "email": "string",
  "password": "string",
  "organizationCode": "string" // optional
}
```

### POST /auth/login/:organizationCode

- Description: Login user using organization code in URL
- Path parameter:
  - `organizationCode` (string)
- Body (JSON):

```json
{
  "email": "string",
  "password": "string"
}
```

### GET /auth/profile

- Description: Get currently authenticated user profile
- Headers: `Authorization: Bearer <token>`

### GET /auth/all_user

- Description: Get all users

### PUT /auth/:id

- Description: Update user by id
- Body (JSON): fields to update, for example:

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "image": "string",
  "state": "string",
  "city": "string",
  "phone_number": "string"
}
```

### DELETE /auth/:id

- Description: Delete user by id

---

## Admin

### POST /admin

- Description: Create a new admin
- Body: `multipart/form-data`
- Fields:
  - `image`: file
  - DTO fields from `CreateAdminDto`

### POST /admin/login

- Description: Admin login
- Body (JSON):

```json
{
  "email": "string",
  "password": "string"
}
```

### GET /admin

- Description: List all admins

### GET /admin/profile

- Description: Get admin profile
- Headers: `Authorization: Bearer <token>`

### PATCH /admin/:id

- Description: Update admin
- Body: `multipart/form-data`
- Fields:
  - `image`: file
  - DTO fields from `UpdateAdminDto`

### DELETE /admin/:id

- Description: Delete admin by id

---

## Organization

### POST /organizations

- Description: Create a new organization
- Body (JSON):

```json
{
  "name": "string",
  "code": "string",
  "description": "string",
  "status": true
}
```

### GET /organizations

- Description: List all organizations

### GET /organizations/:id

- Description: Get organization by id

### PUT /organizations/:id

- Description: Update organization by id
- Body (JSON):

```json
{
  "name": "string",
  "code": "string",
  "description": "string",
  "status": true
}
```

### DELETE /organizations/:id

- Description: Delete organization by id

---

## Courses

### POST /courses

- Description: Create a course
- Body: `multipart/form-data`
- Fields:
  - `courseimage`: file
  - `timetable`: file
  - `batchinfo`: file
  - DTO fields from `CreateCourseDto`

### GET /courses

- Description: List courses or filter by type
- Query parameter:
  - `type`: one of the `CourseType` enum values

### GET /courses/by-stream

- Description: List courses by stream
- Query parameter:
  - `streamId`: string

### PATCH /courses/:id

- Description: Update course status or metadata
- Body: `UpdateCourseDto`

### DELETE /courses/:id

- Description: Delete course by id

---

## Top Teacher

### POST /top-teacher/create

- Description: Create a top teacher
- Body: `multipart/form-data`
- Fields:
  - `image`: file
  - DTO fields from `topTeacherDto`

### GET /top-teacher

- Description: List top teachers

### PATCH /top-teacher/:id

- Description: Update top teacher
- Body: `multipart/form-data`
- Fields:
  - `image`: file
  - DTO fields from `topTeacherDto`

### DELETE /top-teacher/:id

- Description: Delete top teacher by id

---

## Top Student

### POST /top-student/create

- Description: Create a top student
- Body: `multipart/form-data`
- Fields:
  - `image`: file
  - DTO fields from `CreateTopStudentDto`

### GET /top-student

- Description: List top students

### GET /top-student/:id

- Description: Get top student by id

### PUT /top-student/:id

- Description: Update top student
- Body: `multipart/form-data`
- Fields:
  - `image`: file
  - DTO fields from `CreateTopStudentDto`

### DELETE /top-student/:id

- Description: Delete top student by id

---

## Teachers

### POST /teachers

- Description: Create a teacher
- Body: `multipart/form-data`
- Fields:
  - `image`: file
  - DTO fields from `CreateTeacherDto`

### GET /teachers

- Description: List teachers

---

## Attachments

Currently no routes are defined in `AttachmentsController`.

---

## Superstream

### POST /superstream

- Description: Create a superstream
- Body (JSON):

```json
{
  "name": "string"
}
```

### GET /superstream

- Description: List all superstreams

### PUT /superstream/:id

- Description: Update superstream
- Body (JSON):

```json
{
  "name": "string"
}
```

### DELETE /superstream/:id

- Description: Delete superstream by id

---

## Folders

### POST /folders

- Description: Create a folder
- Body: `multipart/form-data`
- Fields:
  - `image`: file
  - body fields as plain form values

### GET /folders/:id

- Description: Get folder by id or fetch folder items

### PUT /folders/:id

- Description: Update a folder
- Body: `multipart/form-data`
- Fields:
  - `image`: file
  - body fields as plain form values

### DELETE /folders/:id

- Description: Delete folder by id

---

## Content

### POST /content

- Description: Create content item
- Body: `multipart/form-data`
- Fields:
  - `file`: file
  - `thumbnail`: file
  - body fields from `CreateContentDto`

### GET /content/:id

- Description: Get content items by parent id

### DELETE /content/:id

- Description: Delete content item by id

---

## Banners

### POST /banners

- Description: Create a banner or news entry
- Body: `multipart/form-data`
- Fields:
  - `image`: file
  - DTO fields from `CreateBannerDto`

### GET /banners

- Description: List banners
- Query parameter:
  - `type`: `banner` or `news`

### DELETE /banners/:id

- Description: Delete banner by id

---

## Stream

### POST /stream

- Description: Create a stream
- Body: `multipart/form-data`
- Fields:
  - `image`: file
  - DTO fields from `CreateStreamDto`

### GET /stream

- Description: List streams

### GET /stream/superstream/:id

- Description: List streams by a superstream id

### GET /stream/:id

- Description: Get one stream by id

### DELETE /stream/:id

- Description: Delete stream by id

---

## Events

### POST /events

- Description: Create an event
- Body: `multipart/form-data`
- Fields:
  - `image`: file
  - DTO fields from `CreateEventDto`

### GET /events

- Description: List all events

### GET /events/:folderId

- Description: Get events by folder id

### DELETE /events/:id

- Description: Delete event by id

---

## Permissions

### GET /permissions

- Description: List all permissions

### GET /permissions/:id

- Description: Get permission by id

### POST /permissions

- Description: Create a permission
- Body (JSON):

```json
{
  "name": "string",
  "permission_group": "string",
  "guard_name": "string"
}
```

### PUT /permissions/:id

- Description: Update a permission
- Body (JSON):

```json
{
  "name": "string",
  "permission_group": "string",
  "guard_name": "string"
}
```

### DELETE /permissions/:id

- Description: Delete permission by id

---

## Role

### POST /role

- Description: Create a role
- Body (JSON):

```json
{
  "name": "string",
  "description": "string",
  "permissionIds": [1, 2, 3]
}
```

### GET /role

- Description: List all roles

### GET /role/:id

- Description: Get role by id

### GET /role/:id/permissions

- Description: Get permissions assigned to a role

### PUT /role/:id

- Description: Update a role
- Body (JSON):

```json
{
  "name": "string",
  "description": "string",
  "permissionIds": [1, 2, 3]
}
```

---

## Notes

- File upload endpoints use `multipart/form-data`.
- `organizationCode` is optional for auth signup/login, but can also be passed via URL routes.
- If an endpoint accepts form-data, send file fields and body fields in the same request.
- Replace `:id` and `:organizationCode` with actual values.
