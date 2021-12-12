/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/signup', 'SignupController.submitSignup')
Route.post('/api/signin', 'SigninController.signin')
Route.post('/api/logout', 'SigninController.logout')
Route.post('/api/product', 'ProductController.add')
Route.post('/api/buy', 'ProductController.buy')
Route.get('/api/product', 'ProductController.get')
Route.post('/api/img', 'ImgController.add')
Route.get('/api/uploads/*', 'ImgController.get')
