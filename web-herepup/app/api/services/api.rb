require 'grape-swagger'

class Services::Api < Grape::API
  format :json
  content_type :json, "application/json;charset=utf-8"

  helpers Services::V1::Helpers::Defaults

  rescue_from Grape::Exceptions::ValidationErrors do |e|
    rack_response({
      status: e.status,
      error_msg: e.message,
    }.to_json, 400)
  end

  mount Services::V1::Users
  mount Services::V1::Users::Registrations
  mount Services::V1::Users::Sessions

  mount Services::V1::Products

  add_swagger_documentation info: { title: 'Here Puppy API' }
end