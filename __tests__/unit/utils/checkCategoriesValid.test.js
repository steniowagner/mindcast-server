const checkCategoriesValid = require('../../../src/utils/checkCategoriesValid');

describe('Testing the checkCategoriesValid method', () => {
  it('should return true when the categories are valids', () => {
    const categories = ['science', 'technology', 'literature'];

    const result = checkCategoriesValid(categories);

    expect(result).toBe(true);
  });

  it('should return false when some category are invalid', () => {
    const categories = ['science', 'technology', 'non-valid'];

    const result = checkCategoriesValid(categories);

    expect(result).toBe(false);
  });

  it('should return false when categories are empty', () => {
    const result = checkCategoriesValid([]);

    expect(result).toBe(false);
  });

  it('should return false when categories is null', () => {
    const result = checkCategoriesValid(null);

    expect(result).toBe(false);
  });

  it('should return false when categories is undefined', () => {
    const result = checkCategoriesValid(undefined);

    expect(result).toBe(false);
  });
});
