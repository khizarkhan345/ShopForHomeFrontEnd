import { Routes } from '@angular/router';
import { LogInComponent } from '../Components/LogIn/log-in/log-in.component';
import { SignUpComponent } from '../Components/SignUp/sign-up/sign-up.component';
import { DisplayUsersComponent } from '../Components/DisplayUsers/display-users/display-users.component';
import { DisplayProductsComponent } from '../Components/DisplayProducts/display-products/display-products.component';
import { DisplayCategoriesComponent } from '../Components/DisplayCategories/display-categories/display-categories.component';
import { AddUserComponent } from '../Components/AddUser/add-user/add-user.component';
import { AddProductComponent } from '../Components/AddProduct/add-product/add-product.component';
import { AddCategoryComponent } from '../Components/AddCategory/add-category/add-category.component';
import { DisplaySalesComponent } from '../Components/DisplaySales/display-sales/display-sales.component';
import { HomeComponent } from '../Components/Home/home/home.component';
import { AddtocartComponent } from '../Components/AddToCart/addtocart/addtocart.component';
import { WishlistComponent } from '../Components/Wishlist/wishlist/wishlist.component';
export const routes: Routes = [
    {path: 'login', component: LogInComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'cart', component: AddtocartComponent},
    {path: 'wishlist', component: WishlistComponent},
    {path: 'users', component: DisplayUsersComponent},
    {path: 'products', component: DisplayProductsComponent },
    {path: 'categories', component: DisplayCategoriesComponent},
    {path: 'sales', component: DisplaySalesComponent},
    {path: 'adduser', component: AddUserComponent},
    {path: 'edituser/:id', component: AddUserComponent},
    {path: 'addproduct', component: AddProductComponent},
    {path: 'editproduct/:id', component: AddProductComponent},
    {path: 'addcategory', component: AddCategoryComponent},
    {path: 'editcategory/:id', component: AddCategoryComponent},
    {path: 'signup', component: SignUpComponent}
];

