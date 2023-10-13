# Utility Functions Documentation

A collection of utility functions for my personal website.

## Table of Contents:
- [Post Utilities](#post-utilities)
  - [getPosts](#getposts)
  - [getPostById](#getpostbyid)
  - [createPost](#createpost)
  - [updatePost](#updatepost)
  - [softDeletePostById](#softdeletepostbyid)
  - [restoreDeletedPost](#restoredeletedpost)
  - [hardDeletePostById](#harddeletepostbyid)
  - [getPostsByAuthorId](#getpostsbyauthorid)
  - [getPostsByTag](#getpostsbytag)
  - [searchPostsByTitle](#searchpostsbytitle)
  - [getPostsByDateRange](#getpostsbydaterange)
  - [getDeletedPosts](#getdeletedposts)
  - [getPostCountByAuthor](#getpostcountbyauthor)
- [User Utilities](#user-utilities)

## Post Utilities

### `getPosts`
Fetches all posts that aren't soft-deleted.
- **Returns**: Array of post objects.
- **Usage**:
  ```javascript
  const posts = await getPosts();

### `getPostById`
Fetches a post by its unique identifier.
- **Parameters**:
  - **id** (number): The unique identifier of the post.
- **Returns**: Post object or null if not found.
- **Usage**:
  ```javascript
  const post = await getPostById(1); // fetch post with id 1

### `createPost`
Creates a new post in the database.
- **Parameters**:
  - **data** (Prisma.PostCreateInput): The data object containing post details.
- **Returns**: Created post object.
- **Usage**:
  ```javascript
  const newPost = await createPost({
    title: 'New Post',
    content: 'This is the content of the post',
    authorId: 1
  });

### `updatePost`
Updates a post by its unique identifier.
- **Parameters**:
  - **id** (number): The unique identifier of the post.
  - **data** (Prisma.PostUpdateInput): The data object containing updated post details.
- **Returns**: Updated post object.
- **Usage**:
  ```javascript
  const updatedPost = await updatePost(1, {
    title: 'Updated Title'
  });

### `softDeletePostById`
Soft deletes a post by its unique identifier by setting the deletedAt field.
- **Parameters**:
  - **id** (number): The unique identifier of the post.
- **Returns**: Updated post object with deletedAt set.
- **Usage**:
  ```javascript
  await softDeletePostById(1); // soft delete post with id 1

### `restoreDeletedPost`
Restores a soft-deleted post by its unique identifier.
- **Parameters**:
  - **id** (number): The unique identifier of the post.
- **Returns**: Restored post object.
- **Usage**:
  ```javascript
  await restoreDeletedPost(1); // restore soft deleted post with id 1

### `hardDeletePostById`
Permanently deletes a post by its unique identifier.
- **Parameters**:
  - **id** (number): The unique identifier of the post.
- **Returns**: Deleted post object.
- **Usage**:
  ```javascript
  await hardDeletePostById(1); // permanently delete post with id 1

### `getPostsByAuthorId`
Fetches all posts by a specific author that aren't soft-deleted.
- **Parameters**:
  - **authorId** (number): The unique identifier of the author.
- **Returns**: Array of post objects.
- **Usage**:
  ```javascript
  const authorPosts = await getPostsByAuthorId(1); // fetch posts by author with id 1

### `getPostsByTag`
Fetches all posts associated with a specific tag that aren't soft-deleted.
- **Parameters**:
  - **tagName** (string): The name of the tag.
- **Returns**: Array of post objects.
- **Usage**:
  ```javascript
  const tagPosts = await getPostsByTag('technology');

### `searchPostsByTitle`
Searches for posts based on a title term, in a case-insensitive manner.
- **Parameters**:
  - **searchTerm** (string): The term to search for in post titles.
- **Returns**: Array of post objects.
- **Usage**:
  ```javascript
  const searchedPosts = await searchPostsByTitle('Tech');

### `getPostsByDateRange`
Fetches all posts created within a specific date range.
- **Parameters**:
  - **startDate** (Date): The start date of the range.
  - **endDate** (Date): The end date of the range.
- **Returns**: Array of post objects.
- **Usage**:
  ```javascript
  const dateRangePosts = await getPostsByDateRange(new Date('2023-01-01'), new Date('2023-12-31'));

### `getDeletedPosts`
Fetches all posts that have been soft-deleted.
- **Returns**: Array of post objects.
- **Usage**:
  ```javascript
  const deletedPosts = await getDeletedPosts();

### `getPostCountByAuthor`
Counts the number of posts written by a specific author that aren't soft-deleted.
- **Parameters**:
  - **authorId** (number): The unique identifier of the author.
- **Returns**: Number of posts.
- **Usage**:
  ```javascript
  const postCount = await getPostCountByAuthor(1); // get count of posts by author with id 1

## User Utilities

... (continue with your User Utilities documentation as necessary)
