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

// Fetch 1 specific product
// Exclamtion = anchobi is required + has to be a string
// Filter out anchobi/title that matches our variable
// If matches, returns data query
export const GET_PRODUCT_QUERY = `
    query getProduct($anchobi: String!) {
        products(filters: {anchobi: {eq: $anchobi}}) {
            data {
                attributes {
                    title
                    anchobi
                    description
                    price
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
