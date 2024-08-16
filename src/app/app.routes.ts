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
import { AuthGuard } from '../AuthGuard/AuthGuard.guard';
import { AdminGuard } from '../AuthGuard/AdminGuard.guard';
import { CustomerGuard } from '../AuthGuard/CustomerGuard.guard';


export const routes: Routes = [
    {path: 'login', component: LogInComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard, CustomerGuard]},
    {path: 'cart', component: AddtocartComponent, canActivate: [AuthGuard, CustomerGuard]}, 
    {path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard, CustomerGuard]},
    {path: 'users', component: DisplayUsersComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'products', component: DisplayProductsComponent, canActivate: [AuthGuard, AdminGuard] },
    {path: 'categories', component: DisplayCategoriesComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'sales', component: DisplaySalesComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'adduser', component: AddUserComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'edituser/:id', component: AddUserComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'addproduct', component: AddProductComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'editproduct/:id', component: AddProductComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'addcategory', component: AddCategoryComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'editcategory/:id', component: AddCategoryComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'signup', component: SignUpComponent}
];

