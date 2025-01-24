export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "bedroom", label: "Bedroom" },
      { id: "dinningroom", label: "Dinningroom" },
      { id: "livingroom", label: "Livingroom" },
      { id: "office", label: "Office" },
      { id: "door", label: "Door" },
      { id: "newArrivals", label: "New Arrivals" },
    ],
  },

  {
    label: "Subcategory",
    name: "subcategory",
    componentType: "select",
    options: [
      { id: "bedroomSet", label: "Bedroom Set" },
      { id: "bed", label: "Bed" },
      { id: "readingTable", label: "Reading Table" },
      { id: "bedSideTable", label: "BedSide Table" },
      { id: "wardrobe", label: "Wardrobe" },
      { id: "dressingTable", label: "Dressing Table" },
      { id: "dinningroomSet", label: "Dinning Room Set" },
      { id: "dinningChair", label: "Dinning Chair" },
      { id: "cafeteria", label: "Cafeteria" },
      { id: "dinnerWagone", label: "Dinner Wagone" },
      { id: "showcase", label: "Showcase" },
      { id: "teaTrolley", label: "Tea Trolley" },
      { id: "sofa", label: "Sofa" },
      { id: "centerTable", label: "CenterTable" },
      { id: "divan", label: "Divan" },
      { id: "lobbyChair", label: "Lobby Chair" },
      { id: "tvCabinet", label: "TV Cabinet" },
      { id: "shoeRack", label: "Shoe Rack" },
      { id: "officeSofa", label: "Office Sofa" },
      { id: "directortable", label: "Director Table" },
      { id: "computerTable", label: "Computer Table" },
      { id: "receptionTable", label: "Reception Table" },
      { id: "conferenceTable", label: "Conference Table" },
      { id: "swivelChair", label: "Swivel Chair" },
      { id: "solidWoodenDoor", label: "Solid Wooden Door" },
      {
        id: "solidEngineeredWoodenDoor",
        label: "Solid Engineered Wooden Door",
      },
      { id: "solidWoodenGlassDoor", label: "Solid Wooden Glass Door" },
      {
        id: "decorativeVeneeredFlushDoor",
        label: "Decorative Veneered Flush Door",
      },
      {
        id: "decorativeVeneeredGlassDoor",
        label: "Decorative Veneered Glass Door",
      },
      { id: "knockDownDoorFrame", label: "Knock Down Door Frame" },

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

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home"
  },
  
  {
    id: "Bedroom",
    label: "Bedroom",
    path: "/shop/bedRoomSubCatagoriesPage",
  },
  {
    id: "Dinning",
    label: "Dinning",
    path: "/shop/dinningRoomSubCatagoriesPage",
  },
  {
    id: "LivingRoom",
    label: "Living Room",
    path: "/shop/livingRoomSubCatagoriesPage",
  },
  {
    id: "Office",
    label: "Office",
    path: "/shop/officeRoomSubCatagoriesPage",
  },
  {
    id: "Door",
    label: "Door",
    path: "/shop/doorSubCatagoriesPage",
  },

  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  bedroom: "Bedroom",
  dinningroom: "Dinningroom",
  livingRoom: "LivingRoom",
  office: "Office",
  door: "Door",
  "newArrivals" :"New Arrivals" ,
};

export const subcategoryOptionsMap = {
  bedroomSet: "Bedroom Set",
  bed: "Bed",
  readingTable: "Reading Table",
  bedSideTable: "BedSide Table",
  wardrobe: "Wardrobe",
  dressingTable: "Dressing Table",

  dinningroomSet: "Dinning Room Set",
  dinningChair: "Dinning Chair",
  cafeteria: "Cafeteria",
  dinnerWagone: "Dinner Wagone",
  showcase: "Showcase",
  teaTrolley: "Tea Trolley",

  sofa: "Sofa",
  centerTable: "Dinningroom",
  divan: "divan",
  lobbyChair: "Lobby Chair",
  tvCabinet: "TV Cabinet",
  shoeRack: "Shoe Rack",

  "officeSofa": "Office Sofa" ,
  directortable: "Director Table",
  computerTable: "Computer Table",
  receptionTable: "Reception Table",
  conferenceTable: "Conference Table",
  swivelChair: "Swivel Chair",

  solidWoodenDoor: "Solid Wooden Door",

  solidEngineeredWoodenDoor: "Solid Engineered Wooden Door",

  solidWoodenGlassDoor: "Solid Wooden Glass Door",

  decorativeVeneeredFlushDoor: "Decorative Veneered Flush Door",

  decorativeVeneeredGlassDoor: "Decorative Veneered Glass Door",

  knockDownDoorFrame: "Knock Down Door Frame",
};

export const filterOptions = {
  category: [
    { id: "bedroom", label: "Bedroom" },
    { id: "dinningroom", label: "Dinningroom" },
    { id: "livingRoom", label: "LivingRoom" },
    { id: "office", label: "Office" },
    { id: "door", label: "Door" },
    { id: "newArrivals", label: "New Arrivals" },
  ],

  subcategory: [
    { id: "bedroomSet", label: "Bedroom Set" },
    { id: "bed", label: "Bed" },
    { id: "readingTable", label: "Reading Table" },
    { id: "bedSideTable", label: "BedSide Table" },
    { id: "wardrobe", label: "Wardrobe" },
    { id: "dressingTable", label: "Dressing Table" },
    { id: "dinningroomSet", label: "Dinning Room Set" },
    { id: "dinningChair", label: "Dinning Chair" },
    { id: "cafeteria", label: "Cafeteria" },
    { id: "dinnerWagone", label: "Dinner Wagone" },
    { id: "showcase", label: "Showcase" },
    { id: "teaTrolley", label: "Tea Trolley" },
    { id: "sofa", label: "Sofa" },
    { id: "centerTable", label: "Center Table" },
    { id: "divan", label: "Divan" },
    { id: "lobbyChair", label: "Lobby Chair" },
    { id: "tvCabinet", label: "TV Cabinet" },
    { id: "shoeRack", label: "Shoe Rack" },
    { id: "officeSofa", label: "Office Sofa" },
    { id: "directortable", label: "Director Table" },
    { id: "computerTable", label: "Computer Table" },
    { id: "receptionTable", label: "Reception Table" },
    { id: "conferenceTable", label: "Conference Table" },
    { id: "swivelChair", label: "Swivel Chair" },
    { id: "solidWoodenDoor", label: "Solid Wooden Door" },
    {
      id: "solidEngineeredWoodenDoor",
      label: "Solid Engineered Wooden Door",
    },
    { id: "solidWoodenGlassDoor", label: "Solid Wooden Glass Door" },
    {
      id: "decorativeVeneeredFlushDoor",
      label: "Decorative Veneered Flush Door",
    },
    {
      id: "decorativeVeneeredGlassDoor",
      label: "Decorative Veneered Glass Door",
    },
    { id: "knockDownDoorFrame", label: "Knock Down Door Frame" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];


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
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];