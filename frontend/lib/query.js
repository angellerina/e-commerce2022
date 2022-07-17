export const PRODUCT_QUERY = `
    query {
        products {
            data {
                attributes {
                    title 
                    description
                    price
                    anchobi
                    image {
                        data {
                            attributes {
                                formats	
                                }
                            }
                        }
                    }
            }
        }
    }
`;
