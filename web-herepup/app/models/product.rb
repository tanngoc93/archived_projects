class Product < ApplicationRecord
  before_save :set_default_options
  before_save :set_default_variants

  private

  def set_default_options
    return unless options.blank?

    options << {
      name: 'Title',
      position: 1,
      values: [
        'Default Title'
      ]
    }
  end

  def set_default_variants
    return unless variants.blank?

    variants << {
      sku: '',
      position: 1,
      barcode: nil,
      weight: nil,
      price: 0.00,
      compare_at_price: nil,
      inventory_management: nil,
      option1: 'Default Title',
      option2: nil,
      option3: nil,
      inventory_quantity: nil,
      metafields_global_harmonized_system_code: nil
    }
  end
end
