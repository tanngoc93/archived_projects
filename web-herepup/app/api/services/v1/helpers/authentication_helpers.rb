module Services::V1::Helpers::AuthenticationHelpers
  extend Grape::API::Helpers

  def payload(user)
    status 200

    if user && user.id
      {
        status: 'success',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          phone_number: user.phone_number,
          auth_token: JsonWebToken.encode({ user_id: user.id })
        }
      }
    else
      error_response('Bad authentication parameters', 401)
    end
  end
end