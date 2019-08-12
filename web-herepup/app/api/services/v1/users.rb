class Services::V1::Users < Grape::API
  version 'v1', using: :path
  prefix :api

  helpers do
    def password_params
      params_permit(:password, :password_confirmation)
    end
    
    def user_params
      params_permit(:username, :first_name, :last_name, :phone_number)
    end
  end

  namespace :change_password do
    desc 'Change the password'

    params do
      requires :old_password, type: String, desc: 'Your old password'
      requires :password, type: String, desc: 'Your new password'
      requires :password_confirmation, type: String, desc: 'Your new password confirmation'
    end

    before { authenticate_request! }

    put do
      if @current_user.valid_password?(params[:old_password])
        if @current_user.update(password_params)
          status 200
          { message: 'Your password has been changed successfully!' }
        else
          error_response(@current_user.error_message, 422)
        end
      else
        error_response('Wrong password, please try again!', 422)
      end
    end
  end

  namespace :reset_password do
    desc 'Reset the password'

    params do
      requires :email, type: String, desc: 'Your email'
    end

    post do
      user = User.find_by_email(params[:email])

      if user && user.reset_password_email
        status 201
        { message: 'A new password had send your email.' }
      else
        error_response('Bad authentication parameters.', 401)
      end
    end
  end

  namespace :change_password_by_reset_token do
    desc 'Change the password by reset password token'

    params do
      requires :reset_token, type: String, desc: 'Your reset password token'
      requires :password, type: String, desc: 'Your new password'
      requires :password_confirmation, type: String, desc: 'Your new password confirmation'
    end

    put do
      user = User.find_by_reset_password_token(params[:reset_token])

      if user
        if user.update(password_params)
          status 200
          { message: 'Your password has been changed successfully!' }
        else
          error_response(user.error_message, 422)
        end
      else
        error_response('Wrong token, please try again!', 422)
      end
    end
  end

  namespace :users do
    desc "Get User's Info"

    before { authenticate_request! }

    get do
      if @current_user
        status 200
        present @current_user, with: Services::Entities::User
      else
        error_response('This is an error.', 422)
      end
    end
  end

  namespace :users do
    desc "Update User's Info"

    params do
      requires :username,   type: String, desc: 'First name'
      requires :first_name,   type: String, desc: 'First name'
      requires :last_name,    type: String, desc: 'Last name'
      optional :phone_number, type: String, desc: 'Phone number(optional)'
    end

    before { authenticate_request! }

    put do
      if @current_user && @current_user.update(user_params)
        status 200
        present @current_user, with: Services::Entities::User
      else
        error_response(user.error_message, 422)
      end
    end
  end
end
