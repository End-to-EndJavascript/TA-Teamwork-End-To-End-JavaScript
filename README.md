# TA-Teamwork-End-To-End-JavaScript

## Members:
* [Павел Добранов](https://telerikacademy.com/Users/Pavel_Dobranov)
* [Гаро Гарабедян](https://telerikacademy.com/Users/GGarabedian)
* [Златко Атанасов](https://telerikacademy.com/Users/baretata)

## Project purpose
Health Foody is app for viewing and adding healthy and delicious recipes. User can upload recipes in different categories such as salads, main dishes, desserts, drinks, soups. User choose with which ingrediants the recipe is made of and add them to the meal information.

## Description

`User Roles`
 * NotRegistered - not registered user
 * Registered - user with registration
 * Admin - user with admin rights.

`User`

#### Not Registered
* Can view all recipes, ingrediants.

#### Registered
 * register, login and logout.
 * create recipes

#### Admin
* can delete users, recipes, ingrediants
* can add ingrediants
* CRUD operation for all controllers

`Recipe` 
* have categories: salads, main dishes, desserts, drinks, soups
* holds ingrediants
* can upload image of the recipe

`Ingrediants`
* can be added to recipes
* can be created only by admin

`Post`
* every `Town` has posts with different pictures
* posts can have comments and can be rated(like, dislike)

`Notification message`
* when error occures when posting form

## GitHub: [Health Foody - repository](https://github.com/End-to-EndJavascript/TA-Teamwork-End-To-End-JavaScript)


## Routes Overview
| HTTP Method | Endpoint | Description |
|:----------:|:-----------:|:-------------|
|GET | / | Returns the home page view of the app |
|GET | /register | Returns the view with registration form |
|POST | /register | Registers a new user |
|GET | /login | Returns the view with login form |
|POST | /login | Logs in a user | 
|POST | /logout | Logs out a user |
|GET | /products | Gets all products available|
|GET (req admin auth) | /products/add | Returns the view with product add form|
|POST (req admin auth) | /products/add | Adds new product |
|PUT (req admin auth) | /products/{id} | Returns view with product information by given id |
|DELETE (req admin auth) | /products/{id} | Delete product by given id |
|GET | /recipes | Gets all recipes available|
|GET (req auth) | /recipes/add | Returns the view with recipe add form|
|POST (req auth) | /recipes/add | Adds new recipe |
|GET | /recipes/{id} | Returns view with recipe information by given id |
|GET | /profile | Returns view with user's detailed information |
|GET | /profile/edit | Returns view with user edit form |
|PUT | /profile/edit | Updates user's details information |
|GET | /profile/edit/avatar | Returns view with field for image upload |
|POST | /profile/edit/avatar | Adds new profile image to the user's profile |
|GET (req admin auth) | /admin/users | Returns view with all users |
|GET (req admin auth) | /admin/users/deleteUser | Deletes given user by id |
|GET | /unauthorized | Returned when user is not authorized to see certain page |
