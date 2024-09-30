export const fetchProducts = async (
  setProducts,
  setFilteredProducts,
  setIsLoading,
  setHasError
) => {
  setIsLoading(true);
  setHasError(false);
  try {
    const response = await fetch(
      'https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json'
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.result === 'success') {
      setProducts(data.data);
      setFilteredProducts(data.data);
    } else {
      throw new Error('Failed to fetch products: API returned an error');
    }
  } catch (error) {
    setHasError(true);
  } finally {
    setIsLoading(false);
  }
};
export const sortProducts = (
  order,
  filteredProducts,
  setFilteredProducts,
  setSelectedSortOption,
  setIsSortModalVisible
) => {
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (order === 'lowToHigh') {
      return a.price.amount - b.price.amount;
    } else if (order === 'highToLow') {
      return b.price.amount - a.price.amount;
    } else if (order === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
  setFilteredProducts(sortedProducts);
  setSelectedSortOption(
    order === 'lowToHigh'
      ? 'Price: Low to High'
      : order === 'highToLow'
      ? 'Price: High to Low'
      : 'Newest'
  );
  setIsSortModalVisible(false);
};

export const applyFilters = (
  products,
  priceRange,
  selectedColour,
  selectedSize,
  selectedBrand,
  isInStock,
  setFilteredProducts,
  setIsFilterModalVisible
) => {
  const filtered = products.filter((product) => {
    const price = parseFloat(product.price.amount);
    const inPriceRange = price >= priceRange[0] && price <= priceRange[1];
    const colourMatch =
      !selectedColour ||
      (product.colour &&
        product.colour.toLowerCase() === selectedColour.toLowerCase());
    const sizeMatch =
      !selectedSize || (product.sizes && product.sizes.includes(selectedSize));
    const brandMatch =
      !selectedBrand ||
      (product.brandName && product.brandName === selectedBrand);
    const inStockMatch = !isInStock || product.stockStatus === 'IN STOCK';
    return (
      inPriceRange && colourMatch && sizeMatch && brandMatch && inStockMatch
    );
  });
  setFilteredProducts(filtered);
  setIsFilterModalVisible(false);
};

export const discardFilters = (
  setSelectedColour,
  setSelectedSize,
  setSelectedBrand,
  setPriceRange,
  setIsInStock,
  setFilteredProducts,
  products,
  setIsFilterModalVisible
) => {
  setSelectedColour(null);
  setSelectedSize(null);
  setSelectedBrand(null);
  setPriceRange([0, 100]);
  setIsInStock(false);
  setFilteredProducts(products);
  setIsFilterModalVisible(false);
};
