class Services::V1::Users::Sessions < Grape::API
  version 'v1', using: :path
  prefix :api

  helpers Services::V1::Helpers::AuthenticationHelpers

  namespace :sign_in do
    desc 'Login via Email and Password'

    params do
      requires :email, type: String, desc: 'Email'
      requires :password, type: String, desc: 'Password'
    end

    post do
      user = User.find_by_email(params[:email])

      if user && user.valid_password?(params[:password])
        payload(user)
      else
        error_response('Bad authentication parameters', 401)
      end
    end
  end

  namespace :sign_out do
    desc 'Sign out'

    delete do
      status 204
      { message: 'You have successfully logged out.' }
    end
  end
end