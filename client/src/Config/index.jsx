import { LockKeyhole, Mail, UserPen } from "lucide-react";

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
    logo: <UserPen />,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
    logo: <Mail />,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
    logo: <LockKeyhole />,
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
    logo: <Mail />,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
    logo: <LockKeyhole />,
  },
];

export const addProductFormElements = [
  {
    label: "Product Name",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Product description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "earbuds", label: "Earbuds" },
      { id: "neckbands", label: "Neckbands" },
      { id: "smart-watches", label: "Smart Watches" },
      { id: "wirelessHeadphones", label: "Wireless Headphones" },
      { id: "wiredHeadphones", label: "Wired Headphones" },
      { id: "wiredEarphones", label: "Wired Earphones" },
    ],
  },

  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "apple", label: "Apple" },
      { id: "boat", label: "BOAT" },
      { id: "sony", label: "Sony" },
      { id: "AKG", label: "AKG" },
      { id: "jbl", label: "JBL" },
    ],
  },

  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const userViewNavItems = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },

  {
    id: "collections",
    label: "Collections",
    path: "/collections",
  },
  

  {
    id: "about",
    label: "About",
    path: "/about",
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact",
  },
];

export const filterOptions = {
  category: [
    { id: "earbuds", label: "Earbuds" },
    { id: "neckbands", label: "Neckbands" },
    { id: "smartWatches", label: "Smart Watches" },
    { id: "wirelessHeadphones", label: "Wireless Headphones" },
    { id: "wiredHeadphones", label: "Wired Headphones" },
    { id: "wiredEarphones", label: "Wired Earphones" },
  ],

  brand: [
    { id: "apple", label: "Apple" },
    { id: "boat", label: "BOAT" },
    { id: "sony", label: "Sony" },
    { id: "AKG", label: "AKG" },
    { id: "jbl", label: "JBL" },
  ],
};
export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const categoryOptionsMap = {
  earbuds: "Earbuds",
  neckbands: "Neckbands",
  smartWatches: "Smart Watches",
  wirelessHeadphones: "Wireless Headphones",
  wiredHeadphones: "Wired Headphones",
  wiredEarphones: "Wired Earphones",
};

export const brandOptionsMap = {
  apple: "Apple",
  boat: "BOAT",
  sony: "Sony",
  akg: "AKG",
  jbl: "JBL",
};

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
];
