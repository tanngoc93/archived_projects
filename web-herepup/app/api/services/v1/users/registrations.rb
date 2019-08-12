class Services::V1::Users::Registrations < Grape::API
  version 'v1', using: :path
  prefix :api

  helpers do
    def user_params
      params_permit(
        :email,
        :username,
        :first_name,
        :last_name,
        :password,
        :password_confirmation,
        :phone_number
      )
    end
  end

  namespace :sign_up do
    desc 'New User Registration'

    params do
      requires :email,                 type: String, desc: 'Email'
      optional :username,              type: String, desc: 'Username'
      requires :first_name,            type: String, desc: 'First name'
      requires :last_name,             type: String, desc: 'Last name'
      requires :password,              type: String, desc: 'Password'
      requires :password_confirmation, type: String, desc: 'Password confirmation'
      optional :phone_number,          type: String, desc: 'Phone number'
    end

    post do
      user = User.new(user_params)

      if user.save
        status 201
        present user, with: Services::Entities::User
      else
        error_response(user.error_message, 409)
      end
    end
  end
end