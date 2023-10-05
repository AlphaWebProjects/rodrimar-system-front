 
 
 let categoriesArr = [
    {
        id: 1,
        name: "Peças",
        createdBy: 'Admin-1'
    },
    {
        id: 2,
        name: "Pneus",
        createdBy: 'Admin-2'
    },
    {
        id: 3,
        name: "Óleos",
        createdBy: 'Admin-3'
    },
    {
        id: 4,
        name: "Produtos de limpeza",
        createdBy: 'Admin-3'
    },
];

let subCategoriesArr = [
    {
        id: 1,
        categorieId: 1,
        name: "Parafusos",
        createdBy: 'Admin-1'
    },
    {
        id: 2,
        categorieId: 1,
        name: "Chaves",
        createdBy: 'Admin-2'
    },
    {
        id: 3,
        categorieId: 1,
        name: "Pressurizados",
        createdBy: 'Admin-3'
    },
    {
        id: 4,
        categorieId: 2,
        name: "Pneus de carro",
        createdBy: 'Admin-1'
    },
    {
        id: 5,
        categorieId: 2,
        name: "Pneus de caminhonete",
        createdBy: 'Admin-2'
    },
    {
        id: 6,
        categorieId: 2,
        name: "Pneus de caminhão",
        createdBy: 'Admin-3'
    },
    {
        id: 7,
        categorieId: 3,
        name: "Óleos sintéticos",
        createdBy: 'Admin-1'
    },
    {
        id: 8,
        categorieId: 3,
        name: "Óleos lubrificantes",
        createdBy: 'Admin-2'
    },
    {
        id: 9,
        categorieId: 3,
        name: "Óleos à váculo",
        createdBy: 'Admin-3'
    },
];

let productsArr = [
    {
        id: 1,
        name: "Parafuso tipo A",
        subCategorieId: 1,
        createdAt: 10,
        inStock: 4
    },
    {
        id: 2,
        name: "Parafuso 4mm",
        subCategorieId: 1,
        createdAt: 10,
        inStock: 4
    },
    {
        id: 3,
        name: "Parafuso tipo C",
        subCategorieId: 1,
        createdAt: 10,
        inStock: 3
    },
    {
        id: 4,
        name: "produto34",
        subCategorieId: 1,
        createdAt: 10,
        inStock: 0
    },
    {
        id: 5,
        name: "produto11",
        subCategorieId: 1,
        createdAt: 10,
        inStock: 0
    },
    {
        name: "produto2",
        subCategorieId: 2,
        createdAt: 11,
        inStock: 0
    },
    {
        name: "produto3",
        subCategorieId: 3,
        createdAt: 12,
        inStock: 0
    },
    {
        name: "produto4",
        subCategorieId: 4,
        createdAt: 13,
        inStock: 0
    },
    {
        name: "produto5",
        subCategorieId: 5,
        createdAt: 14,
        inStock: 0
    },
    {
        name: "produto6",
        subCategorieId: 6,
        createdAt: 15,
        inStock: 0
    },
    {
        name: "produto3",
        subCategorieId: 7,
        createdAt: 16,
        inStock: 0
    },
    {
        name: "produto3",
        subCategorieId: 8,
        createdAt: 17,
        inStock: 0
    },
    {
        name: "produto3",
        subCategorieId: 9,
        createdAt: 18,
        inStock: 0
    },
    
]

let insertedItemsArr = [
    {
        id: 1,
        itemId: 1,
        name: 'produto1',
        insertedAt: '10/10/2023',
        value: 'R$25',
        insertedBy: 'Admin-1'
    },
    {
        id: 2,
        itemId: 1,
        name: 'produto1',
        insertedAt: '10/05/2023',
        value: 'R$27',
        insertedBy: 'Admin-1'
    },
    {
        id: 3,
        itemId: 1,
        name: 'produto1',
        insertedAt: '03/07/2023',
        value: 'R$24',
        insertedBy: 'Admin-1'
    },
    {
        id: 4,
        itemId: 1,
        name: 'produto1',
        insertedAt: '08/09/2023',
        value: 'R$24.50',
        insertedBy: 'Admin-1'
    },
    {
        id: 5,
        itemId: 2,
        name: 'produto70',
        insertedAt: '14/10/2023',
        value: 'R$15.60',
        insertedBy: 'Admin-1'
    },
    {
        id: 6,
        itemId: 2,
        name: 'produto70',
        insertedAt: '22/11/2023',
        value: 'R$15',
        insertedBy: 'Admin-1'
    },
    {
        id: 7,
        itemId: 2,
        name: 'produto70',
        insertedAt: '23/07/2023',
        value: 'R$16',
        insertedBy: 'Admin-1'
    },
    {
        id: 8,
        itemId: 2,
        name: 'produto70',
        insertedAt: '06/09/2023',
        value: 'R$16.30',
        insertedBy: 'Admin-1'

    },
    {
        id: 9,
        itemId: 3,
        name: 'produto56',
        insertedAt: '22/09/2023',
        value: 'R$50',
        insertedBy: 'Admin-1'
    },
    {
        id: 10,
        itemId: 3,
        name: 'produto56',
        insertedAt: '26/10/2023',
        value: 'R$49',
        insertedBy: 'Admin-1'
    },
    {
        id: 11,
        itemId: 3,
        name: 'produto56',
        insertedAt: '12/10/2023',
        value: 'R$54.50',
        insertedBy: 'Admin-1'
    },
]


export const dummys = [
    categoriesArr,
    subCategoriesArr,
    productsArr,
    insertedItemsArr,
]