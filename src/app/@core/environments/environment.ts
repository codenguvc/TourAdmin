export const API_BASE_URL = 'http://127.0.0.1:3456';

export const API_URLS = {
    // Categories
    listPageCate: `${API_BASE_URL}/categories/getPage`,


    listCate: `${API_BASE_URL}/categories`,
    addCate: `${API_BASE_URL}/categories/add-cate`,
    getCateByID: `${API_BASE_URL}/categories/get-cate`,
    editCate: `${API_BASE_URL}/categories/edit-cate`,
    deleteCate: `${API_BASE_URL}/categories/delete-cate/:id`,

    // Account
    listUsers: `${API_BASE_URL}/users`,
    addUsers: `${API_BASE_URL}/users/add-user`,
    getUsersByID: `${API_BASE_URL}/users/get-user`,
    editUsers: `${API_BASE_URL}/users/edit-user`,
    deleteUsers: `${API_BASE_URL}/users/delete-user/:id`,

    // roles
    listPageRoles: `${API_BASE_URL}/roles/getPage`,

    listRoles: `${API_BASE_URL}/roles`,
    addRoles: `${API_BASE_URL}/roles/add-role`,
    getRolesByID: `${API_BASE_URL}/roles/get-role`,
    editRoles: `${API_BASE_URL}/roles/edit-role`,
    deleteRoles: `${API_BASE_URL}/roles/delete-role/:id`,

    // permission
    listPagePermissions: `${API_BASE_URL}/permissions/getPage`,

    listPermissions: `${API_BASE_URL}/permissions`,
    addPermissions: `${API_BASE_URL}/permissions/add-permissions`,
    getPermissionsByID: `${API_BASE_URL}/permissions/get-permission`,
    editPermissions: `${API_BASE_URL}/permissions/edit-permissions`,
    deletePermissions: `${API_BASE_URL}/permissions/delete-permissions/:id`,

    // locations
    listPageLocations: `${API_BASE_URL}/locations/getPage`,

    listLoca: `${API_BASE_URL}/locations`,
    addLoca: `${API_BASE_URL}/locations/add-loca`,
    getLocaByID: `${API_BASE_URL}/locations/get-loca`,
    editLoca: `${API_BASE_URL}/locations/edit-loca`,
    deleteLoca: `${API_BASE_URL}/locations/delete-loca/:id`,

    // tours
    listPageTours: `${API_BASE_URL}/tours/getPage`,

    listTours: `${API_BASE_URL}/tours`,
    addTours: `${API_BASE_URL}/tours/add-tour`,
    getToursByID: `${API_BASE_URL}/tours/get-tour`,
    editTours: `${API_BASE_URL}/tours/edit-tour`,
    deleteTours: `${API_BASE_URL}/tours/delete-tour/:id`,

    // orders
    listOrders: `${API_BASE_URL}/orders`,
    addOrders: `${API_BASE_URL}/orders/add-order`,
    getOrdersByID: `${API_BASE_URL}/orders/get-order`,
    editOrders: `${API_BASE_URL}/orders/edit-order`,
    deleteOrders: `${API_BASE_URL}/orders/delete-order/:id`,

     // customer
     listPageCustomer: `${API_BASE_URL}/customers/getPage`,
     listCustomers: `${API_BASE_URL}/customers`,
     addCustomers: `${API_BASE_URL}/customers/add-customers`,
     getCustomersByID: `${API_BASE_URL}/customers/get-customers`,
     editCustomers: `${API_BASE_URL}/customers/edit-customers`,
     deleteCustomers: `${API_BASE_URL}/customers/delete-customers/:id`,

    //  dashboard
    dashboards: `${API_BASE_URL}/dashboard`,
    amountCus: `${API_BASE_URL}/dashboard/amount-customer`,
    amountOrder: `${API_BASE_URL}/dashboard/amount-order`,
    orderByLocation: `${API_BASE_URL}/dashboard/orders-bylocation`,
revenueByLocations: `${API_BASE_URL}/dashboard/revenue-by-location`,
};