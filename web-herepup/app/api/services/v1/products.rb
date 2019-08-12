class Services::V1::Products < Grape::API
  version 'v1', using: :path
  prefix :api

  helpers do
    def product_params
      params_permit(:title, :vendor, :body_html, :options, :variants)
    end
  end

  namespace :products do
    desc "Create new product"

    params do
      requires :title,   type: String, desc: "Product's title"
      requires :vendor,    type: String, desc: "Product's vendor"
      optional :body_html, type: String, desc: "Product's description"
      optional :options, type: Array
      optional :variants, type: Array
    end

    before { authenticate_request! }

    post do
    	product = Product.new(product_params)

      if product.save
        status 200
        product.to_json
      else
        error_response(product.error_message, 422)
      end
    end
  end
end
